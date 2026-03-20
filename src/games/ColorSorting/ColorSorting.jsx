import React, { useState, useEffect, useCallback } from "react";
import { useMathingoAudio } from "../../hooks/useMathingoAudio";
import "./ColorSorting.css";

export default function ColorSorting({ onFinish, onScoreUpdate }) {
  const { playSound } = useMathingoAudio();

  // 🎮 حالات اللعبة
  const [currentStage, setCurrentStage] = useState(1);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("idle");
  const [gameStarted, setGameStarted] = useState(false);
  const [targetColor, setTargetColor] = useState("");
  const [items, setItems] = useState([]);

  const initialWormMessage = "ساعدني في جمع الألوان الصحيحة!";
  const [wormMessage, setWormMessage] = useState(initialWormMessage);

  // 🔊 محرك النطق
  const speakMessage = useCallback((text) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.find((v) => v.lang.includes("ar"));
    if (arabicVoice) utterance.voice = arabicVoice;
    utterance.lang = "ar-SA";
    utterance.pitch = 1.3;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }, []);

  // توليد المرحلة
  const generateLevel = useCallback((stage) => {
    const colorPool = [
      { emoji: "🔴", name: "الأحمر" },
      { emoji: "🔵", name: "الأزرق" },
      { emoji: "🟡", name: "الأصفر" },
      { emoji: "🟢", name: "الأخضر" },
    ];

    // اختيار لون مستهدف عشوائي
    const target = colorPool[Math.floor(Math.random() * colorPool.length)];
    setTargetColor(target);
    setWormMessage(`اضغط على اللون ${target.name} فقط!`);

    // توليد عناصر (تزداد في المرحلة المتقدمة)
    const count = stage === 1 ? 4 : stage === 2 ? 6 : 8;
    const newItems = [];
    for (let i = 0; i < count; i++) {
      newItems.push(colorPool[Math.floor(Math.random() * colorPool.length)]);
    }
    // التأكد من وجود اللون المستهدف مرة واحدة على الأقل
    if (!newItems.find((item) => item.emoji === target.emoji)) {
      newItems[Math.floor(Math.random() * count)] = target;
    }
    setItems(newItems);
  }, []);

  useEffect(() => {
    if (gameStarted) generateLevel(currentStage);
  }, [currentStage, gameStarted, generateLevel]);

  useEffect(() => {
    if (gameStarted && wormMessage) {
      const timer = setTimeout(() => speakMessage(wormMessage), 100);
      return () => clearTimeout(timer);
    }
  }, [wormMessage, gameStarted, speakMessage]);

  const handleItemClick = (item, index) => {
    if (status !== "idle") return;

    if (item.emoji === targetColor.emoji) {
      setStatus("correct");
      playSound("success");
      setScore((s) => s + 1);
      onScoreUpdate?.(1);
      setWormMessage("أحسنت! هذا هو اللون الصحيح.");

      // إزالة العنصر الذي تم اختياره
      const updatedItems = items.filter((_, idx) => idx !== index);
      setItems(updatedItems);

      // إذا انتهت العناصر المستهدفة أو بعد عدد معين من النقاط
      setTimeout(() => {
        if (round < 5) {
          setRound((r) => r + 1);
          generateLevel(currentStage);
          setStatus("idle");
        } else {
          if (currentStage < 3) {
            setWormMessage("مذهل! لننتقل لتحدي ألوان أصعب.");
            setTimeout(() => {
              setCurrentStage((s) => s + 1);
              setRound(1);
              setStatus("idle");
            }, 2000);
          } else {
            onFinish?.();
          }
        }
      }, 1500);
    } else {
      setStatus("wrong");
      playSound("error");
      setWormMessage(`لا، هذا ليس ${targetColor.name}. حاول مرة أخرى!`);
      setTimeout(() => setStatus("idle"), 1000);
    }
  };

  if (!gameStarted) {
    return (
      <div className="mathingo-start-overlay">
        <div className="mathingo-card">
          <div className="mathingo-icon">🎨</div>
          <h2 className="mathingo-title">تحدي فرز الألوان</h2>
          <button
            className="mathingo-btn-primary"
            onClick={() => {
              setGameStarted(true);
              speakMessage(initialWormMessage);
            }}
          >
            🚀 ابدأ اللعب الآن
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`compare-wrapper stage-${currentStage}`}>
      <div className="game-container">
        <div className="worm-section">
          <div className="bubble-container">
            <div className="speech-bubble">{wormMessage}</div>
          </div>
          <div className="worm-avatar">
            <span role="img" className="worm-emoji">
              🐊
            </span>
          </div>
        </div>

        <div className="top-bar">
          <div className="badge level-badge">المرحلة {currentStage}</div>
          <div className="progress-outer">
            <div
              className="progress-inner"
              style={{ width: `${(round / 5) * 100}%` }}
            ></div>
          </div>
          <div className="badge round-badge">{round}/5</div>
        </div>

        <div className={`game-card-main ${status}`}>
          <div className="target-indicator">
            المطلوب:{" "}
            <span className="target-text">
              {targetColor.emoji} {targetColor.name}
            </span>
          </div>

          <div className="colors-grid">
            {items.map((item, idx) => (
              <button
                key={`${item.emoji}-${idx}`}
                className="color-item-btn"
                onClick={() => handleItemClick(item, idx)}
                disabled={status !== "idle"}
              >
                {item.emoji}
              </button>
            ))}
          </div>
          <div className="current-score">⭐ الألوان المجمعة: {score}</div>
        </div>
      </div>
    </div>
  );
}
