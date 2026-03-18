import React, { useState, useEffect, useCallback } from "react";

export default function CountingGame({ onFinish, onScoreUpdate }) {
  const [targetCount, setTargetCount] = useState(0);
  const [currentItem, setCurrentItem] = useState("🍎");
  const [clickedCount, setClickedCount] = useState(0);
  const [options, setOptions] = useState([]);
  const [gameState, setGameState] = useState(null); // 'success' | 'fail' | null

  const itemsPool = ["🍎", "⭐", "🎈", "🐱", "🚗", "🍦"];

  const speak = useCallback((text) => {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1;
    window.speechSynthesis.speak(utter);
  }, []);

  const generateLevel = useCallback(() => {
    const count = Math.floor(Math.random() * 6) + 1; // عد من 1 إلى 6 (مناسب للأطفال)
    const item = itemsPool[Math.floor(Math.random() * itemsPool.length)];

    setTargetCount(count);
    setCurrentItem(item);
    setClickedCount(0);
    setGameState(null);

    // توليد خيارات ذكية (الرقم الصحيح + رقمين قريبين)
    const opts = [count, count + 1, count - 1]
      .filter((n) => n > 0)
      .sort(() => Math.random() - 0.5);

    setOptions([...new Set(opts)]); // التأكد من عدم تكرار الأرقام
    speak(`Count the ${item}s!`);
  }, [speak]);

  useEffect(() => {
    generateLevel();
  }, [generateLevel]);

  const handleItemClick = (index) => {
    if (gameState === "success") return;
    const nextCount = clickedCount + 1;
    if (nextCount <= targetCount) {
      setClickedCount(nextCount);
      speak(nextCount.toString());
    }
  };

  const handleOptionClick = (num) => {
    if (num === targetCount) {
      setGameState("success");
      speak(`Excellent! That's ${targetCount}`);
      onScoreUpdate(15);
      setTimeout(onFinish, 2000);
    } else {
      setGameState("fail");
      speak("Try counting again");
      setTimeout(() => setGameState(null), 1000);
    }
  };

  return (
    <div className="mathingo-container counting-game">
      <header className="mathingo-header">
        <button className="back-btn" onClick={onFinish}>
          ✕
        </button>
        <div className="game-progress">Game 3/15</div>
      </header>

      <main className="game-area">
        <h2 className="instruction-text">
          How many {currentItem}s do you see?
        </h2>

        {/* منطقة العناصر المراد عدها */}
        <div className="items-display">
          {[...Array(targetCount)].map((_, i) => (
            <div
              key={i}
              className={`countable-item ${i < clickedCount ? "active" : ""}`}
              onClick={() => handleItemClick(i)}
            >
              {currentItem}
            </div>
          ))}
        </div>

        {/* أزرار الخيارات */}
        <div className="options-row">
          {options.map((num) => (
            <button
              key={num}
              className={`option-btn ${
                gameState === "success" && num === targetCount ? "correct" : ""
              }`}
              onClick={() => handleOptionClick(num)}
            >
              {num}
            </button>
          ))}
        </div>
      </main>

      {/* شريط الملاحظات السفلي */}
      {gameState && (
        <div className={`feedback-toast ${gameState}`}>
          {gameState === "success"
            ? "🌟 Amazing Job!"
            : "❌ Let's try once more"}
        </div>
      )}
    </div>
  );
}
