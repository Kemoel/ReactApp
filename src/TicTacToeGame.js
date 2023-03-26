import React, { useState } from 'react';

function Square({value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}


const Toggle = ({ label, toggled, onClick, moves}) => {
  const [isToggled, toggle] = useState(toggled)

  const callback = () => {
      toggle(!isToggled)
      onClick(!isToggled);
  }

  return (
      <label>
          <input type="checkbox" defaultChecked={isToggled} onClick={callback} />
          <span />
          <strong>{label}</strong>
      </label>
  )
}

function Matrix({size,squares,handleClick}){
  const matrix = [];
  const width = Math.sqrt(size);
  for (let i = 0; i < width; i++){
    const row = [];
    for (let j = 0; j < width; j++){
      let n = i*width+j;
      row.push(<Square key={"s"+n} value={squares[n]} onSquareClick={() => handleClick(n)}/>);
    }
    matrix.push(<div key={"r"+i} className="board-row">{row}</div>);
  }
  return matrix;
}

function Board({ xIsNext, squares, onPlay, currentMove, size}) {
  function handleClick(i) {
    if(squares[i] || calculateWinner(squares)){
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i]  =  xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner){
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O")
  }  


  return (
    <><div className="Move Number">Current move #: {currentMove}</div>
      <div className="status">{status}</div>
      <Matrix size={size} squares={squares} handleClick={handleClick}/>
    </>
  );
}

function Game(){
  const size = 9;
  const [history, setHistory] = useState([Array(size).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [revToggle, setRevToggle] = useState(false);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function moves_f(){
    const moves = history.map((squares, move) => {
      let description;
      if (move > 0) {
        description = 'Go to move #' + move + history[move];
      } else {
        description = 'Go to game start';
      }
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
    });
    if(revToggle){
      return moves.reverse();
    }else{
      return moves;
    }
  }
  
  return (
    <section>
    <h1>Tic-Tac-Toe Game</h1>
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} currentMove={currentMove} size={size}/>
        </div>
        <div className="game-info">
          <ol>{moves_f()}</ol>
        </div>
        <Toggle label={"Reverse"} toggled={revToggle} onClick={setRevToggle}/>
      </div>
      </section>
    );
}

function calculateWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game