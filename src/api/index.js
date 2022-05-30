import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import * as controllers from '@/api/controllers/main'
import validateJWT from '@/api/middlewares/validateJWT'

const app = express()
const port = process.env.SERVER_PORT

app.use(bodyParser.json({ type: 'application/json' }))

app.use(cors())

app.post('/account', validateJWT, (req, res) => {
  const storage = req.body.storage
  const fileName = req.body.fileName
  try {
    controllers.saveStorageLocalFile(storage, fileName)
    res.sendStatus(200)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

app.post('/user', validateJWT, (req, res) => {
  const user = req.body.user
  const fileName = req.body.fileName
  try {
    controllers.saveUserLocalFile(user, fileName)
    res.sendStatus(200)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

app.get('/user/:fileName', validateJWT, (req, res) => {
  const fileName = req.params.fileName
  try {
    const file = controllers.readLocalFile(fileName)
    res.status(200).json(file)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

app.delete('/user/:fileName', validateJWT, (req, res) => {
  const fileName = req.params.fileName
  try {
    controllers.deleteLocalFile(fileName)
    res.sendStatus(200)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

// TODO: account controller? or storage?
// app.get('/account/:fileName', (req, res) => {
//   const fileName = req.params.fileName
//   try {
//     const file = readLocalFile(fileName)
//     res.status(200).json(file)
//   } catch (e) {
//     res.status(400).send(e.message)
//   }
// })

// TODO: account controller? or storage?
// app.delete('/account/:fileName', (req, res) => {
//   const fileName = req.params.fileName
//   try {
//     deleteLocalFile(fileName)
//     res.sendStatus(200)
//   } catch (e) {
//     res.status(400).send(e.message)
//   }
// })

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

app.get('/validate/token', validateJWT, (req, res) => res.send())

export default () => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}
