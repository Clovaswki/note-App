import React from "react";
import './styles.css'
import { backgrounds, applyBackground } from "../../helpers/chooseBackground";

const ChooseBackground = ({setActiveChooseBackground, setBackground}) => {

    const changeBackground = (background) => {
        
        applyBackground(background)

        setBackground(background)

    }

    return(
        <div className="cardChooseBackground">
            <div className="headerChooseBackground">
                <img src="/img/chooseBackground.png"/>
                <p>Plano de fundo</p>
                <div className="points">
                    <span style={{backgroundColor: '#d9d9d9'}}></span>
                    <span style={{backgroundColor: '#7d7a7a'}}></span>
                    <span style={{backgroundColor: '#4a4747'}}></span>
                </div>
            </div>
            <div className="lineDivider"></div>
            <div className="bodyChooseBackground">
                {
                    backgrounds.map( (background, index) => (
                        <span key={index} onClick={() => changeBackground(background)}>
                            {
                                background.includes('/')
                                ? <img src={background}/>
                                : <div style={{background}}></div>
                            }
                        </span>
                    ))
                }
            </div>
            <div className="lineDivider"></div>
            <div className="footerChooseBackground">
                <span onClick={() => setActiveChooseBackground(false)}>
                    <img src="/img/back.png"/>
                    <p>Voltar</p>
                </span>
            </div>
        </div>
    )

}

export default ChooseBackground