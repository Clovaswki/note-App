const express = require('express')
const router = express.Router()

const { createNote, readNote, deleteNote } = require('./controllers/annotationController')//controllers of annotations
const { readPriority, updatePriority } = require('./controllers/priorityController')//controllers of priorities
const { updateNote } = require('./controllers/updateAnnotation')

//routes of annotations
    router.get('/annotations', readNote)
    router.post('/annotations', createNote)
    router.delete('/annotations/:id', deleteNote)
//routes of priority
    router.get('/priorities', readPriority)
    router.post('/priorities/:id', updatePriority)

//route of update of notes
    router.post('/updatenote/:id', updateNote)

module.exports = router