import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import QuizInstruction from './components/Quiz/QuizInstruction';
import Play from './components/Quiz/Play';
import QuizSummary from './components/Quiz/QuizSummary';

function App() {
 
  return (
    <>

  
      <Routes>
        <Route path='/' exact element={<Home/>} />
        <Route path='/quiz/instructions' exact element={<QuizInstruction/>} />
        <Route path='/quiz/play' exact element={<Play/>} />
        <Route path='/quiz/summary' exact element={<QuizSummary/>} />

      </Routes>
    
    </>
  );
}

export default App;
