import React from "react";

function Square({ value, onClick, highlight, disabled }) {
  const getValueColor = () => {
    if (value === "X") return "x-value";
    if (value === "O") return "o-value";
    return "";
  };

  return (
    <div
      className={`square ${highlight ? "highlight" : ""} ${disabled ? "disabled" : ""}`}
      onClick={onClick}
    >
      <span className={`square-value ${getValueColor()}`}>
        {value}
      </span>
    </div>
  );
}

export default Square;