import React from 'react'
import './styles.css'

const WithoutNotes = () => {

    return(
        <div className='withoutNotes'>
            <div>
                <span className='icon-withoutNotes'>
                    <img src='/img/noNotes.png'/>
                </span>
                <p>Nenhuma nota encontrada</p>
            </div>
        </div>
    )

}

export default WithoutNotes