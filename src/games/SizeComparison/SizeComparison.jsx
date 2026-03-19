import React, { useState, useEffect } from "react";

const SizeComparison = ({ onFinish, onScoreUpdate }) => {
  const items = [
    { icon: "🐘", size: 100, name: "كبير" },
    { icon: "🐭", size: 40, name: "صغير" },
    { icon: "🌳", size: 90, name: "كبير" },
    { icon: "🌸", size: 30, name: "صغير" },
    { icon: "🏠", size: 95, name: "كبير" },
    { icon: "🔑", size: 25, name: "صغير" },
  ];

  const [level, setLevel] = useState(1);
  const [question, setQuestion] = useState(""); // "أين الأكبر؟" أو "أين الأصغر؟"
  const [choices, setChoices] = useState([]);
  const maxLevels = 10;

  const generateLevel = () => {
    const isLookingForBig = Math.random() > 0.5;
    setQuestion(isLookingForBig ? "أين هو الأكبر؟ 🏠" : "أين هو الأصغر؟ 🔑");

    // اختيار عنصرين مختلفين تماماً في الحجم
    const bigOnes = items.filter((i) => i.size > 70);
    const smallOnes = items.filter((i) => i.size < 50);
    const big = bigOnes[Math.floor(Math.random() * bigOnes.length)];
    const small = smallOnes[Math.floor(Math.random() * smallOnes.length)];

    setChoices([big, small].sort(() => Math.random() - 0.5));
  };

  useEffect(() => {
    generateLevel();
  }, [level]);

  const handleChoice = (item) => {
    const isBig = item.size > 70;
    const isCorrect =
      (question.includes("الأكبر") && isBig) ||
      (question.includes("الأصغر") && !isBig);

    if (isCorrect) {
      onScoreUpdate(10);
      if (level < maxLevels) {
        setTimeout(() => setLevel((prev) => prev + 1), 600);
      } else {
        setTimeout(onFinish, 1500);
      }
    }
  };

  return (
    <div className="game-container">
      <div className="level-badge">
        المرحلة: {level} / {maxLevels}
      </div>
      <h2 style={{ fontSize: "2rem", marginBottom: "30px" }}>{question}</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "40px",
        }}
      >
        {choices.map((item, i) => (
          <button
            key={i}
            onClick={() => handleChoice(item)}
            style={{
              fontSize: `${item.size * 1.2}px`, // حجم الإيموجي يتناسب مع حجمه الحقيقي!
              background: "white",
              border: "4px solid #f0f0f0",
              borderRadius: "30px",
              padding: "20px",
              cursor: "pointer",
              boxShadow: "0 8px #ddd",
            }}
          >
            {item.icon}
          </button>
        ))}
      </div>
    </div>
  );
};
export default SizeComparison;
