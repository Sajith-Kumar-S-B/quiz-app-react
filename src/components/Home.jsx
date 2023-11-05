import React from 'react'
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiBalloon } from '@mdi/js';
function Home() {
  return (
    <>

<Helmet><title>Home - Quiz App</title></Helmet>
        <div id="home">
            <section>
                <div className='cube' style={{ textAlign: 'center',color:'white' }}>
                <Icon path={mdiBalloon} size={2} />
                </div>
                <h1>ReactJS Quiz</h1>
                <div className="play-button-container">
                  
                        <Link className="play-button" to="/quiz/instructions">Start Quiz</Link>
                  
                </div>
               
            </section>
        </div>
    </>
  )
}

export default Home