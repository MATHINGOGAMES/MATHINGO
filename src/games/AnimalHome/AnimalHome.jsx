import React, { useState, useEffect } from "react";

const AnimalHome = ({ onFinish, onScoreUpdate }) => {
  const pairs = [
    { animal: "🐒", target: "🍌" },
    { animal: "🐰", target: "🥕" },
    { animal: "🐝", target: "🌻" },
    { animal: "🐱", target: "🐟" },
    { animal: "🐶", target: "🦴" },
    { animal: "🐦", target: "🌲" },
  ];

  const [level, setLevel] = useState(1);
  const [currentPair, setCurrentPair] = useState(pairs[0]);
  const [options, setOptions] = useState([]);
  const maxLevels = 10;

  const generateLevel = () => {
    const pair = pairs[Math.floor(Math.random() * pairs.length)];
    setCurrentPair(pair);
    // خيارات عشوائية تتضمن الإجابة الصحيحة
    const otherTargets = pairs
      .filter((p) => p.target !== pair.target)
      .map((p) => p.target);
    const shuffledOptions = [
      pair.target,
      ...otherTargets.sort(() => Math.random() - 0.5).slice(0, 2),
    ];
    setOptions(shuffledOptions.sort(() => Math.random() - 0.5));
  };

  useEffect(() => {
    generateLevel();
  }, [level]);

  return (
    <div className="game-container">
      <div className="level-badge">
        المرحلة: {level} / {maxLevels}
      </div>
      <h2 style={{ fontSize: "1.5rem" }}>ماذا يحب هذا الحيوان؟</h2>
      <div style={{ fontSize: "7rem", margin: "20px" }}>
        {currentPair.animal}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => {
              if (opt === currentPair.target) {
                onScoreUpdate(10);
                if (level < maxLevels)
                  setTimeout(() => setLevel(level + 1), 600);
                else onFinish();
              }
            }}
            style={{
              fontSize: "3.5rem",
              padding: "10px",
              background: "white",
              borderRadius: "20px",
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};
export default AnimalHome;
