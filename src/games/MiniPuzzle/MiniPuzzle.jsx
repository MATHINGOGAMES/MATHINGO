import React, { useState, useEffect, useCallback } from "react";
import { useMathingoAudio } from "../../hooks/useMathingoAudio";
import "./MiniPuzzle.css";

export default function MiniPuzzle({ onFinish, onScoreUpdate }) {
  const { playSound } = useMathingoAudio();

  // 🎮 حالات اللعبة
  const [currentStage, setCurrentStage] = useState(1);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("idle");
  const [gameStarted, setGameStarted] = useState(false);
  const [tiles, setTiles] = useState([]); // القطع
  const [emptyIndex, setEmptyIndex] = useState(null); // مكان القطعة الفارغة

  const initialWormMessage =
    "مرحباً بك في الأحجية الصغيرة! هل يمكنك ترتيب القطع لتكوين الصورة؟";
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

  // توليد الأحجية بناءً على المرحلة (تزداد في المراحل المتقدمة)
  const generatePuzzle = useCallback((stage) => {
    const size = stage === 1 ? 3 : stage === 2 ? 4 : 5; // 3x3, 4x4, 5x5
    const puzzleSize = size * size;
    let newTiles = [];
    for (let i = 0; i < puzzleSize - 1; i++) {
      newTiles.push(i + 1);
    }
    newTiles.push(null); // القطعة الفارغة
    setTiles(newTiles);
    setEmptyIndex(puzzleSize - 1);

    // خلط القطع عشوائياً
    for (let i = puzzleSize - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newTiles[i], newTiles[j]] = [newTiles[j], newTiles[i]];
      if (newTiles[i] === null) setEmptyIndex(i);
      if (newTiles[j] === null) setEmptyIndex(j);
    }
    setTiles([...newTiles]);
    setWormMessage(`حرك القطع لتكوين الأرقام بالترتيب!`);
  }, []);

  useEffect(() => {
    if (gameStarted) generatePuzzle(currentStage);
  }, [currentStage, gameStarted, generatePuzzle]);

  useEffect(() => {
    if (gameStarted && wormMessage) {
      const timer = setTimeout(() => speakMessage(wormMessage), 100);
      return () => clearTimeout(timer);
    }
  }, [wormMessage, gameStarted, speakMessage]);

  const handleTileClick = (index) => {
    if (status !== "idle") return;

    // التحقق مما إذا كانت القطعة مجاورة للفراغ
    const size = currentStage === 1 ? 3 : currentStage === 2 ? 4 : 5;
    const row = Math.floor(index / size);
    const col = index % size;
    const emptyRow = Math.floor(emptyIndex / size);
    const emptyCol = emptyIndex % size;

    if (
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
      (Math.abs(col - emptyCol) === 1 && row === emptyRow)
    ) {
      playSound("success"); // يمكنك استخدام صوت حركة بدلاً من success
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [
        newTiles[emptyIndex],
        newTiles[index],
      ];
      setTiles(newTiles);
      setEmptyIndex(index);

      // التحقق من اكتمال الأحجية
      if (checkPuzzleSolved(newTiles, size)) {
        setStatus("solved");
        playSound("success"); // صوت الفوز
        setScore((s) => s + 1);
        onScoreUpdate?.(1);
        setWormMessage("أحسنت! لقد قمت بحل الأحجية.");

        setTimeout(() => {
          if (currentStage < 3) {
            setWormMessage("مذهل! لننتقل لأحجية أكبر.");
            setTimeout(() => {
              setCurrentStage((s) => s + 1);
              setStatus("idle");
            }, 2000);
          } else {
            onFinish?.();
          }
        }, 1500);
      } else {
        setWormMessage("استمر في التحريك، أنت تقترب!");
      }
    } else {
      playSound("error"); // صوت خطأ
      setWormMessage(`لا يمكنك تحريك هذه القطعة. حاول مجاورة الفراغ.`);
      setTimeout(() => setStatus("idle"), 1000);
    }
  };

  const checkPuzzleSolved = (newTiles, size) => {
    for (let i = 0; i < size * size - 1; i++) {
      if (newTiles[i] !== i + 1) return false;
    }
    return true;
  };

  // شاشة البداية بنمط الصورة المرسلة (مع اسم ماتينغو في كود النطق فقط)
  if (!gameStarted) {
    return (
      <div className="mathingo-start-overlay">
        <div className="mathingo-card">
          {/* أيقونة اللعبة (الذاكرة بدل المقارنة) */}
          <div className="mathingo-icon">🧩</div>
          <h2 className="mathingo-title">الأحجية الصغيرة الذكية</h2>
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
          <div className={`worm-avatar ${status === "solved" ? "happy" : ""}`}>
            <span role="img" className="worm-emoji">
              🐊
            </span>
          </div>
        </div>

        <div className="top-bar">
          <div className="badge level-badge">المرحلة {currentStage}</div>
          <div className="badge round-badge">
            {tiles.length === 0
              ? ""
              : currentStage === 1
              ? "3x3"
              : stage === 2
              ? "4x4"
              : "5x5"}
          </div>
        </div>

        <div className={`game-card-main ${status}`}>
          <div className="puzzle-title">رتب القطع!</div>
          <div className={`puzzle-grid grid-size-${currentStage}`}>
            {tiles.map((tile, idx) => (
              <button
                key={`${tile}-${idx}`}
                className={`puzzle-item-btn ${tile === null ? "empty" : ""}`}
                onClick={() => handleTileClick(idx)}
                disabled={status !== "idle"}
              >
                {tile}
              </button>
            ))}
          </div>
          <div className="current-score">⭐ النقاط: {score}</div>
        </div>
      </div>
    </div>
  );
}
