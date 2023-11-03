import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';
import M from 'materialize-css';
import questions from '../../questions.json';
import Icon from '@mdi/react';
import { mdiCircleHalfFull } from '@mdi/js';
import correctNotification from '../../assets/audio/src_assets_audio_correct-answer.mp3';
import wrongNotification from '../../assets/audio/src_assets_audio_wrong-answer.mp3';
import buttonSound from '../../assets/audio/src_assets_audio_button-sound.mp3';
import { useNavigate } from 'react-router-dom';

const Play = () => {
    const [state, setState] = useState({});

    const navigate = useNavigate();
    const correctSound = useRef(new Audio(correctNotification));
    const wrongSound = useRef(new Audio(wrongNotification));
    const buttonSoundRef = useRef(new Audio(buttonSound));


    

   
    
    

    const handleQuitButtonClick = () => {
        playButtonSound();
        if (window.confirm('Are you sure you want to quit?')) {
            navigate('/');
        }
    };

   
    const playButtonSound = () => {
        buttonSoundRef.current.play();
    };

   


  
    return (
        <>
            <Helmet>
                <title>Quiz Page</title>
            </Helmet>
            <>
                <div className="questions">
                    <h2>Quiz Mode</h2>
                    <div className="lifeline-container">
                        <p>
                            <span>
                                <Icon   className="lifeline-icon"  path={mdiCircleHalfFull} size={1} />

                                <span className="lifeline"></span>
                            </span>
                        </p>
                        <p>
                            <span
                               
                                className="mdi mdi-lightbulb-on-outline mdi-24px lifeline-icon"
                            >
                                <span className="lifeline"></span>
                            </span>
                        </p>
                    </div>
                    <div className="timer-container">
                        <p>
                            <span className="left" style={{ float: 'left' }}>
                               of 
                            </span>
                            <span>
                               
                                <span className="mdi mdi-clock-outline mdi-24px"></span>
                            </span>
                        </p>
                    </div>
                    <h5></h5>
                    <div className="options-container">
                        <p className="option">
                         
                        </p>
                        <p  className="option">
                            
                        </p>
                    </div>
                    <div className="options-container">
                        <p  className="option">
                            
                        </p>
                        <p  className="option">
                           
                        </p>
                    </div>

                    <div className="button-container">
                        <button id="previous-button">
                            Previous
                        </button>
                        <button id="next-button">
                            Next
                        </button>
                        <button onClick={handleQuitButtonClick} id="quit-button" >
                            Quit
                        </button>
                    </div>
                </div>
            </>
        </>
    );
};

export default Play;
