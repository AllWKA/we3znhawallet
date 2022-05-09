import express from "express"
import bodyParser from "body-parser"
import { saveStorageLocalFile } from "@/api/controllers/storageController"
import { saveUserLocalFile } from "@/api/controllers/userController"
import { readLocalFile, deleteLocalFile } from "./controllers/main"

const app = express()
const port = 8090

app.use(bodyParser.json({ type: "application/json" }))

app.post("/account", (req, res) => {
  const storage = req.body.storage
  const fileName = req.body.fileName
  try {
    saveStorageLocalFile(storage, fileName)
    res.sendStatus(200)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

app.post("/user", (req, res) => {
  const user = req.body.user
  const fileName = req.body.fileName
  try {
    saveUserLocalFile(user, fileName)
    res.sendStatus(200)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

app.get("/user/:fileName", (req, res) => {
  const fileName = req.params.fileName
  try {
    const file = readLocalFile(fileName)
    res.status(200).json(file)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

app.get("/account/:fileName", (req, res) => {
  const fileName = req.params.fileName
  try {
    const file = readLocalFile(fileName)
    res.status(200).json(file)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

app.delete("/user/:fileName", (req, res) => {
  const fileName = req.params.fileName
  try {
    deleteLocalFile(fileName)
    res.sendStatus(200)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

app.delete("/account/:fileName", (req, res) => {
  const fileName = req.params.fileName
  try {
    deleteLocalFile(fileName)
    res.sendStatus(200)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

export default () => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}
