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

//Get all notes
app.get('/note', async(req, res)=>{
    const notes = await noteDB.find()

    if(!notes){
        res.status(404).send("No notes yet!!")
    }
    res.send(notes)
})

//Get a particular note
app.get('/note/:id', async(req, res)=>{
    const note = await noteDB.findById({_id: req.params.id})

    if(!notes){
        res.status(404).send("Note not found")
    }
    res.send(note)
})

module.exports = app