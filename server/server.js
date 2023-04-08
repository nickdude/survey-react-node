const express =require('express')
const app =express()
const cors = require("cors")
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()

const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))



const userSurvey = require('./routes/api')

const mongoURL = process.env.DATABASE

mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false
})

app.use(bodyParser.json())

app.use('/api',userSurvey)

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
})