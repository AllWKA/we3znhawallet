import {app} from 'electron'
import {join} from 'path'
import fs from 'fs'

const defaultStorage = {
    accounts: []
}

const defaultConfig = {
    pin: ''
}

const storagePath = join(app.getPath('appData'), 'we3znhawallet', 'storage.json')

const configPath = join(app.getPath('appData'), 'we3znhawallet', 'config.json')

export function helloWorld(req, res) {
    res.send('hello world')
}

function saveLocalFile(storage, path) {
    createLocalFileIfNecessary()

    try {
        fs.writeFileSync(path, JSON.stringify(storage, null, 4))
    } catch (e) {
        throw new Error(`Can not save JSON: ${e.message}`)
    }
}

function readLocalFile(path) {
    createLocalFileIfNecessary()

    let buffer

    try {
        buffer = fs.readFileSync(path)
    } catch (e) {
        throw new Error(`Can not read file: ${e.message}`)
    }


    try {
        return JSON.parse(buffer.toString())
    } catch (e) {
        throw new Error(`Can not parse JSON: ${e.message}`)
    }
}


function createLocalFileIfNecessary(localFileName) {
    const appDataPath = app.getPath('appData')

    const folderPath = join(appDataPath, 'we3znhawallet')

    if (!fs.existsSync(folderPath)) {
        throw new Error(`App folder does not exist`)
    }

    const storageJSONPath = join(folderPath, localFileName)

    if (!fs.existsSync(storageJSONPath)) {
        try {
            fs.writeFileSync(storageJSONPath, JSON.stringify(defaultStorage, null, 4))
        } catch (e) {
            throw new Error(`Can not create JSON: ${e.message}`)
        }
    }
}
