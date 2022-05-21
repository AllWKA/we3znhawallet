import { join } from 'path'
import fs from 'fs'
import { app } from 'electron'

export const projectPath = join(app.getPath('appData'), 'we3znhawallet')

export function saveLocalFile(data, fileName) {
  const filePath = join(projectPath, fileName)

  fs.writeFileSync(filePath, JSON.stringify(data, null, 4))
}

export function readLocalFile(fileName) {
  const dataPath = join(projectPath, fileName)
  let buffer

  if (!fs.existsSync(dataPath)) {
    throw new Error(`Can not find file: ${fileName}`)
  }

  try {
    buffer = fs.readFileSync(dataPath)
  } catch (e) {
    throw new Error(`Can not read file: ${e.message}`)
  }

  try {
    return JSON.parse(buffer.toString())
  } catch (e) {
    throw new Error(`Can not parse JSON: ${e.message}`)
  }
}

export function deleteLocalFile(fileName) {
  const dataPath = join(projectPath, fileName)

  if (!fs.existsSync(dataPath)) {
    throw new Error(`Can not find file: ${fileName}`)
  }

  try {
    fs.unlinkSync(dataPath)
  } catch (e) {
    throw new Error(`Can not remove file: ${e.message}`)
  }
}

export function createLocalFileIfNecessary(data, fileName) {
  const dataPath = join(projectPath, fileName)

  if (!fs.existsSync(dataPath)) {
    try {
      fs.writeFileSync(dataPath, JSON.stringify(data, null, 4))
    } catch (e) {
      throw new Error(`Can not create JSON: ${e.message}`)
    }
  }
}

export function fileExist(fileName) {
  const filePath = join(projectPath, fileName)

  return fs.existsSync(filePath)
}
