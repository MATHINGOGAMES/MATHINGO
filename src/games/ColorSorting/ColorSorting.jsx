import React, { useState, useEffect } from "react";

const ColorSorting = ({ onFinish, onScoreUpdate }) => {
  const colors = [
    { name: "أحمر", hex: "#FF0000" },
    { name: "أزرق", hex: "#0000FF" },
    { name: "أخضر", hex: "#008000" },
    { name: "أصفر", hex: "#FFFF00" },
    { name: "برتقالي", hex: "#FFA500" },
    { name: "بنفسجي", hex: "#800080" },
  ];

  const [level, setLevel] = useState(1);
  const [target, setTarget] = useState(colors[0]);
  const [options, setOptions] = useState([]);
  const maxLevels = 10;

  const generateLevel = () => {
    const newTarget = colors[Math.floor(Math.random() * colors.length)];
    setTarget(newTarget);
    // خيارات عشوائية تتضمن اللون الصحيح
    const shuffled = [...colors].sort(() => Math.random() - 0.5).slice(0, 3);
    if (!shuffled.find((c) => c.hex === newTarget.hex)) shuffled[0] = newTarget;
    setOptions(shuffled.sort(() => Math.random() - 0.5));
  };

  useEffect(() => {
    generateLevel();
  }, [level]);

  return (
    <div className="game-container">
      <div className="level-badge">
        المرحلة: {level} / {maxLevels}
      </div>
      <h2 style={{ fontSize: "2rem" }}>أين هو اللون:</h2>
      <div
        style={{
          fontSize: "3rem",
          fontWeight: "bold",
          margin: "20px",
          color: "#333",
        }}
      >
        {target.name}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        {options.map((col, i) => (
          <button
            key={i}
            onClick={() => {
              if (col.hex === target.hex) {
                onScoreUpdate(10);
                if (level < maxLevels)
                  setTimeout(() => setLevel(level + 1), 500);
                else onFinish();
              }
            }}
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: col.hex,
              borderRadius: "50%",
              border: "5px solid white",
              boxShadow: "0 4px #ccc",
            }}
          />
        ))}
      </div>
    </div>
  );
};
export default ColorSorting;
