import React, { useState, useEffect } from "react";

const HalfMatch = ({ onFinish, onScoreUpdate }) => {
  const shapes = ["🍎", "🦋", "🚗", "🧸", "🛸", "🍰"];
  const [level, setLevel] = useState(1);
  const [target, setTarget] = useState("");
  const [options, setOptions] = useState([]);
  const maxLevels = 10;

  useEffect(() => {
    const t = shapes[Math.floor(Math.random() * shapes.length)];
    setTarget(t);
    setOptions([...shapes].sort(() => Math.random() - 0.5).slice(0, 3));
  }, [level]);

  return (
    <div className="game-container">
      <div className="level-badge">المرحلة: {level} / {maxLevels}</div>
      <h3>أكمل النصف الآخر:</h3>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
        <div style={{ fontSize: '6rem', width: '60px', overflow: 'hidden', borderRight: '2px dashed #ccc' }}>
          {target}
        </div>
        <div style={{ fontSize: '6rem', width: '60px', opacity: 0.2 }}>?</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
        {options.map((s, i) => (
          <button key={i} onClick={() => {
            if(s === target) {
              onScoreUpdate(15);
              if(level < maxLevels) setTimeout(() => setLevel(level + 1), 500);
              else onFinish();
            }
          }} style={{ fontSize: '3rem', padding: '10px', background: 'white', borderRadius: '15px' }}>
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};
export default HalfMatch;