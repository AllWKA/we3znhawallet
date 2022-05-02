import {app} from 'electron'
import {join} from 'path'
import fs from 'fs'

const defaultStorage = {
    accounts: [],
    pin: ''
}

export function helloWorld(req, res) {
    res.send('hello world')
}

function saveStorage(storage) {
    createStorageIfNecessary()

    const storagePath = join(app.getPath('appData'), 'we3znhawallet', 'storage.json')

    try {
        fs.writeFileSync(storagePath, JSON.stringify(storage, null, 4))
    } catch (e) {
        throw new Error(`Can not save storage JSON: ${e.message}`)
    }
}

function readStorage() {
    createStorageIfNecessary()

    const storagePath = join(app.getPath('appData'), 'we3znhawallet', 'storage.json')

    let buffer

    try {
        buffer = fs.readFileSync(storagePath)
    } catch (e) {
        throw new Error(`Can not read storage file: ${e.message}`)
    }


    try {
        return JSON.parse(buffer.toString())
    } catch (e) {
        throw new Error(`Can not parse storage JSON: ${e.message}`)
    }
}


function createStorageIfNecessary() {
    const appDataPath = app.getPath('appData')

    const folderPath = join(appDataPath, 'we3znhawallet')

    if (!fs.existsSync(folderPath)) {
        throw new Error(`App folder does not exist`)
    }

    const storageJSONPath = join(folderPath, 'storage.json')

    if (!fs.existsSync(storageJSONPath)) {
        try {
            fs.writeFileSync(storageJSONPath, JSON.stringify(defaultStorage, null, 4))
        } catch (e) {
            throw new Error(`Can not create storage JSON: ${e.message}`)
        }
    }
}
