import React from 'react';
import { useEffect, useState } from 'react';
import './css/App.css';
import Test from './Test'

// import Animate from './Animate'

function App() {


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

        <li className='bullet'>Every cell interacts with its surrounding eight neighbors. Horizontally, Vertically, Diagonally and Adjacent.</li>
        <li className='bullet'>Any live cell with two or three live neighbors survives.</li>
        <li className='bullet'>Any dead cell with three live neighbors becomes a live cell.</li>
        <li className='bullet'>All other live cells die in the next generation. All dead cells stay dead.</li>

      </div>

     {/* END 3 CONTAINER */}
      </div> 

      
    </div>
    
  );
}

export default App;
