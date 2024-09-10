const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// routes

mongoose.set("strictQuery", false)

mongoose.
connect(`mongodb+srv://root:${process.env.PASSWORD}@nodeapi.0geri.mongodb.net/Node-API?retryWrites=true&w=majority&appName=NodeAPI`)
.then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, () => {
        console.log('Node API app is running on port 3000')
    })
}).catch((error) => {
    console.log(error)
})