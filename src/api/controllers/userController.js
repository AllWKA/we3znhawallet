import { join } from 'path'
import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'
import moment from 'moment/moment'
import { projectPath, saveLocalFile, createLocalFileIfNecessary, readLocalFile, fileExist } from './fileManager'

const defaultUserConfig = {
  pin: "",
}

const userConfigFilePath = 'userConfig.json'

export function saveUserLocalFile(data, fileName) {
  const userPath = join(projectPath, fileName)
  try {
    if (data === undefined) {
      data = defaultUserConfig
    }
    createLocalFileIfNecessary(data, userPath)
    saveLocalFile(data, userPath)
  } catch (e) {
    throw new Error(`Can not save JSON: ${e.message}`)
  }
}

export function login(pin, res) {
  let userConfig = defaultUserConfig

  if (fileExist(userConfigFilePath)) {
    userConfig = readLocalFile(userConfigFilePath)
  }

  const pinDecrypted = CryptoJS.AES.decrypt(userConfig.pin, process.env.PIN_SECRET).toString(CryptoJS.enc.Utf8)

  if (pinDecrypted !== pin) {
    throw new Error('Invalid pin')
  }

  const expirationTime = moment().add(5, 'minutes').valueOf()

  const jwtConfig = {
    exp: expirationTime
  }

  const token = jwt.sign(jwtConfig, process.env.JWT_SECRET, { algorithm: 'HS256' })

  res.status(200).send(token)
}

export function signin(pin, res) {
  if (pin.length !== 4) {
    return res.status(400).send('Invalid pin length')
  }

  let userConfig = defaultUserConfig

  if (fileExist(userConfigFilePath)) {
    userConfig = readLocalFile(userConfigFilePath)
  }

  if (userConfig.pin.length) {
    return res.status(400).send('Pin already exist')
  }

  userConfig.pin = CryptoJS.AES.encrypt(pin, process.env.PIN_SECRET).toString()

  saveLocalFile(userConfig, userConfigFilePath)

  res.sendStatus(204)
}

export function isSignedIn(req, res) {
  let userConfig

  try {
    userConfig = readLocalFile(userConfigFilePath)
  } catch (e) {
    userConfig = defaultUserConfig
  }

  res.status(200).send(!!userConfig.pin && !!userConfig.pin.length)
}
