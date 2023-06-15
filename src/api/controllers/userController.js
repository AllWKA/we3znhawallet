import { join } from 'path'
import { createLocalFileIfNecessary, fileExist, projectPath, readLocalFile, saveLocalFile } from '../helpers/fileManager'

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

  if (userConfig.pin !== pin) {
    throw new Error('Invalid pin')
  }

  res.status(204).send()
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

  userConfig.pin = pin

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
