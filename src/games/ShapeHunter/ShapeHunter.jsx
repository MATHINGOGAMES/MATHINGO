import React, { useState, useEffect } from "react";

const ShapeHunter = ({ onFinish, onScoreUpdate }) => {
  const shapes = ["🔴", "🟦", "🔺", "⭐", "🌙", "☁️", "🍀", "💎"];
  const [target, setTarget] = useState("");
  const [options, setOptions] = useState([]);
  const [level, setLevel] = useState(1);
  const maxLevels = 10;
  const [message, setMessage] = useState("أين هو الشكل المطلوب؟");

  const generateLevel = () => {
    const newTarget = shapes[Math.floor(Math.random() * shapes.length)];
    setTarget(newTarget);

    // تزداد الصعوبة: 4 أشكال في البداية ثم 6 ثم 9 أشكال!
    const count = level < 4 ? 4 : level < 7 ? 6 : 9;

    let newOptions = [newTarget];
    while (newOptions.length < count) {
      const s = shapes[Math.floor(Math.random() * shapes.length)];
      if (!newOptions.includes(s)) newOptions.push(s);
    }
    setOptions(newOptions.sort(() => Math.random() - 0.5));
    setMessage(`ابحث عن: ${newTarget}`);
  };

  useEffect(() => {
    generateLevel();
  }, [level]);

  const check = (s) => {
    if (s === target) {
      onScoreUpdate(10);
      if (level < maxLevels) {
        setLevel(level + 1);
      } else {
        setMessage("بطلة الأشكال! 🎉");
        setTimeout(onFinish, 1500);
      }
    } else {
      setMessage("ركزي جيداً.. جربي مرة أخرى! 🧐");
    }
  };

  return (
    <div
      className="game-container"
      style={{ textAlign: "center", padding: "20px" }}
    >
      <div
        className="level-badge"
        style={{
          background: "#4caf50",
          color: "white",
          padding: "10px 20px",
          borderRadius: "50px",
          display: "inline-block",
          marginBottom: "20px",
        }}
      >
        المرحلة: {level} / {maxLevels}
      </div>

      <h2 style={{ fontSize: "1.8rem" }}>
        أين هو الشكل:{" "}
        <span style={{ fontSize: "4rem", display: "block" }}>{target}</span>
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: level < 7 ? "1fr 1fr" : "1fr 1fr 1fr",
          gap: "15px",
          marginTop: "20px",
          justifyItems: "center",
        }}
      >
        {options.map((s, i) => (
          <button
            key={i}
            onClick={() => check(s)}
            style={{
              fontSize: "3.5rem",
              width: "100px",
              height: "100px",
              background: "white",
              borderRadius: "20px",
              border: "4px solid #f0f0f0",
              boxShadow: "0 4px #ddd",
              cursor: "pointer",
            }}
          >
            {s}
          </button>
        ))}
      </div>

      <h3 style={{ marginTop: "25px", color: "#555" }}>{message}</h3>
    </div>
  );
};

export default ShapeHunter;
