import express from 'express'
import exampleRouter from './routers/example.router.js'

const app = express()

app.use('/', exampleRouter)

app.get('/api/dictionary/:word([a-zA-Z%C3%B3]+)', (req, res) => {
    const word = req.params.word
    res.send(`Palabra ${word} agregada al diccionario.`)
})

app.get('*', (req, res) => {
    res.status(404).send('No se puede agregar esta palabra')
})

app.listen(8080, () => console.log('Server Up!'))