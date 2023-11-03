import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';

const QuizSummary = () => {
    const location = useLocation();
    const { state } = location;

    const calculateRemark = (score) => {
        if (score <= 30) {
            return 'You need more practice!';
        } else if (score > 30 && score <= 50) {
            return 'Better luck next time!';
        } else if (score <= 70 && score > 50) {
            return 'You can do better!';
        } else if (score >= 71 && score <= 84) {
            return 'You did great!';
        } else {
            return 'You\'re an absolute genius!';
        }
    };

    useEffect(() => {
        // You can perform any side effects here if needed.
    }, []);

    const userScore = state ? (state.score / state.numberOfQuestions) * 100 : 0;
    const remark = calculateRemark(userScore);

    const stats = state ? (
        <div>
            <div style={{ textAlign: 'center' }}>
                <span className="mdi mdi-check-circle-outline success-icon"></span>
            </div>
            <h1>Quiz has ended</h1>
            <div className="container stats">
                <h4>{remark}</h4>
                <h2>Your Score: {userScore.toFixed(0)}%</h2>
                <span className="stat left">Total number of questions: </span>
                <span className="right">{state.numberOfQuestions}</span><br />

                <span className="stat left">Number of attempted questions: </span>
                <span className="right">{state.numberOfAnsweredQuestions}</span><br />

                <span className="stat left">Number of Correct Answers: </span>
                <span className="right">{state.correctAnswers}</span> <br />

                <span className="stat left">Number of Wrong Answers: </span>
                <span className="right">{state.wrongAnswers}</span><br />

                <span className="stat left">Hints Used: </span>
                <span className="right">{state.hintsUsed}</span><br />

                <span className="stat left">50-50 Used: </span>
                <span className="right">{state.fiftyFiftyUsed}</span>
            </div>
            <section>
                <ul>
                    <li>
                        <Link to="/quiz/play">Play Again</Link>
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
            <div className="quiz-summary">
                {stats}
            </div>
        </>
    );
};

export default QuizSummary;
