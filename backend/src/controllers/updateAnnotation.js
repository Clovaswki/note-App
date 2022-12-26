const Annotations = require('../models/Annotation')

module.exports = {

    async updateNote(req, res){

        let { notes } = req.body
        let { id } = req.params

        try{
            let note = await Annotations.findOne({_id: id})
            if(notes){
                note.notes = notes    
                await note.save()
                return res.json(note)
            }
            return res.status(401).json({error: "erro na operação!"})
        }catch(err){
            console.log(err)
        }

    }

}