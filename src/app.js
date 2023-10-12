import express from 'express'
import cookieParser from 'cookie-parser'
import UserRouter from './routers/users.router.js'

const app = express()
app.use(cookieParser('secret'))
const userRouter = new UserRouter()
app.use('/users', userRouter.getRouter())

app.listen(8080, () => console.log('Server Up!'))