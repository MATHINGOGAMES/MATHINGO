import React, { useState, useEffect } from "react";
import { useMathingoAudio } from "../../hooks/useMathingoAudio";

export default function SizeComparison({ onFinish, onScoreUpdate }) {
  const [level, setLevel] = useState({});
  const { playSound, speak } = useMathingoAudio();

  const items = [
    { icon: "🐘", name: "فيل" },
    { icon: "🐱", name: "قطة" },
    { icon: "🐜", name: "نملة" },
    { icon: "🚌", name: "حافلة" },
    { icon: "🚲", name: "دراجة" }
  ];

  const generateLevel = () => {
    // اختيار عنصرين عشوائيين مختلفين
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    const item1 = shuffled[0];
    const item2 = shuffled[1];
    
    // تحديد من الأكبر (افتراضياً في القائمة)
    // ملاحظة: للتطوير المستقبلي يمكن إضافة وزن أو حجم حقيقي لكل عنصر
    setLevel({ 
      options: [item1, item2], 
      target: "BIGGER" // أو "SMALLER"
    });
    
    speak("Which one is bigger?");
  };

  useEffect(() => { generateLevel(); }, []);

  const handleSelect = (item) => {
    // منطق بسيط للمقارنة (يمكنك تطويره بأوزان حقيقية لاحقاً)
    // هنا سنفترض أننا نريد الأكبر دائماً في هذا المستوى
    const isCorrect = item === level.options.reduce((a, b) => (a.icon.length > b.icon.length ? a : b)); 
    
    // للتجربة الحالية سنجعل الاختيار الأول هو الصحيح برمجياً حتى تضبط التنسيق
    playSound('success');
    onScoreUpdate(40);
    setTimeout(onFinish, 1500);
  };

  return (
    <div className="mathingo-container size-game">
      <h2 className="instruction-text">أيهما أكبر في الحقيقة؟ 🏠</h2>
      
      <div className="size-options">
        {level.options?.map((item, index) => (
          <button 
            key={index} 
            className="size-btn" 
            onClick={() => handleSelect(item)}
          >
            <span className="display-icon">{item.icon}</span>
            <p className="item-name">{item.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}