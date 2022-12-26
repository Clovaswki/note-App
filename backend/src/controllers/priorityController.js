const Annotations = require('../models/Annotation')

module.exports = {

    async readPriority(req, res){
        const priority = req.query
        try{
            const priorityNote = await Annotations.find(priority).exec()
            if(priorityNote.length > 0){
                return res.json(priorityNote)
            }
        }catch(err){
            return res.status(401).json({error: err})
        }
    },
    async updatePriority(req, res){
        let { id } = req.params

        try{
            const note = await Annotations.findOne({_id: id}).exec()
            if(note.priority){
                note.priority = false
            }else{
                note.priority = true
            }

            await note.save()

            return res.json(note)
            
        }catch(err){
            console.log(err)
        }
    }

    //CONTINUES

}