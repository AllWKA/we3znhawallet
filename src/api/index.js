import express from 'express'
import {helloWorld} from '@/api/controllers'

const app = express()
const port = 3000

app.get('/', helloWorld)

export default () => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}
