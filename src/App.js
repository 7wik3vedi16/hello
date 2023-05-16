import { useState } from 'react';
import {useRef} from 'react';


function Square({value, onSquareClick,xIsNext1,x=0}) {
  return (
    <>
    <button className="square"  style={{background:((xIsNext1!=null?(xIsNext1==='X'?"red":"green"):"yellow"))}} onClick={onSquareClick}>
      {value}
    </button>
    </>
  );
}

function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

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
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }
  function refreshPage() {
    window.location.reload(false);
    }
  const winner = calculateWinner(squares);
  let status,greeting,again;
  again="reload";
  if (winner) {
    status = "Winner: " + winner;
    greeting="Hurray!!";
    again="Once More : /";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <dic className="board">
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} xIsNext1={squares[0]} x={1}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} xIsNext1={squares[1]} x={2}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} xIsNext1={squares[2]} x={3}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} xIsNext1={squares[3]} x={4}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} xIsNext1={squares[4]} x={5}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} xIsNext1={squares[5]} x={6}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} xIsNext1={squares[6]} x={7}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} xIsNext1={squares[7]} x={8}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} xIsNext1={squares[8]} x={9}/>
      </div>
      </dic>
     <div className='greeting'>
      <h2>{greeting}</h2>
      </div>
      <div>
      <button onClick={refreshPage}>{again}</button>
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
  const [xIsNext] = useState(true);
  const [history] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares) {
    // TODO
  }
  const ref = useRef(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <div className="game">
    <div className='Play'>
      <div className='Play-button'>
      <button className='Let' onClick={handleClick}>Let me try!</button>
      </div>
    
      <div ref={ref} className="game-board">
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
      </div>
    </div>
  );
}