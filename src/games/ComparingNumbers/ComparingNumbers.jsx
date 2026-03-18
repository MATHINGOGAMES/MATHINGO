import React, { useState, useEffect } from "react";

const ComparingNumbers = ({ onFinish, onScoreUpdate }) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [message, setMessage] = useState("أي العددين أكبر؟");
  const [showResult, setShowResult] = useState(false); // لإخفاء التمساح
  const [level, setLevel] = useState(1); // نظام المراحل
  const maxLevels = 10;

  // توليد أرقام جديدة
  const generateNumbers = () => {
    setNum1(Math.floor(Math.random() * 10 * level)); // تزداد الصعوبة مع المرحلة
    setNum2(Math.floor(Math.random() * 10 * level));
    setShowResult(false);
    setMessage("أي العددين أكبر؟");
  };

  useEffect(() => {
    generateNumbers();
  }, [level]);

  const checkAnswer = (selectedNum) => {
    const correct = Math.max(num1, num2);
    setShowResult(true); // الآن نظهر التمساح بعد الإجابة فقط

    if (selectedNum === correct) {
      setMessage("أحسنتِ! إجابة صحيحة 🐊✨");
      onScoreUpdate(10);
      setTimeout(() => {
        if (level < maxLevels) {
          setLevel(level + 1);
        } else {
          onFinish(); // إنهاء اللعبة بعد 10 مراحل
        }
      }, 1500);
    } else {
      setMessage("حاولي مرة أخرى! 🐊");
      setTimeout(() => setShowResult(false), 1000); // إخفاء التمساح للمحاولة مجدداً
    }
  };

  return (
    <div className="game-container">
      <div className="level-badge">
        المرحلة: {level} / {maxLevels}
      </div>

      <div
        className="numbers-display"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          fontSize: "3rem",
        }}
      >
        <button className="choice-btn" onClick={() => checkAnswer(num1)}>
          {num1}
        </button>

        {/* التمساح يظهر هنا فقط إذا كانت showResult حقيقية */}
        <div
          className="result-icon"
          style={{ visibility: showResult ? "visible" : "hidden" }}
        >
          {num1 > num2 ? " > " : num2 > num1 ? " < " : " = "}
          🐊
        </div>

        <button className="choice-btn" onClick={() => checkAnswer(num2)}>
          {num2}
        </button>
      </div>

      <h3>{message}</h3>
    </div>
  );
};

export default ComparingNumbers;
