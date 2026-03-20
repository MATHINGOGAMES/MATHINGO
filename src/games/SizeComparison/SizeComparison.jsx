// src/games/SizeComparison/SizeComparison.jsx
import React, { useState } from "react";
import { useMathingoAudio } from "../../hooks/useMathingoAudio";

export default function SizeComparison({ onFinish, onScoreUpdate }) {
  const { playSound } = useMathingoAudio();
  const [score, setScore] = useState(0);
  const items = [
    { label: "🐘", size: 10 },
    { label: "🐁", size: 3 },
  ];

  const handleClick = (item) => {
    if (item.size === Math.max(...items.map((i) => i.size))) {
      playSound("success");
      setScore(score + 1);
      onScoreUpdate && onScoreUpdate(1);
    } else playSound("error");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🐘 اختر الأكبر</h2>
      <div
        style={{
          display: "flex",
          gap: 20,
          justifyContent: "center",
          fontSize: 48,
        }}
      >
        {items.map((item, i) => (
          <button key={i} onClick={() => handleClick(item)}>
            {item.label}
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
