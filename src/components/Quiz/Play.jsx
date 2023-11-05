import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';
import M from 'materialize-css';
import questions from '../../questions.json';
import isEmpty from '../../utils/is-empty';
import Icon from '@mdi/react';
import { mdiLightbulbOn10 } from '@mdi/js';
import { mdiClockOutline } from '@mdi/js';
import { mdiHeartHalfFull,mdiBrightness7,mdiBrightness3  } from '@mdi/js';
import correctNotification from '../../assets/audio/src_assets_audio_correct-answer.mp3';
import wrongNotification from '../../assets/audio/src_assets_audio_wrong-answer.mp3';
import buttonSound from '../../assets/audio/src_assets_audio_button-sound.mp3';
import { useNavigate } from 'react-router-dom';

const Play = (props) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isOptionSelected, setIsOptionSelected] = useState(false);
   
    const [state, setState] = useState({
        questions,
        currentQuestion: {},
        nextQuestion: {},
        previousQuestion: {},
        answer: '',
        numberOfQuestions: 0,
        currentQuestionIndex: 0,
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        hints: 5,
        fiftyFifty: 2,
        usedFiftyFifty: false,
        nextButtonDisabled: false,
        previousButtonDisabled: true,
        previousRandomNumbers: [],
        time: {
            minutes: 1,
            seconds: 0,
        }
    });
    const timerInterval = useRef(null); 
    const navigate = useNavigate();
    const correctSound = useRef(new Audio(correctNotification));
    const wrongSound = useRef(new Audio(wrongNotification));
    const buttonSoundRef = useRef(new Audio(buttonSound));

    let interval;

    useEffect(() => {
        const { questions } = state;

        if (!isEmpty(questions)) {
            const currentQuestion = questions[0];
            const nextQuestion = questions[1];
            setState((prevState) => ({
                ...prevState,
                currentQuestion,
                nextQuestion,
                numberOfQuestions: questions.length,
                answer: currentQuestion.answer,
            }));
            showOptions();
            handleDisableButton();
            startTimer();
        }

        return () => {
            clearInterval(timerInterval.current);
        };
    }, []);

    const toggleMode = () => {
        setIsDarkMode(!isDarkMode);
      };
    const clearCorrectOptionClass = () => {
        const options = document.querySelectorAll('.option');
        options.forEach((option) => {
          option.classList.remove('correct-option');
          option.classList.remove('wrong-option');

        });
      };
      


      const handleNextButtonClick = () => {
        playButtonSound();
        clearCorrectOptionClass();
        setIsOptionSelected(false); 
        clearInterval(timerInterval.current);
    
        if (state.currentQuestionIndex + 1 < state.numberOfQuestions) {
            const currentQuestionIndex = state.currentQuestionIndex + 1;
            const nextQuestionIndex = currentQuestionIndex + 1;
    
            // Update the currentQuestion and nextQuestion using the index
            const currentQuestion = state.questions[currentQuestionIndex];
            const nextQuestion = state.questions[nextQuestionIndex];
    
            setState((prevState) => ({
                ...prevState,
                currentQuestion,
                nextQuestion,
                answer: currentQuestion.answer, // Update the answer for the new currentQuestion
                currentQuestionIndex,
            }));
    
            showOptions();
            handleDisableButton();
            startTimer();
        } else {
            // It's the last question, so end the game and display a message
            endGame();
        }
    };
    
    
    

    // const handlePreviousButtonClick = () => {
    //     playButtonSound();
    //     if (state.currentQuestionIndex > 0) {
    //         const currentQuestionIndex = state.currentQuestionIndex - 1;
    //         const previousQuestionIndex = currentQuestionIndex - 1;
    //         setState((prevState) => ({
    //             ...prevState,
    //             currentQuestion: prevState.questions[currentQuestionIndex],
    //             previousQuestion: prevState.questions[previousQuestionIndex],
    //             currentQuestionIndex,
    //         }));
    //         showOptions();
    //         handleDisableButton();
    //         startTimer();
    //     }
    // };


    const handleOptionClick = (e) => {
        if (!isOptionSelected) {
            setIsOptionSelected(true);
    
            if (e.target.innerHTML.toLowerCase() === state.answer.toLowerCase()) {
                correctSound.current.play();
                correctAnswer();
                e.target.classList.add('correct-option');
            } else {
                wrongSound.current.play();
                wrongAnswer();
                e.target.classList.add('wrong-option');
            }
        }
    };
    

    const handleHints = () => {
        if (state.hints > 0) {
            const currentQuestion = state.currentQuestion;
            // Display a hint message
            M.toast({
                html:  currentQuestion.hintsMessage,
                classes: 'toast-hint',
                displayLength: 1500,
            });
    
            // Decrease the available hints by 1
            setState((prevState) => ({
                ...prevState,
                hints: prevState.hints - 1,
            }));
        }
    };
    

    const handleFiftyFifty = () => {
        if (state.fiftyFifty > 0 && !state.usedFiftyFifty) {
            const options = document.querySelectorAll('.option');
            const answer = state.answer.toLowerCase();
    
            let wrongAnswers = Array.from(options).filter(option => option.innerHTML.toLowerCase() !== answer);
    
            // Shuffle and hide two wrong answers
            shuffleArray(wrongAnswers);
            wrongAnswers = wrongAnswers.slice(0, 2);
    
            options.forEach(option => {
                if (wrongAnswers.includes(option)) {
                    option.style.visibility = 'hidden';
                }
            });
    
            setState((prevState) => ({
                ...prevState,
                fiftyFifty: prevState.fiftyFifty - 1,
                usedFiftyFifty: true,
            }));
        }
    };
    
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }


    const showOptions = () => {
        const options = Array.from(document.querySelectorAll('.option'));
        options.forEach((option) => {
            option.style.visibility = 'visible';
        });

        setState((prevState) => ({
            ...prevState,
            usedFiftyFifty: false,
        }));
    };

    const handleButtonClick = (e) => {
        switch (e.target.id) {
            case 'next-button':
                handleNextButtonClick();
                break;

            // case 'previous-button':
            //     handlePreviousButtonClick();
            //     break;

            case 'quit-button':
                handleQuitButtonClick();
                break;

            default:
                break;
        }
    };

    const playButtonSound = () => {
        buttonSoundRef.current.play();
    };

    const correctAnswer = () => {
        M.toast({
            html: 'Correct Answer!',
            classes: 'toast-valid',
            displayLength: 1500,
        });
        setState((prevState) => ({
            ...prevState,
            score: prevState.score + 1,
            correctAnswers: prevState.correctAnswers + 1,
        }));

        setTimeout(()=>{
            handleNextButtonClick();
          },2000)
      
    };

    const wrongAnswer = () => {
        navigator.vibrate(1000);
        M.toast({
            html: 'Wrong Answer!',
            classes: 'toast-invalid',
            displayLength: 1500,
        });
        setState((prevState) => ({
            ...prevState,
            score: prevState.score + 1,
            wrongAnswers: prevState.wrongAnswers + 1,
        }));
      setTimeout(()=>{
        handleNextButtonClick();
      },3000)
    };

    const handleQuitButtonClick = () => {
        playButtonSound();
        if (window.confirm('Are you sure you want to quit?')) {
            navigate('/');
        }
    };
    const startTimer = () => {

        clearInterval(timerInterval.current);
        const countDownTime = Date.now() + 60000;
        const timelineElement = document.querySelector('.timeline'); // Select the timeline element
    
        timerInterval.current = setInterval(() => {
            const now = new Date();
            const distance = countDownTime - now;
    
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
            if (distance < 0) {
                clearInterval(interval);
                setState((prevState) => ({
                    ...prevState,
                    time: {
                        minutes: 0,
                        seconds: 0,
                    },
                }));
                alert('Quiz has ended!');
                navigate('/quiz/summary', {
                    state: {
                        score: state.score,
                        numberOfQuestions: state.numberOfQuestions,
                        correctAnswers: state.correctAnswers,
                        wrongAnswers: state.wrongAnswers,
                        fiftyFiftyUsed: 2 - state.fiftyFifty,
                        hintsUsed: 5 - state.hints,
                    },
                });
            } else {
                setState((prevState) => ({
                    ...prevState,
                    time: {
                        minutes,
                        seconds,
                    },
                }));
                // Calculate the timeline width based on time remaining
                const totalMinutes = 1; // Total time in minutes (adjust as needed)
                const remainingTime = totalMinutes - (minutes + seconds / 60); // Convert seconds to fraction of a minute
                const percentage = (remainingTime / totalMinutes) * 100;
    
                // Update the width of the timeline element
                timelineElement.style.width = `${percentage}%`;
            }
        }, 1000);
    };
    
    
    
    
    

    const handleDisableButton = () => {
        setState((prevState) => ({
            ...prevState,
            previousButtonDisabled: prevState.currentQuestionIndex === 0,
            nextButtonDisabled: prevState.currentQuestionIndex === prevState.numberOfQuestions - 1,
        }));
    };




    const endGame = () => {
        M.toast({
            html: 'Quiz has ended!',
            classes: 'toast-valid',
            displayLength: 1500,
        });
    
        setTimeout(() => {
            navigate('/quiz/summary', {
                state: {
                    score: state.score,
                    numberOfQuestions: state.numberOfQuestions,
                    correctAnswers: state.correctAnswers,
                    wrongAnswers: state.wrongAnswers,
                    fiftyFiftyUsed: 2 - state.fiftyFifty,
                    hintsUsed: 5 - state.hints,
                },
            });
        }, 1000); // Change the delay as needed
    };
    




    const {
        currentQuestion,
        currentQuestionIndex,
        fiftyFifty,
        hints,
        time,
    } = state;

    return (
        <>
            <Helmet>
                <title>Quiz Page</title>
            </Helmet>
             <div className={`quiz-div ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
                  <div className='mode' onClick={toggleMode} >
                  {isDarkMode ? <Icon path={mdiBrightness7} size={1} style={{color:'white'}} /> :  <Icon path={mdiBrightness3} size={1} style={{color:'black'}} />}
    
                  </div>
                        <div className="questions" id="questions-container" >
                        <div className="timeline"></div>
                            <h2>React Quiz</h2>
                            <div className="lifeline-container">
                                <p>
                                    <span onClick={handleFiftyFifty} className="lifeline-icon">
                                    <Icon path={mdiHeartHalfFull} size={1} />
                                        <span className="lifeline">{state.fiftyFifty}</span>
                                    </span>
                                </p>
                                <p>
                                    <span onClick={handleHints} className="lifeline-icon">
                                    <Icon path={mdiLightbulbOn10} size={1} />
                                        <span className="lifeline">{hints}</span>
                                    </span>
                                </p>
                            </div>
                            <div className="timer-container">
                                <p>
                                    <span className="left" style={{ float: 'left' }}>
                                        {currentQuestionIndex + 1} of {state.numberOfQuestions}
                                    </span>
                                    </p>
                                   <p>
                                        <span
                                            className={classnames('right valid', {
                                                warning: time.minutes <= 1,
                                                invalid: time.minutes === 0 && time.seconds < 30,
                                            })}
                                        >
                                            {time.minutes}:{time.seconds}
                                            <Icon path={mdiClockOutline} size={1} />
                                        </span>
                                   </p>
                               
                            </div>
                            <h5>{currentQuestion.question}</h5>
                            <div className="options-container">
                                <p onClick={handleOptionClick} className="option">
                                    {currentQuestion.optionA}
                                </p>
                                <p onClick={handleOptionClick} className="option">
                                    {currentQuestion.optionB}
                                </p>
                            </div>
                            <div className="options-container">
                                <p onClick={handleOptionClick} className="option">
                                    {currentQuestion.optionC}
                                </p>
                                <p onClick={handleOptionClick} className="option">
                                    {currentQuestion.optionD}
                                </p>
                            </div>
                            
            
                            <div className="button-container">
                                {/* <button className={classnames('', { disable: state.previousButtonDisabled })} id="previous-button" onClick={handleButtonClick}>
                                    Previous
                                </button> */}
                             
                                {state.currentQuestionIndex + 1 < state.numberOfQuestions ? (
                    <button className={classnames('', { disable: state.nextButtonDisabled })} id="next-button" onClick={handleButtonClick}>
                        Next
                    </button>
                ) : (
                    <button id="end-button" onClick={endGame}>
                        End
                    </button>
                )}
                                <button id="quit-button" onClick={handleButtonClick}>
                                    Quit
                                </button>
                            </div>
                        </div>
             </div>
              
          
        </>
    );
};

export default Play;
