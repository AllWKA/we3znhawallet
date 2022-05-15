import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { saveStorageLocalFile } from '@/api/controllers/storageController'
import { login, saveUserLocalFile, signin, isSignedIn } from '@/api/controllers/userController'
import { readLocalFile, deleteLocalFile } from './controllers/main'
import validateJWT from '@/api/middlewares/validateJWT'

const app = express()
const port = 8090

app.use(bodyParser.json({ type: 'application/json' }))

app.use(cors())
app.use(cookieParser())

app.post('/account', (req, res) => {
  const storage = req.body.storage
  const fileName = req.body.fileName
  try {
    saveStorageLocalFile(storage, fileName)
    res.sendStatus(200)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

app.post('/user', (req, res) => {
  const user = req.body.user
  const fileName = req.body.fileName
  try {
    saveUserLocalFile(user, fileName)
    res.sendStatus(200)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

app.get('/user/:fileName', (req, res) => {
  const fileName = req.params.fileName
  try {
    const file = readLocalFile(fileName)
    res.status(200).json(file)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

app.get('/account/:fileName', (req, res) => {
  const fileName = req.params.fileName
  try {
    const file = readLocalFile(fileName)
    res.status(200).json(file)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

app.delete('/user/:fileName', (req, res) => {
  const fileName = req.params.fileName
  try {
    deleteLocalFile(fileName)
    res.sendStatus(200)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

app.delete('/account/:fileName', validateJWT, (req, res) => {
  const fileName = req.params.fileName
  try {
    deleteLocalFile(fileName)
    res.sendStatus(200)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

app.post('/signin', (req, res) => {
  const pin = req.body.pin

  try {
    signin(pin, res)
  } catch (e) {
    res.status(400).send(`Can not create pin: ${e.message}`)
  }
})

app.get('/isSignedIn', isSignedIn)

app.post('/login', (req, res) => {
  const pin = req.body.pin

  try {
    login(pin, res)
  } catch (e) {
    res.status(400).send(`Unable to login: ${e.message}`)
  }
})

// app.post('/logout', logout)

export default () => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}
