import React, { useState, useEffect } from "react";

const AnimalSounds = ({ onFinish, onScoreUpdate }) => {
  const animals = [
    { icon: "🐱", sound: "مواء" }, { icon: "🐶", sound: "نباح" },
    { icon: "🦁", sound: "زئير" }, { icon: "🐑", sound: "ثغاء" }
  ];
  const [level, setLevel] = useState(1);
  const [target, setTarget] = useState(animals[0]);
  const [options, setOptions] = useState([]);
  const maxLevels = 10;

  useEffect(() => {
    const t = animals[Math.floor(Math.random() * animals.length)];
    setTarget(t);
    setOptions([...animals].sort(() => Math.random() - 0.5));
  }, [level]);

  return (
    <div className="game-container">
      <div className="level-badge">المرحلة: {level} / {maxLevels}</div>
      <h2>من يصدر هذا الصوت؟</h2>
      <div style={{ fontSize: '3rem', margin: '30px', color: '#ff9800' }}>" {target.sound} "</div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
        {options.map((a, i) => (
          <button key={i} onClick={() => {
            if(a.icon === target.icon) {
              onScoreUpdate(10);
              if(level < maxLevels) setTimeout(() => setLevel(level + 1), 500);
              else onFinish();
            }
          }} style={{ fontSize: '4rem', padding: '10px', background: 'white', borderRadius: '20px' }}>
            {a.icon}
          </button>
        ))}
      </div>
    </div>
  );
};
export default AnimalSounds;