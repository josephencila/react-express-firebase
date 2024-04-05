const express = require("express")
const cors = require('cors')
const dotenv = require('dotenv')
const morgan = require("morgan")
const uploadRouter = require('./configs/uploadConfig')
const { createRouteHandler } = require('uploadthing/express')

const firebaseMW = require('./middleware/firebaseMW')

dotenv.config()

const app = express()

app.use(morgan('tiny'))

app.use(cors({
    origin: ['http://localhost:5000'],
    methods: [
        'GET',
        'PUT',
        'POST',
        'DELETE',
        'PATCH',
        'HEAD',
        'OPTIONS',
        'TRACE',
        'CONNECT',]
}))



app.use("/api/uploadthing",
    createRouteHandler({
        router: uploadRouter,
        config: {
            callbackUrl: "http://localhost:4000" + "/api/uploadthing",
            isDev: true,
            logLevel: 'error',
            uploadthingSecret: process.env.NODE_UPLOADTHING_SECRET,
            uploadthingId: process.env.NODE_UPLOADTHING_APP_ID

        },
    })
);



app.use(express.json())


app.post('/', (req, res) => {

    return res.status(200).json({ message: 'hello world!' })
})

const port = 4000

app.listen(port, () => {
    console.log(`server is listening to port ${port}`)
})