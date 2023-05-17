import { useState } from 'react';
import { useRef } from 'react';
import header1 from './tic.png'
import "./header.css";

function Square({ value, onSquareClick, xIsNext1, x = 0 }) {
  return (
    <>
      <button className="square" style={{ background: ((xIsNext1 != null ? (xIsNext1 === 'X' ? "red" : "green") : "yellow")) }} onClick={onSquareClick}>
        {value}
      </button>
    </>
  );
}

function Board({ xIsNext, squares, onPlay }) {

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }
  function refreshPage() {
    window.location.reload(false);
  }
  const winner = calculateWinner(squares);
  let status, greeting, again;
  again = "Reload!";
  if (winner) {
    status = "Winner: " + winner;
    greeting = "Hurray!!";
    again = "Once More : /";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <dic className="board">
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} xIsNext1={squares[0]} x={1} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} xIsNext1={squares[1]} x={2} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} xIsNext1={squares[2]} x={3} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} xIsNext1={squares[3]} x={4} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} xIsNext1={squares[4]} x={5} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} xIsNext1={squares[5]} x={6} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} xIsNext1={squares[6]} x={7} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} xIsNext1={squares[7]} x={8} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} xIsNext1={squares[8]} x={9} />
        </div>
      </dic>
      <div className='greeting'>
        <h2>{greeting}</h2>
      </div>
      <div>
        <button className='reload' onClick={refreshPage}>{again}</button>
      </div>
    </>
  );
}

function calculateWinner(squares) {
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

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
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

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button className='moves' onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  const ref = useRef(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className='header'>
        <h1>TIC-TAC-TOE</h1><br></br>
        <img src={header1} alt="" /><br></br>

        <button className='Let' onClick={handleClick}>Let me try!</button>
      </div>

      <div ref={ref} className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  );
}