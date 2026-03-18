import React, { useState, useEffect } from "react";
import { useMathingoAudio } from "../../hooks/useMathingoAudio";

export default function NumberSorting({ onFinish, onScoreUpdate }) {
  const [numbers, setNumbers] = useState([]);
  const [sorted, setSorted] = useState([]);
  const { playSound, speak } = useMathingoAudio();

  // توليد أرقام عشوائية عند بدء اللعبة
  useEffect(() => {
    generateNewLevel();
  }, []);

  const generateNewLevel = () => {
    // توليد 4 أرقام عشوائية فريدة بين 1 و 20
    const randomNums = [];
    while (randomNums.length < 4) {
      const r = Math.floor(Math.random() * 20) + 1;
      if (!randomNums.includes(r)) randomNums.push(r);
    }
    setNumbers(randomNums);
    setSorted([]);
    speak("Sort the bubbles from smallest to largest");
  };

  const handlePick = (num) => {
    // تحديد ما هو الرقم الصغير التالي المفترض اختياره
    const remaining = numbers.filter(n => !sorted.includes(n));
    const nextCorrect = Math.min(...remaining);

    if (num === nextCorrect) {
      playSound('success');
      const newSorted = [...sorted, num];
      setSorted(newSorted);
      
      // إذا اكتمل الترتيب
      if (newSorted.length === numbers.length) {
        onScoreUpdate(50); // إضافة 50 نقطة
        setTimeout(onFinish, 1500); // العودة للقائمة بعد ثانية ونصف
      }
    } else {
      playSound('error'); // صوت خطأ إذا اختار رقماً كبيراً قبل الصغير
    }
  };

  return (
    <div className="mathingo-container sorting-game">
      <h2 className="instruction-text">رتب الفقاعات من الأصغر إلى الأكبر 🎈</h2>
      
      {/* منطقة الأرقام التي تم ترتيبها بنجاح */}
      <div className="sorted-area">
        {sorted.map((n, i) => (
          <div key={i} className="sorted-bubble bounce-in">{n}</div>
        ))}
        {sorted.length < numbers.length && <div className="placeholder-slot">؟</div>}
      </div>

      {/* منطقة الفقاعات التي يجب على الطفل الضغط عليها */}
      <div className="bubbles-grid">
        {numbers.map((n, i) => (
          <button 
            key={i} 
            className={`bubble-btn ${sorted.includes(n) ? 'hidden-bubble' : ''}`}
            onClick={() => handlePick(n)}
            disabled={sorted.includes(n)}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}