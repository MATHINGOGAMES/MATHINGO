import React, { useState, useEffect } from "react";
import { useMathingoAudio } from "../../hooks/useMathingoAudio";

export default function NumberWords({ onFinish, onScoreUpdate }) {
  const [targetNumber, setTargetNumber] = useState(0);
  const [options, setOptions] = useState([]);
  const { playSound, speak } = useMathingoAudio();

  // قاموس الأرقام بالعربية
  const numberNames = {
    1: "واحد", 2: "اثنان", 3: "ثلاثة", 4: "أربعة", 5: "خمسة",
    6: "ستة", 7: "سبعة", 8: "ثمانية", 9: "تسعة", 10: "عشرة"
  };

  const generateLevel = () => {
    const num = Math.floor(Math.random() * 10) + 1;
    setTargetNumber(num);

    // توليد خيارات (الرقم الصحيح + رقمين عشوائيين)
    let opts = [num];
    while (opts.length < 3) {
      const r = Math.floor(Math.random() * 10) + 1;
      if (!opts.includes(r)) opts.push(r);
    }
    setOptions(opts.sort(() => Math.random() - 0.5));
    
    speak(`Choose the number ${num}`);
  };

  useEffect(() => { generateLevel(); }, []);

  const handleChoice = (choice) => {
    if (choice === targetNumber) {
      playSound('success');
      onScoreUpdate(30);
      setTimeout(onFinish, 1500);
    } else {
      playSound('error');
    }
  };

  return (
    <div className="mathingo-container word-game">
      <h2 className="instruction-text">اختر الرقم الصحيح للكلمة:</h2>
      <div className="word-display">
        {numberNames[targetNumber]}
      </div>

      <div className="options-grid">
        {options.map(opt => (
          <button key={opt} className="number-btn" onClick={() => handleChoice(opt)}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}