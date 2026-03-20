import React, { useState, useEffect, useCallback } from "react";
import { useMathingoAudio } from "../../hooks/useMathingoAudio";
//import "./CountingFruits.css";

export default function CountingFruits({ onFinish, onScoreUpdate }) {
  const { playSound } = useMathingoAudio();

  // 🎮 الحالات الأساسية
  const [currentStage, setCurrentStage] = useState(1);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("idle");
  const [gameStarted, setGameStarted] = useState(false);
  const [wormMessage, setWormMessage] = useState(
    "أهلاً بك! ساعدني في عدّ الفواكه اللذيذة."
  );
  const [question, setQuestion] = useState({
    fruits: [],
    correct: 0,
    options: [],
  });

  // 🔊 محرك النطق
  const speakMessage = useCallback((text) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.find((v) => v.lang.includes("ar"));
    if (arabicVoice) utterance.voice = arabicVoice;
    utterance.lang = "ar-SA";
    utterance.pitch = 1.4;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }, []);

  // توليد فواكه عشوائية بناءً على المرحلة
  const generateQuestion = useCallback((stage) => {
    const fruitIcons = ["🍎", "🍏", "🍌", "🍓", "🍊", "🍇", "🍍", "🥝"];
    const maxFruits = stage === 1 ? 5 : stage === 2 ? 10 : 15;
    const count = Math.floor(Math.random() * maxFruits) + 1;

    // اختيار نوع فاكهة عشوائي لهذا السؤال
    const randomIcon =
      fruitIcons[Math.floor(Math.random() * fruitIcons.length)];
    const fruitsArray = Array(count).fill(randomIcon);

    // توليد خيارات
    let options = new Set([count]);
    while (options.size < 3) {
      const wrong =
        count +
        (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1);
      if (wrong > 0) options.add(wrong);
    }

    return {
      fruits: fruitsArray,
      correct: count,
      options: Array.from(options).sort((x, y) => x - y),
    };
  }, []);

  useEffect(() => {
    setQuestion(generateQuestion(currentStage));
  }, [currentStage, generateQuestion]);

  useEffect(() => {
    if (gameStarted && wormMessage) {
      const timer = setTimeout(() => speakMessage(wormMessage), 100);
      return () => clearTimeout(timer);
    }
  }, [wormMessage, gameStarted, speakMessage]);

  const handleAnswer = (choice) => {
    if (status !== "idle") return;

    if (choice === question.correct) {
      setStatus("correct");
      setWormMessage("عدّ صحيح! أنت بطل الفواكه.");
      playSound("success");
      setScore((s) => s + 1);
      onScoreUpdate?.(1);
    } else {
      setStatus("wrong");
      setWormMessage("ممم، ركز وجرب العدّ مرة أخرى.");
      playSound("error");
    }

    setTimeout(() => {
      if (round < 10) {
        setRound((r) => r + 1);
        setQuestion(generateQuestion(currentStage));
        setStatus("idle");
      } else {
        if (currentStage < 3) {
          setWormMessage("واو! لننتقل إلى مزرعة فواكه أكبر!");
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
  };

  if (!gameStarted) {
    return (
      <div className="start-overlay">
        <div className="start-box">
          <div className="worm-intro">🍏</div>
          <h2>تحدي عدّ الفواكه</h2>
          <p>كم ثمرة فاكهة تراها أمامك؟</p>
          <button className="start-btn" onClick={() => setGameStarted(true)}>
            🚀 هيا نبدأ العدّ!
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
          <div className={`worm-avatar ${status === "correct" ? "happy" : ""}`}>
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
              style={{ width: `${(round / 10) * 100}%` }}
            ></div>
          </div>
          <div className="badge round-badge">{round}/10</div>
        </div>

        <div className={`game-card-main ${status}`}>
          <div className="fruits-display">
            {question.fruits.map((f, i) => (
              <span key={i} className="fruit-item">
                {f}
              </span>
            ))}
          </div>

          <div className="buttons-grid">
            {question.options.map((option) => (
              <button
                key={option}
                className="action-btn"
                onClick={() => handleAnswer(option)}
                disabled={status !== "idle"}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="current-score">⭐ فواكه مجموعة: {score}</div>
        </div>
      </div>
    </div>
  );
}
