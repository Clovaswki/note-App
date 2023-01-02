import React, { useState, useEffect, useRef } from "react"

//styles
import './styles/global.css'
import './styles/sidebar.css'
import './styles/app.css'
import './styles/cardNotes.css'

//Components
import Note from './components/notes/note'
import Radio from './components/radioBtn'
import WithoutNotes from "./components/withoutNotes"

//Api rest instance
import api from './services/api'

//background functions
import { getBackground } from "./helpers/chooseBackground"
import ChooseBackground from "./components/cardChooseBackground"

export default function App() {

    const [selectedValue, setSelectedValue] = useState('all')
    const [title, setTitle] = useState('')
    const [notes, setNote] = useState('')
    const [allNotes, setAllNotes] = useState([])
    const btnSubmit = useRef(null)

    //choose background
    const [background, setBackground] = useState(getBackground())
    const body = document.body

    //active choose background component
    const [activeChooseBackground, setActiveChooseBackground] = useState(false)

    useEffect(() => {
        getAllNotes()
    }, [selectedValue])

    //choosed background
    useEffect(() => {
        body.style.background = background.includes('/')
        ? `url(${background})`
        : background
    }, [background])

    //get all notes of database
    async function getAllNotes() {
        try {
            const response = await api.get('/annotations', {})
            setAllNotes(response.data.filter(note => {
                if (selectedValue == 'true') {
                    return note.priority == true
                } else if (selectedValue == 'false') {
                    return note.priority == false
                } else {
                    return note
                }
            }))
        } catch (error) {
            console.log(JSON.stringify(error))
        }

    }

    //post of a new note
    async function handleSubmit(event) {
        event.preventDefault()

        const response = await api.post('/annotations', {
            title,
            notes,
            priority: false
        })

        setTitle('')
        setNote('')

        setAllNotes([...allNotes, response.data])

    }

    //effect active button send note
    useEffect(() => {
        function enableBtnSubmit() {
            var btn = btnSubmit.current
            
            if(btn) btn.style.background = '#ffd3ca'

            if (title && notes) {
                btn.style.background = '#eb8f7a'
            }
        }
        enableBtnSubmit()
    }, [title, notes])

    return (
        <div className="App">
            <aside>
                {
                    activeChooseBackground ?
                        <ChooseBackground 
                            setActiveChooseBackground={setActiveChooseBackground}
                            setBackground={setBackground}
                        />
                        :
                        <>
                            <strong>My notes</strong>
                            <span id="btnChooseBackground" onClick={() => setActiveChooseBackground(true)}>
                                <img src="/img/chooseBackground.png" />
                            </span>
                            <form onSubmit={handleSubmit}>

                                <div className="input-block">
                                    <label htmlFor="title">Título da anotação</label>
                                    <input
                                        value={title}
                                        onChange={event => setTitle(event.target.value)}
                                    />
                                </div>
                                <div className="input-block">
                                    <label htmlFor="content">Anotações</label>
                                    <textarea
                                        value={notes}
                                        onChange={event => setNote(event.target.value)}
                                    />
                                </div>
                                <div className="input-block">
                                    <button ref={btnSubmit} type="submit">Salvar</button>
                                </div>

                            </form>
                            <div>
                                <Radio selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
                            </div>
                        </>
                }
            </aside>
            <main>

                {
                    allNotes.length == 0
                        ?
                        <WithoutNotes />
                        :
                        <ul>
                            {
                                allNotes.map(note => (
                                    <Note key={note._id} note={note} setAllNotes={setAllNotes} allNotes={allNotes} />
                                ))
                            }
                        </ul>

                }

            </main>
        </div>
    )

}