// src/games/PatternLogic/PatternLogic.jsx
import React, { useState } from "react";
import { useMathingoAudio } from "../../hooks/useMathingoAudio";

export default function PatternLogic({ onFinish, onScoreUpdate }) {
  const { playSound } = useMathingoAudio();
  const pattern = ["🔵", "🔴", "🔵", "?"];
  const [score, setScore] = useState(0);

  const handleAnswer = (choice) => {
    if (choice === "🔴") {
      playSound("success");
      setScore(score + 1);
      onScoreUpdate && onScoreUpdate(1);
      onFinish && onFinish();
    } else playSound("error");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🧩 أكمل النمط</h2>
      <p style={{ fontSize: 32 }}>{pattern.join(" ")}</p>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        {["🔴", "🔵", "🟢"].map((c) => (
          <button key={c} onClick={() => handleAnswer(c)}>
            {c}
          </button>
        ))}
      </div>
      <p>نقاطك: {score}</p>
    </div>
  );
}
