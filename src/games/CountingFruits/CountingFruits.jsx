import React, { useState, useEffect } from "react";
import { useMathingoAudio } from "../../hooks/useMathingoAudio";

export default function CountingFruits({ onFinish, onScoreUpdate }) {
  const [target, setTarget] = useState(0);
  const [options, setOptions] = useState([]);
  const { playSound, speak } = useMathingoAudio();

  const generateLevel = () => {
    const newTarget = Math.floor(Math.random() * 9) + 1;
    setTarget(newTarget);

    // توليد خيارات ذكية (الرقم الصحيح + رقمان قريبان منه)
    let opts = [newTarget, newTarget + 1, newTarget - 1].filter(
      (n) => n > 0 && n <= 10
    );
    opts = [...new Set(opts)].sort(() => Math.random() - 0.5);
    setOptions(opts);

    speak("Count the fruits");
  };

  useEffect(() => {
    generateLevel();
  }, []);

  const handleChoice = (num) => {
    if (num === target) {
      playSound("success");
      onScoreUpdate(40);
      setTimeout(onFinish, 1500);
    } else {
      playSound("error");
    }
  };

  return (
    <div className="mathingo-container counting-game">
      <h2 className="instruction-text">كم عدد الفواكه في الصندوق؟ 🍎</h2>

      <div className="fruits-box">
        {Array.from({ length: target }).map((_, i) => (
          <span key={i} className="fruit-emoji">
            🍎
          </span>
        ))}
      </div>

      <div className="choices-row">
        {options.map((opt) => (
          <button
            key={opt}
            className="choice-btn"
            onClick={() => handleChoice(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
