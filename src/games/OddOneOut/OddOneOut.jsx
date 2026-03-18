import React, { useState, useEffect } from "react";
import { useMathingoAudio } from "../../hooks/useMathingoAudio";

export default function OddOneOut({ onFinish, onScoreUpdate }) {
  const [level, setLevel] = useState({});
  const { playSound, speak } = useMathingoAudio();

  const groups = [
    { items: ["🍎", "🍎", "🍎", "🍌"], odd: "🍌", hint: "fruits" },
    { items: ["🚗", "🚲", "🚗", "🚗"], odd: "🚲", hint: "vehicles" },
    { items: ["🐶", "🐱", "🐶", "🐶"], odd: "🐱", hint: "animals" },
    { items: ["⚽", "⚽", "🏀", "⚽"], odd: "🏀", hint: "balls" },
    { items: ["☀️", "☁️", "☀️", "☀️"], odd: "☁️", hint: "weather" }
  ];

  const generateLevel = () => {
    const randomGroup = groups[Math.floor(Math.random() * groups.length)];
    // خلط ترتيب العناصر
    const shuffledItems = [...randomGroup.items].sort(() => Math.random() - 0.5);
    setLevel({ ...randomGroup, items: shuffledItems });
    speak("Find the odd one out");
  };

  useEffect(() => { generateLevel(); }, []);

  const handleSelect = (item) => {
    if (item === level.odd) {
      playSound('success');
      onScoreUpdate(50);
      setTimeout(onFinish, 1500);
    } else {
      playSound('error');
    }
  };

  return (
    <div className="mathingo-container odd-game">
      <h2 className="instruction-text">من هو المختلف هنا؟ 🧐</h2>
      
      <div className="items-grid">
        {level.items?.map((item, index) => (
          <button 
            key={index} 
            className="odd-item-btn" 
            onClick={() => handleSelect(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}