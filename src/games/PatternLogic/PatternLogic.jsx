import React, { useState, useEffect } from "react";
import { useMathingoAudio } from "../../hooks/useMathingoAudio";

export default function PatternLogic({ onFinish, onScoreUpdate }) {
  const [pattern, setPattern] = useState([]);
  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const { playSound } = useMathingoAudio();

  const emojis = ["🍎", "🍌", "🍇", "🍓", "🍍"];

  const generatePattern = () => {
    const item1 = emojis[Math.floor(Math.random() * emojis.length)];
    let item2 = emojis[Math.floor(Math.random() * emojis.length)];
    while (item1 === item2)
      item2 = emojis[Math.floor(Math.random() * emojis.length)];

    // نمط ABAB
    const fullPattern = [item1, item2, item1, item2, item1];
    setPattern(fullPattern);
    setCorrectAnswer(item2);

    // خيارات
    const opts = [item2, item1, "🍊"].sort(() => Math.random() - 0.5);
    setOptions(opts);
  };

  useEffect(() => {
    generatePattern();
  }, []);

  const handleSelect = (choice) => {
    if (choice === correctAnswer) {
      playSound("success");
      onScoreUpdate(50);
      setTimeout(onFinish, 1500);
    } else {
      playSound("error");
    }
  };

  return (
    <div className="mathingo-container pattern-game">
      <h2 className="instruction-text">ماذا يأتي بعد ذلك؟ 🧐</h2>

      <div className="pattern-display">
        {pattern.map((emoji, i) => (
          <div key={i} className="pattern-item">
            {emoji}
          </div>
        ))}
        <div className="pattern-item question-mark">?</div>
      </div>

      <div className="options-row">
        {options.map((opt, i) => (
          <button
            key={i}
            className="pattern-btn"
            onClick={() => handleSelect(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
