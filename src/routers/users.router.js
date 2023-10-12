import MyRouter from './router.js'
import jwt from 'jsonwebtoken'

export default class UserRouter extends MyRouter {
    init() {
        this.get('/login', ['PUBLIC'], (req, res) => {
            const user = { username: 'alexmarinmendez', role: 'admin' }
            const access_token = jwt.sign({ user }, 'secret', { expiresIn: '24h' })
            res.cookie('jwt-coder', access_token, { signed: true }).send({ status: 'Login success' })
        })
        this.get('/panel_administrativo', ['ADMIN'], (req, res) => {
            res.send('Bienvenido al Panel administrativo!')
        })
        this.get('/carrito', ['USER'], (req, res) => {
            res.send('Bienvenido a tu Carrito de Compras')
        })
        this.get('/tutienda', ['PREMIUM', 'ADMIN'], (req, res) => {
            res.send('Bienvenido a tu Tienda')
        })
    }
}