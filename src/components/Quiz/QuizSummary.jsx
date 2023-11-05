import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiCheckCircle,mdiBrightness7,mdiBrightness3  } from '@mdi/js';
import imgCircle from '../../assets/7efs-unscreen.gif';
import Confetti from 'react-confetti';

const QuizSummary = () => {
    const location = useLocation();
    const { state } = location;

    const [isDarkMode, setIsDarkMode] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const toggleMode = () => {
      setIsDarkMode(!isDarkMode);
    };

    const calculateRemark = (score) => {
        if (score === 100) {
            return "You're a genius!";
        } else if (score >= 71) {
            return "You did great!";
        } else if (score >= 50) {
            return "You can do better!";
        } else if (score >= 30) {
            return "Better luck next time!";
        } else {
            return "You need more practice!";
        }
    };

   

    const userScore = state ? (state.numberOfQuestions === 0)
        ? 0 : (state.score / state.numberOfQuestions) * 100 : 0;
    const remark = calculateRemark(userScore);


    useEffect(() => {
        if(userScore>=71){
            setShowConfetti(true)
            setTimeout(() => {
              setShowConfetti(false);
            }, 5000);
        }
    }, [userScore]);

    const stats = state ? (
        <div>
            {showConfetti && <Confetti />}
            <div style={{ textAlign: 'center' }}>
                <span className="success-icon">
               <img width={'200px'}  src={imgCircle} alt="tick" />
                </span>
            </div>
            <h1>Quiz Completed</h1>
            <div className="container stats"> 
                <h3>{remark}</h3>
                <h2>Your Score: {userScore.toFixed(0)}%</h2>
              <div className='statistics'>
                    <span className="stat left">Total number of questions: </span>
                    <span className="right">{state.numberOfQuestions}</span><br />
                   <br />
                    <span className="stat left">Number of attempted questions: </span>
                    <span className="right">{state.correctAnswers + state.wrongAnswers}</span><br />
                    <br />
                    <span className="stat left">Number of Correct Answers: </span>
                    <span className="right">{state.correctAnswers}</span> <br />
                    <br />
                    <span className="stat left">Number of Wrong Answers: </span>
                    <span className="right">{state.wrongAnswers}</span><br />
                    <br />
                    <span className="stat left">Hints Used: </span>
                    <span className="right">{state.hintsUsed}</span><br />
                    <br />
                    <span className="stat left">Lifeline Used: </span>
                    <span className="right">{state.fiftyFiftyUsed}</span>
              </div>
            </div>
            <section>
                <ul>
                    <li>
                        <Link to="/quiz/play">Restart</Link>
                    </li>
                    <li>
                        <Link to="/">Back to Home</Link>
                    </li>
                </ul>
            </section>
        </div>
    ) : (
        <section>
            <h1 className="no-stats">No Statistics Available</h1>
            <ul>
                <li>
                    <Link to="/quiz/play">Take a Quiz</Link>
                </li>
                <li>
                    <Link to="/">Back to Home</Link>
                </li>
            </ul>
        </section>
    );

    return (
        <>
            <Helmet>
                <title>Quiz App - Summary</title>
            </Helmet>
           <div  className={`summary ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
                <div className='mode' onClick={toggleMode} >
                      {isDarkMode ? <i style={{color:'white'}} className="fa-solid fa-sun"></i>:  <i style={{color:'black'}} className="fa-regular fa-moon"></i>}
        
                      </div>
                <div className='quiz-summary'>
               
                    {stats}
                </div>
           </div>
        </>
    );
};

export default QuizSummary;
