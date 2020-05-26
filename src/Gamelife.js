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
            min='50'
            max='1000'
            step='50'
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
        this.rows1 = Height1 / Pixel_Size;
        this.cols1 = Width1 / Pixel_Size;
        this.rows2 = Height2 / Pixel_Size;
        this.cols2 = Width2 / Pixel_Size;
        this.rows3 = Height3 / Pixel_Size;
        this.cols3 = Width3 / Pixel_Size;

        this.board = this.EmptyBoard();
        
    }

    state = {
        pixels: [],
        isRunning: false,
        interval: 100,
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
        // style={{ width: Width1, height: Height1, backgroundSize: `${Pixel_Size}px ${Pixel_Size}px`}}
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
    

    startGame = () => {
        this.setState({ isRunning: true });
        this.runIteration();
    }

    stopGame = () => {
        this.setState({ isRunning: false });
        if (this.timeoutHandler) {
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null;
        }
    }

    runIteration() {
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
        

        this.timeoutHandler = window.setTimeout(() => {
            this.runIteration();
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
        this.setState({ pixels: this.makePixels() });
        this.setState({ pixels: this.makePixels2() });
        this.setState({ pixels: this.makePixels3() });
    }

    handleRandom1 = () => {
        for (let y = 0; y < this.rows1; y++) {
            for (let x = 0; x < this.cols1; x++) {
                this.board[y][x] = (Math.random() >= 0.5);
            }
        }

        this.setState({ pixels: this.makePixels() });
        
    }

    // GAME BOARD MEDIUM
    handleRandom2 = () => {
        for (let y = 0; y < this.rows2; y++) {
            for (let x = 0; x < this.cols2; x++) {
                this.board[y][x] = (Math.random() >= 0.5);
            }
        }

        this.setState({ pixels: this.makePixels2() });
        
    }
    // GAME BOARD SMALL
    handleRandom3 = () => {
        for (let y = 0; y < this.rows3; y++) {
            for (let x = 0; x < this.cols3; x++) {
                this.board[y][x] = (Math.random() >= 0.5);
            }
        }

        this.setState({ pixels: this.makePixels3() });
        
    }
    
 

    

    render() {
        const { pixels, interval, isRunning } = this.state;
        return (
            <div>
                <div className="container">
                    <div className="Gameboard1"
                        style={{ width: Width1, height: Height1, backgroundSize: `${Pixel_Size}px ${Pixel_Size}px`}}
                        
                        onClick={this.handleClick}
                        ref={(n) => { this.boardRef = n; }}>

                        {pixels.map(p => (
                            <Pixel x={p.x} y={p.y} key={`${p.x},${p.y}`}/>
                        ))}
                    </div>
                
                    <div className="btnContainer">
                        {/* BOARD SIZE */}
                        <button className="btn" onClick={this.handleRandom1}>Big</button>
                        <button className="btn" onClick={this.handleRandom2}>Medium</button>
                        <button className="btn" onClick={this.handleRandom3}>Small</button>
                    </div>
                </div>

                <div className="navbarHolder">
                    <div className='navbar'>
                    <span className="slider">
						{'- '}
						<Slider speed={interval} onSpeedChange={this.handleSpeedChange} />
						{' +'}
					</span>
                        Update every <input value={this.state.interval} onChange={this.handleIntervalChange} /> msec
                        {isRunning ?
                            <button className="btn" onClick={this.stopGame}>Stop</button> :
                            // <button className="btn" onClick={this.startGame}>Run</button>
                        }
                        {/* <button className="btn" onClick={this.handleRandom}>Random</button> */}
                        <button className="btn" onClick={this.handleClear}>Clear</button>

                        
                    </div>
                </div>
            </div>
        );
    }
}


export default Game;