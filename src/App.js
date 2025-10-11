import React, { useState, useEffect } from "react";
import "./App.css";
import Board from "./Tic-Tac-Toe-Game/Board";

function App() {
  const [theme, setTheme] = useState("dark");

  // Load theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("ticTacToeTheme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("ticTacToeTheme", newTheme);
  };

  return (
    <div className={`App ${theme}`}>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "dark" ? "☀️ Light Theme" : "🌙 Dark Theme"}
      </button>
      <Board />
    </div>
  );
}

export default App;