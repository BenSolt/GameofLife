import React from 'react';
import { useEffect, useState } from 'react';
import './css/App.css';
// import Test from './Test'

// import Animate from './Animate'

function App() {
  const [date, setDate] = useState(null);
  useEffect(() => {
    async function getDate() {
      const res = await fetch('/api/date');
      const newDate = await res.text();
      setDate(newDate);
    }
    getDate();
  }, []);
  return (
    <div className='mainContainer'>
      <div className="title">
        <h1> Conway's Game of Life</h1>
      </div>
      
      {/* <Test/> */}
      
      {/* <Animate/> */}
      <div className="container">
     
      <div className="boxLeft">
        <h2>Generation: #</h2>
        <div className="imageBox"></div>

        <div className='buttons'>
          <button className='btn'>Play</button>
          <button className='btn'>Pause</button>
          <button className='btn'>Stop</button>
        </div>

      </div>

      <div className='boxMiddle'>
        <button className='btn'>Preset 1</button>
        <button className='btn'>Preset 2</button>
        <button className='btn'>Preset 3</button>
        <button className='btn'>Preset 4</button>
      </div>

      <div className='boxRight'>
        <h3>Rules</h3>

        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
      </div>

     {/* END 3 CONTAINER */}
      </div> 

      
    </div>
    
  );
}

export default App;
