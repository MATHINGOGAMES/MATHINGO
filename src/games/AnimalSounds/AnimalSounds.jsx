// src/games/AnimalSounds/AnimalSounds.jsx
import React, { useState } from "react";
import { useMathingoAudio } from "../../hooks/useMathingoAudio";

export default function AnimalSounds({ onFinish, onScoreUpdate }) {
  const { playSound, speak } = useMathingoAudio();
  const [score, setScore] = useState(0);
  const animals = [
    { name: "🐶", sound: "Woof" },
    { name: "🐱", sound: "Meow" },
    { name: "🐄", sound: "Moo" },
  ];

  const target = animals[Math.floor(Math.random() * animals.length)];

  const handleClick = (animal) => {
    if (animal.name === target.name) {
      playSound("success");
      setScore(score + 1);
      onScoreUpdate && onScoreUpdate(1);
      speak("Correct!");
    } else playSound("error");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🐾 أي حيوان يصدر الصوت التالي: {target.sound}</h2>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        {animals.map((a, i) => (
          <button
            key={i}
            onClick={() => handleClick(a)}
            style={{ fontSize: 48 }}
          >
            {a.name}
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
