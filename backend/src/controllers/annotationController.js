const mongoose = require('mongoose')
const Annotations = require('../models/Annotation')

module.exports = {

    async readNote(req, res){
        try{
            let note = await Annotations.find().exec() 
            res.json(note)
        }catch(err){
            console.log(err)
        }
    },
    async createNote(req, res){
        let { title, notes, priority } = req.body
        
        let error = []
        if(!title || typeof title == undefined || title == null){
            error.push({err: "título inválido!"})
        }
        if(!notes || typeof notes == undefined || notes == null){
            error.push({err: "notes inválido!"})
        }
        if(typeof priority == undefined || priority == null){
            error.push({err: "priority inválida!"}) 
        }
        if(error.length > 0){
            return res.status(400).json(error)
        }else{
            try{
                let newNote = await Annotations.create({
                    title,
                    notes,
                    priority
                })      
                console.log('note created')//debbuger
                res.status(200).json(newNote)
            }catch(err){
                console.log(err)
                res.status(400)
            }
            //res.status(200).json(noteCreated)
        }
    },
    async deleteNote(req, res){
        try{
            let {id} = req.params
            let note = await Annotations.findOneAndDelete({_id: id}).exec()
            if(note){
                return res.status(200).json(note)
            }
            return res.status(401).json({error: ""})
        }catch(err){
            console.log(`Erro ao deletar registro: ${err}`)
           return res.status(400) 
        }
        
    }

}