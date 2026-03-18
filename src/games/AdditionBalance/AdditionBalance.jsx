import React, { useState, useEffect } from "react";

const AdditionBalance = ({ onFinish, onScoreUpdate }) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [options, setOptions] = useState([]);
  const [level, setLevel] = useState(1);
  const maxLevels = 10;

  const generateLevel = () => {
    const n1 = Math.floor(Math.random() * level) + 1;
    const n2 = Math.floor(Math.random() * level) + 1;
    const correct = n1 + n2;
    setNum1(n1);
    setNum2(n2);

    let ops = new Set([correct]);
    while (ops.size < 3)
      ops.add(
        correct +
          (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1)
      );
    setOptions([...ops].sort((a, b) => a - b));
  };

  useEffect(() => {
    generateLevel();
  }, [level]);

  const check = (val) => {
    if (val === num1 + num2) {
      onScoreUpdate(20);
      if (level < maxLevels) setLevel(level + 1);
      else onFinish();
    }
  };

  return (
    <div className="game-container">
      <div className="level-badge">
        المرحلة: {level} / {maxLevels}
      </div>
      <div style={{ fontSize: "4rem", margin: "40px 0" }}>
        {num1} + {num2} = <span style={{ color: "#ff9800" }}>؟</span>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
        {options.map((opt, i) => (
          <button
            key={i}
            className="choice-btn"
            onClick={() => check(opt)}
            style={{ fontSize: "2.5rem", width: "80px" }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};
export default AdditionBalance;
