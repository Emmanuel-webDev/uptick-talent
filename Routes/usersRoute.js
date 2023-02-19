const express = require('express')
const bcrypt = require('bcryptjs')
const cookie = require('cookie-parser')
const user = require('../model/auth')
const app = express()

//signup 
app.post('/signup', async (req, res)=>{
const db = await user.find() 

const {name, email, password} = req.body

if(db.email === email){
    return res.status(403).send("This email is already registered")
}

const hashed = await bcrypt.hash(password, 12)
req.body.password = hashed

const signUsers = new user({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
})

await signUsers.save()

res.status(201).send('New user created')

})

//login
app.post('/login', async (req, res)=>{
const {email, password} = req.body 

    const userExist = await user.findOne({email: req.body.email})
    if(!userExist){
       res.status(403).send("User with this email not found")
    }
 
    const check = await bcrypt.compare(password, userExist.password)
    if(!check){
        res.status(403).send("Incorrect user password")
    }

    res.status(200).send('Login Successful!!')

})

module.exports = app