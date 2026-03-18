import React, { useState, useEffect } from "react";

const PatternLogic = ({ onFinish, onScoreUpdate }) => {
  const items = ["🍎", "🍌", "🍇", "🍓", "🍍"];
  const [pattern, setPattern] = useState([]);
  const [answer, setAnswer] = useState("");
  const [options, setOptions] = useState([]);
  const [level, setLevel] = useState(1);
  const maxLevels = 10;

  const generateLevel = () => {
    const a = items[Math.floor(Math.random() * items.length)];
    const b = items.filter((i) => i !== a)[
      Math.floor(Math.random() * (items.length - 1))
    ];
    // نمط بسيط A-B-A-?
    setPattern([a, b, a]);
    setAnswer(b);
    setOptions(
      [a, b, items.find((i) => i !== a && i !== b)].sort(
        () => Math.random() - 0.5
      )
    );
  };

  useEffect(() => {
    generateLevel();
  }, [level]);

  const check = (opt) => {
    if (opt === answer) {
      onScoreUpdate(15);
      if (level < maxLevels) setLevel(level + 1);
      else onFinish();
    }
  };

  return (
    <div className="game-container">
      <div className="level-badge">
        المرحلة: {level} / {maxLevels}
      </div>
      <h3>أكمل النمط الجميل:</h3>
      <div
        style={{
          fontSize: "3.5rem",
          margin: "30px 0",
          background: "#fff",
          padding: "10px",
          borderRadius: "20px",
        }}
      >
        {pattern.join(" ")} <span style={{ color: "#ccc" }}>?</span>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
        {options.map((opt, i) => (
          <button
            key={i}
            className="choice-btn"
            onClick={() => check(opt)}
            style={{ fontSize: "3rem" }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};
export default PatternLogic;
