import React, { useState, useEffect } from "react";
import { useMathingoAudio } from "../../hooks/useMathingoAudio";

export default function MiniPuzzle({ onFinish, onScoreUpdate }) {
  const { playSound, speak } = useMathingoAudio();
  const [level, setLevel] = useState({});

  const puzzles = [
    { base: "🍦", missing: "🍒", options: ["🍒", "🥦", "🚗"], name: "آيس كريم" },
    { base: "🏠", missing: "🚪", options: ["🚪", "📱", "🦒"], name: "منزل" },
    { base: "🚲", missing: "🚲", options: ["🚲", "🚁", "⛵"], name: "دراجة" }, // هنا سنستخدم منطقاً مختلفاً قليلاً
    { base: "🎂", missing: "🕯️", options: ["🕯️", "👟", "🌂"], name: "كعكة" }
  ];

  const generateLevel = () => {
    const randomPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
    // خلط الخيارات
    const shuffledOptions = [...randomPuzzle.options].sort(() => Math.random() - 0.5);
    setLevel({ ...randomPuzzle, shuffledOptions });
    speak(`Complete the ${randomPuzzle.name}`);
  };

  useEffect(() => { generateLevel(); }, []);

  const handleSelect = (choice) => {
    if (choice === level.missing) {
      playSound('success');
      onScoreUpdate(50);
      setTimeout(onFinish, 1500);
    } else {
      playSound('error');
    }
  };

  return (
    <div className="mathingo-container puzzle-game">
      <h2 className="instruction-text">ماذا يحتاج الـ {level.name} ليكتمل؟ 🤔</h2>
      
      <div className="puzzle-display">
        <span className="main-piece">{level.base}</span>
        <span className="empty-slot">؟</span>
      </div>

      <div className="puzzle-options">
        {level.shuffledOptions?.map((opt, index) => (
          <button 
            key={index} 
            className="puzzle-opt-btn" 
            onClick={() => handleSelect(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}