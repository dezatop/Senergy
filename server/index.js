require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/index')
const cors = require('cors')

const PORT = process.env.PORT || 5000
const app = express()
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))
app.use(express.json());
app.use('/v1', router)


const startApp = async () => {

    try {
        await mongoose.connect(process.env.DB_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        app.listen(PORT,  ()=>console.log('Server has been started on', PORT))
    } catch (err) {
        console.log(err,'Server error')
    }

}

startApp()