import React, { useState, useEffect } from "react";
import { useMathingoAudio } from "../../hooks/useMathingoAudio";

export default function ShadowMatch({ onFinish, onScoreUpdate }) {
  const [target, setTarget] = useState({});
  const [options, setOptions] = useState([]);
  const { playSound, speak } = useMathingoAudio();

  const items = [
    { id: 'apple', icon: '🍎' },
    { id: 'car', icon: '🚗' },
    { id: 'cat', icon: '🐱' },
    { id: 'star', icon: '⭐' },
    { id: 'ball', icon: '⚽' }
  ];

  const generateLevel = () => {
    const randomTarget = items[Math.floor(Math.random() * items.length)];
    setTarget(randomTarget);
    setOptions([...items].sort(() => Math.random() - 0.5));
    speak("Match the item to its shadow");
  };

  useEffect(() => { generateLevel(); }, []);

  const handleSelect = (itemId) => {
    if (itemId === target.id) {
      playSound('success');
      onScoreUpdate(45);
      setTimeout(onFinish, 1500);
    } else {
      playSound('error');
    }
  };

  return (
    <div className="mathingo-container shadow-game">
      <h2 className="instruction-text">لمن يعود هذا الظل؟ 👤</h2>
      
      {/* عرض "الظل" باستخدام CSS brightness(0) */}
      <div className="shadow-preview">
        <span className="shadow-icon">{target.icon}</span>
      </div>

      <div className="options-grid">
        {options.map((item) => (
          <button key={item.id} className="item-btn" onClick={() => handleSelect(item.id)}>
            {item.icon}
          </button>
        ))}
      </div>
    </div>
  );
}