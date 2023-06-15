import { saveLocalFile, createLocalFileIfNecessary } from '../helpers/fileManager'

const defaultStorage = {
    accounts: []
}

export function saveStorageLocalFile(data, fileName){
    try {
        if(data === undefined){
            data = defaultStorage
        }
        createLocalFileIfNecessary(data, fileName)
        saveLocalFile(data, fileName)
    } catch (e) {
        throw new Error(`Can not save JSON: ${e.message}`)
    }
}
