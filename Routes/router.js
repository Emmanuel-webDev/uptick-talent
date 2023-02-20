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
    res.status(200).send(notes)
})

//Get a particular note
app.get('/note/:id', async(req, res)=>{
    const note = await noteDB.findById({_id: req.params.id})

    if(!note){
        res.status(404).send("Note not found")
    }
    res.status(200).send(note)
})

//Update a note
app.put('/update/:id', async(req, res)=>{
    const note = await noteDB.findByIdAndUpdate({_id: req.params.id})
    res.status(200).send("Note updated successfully")
})

app.delete('/delNote/:id', async(req, res)=>{
    await noteDB.findByIdAndDelete({_id: req.params.id})
    res.status(204).send('Deleted')
})

module.exports = app