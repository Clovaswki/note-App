import React, { useState } from 'react'
import { AiFillDelete, AiFillInfoCircle } from 'react-icons/ai'

import api from '../../services/api'

import './normalNote.css'
import './priorityNote.css'

//styles function
import { styles } from '../../helpers/styles'

export default function Note({note, setAllNotes, allNotes}) {

    //priority of note: true or false
    const [ priority, setPriority] = useState(note.priority)

    //change note
    const [ changedNote, setChangedNote ] = useState('')

    //send changes on the note to database
    async function handleNote(e){

        styles(e, {
            'cursor': 'default',
            'border': '0',
            'border-radius': '0',
            'box-shadow': 'none'    
        })

        if(changedNote && changedNote != note.notes){
        
          await api.post(`/updatenote/${note._id}`, {
              notes: changedNote
          })  
          
        }

    }

    //change styles on the edit mode
    function handleEdit(e, priority){

        styles(e, {
            'cursor': 'text',
            'border': '3px',
            'border-radius': '5px',
            'box-shadow': `0 0 5px ${priority?"white":"gray"}` 
        })

    }

    //change priority property of note
    async function handlePriority(event){
        
        const response = await api.post(`/priorities/${note._id}`)
        
        var res = response.data

        setPriority(res.priority)
        
    }

    //delete note on the database
    async function deleteNote(){
        
        const data = await api.delete(`/annotations/${note._id}`)

        if(data){
            setAllNotes(allNotes.filter( Note => Note._id != note._id ))
        }

    }

    return (
        <React.Fragment>
            <li className={priority?"notepad-infos-p":"notepad-infos"}>
                <div>
                    <strong>{note.title}</strong>
                    <div>
                        <span onClick={deleteNote}>
                            <AiFillDelete size={20}/>
                        </span>
                    </div>
                </div>
                <textarea 
                    defaultValue={note.notes}
                    onChange={event => setChangedNote(event.target.value)}
                    onClick={event => handleEdit(event.target, note.priority)}
                    onBlur={event => handleNote(event.target)}
                    className={priority ? 'scrollNotes-p' : 'scrollNotes'}
                />
                <span onClick={handlePriority}>
                    <AiFillInfoCircle size={20}/>
                </span>
            </li>
        </React.Fragment>
    )
}