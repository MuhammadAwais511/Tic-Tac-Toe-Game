import React, { useState, useEffect } from "react";
import Square from "./Square";

function Board() {
  const [state, setState] = useState(Array(9).fill(null));
  const [isXturn, setIsXturn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [gameHistory, setGameHistory] = useState([]);

  const winnerLogic = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  const checkWinner = () => {
    for (let logic of winnerLogic) {
      const [a, b, c] = logic;
      if (state[a] && state[a] === state[b] && state[a] === state[c]) {
        setWinner(state[a]);
        setWinningLine([a, b, c]);
        
        // Save game result to history
        setGameHistory(prev => [...prev, {
          winner: state[a],
          moves: state.filter(cell => cell !== null).length,
          date: new Date().toLocaleString()
        }]);
        return;
      }
    }

    // Check for draw
    if (state.every(cell => cell !== null) && !winner) {
      setWinner("Draw");
      setGameHistory(prev => [...prev, {
        winner: "Draw",
        moves: 9,
        date: new Date().toLocaleString()
      }]);
    }
  };

  const onClickHandler = (index) => {
    if (state[index] || winner) return;
    
    let copyState = [...state];
    copyState[index] = isXturn ? "X" : "O";
    setState(copyState);
    setIsXturn(!isXturn);
  };

  useEffect(() => {
    checkWinner();
  }, [state]);

  const resetGame = () => {
    setState(Array(9).fill(null));
    setWinner(null);
    setWinningLine([]);
    setIsXturn(true);
  };

  const getStatusMessage = () => {
    if (winner === "X" || winner === "O") {
      return `🎉 Player ${winner} won the game!`;
    } else if (winner === "Draw") {
      return "🤝 It's a Draw!";
    } else {
      return `Current Player: ${isXturn ? "X" : "O"}`;
    }
  };

  return (
    <div className="game-wrapper">
      <h2 className="title">Tic Tac Toe</h2>
      
      {/* Game Status */}
      <div className={`status-message ${winner ? 'winner' : ''}`}>
        {getStatusMessage()}
      </div>

      {/* Game Board */}
      <div className="board-container">
        {[0, 1, 2].map((row) => (
          <div key={row} className="board-row">
            {[0, 1, 2].map((col) => {
              const index = row * 3 + col;
              return (
                <Square
                  key={index}
                  onClick={() => onClickHandler(index)}
                  value={state[index]}
                  highlight={winningLine.includes(index)}
                  disabled={!!winner}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Game Stats */}
      {gameHistory.length > 0 && (
        <div className="game-stats">
          <h4>Game History</h4>
          <div className="stats-grid">
            <div className="stat-item">
              <span>Total Games:</span>
              <strong>{gameHistory.length}</strong>
            </div>
            <div className="stat-item">
              <span>X Wins:</span>
              <strong>{gameHistory.filter(g => g.winner === "X").length}</strong>
            </div>
            <div className="stat-item">
              <span>O Wins:</span>
              <strong>{gameHistory.filter(g => g.winner === "O").length}</strong>
            </div>
            <div className="stat-item">
              <span>Draws:</span>
              <strong>{gameHistory.filter(g => g.winner === "Draw").length}</strong>
            </div>
          </div>
        </div>
      )}

      <button className="reset-btn" onClick={resetGame}>
        🔄 Reset Game
      </button>
    </div>
  );
}

export default Board;