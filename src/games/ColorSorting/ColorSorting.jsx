import React, { useState, useEffect } from "react";
import { useMathingoAudio } from "../../hooks/useMathingoAudio";

export default function ColorSorting({ onFinish, onScoreUpdate }) {
  const { playSound, speak } = useMathingoAudio();
  const [targetColor, setTargetColor] = useState({});
  const [options, setOptions] = useState([]);

  const colorData = [
    { id: 'red', name: 'أحمر', hex: '#ff1744', items: ['🍎', '🚗', '🍓'] },
    { id: 'blue', name: 'أزرق', hex: '#2979ff', items: ['🐳', '🦋', '🚲'] },
    { id: 'green', name: 'أخضر', hex: '#00e676', items: ['🌳', '🐢', '🍐'] },
    { id: 'yellow', name: 'أصفر', hex: '#ffea00', items: ['🍌', '☀️', '🐥'] }
  ];

  const generateLevel = () => {
    // اختيار لون عشوائي ليكون الهدف
    const randomColor = colorData[Math.floor(Math.random() * colorData.length)];
    setTargetColor(randomColor);

    // اختيار عنصر واحد من كل لون كخيارات
    const levelOptions = colorData.map(c => ({
      colorId: c.id,
      icon: c.items[Math.floor(Math.random() * c.items.length)]
    }));
    
    setOptions(levelOptions.sort(() => Math.random() - 0.5));
    speak(`Find the item that is ${randomColor.id}`);
  };

  useEffect(() => { generateLevel(); }, []);

  const handleSelect = (selectedColorId) => {
    if (selectedColorId === targetColor.id) {
      playSound('success');
      onScoreUpdate(40);
      setTimeout(onFinish, 1500);
    } else {
      playSound('error');
    }
  };

  return (
    <div className="mathingo-container color-game">
      <h2 className="instruction-text">أيّ من هذه الأشياء لونه {targetColor.name}؟</h2>
      
      {/* عرض مربع اللون المستهدف */}
      <div className="color-target-box" style={{ backgroundColor: targetColor.hex }}></div>

      <div className="color-options-grid">
        {options.map((opt, index) => (
          <button 
            key={index} 
            className="color-item-btn" 
            onClick={() => handleSelect(opt.colorId)}
          >
            {opt.icon}
          </button>
        ))}
      </div>
    </div>
  );
}