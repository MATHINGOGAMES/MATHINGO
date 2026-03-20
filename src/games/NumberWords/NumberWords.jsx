// src/games/NumberWords/NumberWords.jsx
import React, { useState } from "react";
import { useMathingoAudio } from "../../hooks/useMathingoAudio";

export default function NumberWords({ onFinish, onScoreUpdate }) {
  const { playSound } = useMathingoAudio();
  const [score, setScore] = useState(0);
  const question = { number: 3, word: "ثلاثة" };

  const handleAnswer = (choice) => {
    if (choice === question.word) {
      playSound("success");
      setScore(score + 1);
      onScoreUpdate && onScoreUpdate(1);
      onFinish && onFinish();
    } else playSound("error");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📝 صِل الرقم بالكلمة</h2>
      <p style={{ fontSize: 32 }}>{question.number}</p>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        {["واحد", "ثلاثة", "خمسة"].map((w) => (
          <button key={w} onClick={() => handleAnswer(w)}>
            {w}
          </button>
        ))}
      </div>
      <p>نقاطك: {score}</p>
    </div>
  );
}
