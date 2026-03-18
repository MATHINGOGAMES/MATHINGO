import React, { useState, useEffect } from "react";
import { useMathingoAudio } from "../../hooks/useMathingoAudio";

export default function ShapeHunter({ onFinish, onScoreUpdate }) {
  const [targetShape, setTargetShape] = useState({});
  const [options, setOptions] = useState([]);
  const { playSound, speak } = useMathingoAudio();

  const shapes = [
    { id: 'circle', name: 'دائرة', icon: '⭕' },
    { id: 'square', name: 'مربع', icon: '⬛' },
    { id: 'triangle', name: 'مثلث', icon: '🔺' },
    { id: 'rectangle', name: 'مستطيل', icon: '▭' }
  ];

  const generateLevel = () => {
    const randomTarget = shapes[Math.floor(Math.random() * shapes.length)];
    setTargetShape(randomTarget);
    
    // خلط الأشكال للعرض
    setOptions([...shapes].sort(() => Math.random() - 0.5));
    speak(`Find the ${randomTarget.id}`);
  };

  useEffect(() => { generateLevel(); }, []);

  const handleSelect = (shapeId) => {
    if (shapeId === targetShape.id) {
      playSound('success');
      onScoreUpdate(40);
      setTimeout(onFinish, 1500);
    } else {
      playSound('error');
    }
  };

  return (
    <div className="mathingo-container shape-game">
      <h2 className="instruction-text">أين هو الـ {targetShape.name}؟ 🤔</h2>
      
      <div className="shapes-grid">
        {options.map((shape) => (
          <button 
            key={shape.id} 
            className="shape-btn" 
            onClick={() => handleSelect(shape.id)}
          >
            <span className="shape-icon">{shape.icon}</span>
          </button>
        ))}
      </div>
    </div>
  );
}