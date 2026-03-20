// src/games/ShapeHunter/ShapeHunter.jsx
import React, { useState } from "react";
import { useMathingoAudio } from "../../hooks/useMathingoAudio";

export default function ShapeHunter({ onFinish, onScoreUpdate }) {
  const { playSound } = useMathingoAudio();
  const shapes = ["⭕", "⬛", "⭕", "⬛"];
  const target = "⭕";
  const [score, setScore] = useState(0);

  const handleClick = (shape) => {
    if (shape === target) {
      playSound("success");
      setScore(score + 1);
      onScoreUpdate && onScoreUpdate(1);
    } else playSound("error");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>⭕ اضغط على الشكل المطلوب</h2>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        {shapes.map((s, i) => (
          <button
            key={i}
            onClick={() => handleClick(s)}
            style={{ fontSize: 32 }}
          >
            {s}
          </button>
        ))}
      </div>
      <p>نقاطك: {score}</p>
      <button onClick={onFinish} style={{ marginTop: 10 }}>
        ✅ انتهيت
      </button>
    </div>
  );
}
