const express = require('express')
const mongoose = require('mongoose')
const cookies = require('cookie-parser')
const users = require('./Routes/usersRoute')
const noteRoutes = require('./Routes/router')
require('dotenv').config()
const app = express()

mongoose.connect("mongodb://127.0.0.1:27017/notes", {UseNewUrlParser: true}).then(()=>{
 
    app.use(express.urlencoded({extended:false}))
    app.use(express.json())
    app.use(cookies())
    app.use(users)
    app.use(noteRoutes)
    app.use((error, req, res, next)=>{
        res.status(500).json(error.message)
        next()
    })


app.listen(process.env.PORT, ()=>{
      console.log(`Server Running on port: ${process.env.PORT}`)
})


})


 



