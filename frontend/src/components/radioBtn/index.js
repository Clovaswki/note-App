import React from 'react'
import Radio from '@material-ui/core/Radio'
import { withStyles } from '@material-ui/core/styles'

//style
import './radio.css'

function radioButtons({selectedValue, setSelectedValue}){

    const CustomRadio = withStyles({
        root: {
            color: '#FFD3CA', 
            '&$ckecked': {color: "#EB8f7A"}
        },
        checked: {},
    })((props) => <Radio color='default' {...props}/>)

    return(
        <div className='radio-options'>
            <div>
                <CustomRadio
                    checked={selectedValue == 'all'}
                    onChange={() => setSelectedValue('all')}
                />
                <span>Todos</span>
            </div>
            <div>
                <CustomRadio
                    checked={selectedValue == 'true'}
                    onChange={() => setSelectedValue('true')}
                    />
                <span>Prioridade</span>
            </div>
            <div>
                <CustomRadio
                    checked={selectedValue == 'false'}
                    onChange={() => setSelectedValue('false')}
                />
                <span>Normal</span>
            </div>
        </div>
    )
}

export default radioButtons