import React, { useState, useEffect } from "react";
import { useMathingoAudio } from "../../hooks/useMathingoAudio";

export default function AnimalHome({ onFinish, onScoreUpdate }) {
  const { playSound, speak } = useMathingoAudio();
  const [level, setLevel] = useState({});

  const pairs = [
    { animal: "🐦", home: "🪹", name: "العصفور" },
    { animal: "🐝", home: "🍯", name: "النحلة" },
    { animal: "🐠", home: "🌊", name: "السمكة" },
    { animal: "🐶", home: "🏠", name: "الكلب" },
    { animal: "🦁", home: "⛰️", name: "الأسد" }
  ];

  const generateLevel = () => {
    const correctPair = pairs[Math.floor(Math.random() * pairs.length)];
    const otherHomes = pairs.filter(p => p.home !== correctPair.home).map(p => p.home);
    const wrongHome = otherHomes[Math.floor(Math.random() * otherHomes.length)];

    const options = [correctPair.home, wrongHome].sort(() => Math.random() - 0.5);
    
    setLevel({ ...correctPair, options });
    speak(`Where does the ${correctPair.animal} live?`);
  };

  useEffect(() => { generateLevel(); }, []);

  const handleSelect = (home) => {
    if (home === level.home) {
      playSound('success');
      onScoreUpdate(60); // مكافأة أكبر للعبة الختامية
      setTimeout(onFinish, 1500);
    } else {
      playSound('error');
    }
  };

  return (
    <div className="mathingo-container home-game">
      <h2 className="instruction-text">ساعد {level.name} في العثور على بيته! 🏠</h2>
      
      <div className="animal-display bounce-in">
        {level.animal}
      </div>

      <div className="home-options">
        {level.options?.map((opt, index) => (
          <button 
            key={index} 
            className="home-btn" 
            onClick={() => handleSelect(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}