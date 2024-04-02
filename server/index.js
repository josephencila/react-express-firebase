const express = require("express")
const cors = require('cors')
const dotenv = require('dotenv')
const morgan = require("morgan")

const firebaseMW = require('./middleware/firebaseMW')

const app = express()

app.use(cors({
    origin: ['http://localhost:5000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

app.use(express.json())
app.use(morgan('tiny'))




app.post('/',firebaseMW, (req, res) => {
     console.log(req?.user)
    return res.status(200).json({ message: 'hello world!' })
})

const port = 4000

app.listen(port, () => {
    console.log(`server is listening to port ${port}`)
})