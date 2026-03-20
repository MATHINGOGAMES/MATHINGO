import React, { useState, useEffect, useCallback } from "react";
import { useMathingoAudio } from "../../hooks/useMathingoAudio";
import "./ShadowMatch.css";

export default function ShadowMatch({ onFinish, onScoreUpdate }) {
  const { playSound } = useMathingoAudio();

  const [currentStage, setCurrentStage] = useState(1);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("idle");
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedShape, setSelectedShape] = useState(null);
  const [levelData, setLevelData] = useState({ target: "", options: [] });

  const initialWormMessage =
    "أهلاً بك! هل يمكنك إيجاد الظل الصحيح لهذه الصورة؟";
  const [wormMessage, setWormMessage] = useState(initialWormMessage);

  const speakMessage = useCallback((text) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ar-SA";
    utterance.pitch = 1.3;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }, []);

  const generateLevel = useCallback((stage) => {
    const items = [
      { img: "🐶", shadow: "🐶" },
      { img: "🐱", shadow: "🐱" },
      { img: "🐰", shadow: "🐰" },
      { img: "🐘", shadow: "🐘" },
      { img: "🦒", shadow: "🦒" },
      { img: "🦁", shadow: "🦁" },
      { img: "🦖", shadow: "🦖" },
      { img: "🐵", shadow: "🐵" },
    ];

    // اختيار عنصر مستهدف
    const target = items[Math.floor(Math.random() * items.length)];

    // تحديد عدد الخيارات بناءً على المرحلة
    const optionsCount = stage === 1 ? 3 : stage === 2 ? 4 : 5;

    let options = new Set([target.shadow]);
    while (options.size < optionsCount) {
      options.add(items[Math.floor(Math.random() * items.length)].shadow);
    }

    setLevelData({
      target: target.img,
      options: Array.from(options).sort(() => Math.random() - 0.5),
      correct: target.shadow,
    });
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

  const handleChoice = (choice) => {
    if (status !== "idle") return;

    if (choice === levelData.correct) {
      setStatus("correct");
      playSound("success");
      setScore((s) => s + 1);
      onScoreUpdate?.(1);
      setWormMessage("أحسنت! هذا هو الظل الصحيح.");

      setTimeout(() => {
        if (round < 5) {
          setRound((r) => r + 1);
          generateLevel(currentStage);
          setStatus("idle");
        } else {
          if (currentStage < 3) {
            setWormMessage("عمل رائع! لننتقل لتحدي أصعب.");
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
      setWormMessage("ممم، انظر جيداً إلى تفاصيل الظل.");
      setTimeout(() => setStatus("idle"), 1000);
    }
  };

  if (!gameStarted) {
    return (
      <div className="mathingo-start-overlay">
        <div className="mathingo-card">
          <div className="mathingo-icon">👤</div>
          <h2 className="mathingo-title">تحدي مطابقة الظلال</h2>
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
          <div className="worm-avatar">🐊</div>
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
          <div className="target-shadow-box">
            <span className="main-image">{levelData.target}</span>
          </div>

          <div className="shadow-options">
            {levelData.options.map((opt, idx) => (
              <button
                key={idx}
                className="shadow-btn"
                onClick={() => handleChoice(opt)}
                disabled={status !== "idle"}
              >
                <span className="shadow-emoji">{opt}</span>
              </button>
            ))}
          </div>
          <div className="current-score">⭐ الظلال الصحيحة: {score}</div>
        </div>
      </div>
    </div>
  );
}
