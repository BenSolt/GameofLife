import React, { Component } from 'react';
import './css/App.css';
import Game from './Gamelife';

class App extends Component {

    render() {

        return (
            <div className="App">
              <div className="title">
              <h1>Conway's Game of Life</h1>
              </div>
                <Game/>
            </div>
        );
    }
}

export default App;