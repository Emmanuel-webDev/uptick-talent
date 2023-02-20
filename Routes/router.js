const express = require('express')
const noteDB = require('../model/notesModel')
const app = express()

//new note
app.post('/createNote', async(req, res)=>{
   const note = new noteDB({
       title: req.body.title,
       text: req.body.text
   })
   await note.save()
   res.status(201).send('Note created successfully')
})

module.exports = app