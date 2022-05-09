import { join } from "path"
import { projectPath, saveLocalFile, createLocalFileIfNecessary } from "./main"

const defaultUserConfig = {
  pin: "",
}

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
