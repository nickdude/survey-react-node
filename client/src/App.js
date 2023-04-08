import React, {useEffect, useState} from 'react';
import './App.css';
import Question from './Components/Question';
import Thanks from './Components/Thanks';
import Welcome from './Components/Welcome';

function App() {

  const [showWelcome, setShowWelcome] = useState(true)  
  let welcome = JSON.parse(localStorage.getItem('welcome'))
 

  useEffect(() => {
    welcome && setShowWelcome(true)

  }, [welcome])
  

  

  
  const startSurvey=()=>{
    setShowWelcome(false)
    localStorage.setItem('welcome','false')
  }
  
  

  return (
   
            <>
            {showWelcome ? <Welcome/> : <Question/>}
            {showWelcome && <div  className='lower-container'>
                        <button className='button' onClick={startSurvey}>Start</button>
                      </div>}
            </>

  );
}

export default App;
