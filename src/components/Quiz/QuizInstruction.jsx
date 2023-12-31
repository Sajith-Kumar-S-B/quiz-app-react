import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import img1 from '../../assets/screenshot1.png';
import imgblack1 from '../../assets/screenshot3.png';
import imgblack2 from '../../assets/screenshot2.png';
import imgblack3 from '../../assets/screenshot11.png';
import imgblack4 from '../../assets/screenshot10.png';

import img2 from '../../assets/screenshot4.png';
import img3 from '../../assets/screenshot7.png';
import img4 from '../../assets/screenshot8.png';


import { mdiLightbulbOn10,mdiHeartHalfFull } from '@mdi/js';
import {mdiBrightness7,mdiBrightness3  } from '@mdi/js';
function QuizInstruction() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleMode = () => {
      setIsDarkMode(!isDarkMode);
    };
  return (
    <>
      <Helmet><title>Quiz Instructions - Quiz App</title></Helmet>
        <div className={`rules ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <div className='mode' onClick={toggleMode} >
                      {isDarkMode ? <i style={{color:'white'}} className="fa-solid fa-sun"></i> :  <i style={{color:'black'}} className="fa-regular fa-moon"></i>}
        
                      </div>
            <div className='instructions container' >
            
                <h1>Instructions for the Quiz</h1>
                <br />
                <p>Please read through this instructions to know about the quiz.</p>
                <ul className="browser-default" id="main-list">
                    <li>The game has a total of 15 questions and ends as soon as your time elapses.</li>
                    <li>Each questions has a duration of 30sec.</li>
                    <li>
                        Every question contains 4 options.
                       {isDarkMode? <img src={imgblack1} alt="Quiz App options example" />:  <img src={img1} alt="Quiz App options example" />}
                    </li>
                    <li>
                        Select the option which best matches the answer by clicking it.
                       {isDarkMode? <img src={imgblack2} alt="Quiz App answer example" /> :  <img src={img2} alt="Quiz App answer example" />}
                    </li>
                    <li>
                        Each game has 2 lifelines namely:
                        <ul id="sublist">
                            <li>2 50-50 chances</li>
                            <li>5 Hints</li>
                        </ul>
                    </li>
                    <li>
                        Selecting a heart-icon lifeline by clicking the icon
                        <span className="lifeline-icon">
                        <Icon path={mdiHeartHalfFull} size={1} />
                        </span>
                        will remove 2 wrong answers, leaving the correct answer and one wrong answer
                      {isDarkMode? <img src={imgblack3} alt="Quiz App Fifty-Fifty example"/> : <img src={img3} alt="Quiz App Fifty-Fifty example"/>}
                    </li>
                    <li>
                        Using a hint by clicking the icon
                        <span className="lifeline-icon">
                        <Icon path={mdiLightbulbOn10} size={1} />
                        </span>
                        will provide a hint message tat the top.There will be total of 5 hints for the entire quiz.
                       
                  {isDarkMode? <img src={imgblack4} alt="Quiz App hints example" /> :  <img src={img4} alt="Quiz App hints example" />}
                    </li>
                    <li>Quit the game at any time. It will lead to the home page.</li>
                    <li>The timer starts as soon as the game loads.</li>
                    <li>If you are ready click continue to begin.</li>
                </ul>
                <div className='decision'>
                    <span className="left"><Link style={{textDecoration:'none',color:'white'}} to="/">Not Ready</Link></span>
                    <span className="right"><Link style={{textDecoration:'none',color:'white'}} to="/quiz/play">Okay, Continue</Link></span>
                </div>
            </div>
        
        </div>
    </>
  )
}

export default QuizInstruction