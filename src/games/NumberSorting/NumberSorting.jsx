// src/games/NumberSorting/NumberSorting.jsx
import React, { useState } from "react";
import { useMathingoAudio } from "../../hooks/useMathingoAudio";

export default function NumberSorting({ onFinish, onScoreUpdate }) {
  const { playSound } = useMathingoAudio();
  const [numbers, setNumbers] = useState([3, 1, 4, 2]);
  const [score, setScore] = useState(0);

  const handleSort = () => {
    const sorted = [...numbers].sort((a, b) => a - b);
    setNumbers(sorted);
    playSound("success");
    setScore(score + 1);
    onScoreUpdate && onScoreUpdate(1);
    setTimeout(() => onFinish && onFinish(), 500);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🎈 رتب الأرقام من الأصغر للأكبر</h2>
      <p style={{ fontSize: 32 }}>{numbers.join(" ")}</p>
      <button onClick={handleSort} style={{ marginTop: 10, fontSize: 20 }}>
        ✅ رتب
      </button>
      <p>نقاطك: {score}</p>
    </div>
  );
}
