import { Router } from 'express'
import jwt from 'jsonwebtoken'

export default class MyRouter {
    constructor() {
        this.router = Router()
        this.init()
    }

    init() {}

    getRouter() {
        return this.router
    }

    get(path, policies, ...callbacks) {
        this.router.get(path, this.handlePolicies(policies), this.applyCallbacks(callbacks))
    }
    post(path, policies, ...callbacks) {
        this.router.post(path, this.handlePolicies(policies), this.applyCallbacks(callbacks))
    }

    applyCallbacks(callbacks) {
        return callbacks.map(callback => async(...params) => {
            try {
                await callback.apply(this, params)
            } catch(error) {
                params[1].status(500).send(error)
            }
        })
    }

    handlePolicies = policies => (req, res, next) => {
        if (policies.includes('PUBLIC')) return next()
        if (policies.length > 0) {
            const token = req.signedCookies['jwt-coder']
            if (!token) {
                res.send('Not Authenticated')
            }
            const credentials = jwt.verify(token, 'secret')
            if (!policies.includes(credentials.user.role.toUpperCase())) {
                return res.send('Not Authorized')
            }
            req.user = credentials.user
            return next()
        }
    }
}