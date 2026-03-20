import React, { useState, useEffect, useCallback } from "react";
import { useMathingoAudio } from "../../hooks/useMathingoAudio";
import "./OddOneOut.css";

export default function OddOneOut({ onFinish, onScoreUpdate }) {
  const { playSound } = useMathingoAudio();

  // 🎮 حالات اللعبة
  const [currentStage, setCurrentStage] = useState(1);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("idle");
  const [gameStarted, setGameStarted] = useState(false);
  const [options, setOptions] = useState([]);
  const [correctShape, setCorrectShape] = useState("");

  const initialWormMessage = "أهلاً بك! هل يمكنك إيجاد الشكل المختلف؟";
  const [wormMessage, setWormMessage] = useState(initialWormMessage);

  // 🔊 محرك النطق (باسم ماتينغو مؤقتاً)
  const speakMessage = useCallback((text) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ar-SA";
    utterance.pitch = 1.3;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }, []);

  // توليد سؤال جديد
  const generateQuestion = useCallback((stage) => {
    const sets = [
      ["🍎", "🍏"],
      ["🐱", "🐶"],
      ["🚗", "🚲"],
      ["⚽", "🏀"],
      ["🌙", "⭐"],
      ["🐘", "🐭"],
    ];

    // اختيار مجموعة عشوائية
    const randomSet = sets[Math.floor(Math.random() * sets.length)];
    const mainShape = randomSet[0];
    const oddShape = randomSet[1];

    // تحديد عدد العناصر بناءً على المرحلة
    const count = stage === 1 ? 3 : stage === 2 ? 5 : 8;

    // بناء المصفوفة (كلها متشابهة ما عدا واحد)
    let newOptions = Array(count - 1).fill(mainShape);
    newOptions.push(oddShape);

    // خلط الأماكن عشوائياً
    newOptions = newOptions.sort(() => Math.random() - 0.5);

    setOptions(newOptions);
    setCorrectShape(oddShape);
  }, []);

  useEffect(() => {
    if (gameStarted) generateQuestion(currentStage);
  }, [currentStage, gameStarted, generateQuestion]);

  useEffect(() => {
    if (gameStarted && wormMessage) {
      const timer = setTimeout(() => speakMessage(wormMessage), 100);
      return () => clearTimeout(timer);
    }
  }, [wormMessage, gameStarted, speakMessage]);

  const handleChoice = (shape) => {
    if (status !== "idle") return;

    if (shape === correctShape) {
      setStatus("correct");
      playSound("success");
      setScore((s) => s + 1);
      onScoreUpdate?.(1);
      setWormMessage("أحسنت! هذا هو الشكل المختلف فعلاً.");

      setTimeout(() => {
        if (round < 5) {
          setRound((r) => r + 1);
          generateQuestion(currentStage);
          setStatus("idle");
        } else {
          if (currentStage < 3) {
            setWormMessage("رائع! لننتقل لمستوى أصعب قليلاً.");
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
      setWormMessage("ممم، ركز جيداً.. هناك واحد لا يشبه البقية!");
      setTimeout(() => setStatus("idle"), 1000);
    }
  };

  // شاشة البداية بنمط الصورة التي أرفقتها
  if (!gameStarted) {
    return (
      <div className="mathingo-start-overlay">
        <div className="mathingo-card">
          <div className="mathingo-icon">🧐</div>
          <h2 className="mathingo-title">تحدي الشكل المختلف</h2>
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
          <div className="shapes-grid">
            {options.map((shape, idx) => (
              <button
                key={idx}
                className="shape-btn"
                onClick={() => handleChoice(shape)}
                disabled={status !== "idle"}
              >
                {shape}
              </button>
            ))}
          </div>
          <div className="current-score">⭐ النقاط: {score}</div>
        </div>
      </div>
    </div>
  );
}
