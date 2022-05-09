import { join } from "path"
import { projectPath, saveLocalFile, createLocalFileIfNecessary } from "./main"

export const defaultStorage = {
    accounts: [],
}

export function saveStorageLocalFile(data, fileName){
    const storagePath = join(projectPath, fileName)
    try {
        if(data === undefined){
            data = defaultStorage
        }
        createLocalFileIfNecessary(data, storagePath)
        saveLocalFile(data, storagePath)
    } catch (e) {
        throw new Error(`Can not save JSON: ${e.message}`)
    }
}