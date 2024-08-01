import { useState } from 'react'

// function that returns a button with value and on click function
function Square ({ value, onSquareClick }) {
  return <button className='square' onClick={onSquareClick}>{value}</button>
}

// function that returns the board
function Board ({ xIsNext, squares, onPlay }) {
  function handleClick (i) {
    // if the square is already filled or there is a winner, return
    if (squares[i] || calculateWinner(squares)) {
      return
    }
    // slice array to get index access
    const nextSquares = squares.slice()

    if (xIsNext) {
      nextSquares[i] = 'X'
    } else {
      nextSquares[i] = 'O'
    }
    onPlay(nextSquares)
  }

  // calculate winner
  const winner = calculateWinner(squares)
  let status

  // if winner is found, set status to winner
  if (winner) {
    status = `Winner: ${winner}`
  // if all squares are filled, set status to draw
  } else if (!squares.includes(null)) {
    status = 'Draw'
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`
  }

  // returns status of the game
  // return 3 rows of board
  //   each row has 3 squares
  //   on click calls the handle click function
  return (
    <>
      <div className='status'>{status}</div>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>

      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  )
}

// function that returns the game
export default function Game () {
  // set consts for history, currentMoves, who is next, and current squares
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  // function to handle history updates
  function handlePlay (nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  // function to jump to a specific move
  function jumpTo (nextMove) {
    setCurrentMove(nextMove)
  }

  // map through history and return a list of moves
  const moves = history.map((squares, move) => {
    let description
    if (move > 0) {
      description = `Go to move #${move}`
    } else {
      description = 'Go to game start'
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })

  // return the game board with whos next, current moves, and play functions passed as args
  // also displays the game info whic shows the list of moves to jump too
  return (
    <div className='game'>
      <div className='game-board'>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className='game-info'>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

// function to calculate who won the game
function calculateWinner (squares) {
  // all possible lines to win
  const lines = [
    // Horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonal
    [0, 4, 8],
    [2, 4, 6]
  ]
  // loop through all the lines
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    // check if the squares have the same value and are not null
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // return winner found if one found
      return squares[a]
    }
  }

  // return nothing if nobody won
  return null
}
