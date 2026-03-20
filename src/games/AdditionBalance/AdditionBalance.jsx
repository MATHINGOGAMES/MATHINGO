import React, { useState, useEffect, useCallback } from "react";
import { useMathingoAudio } from "../../hooks/useMathingoAudio";
import "./AdditionBalance.css"; // سنستخدم نفس نمط التصميم

export default function AdditionBalance({ onFinish, onScoreUpdate }) {
  const { playSound } = useMathingoAudio();

  // 🎮 الحالات الأساسية (3 مراحل، 10 جولات لكل مرحلة)
  const [currentStage, setCurrentStage] = useState(1);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("idle");
  const [gameStarted, setGameStarted] = useState(false);
  const [wormMessage, setWormMessage] = useState(
    "أهلاً بك في ميزان الجمع! ساعدني في إيجاد الناتج."
  );
  const [question, setQuestion] = useState({ a: 0, b: 0, options: [] });

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

  // توليد سؤال جمع بناءً على المرحلة
  const generateQuestion = useCallback((stage) => {
    const max = stage === 1 ? 5 : stage === 2 ? 10 : 20;
    const a = Math.floor(Math.random() * max) + 1;
    const b = Math.floor(Math.random() * max) + 1;
    const correct = a + b;

    // توليد خيارات ذكية (قريبة من الإجابة الصحيحة)
    let options = new Set([correct]);
    while (options.size < 3) {
      const wrong =
        correct +
        (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1);
      if (wrong > 0) options.add(wrong);
    }

    return {
      a,
      b,
      correct,
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

    const isCorrect = choice === question.correct;

    if (isCorrect) {
      setStatus("correct");
      setWormMessage(
        Math.random() > 0.5 ? "يا لك من ذكي!" : "إجابة صحيحة تماماً!"
      );
      playSound("success");
      setScore((s) => s + 1);
      onScoreUpdate?.(1);
    } else {
      setStatus("wrong");
      setWormMessage("أوبس! حاول مرة أخرى يا بطل.");
      playSound("error");
    }

    setTimeout(() => {
      if (round < 10) {
        setRound((r) => r + 1);
        setQuestion(generateQuestion(currentStage));
        setStatus("idle");
      } else {
        if (currentStage < 3) {
          setWormMessage("رائع! لقد أنهيت المرحلة بنجاح.");
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
          <div className="worm-intro">🐊</div>
          <h2>ميزان الجمع الذكي</h2>
          <p>ساعد الدودة في جمع الأرقام بشكل صحيح!</p>
          <button className="start-btn" onClick={() => setGameStarted(true)}>
            🚀 ابدأ التحدي الآن
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`compare-wrapper stage-${currentStage}`}>
      <div className="game-container">
        {/* 🐛 منطقة الدودة */}
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

        {/* 📊 شريط التقدم */}
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

        {/* 🎮 الميزان (بطاقة اللعبة) */}
        <div className={`game-card-main ${status}`}>
          <h2 className="balance-title">كم يساوي المجموع؟</h2>
          <div className="numbers-display">
            <div className="number-card balance-card">
              {question.a} + {question.b}
            </div>
            <div className="operator-slot">=</div>
            <div className="number-card result-placeholder">
              {status === "correct" ? question.correct : "?"}
            </div>
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
          <div className="current-score">⭐ النقاط: {score}</div>
        </div>
      </div>
    </div>
  );
}
