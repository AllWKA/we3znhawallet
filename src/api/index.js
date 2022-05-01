import express from 'express'
import {helloWorld} from '@/api/controllers'

const app = express()
const port = 8090

app.get('/', helloWorld)

export default () => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}
