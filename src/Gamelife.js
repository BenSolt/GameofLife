import React from 'react';
import './css/gamelife.css';


const Pixel_Size = 20;
const Width1 = 800;
const Height1 = 600;

const Width2 = 400;
const Height2 = 300;

class Cell extends React.Component {

    render() {
        const { x, y } = this.props;
        return (
            <div className="Cell" style={{
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

        this.board = this.EmptyBoard();
    }

    state = {
        cells: [],
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

    makeCells() {
        let cells = [];
        for (let y = 0; y < this.rows1; y++) {
            for (let x = 0; x < this.cols1; x++) {
                if (this.board[y][x]) {
                    cells.push({ x, y });
                }
            }
        }
        return cells;
    }

    makeCells2() {
        let cells = [];
        for (let y = 0; y < this.rows2; y++) {
            for (let x = 0; x < this.cols2; x++) {
                if (this.board[y][x]) {
                    cells.push({ x, y });
                }
            }
        }
        return cells;
    }




    handleClick = (event) => {

        const elemOffset = this.getElementOffset();
        const offsetX = event.clientX - elemOffset.x;
        const offsetY = event.clientY - elemOffset.y;
        
        const x = Math.floor(offsetX / Pixel_Size);
        const y = Math.floor(offsetY / Pixel_Size);

        if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
            this.board[y][x] = !this.board[y][x];
        }

        this.setState({ cells: this.makeCells() });
        
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
        this.setState({ cells: this.makeCells() });
        

        this.timeoutHandler = window.setTimeout(() => {
            this.runIteration();
        }, this.state.interval);
    }
    
    calculateNeighbors(board, x, y) {
        let neighbors = 0;
        const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
        for (let i = 0; i < dirs.length; i++) {
            const dir = dirs[i];
            let y1 = y + dir[0];
            let x1 = x + dir[1];

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
        this.setState({ cells: this.makeCells() });
        this.setState({ cells: this.makeCells2() });
    }

    handleRandom1 = () => {
        for (let y = 0; y < this.rows1; y++) {
            for (let x = 0; x < this.cols1; x++) {
                this.board[y][x] = (Math.random() >= 0.5);
            }
        }

        this.setState({ cells: this.makeCells() });
        
    }

    // GAME BOARD MEDIUM
    handleRandom2 = () => {
        for (let y = 0; y < this.rows2; y++) {
            for (let x = 0; x < this.cols2; x++) {
                this.board[y][x] = (Math.random() >= 0.5);
            }
        }

        this.setState({ cells: this.makeCells2() });
        
    }
    // GAME BOARD SMALL
    handleRandom3 = () => {
        for (let y = 0; y < this.rows3; y++) {
            for (let x = 0; x < this.cols3; x++) {
                this.board[y][x] = (Math.random() >= 0.5);
            }
        }

        this.setState({ cells: this.makeCells3() });
        
    }


    render() {
        const { cells, interval, isRunning } = this.state;
        return (
            <div>
                <div className="Gameboard"
                    style={{ width: Width1, height: Height1, backgroundSize: `${Pixel_Size}px ${Pixel_Size}px`}}
                    onClick={this.handleClick}
                    ref={(n) => { this.boardRef = n; }}>

                    {cells.map(cell => (
                        <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`}/>
                    ))}
                </div>
                {/* BOARD SIZE */}
                    <button className="btn" onClick={this.handleRandom1}>Big</button>
                    <button className="btn" onClick={this.handleRandom2}>Medium</button>
                    <button className="btn" onClick={this.handleRandom3}>Small</button>

                <div className="navbar">
                    <div className='navbar2'>
                        Update every <input value={this.state.interval} onChange={this.handleIntervalChange} /> msec
                        {isRunning ?
                            <button className="btn" onClick={this.stopGame}>Stop</button> :
                            <button className="btn" onClick={this.startGame}>Run</button>
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