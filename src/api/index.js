import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import * as controllers from '@/api/controllers/main'
import { addMovementsInAccount, processBankAccountMovements } from '@/api/controllers/main'

const app = express()
const port = process.env.SERVER_PORT

app.use(bodyParser.json({ type: 'application/json' }))

app.use(cors())

app.get('/account', (req, res) => {
  try {
    const accounts = controllers.getAccountList()

    res.json(accounts)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

app.get('/account/:id', (req, res) => {
  try {
    const account = controllers.getAccount(req.params.id)

    res.json(account)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

app.post('/account', (req, res) => {
  const account = req.body.account

  try {
    controllers.createAccount(account)
    res.sendStatus(200)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

app.post('/account/movements/add/:accountId', (req, res) => {
  try {
    const movements = req.body

    const accountId = req.params.accountId

    addMovementsInAccount(movements, accountId)

    res.status(200).send()
  } catch (e) {
    res.send(500);
  }
})

app.post('/account/movements/process/:accountId', (req, res) => {
  try {
    const response = processBankAccountMovements(req.body.filePath, req.params.accountId)

    res.json(response)
  } catch (err) {
    res.send(err);
  }
})

app.delete('/account/:id', (req, res) => {
  const accountId = req.params.id

  try {
    controllers.deleteAccount(accountId)

    res.sendStatus(200)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

app.post('/user', (req, res) => {
  const user = req.body.user
  const fileName = req.body.fileName
  try {
    controllers.saveUserLocalFile(user, fileName)
    res.sendStatus(200)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

app.get('/user/:fileName', (req, res) => {
  const fileName = req.params.fileName
  try {
    const file = controllers.readLocalFile(fileName)
    res.status(200).json(file)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

app.delete('/user/:fileName', (req, res) => {
  const fileName = req.params.fileName
  try {
    controllers.deleteLocalFile(fileName)
    res.sendStatus(200)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

app.post('/signin', (req, res) => {
  const pin = req.body.pin

  const verificationPin = req.body.verificationPin

  if (pin !== verificationPin) {
    res.status(400).send('Pin and verification Pin are different')
  }

  try {
    controllers.signin(pin, res)
  } catch (e) {
    res.status(400).send(`Can not create pin: ${e.message}`)
  }
})

app.get('/isSignedIn', controllers.isSignedIn)

app.post('/login', (req, res) => {
  const pin = req.body.pin

  try {
    controllers.login(pin, res)
  } catch (e) {
    res.status(400).send(`Unable to login: ${e.message}`)
  }
})

app.get('/validate/token', (req, res) => res.send())

export default () => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}
