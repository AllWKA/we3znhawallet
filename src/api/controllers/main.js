import { app } from "electron"
import { join } from "path"
import fs from "fs"

export const projectPath = join(app.getPath("appData"), "we3znhawallet")

export function saveLocalFile(data, path) {
  fs.writeFileSync(path, JSON.stringify(data, null, 4))
}

export function readLocalFile(fileName) {
  const dataPath = join(projectPath, fileName)
  let buffer

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

export function createLocalFileIfNecessary(data, path) {
  if (!fs.existsSync(path)) {
    try {
      fs.writeFileSync(path, JSON.stringify(data, null, 4))
    } catch (e) {
      throw new Error(`Can not create JSON: ${e.message}`)
    }
  }
}
