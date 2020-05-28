import React from 'react';
import './css/gamelife.css';


const Pixel_Size = 20;
const Width1 = 800;
const Height1 = 600;

const Width2 = 600;
const Height2 = 450;

const Width3 = 400;
const Height3 = 300;

const Slider = ({ speed, onSpeedChange }) => {
    const handleChange = e => onSpeedChange(e.target.value);

    return (
        <input
            type='range'
            min='10'
            max='1000'
            step='10'
            value={speed}
            onChange={handleChange}
        />
    );
};



class Pixel extends React.Component {

    render() {
        const { x, y } = this.props;
        return (
            <div className="Pixel" style={{
                left: `${Pixel_Size * x + 1}px`,
                top: `${Pixel_Size * y + 1}px`,
                width: `${Pixel_Size - 1}px`,
                height: `${Pixel_Size - 1}px`,
            }} />
        );
    }
}




class Game extends React.Component {

    constructor() {
        super();
        // BIG
        this.rows1 = Height1 / Pixel_Size;
        this.cols1 = Width1 / Pixel_Size;
        // MEDIUM
        this.rows2 = Height2 / Pixel_Size;
        this.cols2 = Width2 / Pixel_Size;
        // SMALL
        this.rows3 = Height3 / Pixel_Size;
        this.cols3 = Width3 / Pixel_Size;

        this.board = this.EmptyBoard();
        
    }

    state = {
        pixels: [],
        isRunning: false,
        interval: 100,
        generation: 0,
    }

    EmptyBoard() {
        let board = [];
        for (let y = 0; y < this.rows1; y++) {
            board[y] = [];
            for (let x = 0; x < this.cols1; x++) {
                board[y][x] = false;
            }
        }

        for (let y = 0; y < this.rows2; y++) {
            board[y] = [];
            for (let x = 0; x < this.cols2; x++) {
                board[y][x] = false;
            }
        }

        for (let y = 0; y < this.rows3; y++) {
            board[y] = [];
            for (let x = 0; x < this.cols3; x++) {
                board[y][x] = false;
            }
        }
        return board;
    }

    getElementOffset() {
        const rect = this.boardRef.getBoundingClientRect();
        const doc = document.documentElement;

        return {
            x: (rect.left + window.pageXOffset) - doc.clientLeft,
            y: (rect.top + window.pageYOffset) - doc.clientTop,
        };
    }

// BIG
    makePixels() {
        let pixels = [];
        for (let y = 0; y < this.rows1; y++) {
            for (let x = 0; x < this.cols1; x++) {
                if (this.board[y][x]) {
                    pixels.push({ x, y });
                }
            }
        }
        return pixels;
    }
    
// MEDIUM
    makePixels2() {
        let pixels = [];
        for (let y = 0; y < this.rows2; y++) {
            for (let x = 0; x < this.cols2; x++) {
                if (this.board[y][x]) {
                    pixels.push({ x, y });
                }
            }
        }
        return pixels;
    }

// SMALL
    makePixels3() {
        let pixels = [];
        for (let y = 0; y < this.rows3; y++) {
            for (let x = 0; x < this.cols3; x++) {
                if (this.board[y][x]) {
                    pixels.push({ x, y });
                }
            }
        }
        return pixels;
       
    }

	handleSpeedChange = newSpeed => {
		this.setState({ interval: newSpeed });
	}

    handleClick = (event) => {

        const elemOffset = this.getElementOffset();
        const offsetX = event.clientX - elemOffset.x;
        const offsetY = event.clientY - elemOffset.y;
        
        const x = Math.floor(offsetX / Pixel_Size);
        const y = Math.floor(offsetY / Pixel_Size);

        if (x >= 0 && x <= this.cols1 && y >= 0 && y <= this.rows1) {
            this.board[y][x] = !this.board[y][x];
        }

        this.setState({ pixels: this.makePixels() });
        
    }

    gen = () => { 
        this.setState(prevState => ({
            generation: prevState.generation + 1  
        }));         
    }
  

    startGame = () => {
        this.setState({ isRunning: true });
        if(document.getElementById('G3').style.display === "block"){
                this.runIteration3();  
        }else if (document.getElementById('G2').style.display === "block"){
             this.runIteration2();
        }else{
            this.runIteration1();
        }   
    }




    stopGame = () => {
        this.setState({ isRunning: false,
        generation: 0
        });
        
        if (this.timeoutHandler) {
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null;
            
        }
    }

    



//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

// BIG
    runIteration1() {
        let newBoard = this.EmptyBoard();

        for (let y = 0; y < this.rows1; y++) {
            for (let x = 0; x < this.cols1; x++) {
                let neighbors = this.calculateNeighbors(this.board, x, y);
                if (this.board[y][x]) {
                    if (neighbors === 2 || neighbors === 3) {
                        newBoard[y][x] = true;
                    } else {
                        newBoard[y][x] = false;
                    }
                } else {
                    if (!this.board[y][x] && neighbors === 3) {
                        newBoard[y][x] = true;
                    }
                }
            }
        }

        this.board = newBoard;
        this.setState({ pixels: this.makePixels() });
        this.setState(prevState => ({
            generation: prevState.generation + 1  
        }));  

        this.timeoutHandler = window.setTimeout(() => {
            this.runIteration1();
        }, this.state.interval);
    }

// MEDIUM
    runIteration2() {
        let newBoard = this.EmptyBoard();

        for (let y = 0; y < this.rows2; y++) {
            for (let x = 0; x < this.cols2; x++) {
                let neighbors = this.calculateNeighbors(this.board, x, y);
                if (this.board[y][x]) {
                    if (neighbors === 2 || neighbors === 3) {
                        newBoard[y][x] = true;
                    } else {
                        newBoard[y][x] = false;
                    }
                } else {
                    if (!this.board[y][x] && neighbors === 3) {
                        newBoard[y][x] = true;
                    }
                }
            }
        }

        this.board = newBoard;
        this.setState({ pixels: this.makePixels() });
        this.setState(prevState => ({
            generation: prevState.generation + 1  
        }));  

        this.timeoutHandler = window.setTimeout(() => {
            this.runIteration2();
        }, this.state.interval);
    }

// SMALL
    runIteration3() {
        let newBoard = this.EmptyBoard();

        for (let y = 0; y < this.rows3; y++) {
            for (let x = 0; x < this.cols3; x++) {
                let neighbors = this.calculateNeighbors(this.board, x, y);
                if (this.board[y][x]) {
                    if (neighbors === 2 || neighbors === 3) {
                        newBoard[y][x] = true;
                    } else {
                        newBoard[y][x] = false;
                    }
                } else {
                    if (!this.board[y][x] && neighbors === 3) {
                        newBoard[y][x] = true;
                    }
                }
            }
        }

        this.board = newBoard;
        this.setState({ pixels: this.makePixels(),
         });
         this.setState(prevState => ({
            generation: prevState.generation + 1  
        }));  

        this.timeoutHandler = window.setTimeout(() => {
            this.runIteration3();
        }, this.state.interval);
    }
    

    calculateNeighbors(board, x, y) {
        let neighbors = 0;
        const directs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
        for (let i = 0; i < directs.length; i++) {
            const direct = directs[i];
            let y1 = y + direct[0];
            let x1 = x + direct[1];

            if (x1 >= 0 && x1 < this.cols1 && y1 >= 0 && y1 < this.rows1 && board[y1][x1]) {
                neighbors++;
            }
        }
        return neighbors;
    }




    
    handleIntervalChange = (event) => {
        this.setState({ interval: event.target.value });
    }

    handleClear = () => {
        this.board = this.EmptyBoard();
        this.setState({pixels: this.makePixels()})
        this.setState({ pixels: this.makePixels2()}) 
        this.setState({ pixels: this.makePixels3()})
        this.setState({generation: 0})
           
    }

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////   
//////////////////////////////////////////////////////////////////////////////////////////////

// GAME BOARD BIG
    handleRandom1 = () => {
        for (let y = 0; y < this.rows1; y++) {
            for (let x = 0; x < this.cols1; x++) {
                this.board[y][x] = (Math.random() >= 0.5);
            }
        }

        this.setState({ pixels: this.makePixels(),
          
        });
       
        document.getElementById('G1').style.display = "block"
        document.getElementById('G2').style.display = "none"
        document.getElementById('G3').style.display = "none"
        
        
    }

    // GAME BOARD MEDIUM
    handleRandom2 = () => {
        for (let y = 0; y < this.rows2; y++) {
            for (let x = 0; x < this.cols2; x++) {
                this.board[y][x] = (Math.random() >= 0.5);
            }
        }

        this.setState({ pixels: this.makePixels2() });
        this.setState({num2: true})

        document.getElementById('G2').style.display = "block"
        document.getElementById('G1').style.display = "none"
        document.getElementById('G3').style.display = "none"
    }

    // GAME BOARD SMALL
    handleRandom3 = () => {
        for (let y = 0; y < this.rows3; y++) {
            for (let x = 0; x < this.cols3; x++) {
                this.board[y][x] = (Math.random() >= 0.5);
            }
        }

        this.setState({ pixels: this.makePixels3() });
        // alert("button was clicked");
        // this.setState({num3: true})
        
        document.getElementById('G3').style.display = "block"
        document.getElementById('G2').style.display = "none"
        document.getElementById('G1').style.display = "none"
    }





    render() {
        const { pixels, interval, isRunning } = this.state;
        return (
            <div>
                <div className="container">

                    <div id='G1' className="Gameboard1"
                        style={{ width: Width1, height: Height1, backgroundSize: `${Pixel_Size}px ${Pixel_Size}px`}}
                        
                        onClick={this.handleClick}
                        ref={(a) => { this.boardRef = a; }}>
                        
                        {pixels.map(p => (
                            <Pixel x={p.x} y={p.y} key={`${p.x},${p.y}`}/>
                        ))}
                    </div>

                    <div id='G2' className="Gameboard1"
                        style={{ width: Width2, height: Height2, backgroundSize: `${Pixel_Size}px ${Pixel_Size}px`}}
                        
                        onClick={this.handleClick}
                        ref={(a) => { this.boardRef = a; }}>

                        {pixels.map(p => (
                            <Pixel x={p.x} y={p.y} key={`${p.x},${p.y}`}/>
                        ))}
                    </div>

                    <div id='G3' className="Gameboard1"
                        style={{ width: Width3, height: Height3, backgroundSize: `${Pixel_Size}px ${Pixel_Size}px`}}
                        
                        onClick={this.handleClick}
                        ref={(a) => { this.boardRef = a; }}>

                        {pixels.map(p => (
                            <Pixel x={p.x} y={p.y} key={`${p.x},${p.y}`}/>
                        ))}
                    </div>
                
                    <div className="btnContainer">
                        {/* BOARD SIZE */}
                        <button className="btn" id="small" onClick={this.handleRandom3}>Small</button>
                        <button className="btn" id="med" onClick={this.handleRandom2}>Medium</button>
                        <button className="btn" id="big" onClick={this.handleRandom1}>Big</button>

                        {/* <button className="btn" onClick={this.gen}>Step</button> */}
                    </div>

                {/* TEXT RULES and ABOUT */}
                    <div className='boxRight'>
                        <h3>RULES:</h3>
                        <div className='boxRightText'>
                            <li className='bullet'>Every cell interacts with its surrounding eight neighbors.
                            Horizontally, Vertically, Diagonally and Adjacent.</li>
                            <li className='bullet'>Any live cell with two or three live neighbors survives.</li>
                            <li className='bullet'>Any dead cell with three live neighbors becomes a live cell.</li>
                            <li className='bullet'>All other live cells die in the next generation. All dead cells stay dead.</li>
                        </div>

                        <h3>ABOUT:</h3>
                        <div className='boxRightText'>
                        <p className='bullet'>
                            <a className="link" href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Conway's Game of Life </a>
                           
                            is a cellular automaton created by the British mathematician John Horton Conway in 1970. (26 December 1937 – 11 April 2020) Died of complications 
                            from COVID-19</p>
                         
                        </div>
                    </div>
                </div>

                <div className="navbarHolder">
                    <div>
                        <p>Generation: {this.state.generation}</p>
                        
                    <span className="slider">
						{'- '}
						<Slider speed={interval} onSpeedChange={this.handleSpeedChange} />
						{' +'}
					</span>
                        {/* Update every <input value={this.state.interval} onChange={this.handleIntervalChange} /> msec */}
                        {isRunning ?
                            <button className="btn2" onClick={this.stopGame}>Stop</button> :
                            <button className="btn2" onClick={this.startGame}>Run</button>
                        }
                        {/* <button className="btn" onClick={this.handleRandom}>Random</button> */}
                        <button className="btn2" onClick={this.handleClear}>Clear</button>

                        
                    </div>
                </div>
            </div>
        );
    }
}


export default Game;