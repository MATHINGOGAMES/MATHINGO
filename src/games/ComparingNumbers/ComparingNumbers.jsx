import React, { useState, useEffect, useCallback } from "react";
import { useMathingoAudio } from "../../hooks/useMathingoAudio";
import "./ComparingNumbers.css";

export default function ComparingNumbers({ onFinish, onScoreUpdate }) {
  const { playSound } = useMathingoAudio();

  // 🎮 الحالات الأساسية
  const [currentStage, setCurrentStage] = useState(1);
  const [round, setRound] = useState(1);
  const [question, setQuestion] = useState({ a: 0, b: 0 });
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("idle");
  const [wormMessage, setWormMessage] = useState(
    "مرحباً! أنا الدودة الذكية، هل أنت مستعد؟"
  );
  const [gameStarted, setGameStarted] = useState(false);

  // 🔊 محرك النطق المحسن
  const speakMessage = useCallback((text) => {
    if (!("speechSynthesis" in window)) return;

    // إلغاء أي نطق سابق فوراً
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();

    // محاولة العثور على صوت عربي بجودة عالية
    const arabicVoice = voices.find(
      (v) =>
        v.lang.includes("ar-SA") ||
        v.lang.includes("ar-EG") ||
        v.lang.includes("ar")
    );

    if (arabicVoice) {
      utterance.voice = arabicVoice;
    }

    utterance.lang = "ar-SA";
    utterance.pitch = 1.3;
    utterance.rate = 0.9;

    window.speechSynthesis.speak(utterance);
  }, []);

  // تأمين تحميل الأصوات للمتصفحات (خاصة Chrome)
  useEffect(() => {
    const synth = window.speechSynthesis;
    const loadVoices = () => synth.getVoices();

    loadVoices();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }
  }, []);

  // نطق الرسالة فقط إذا بدأت اللعبة
  useEffect(() => {
    if (gameStarted && wormMessage) {
      // تأخير بسيط لضمان انتهاء أي عمليات سابقة
      const timer = setTimeout(() => speakMessage(wormMessage), 100);
      return () => clearTimeout(timer);
    }
  }, [wormMessage, gameStarted, speakMessage]);

  // 🐛 الرسائل العشوائية
  const messages = {
    correct: ["أنت عبقري!", "إجابة مذهلة!", "رائع جداً!", "ممتاز يا بطل!"],
    wrong: ["لا بأس، حاول ثانية", "ركز قليلاً", "أنت تقترب!"],
    nextStage: ["وااو! إلى المرحلة التالية!", "أنت وحش رياضيات!"],
  };

  const getRandomMsg = (type) =>
    messages[type][Math.floor(Math.random() * messages[type].length)];

  const generateQuestion = useCallback((stage) => {
    const max = stage === 1 ? 10 : stage === 2 ? 50 : 100;
    let a = Math.floor(Math.random() * max);
    let b = Math.floor(Math.random() * max);
    if (a === b && a < max) b = a + 1;
    return { a, b };
  }, []);

  useEffect(() => {
    setQuestion(generateQuestion(currentStage));
  }, [currentStage, generateQuestion]);

  const handleAnswer = (choice) => {
    if (status !== "idle") return;

    setSelected(choice);
    const isCorrect =
      (choice === ">" && question.a > question.b) ||
      (choice === "<" && question.a < question.b) ||
      (choice === "=" && question.a === question.b);

    if (isCorrect) {
      setStatus("correct");
      setWormMessage(getRandomMsg("correct"));
      playSound("success");
      setScore((s) => s + 1);
      onScoreUpdate?.(1);
    } else {
      setStatus("wrong");
      setWormMessage(getRandomMsg("wrong"));
      playSound("error");
    }

    setTimeout(() => {
      if (round < 10) {
        setRound((r) => r + 1);
        setQuestion(generateQuestion(currentStage));
        setStatus("idle");
        setSelected(null);
      } else {
        if (currentStage < 3) {
          setWormMessage(getRandomMsg("nextStage"));
          setTimeout(() => {
            setCurrentStage((s) => s + 1);
            setRound(1);
            setStatus("idle");
            setSelected(null);
          }, 2000);
        } else {
          onFinish?.();
        }
      }
    }, 1500);
  };

  // شاشة البداية لتفعيل الصوت (ضرورية جداً)
  if (!gameStarted) {
    return (
      <div className="start-overlay">
        <div className="start-box">
          <div className="worm-intro">🐊</div>
          <h2>تحدي المقارنة الذكي</h2>
          <button className="start-btn" onClick={() => setGameStarted(true)}>
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
          <div className={`worm-avatar ${status === "correct" ? "happy" : ""}`}>
            <span role="img" aria-label="worm" className="worm-emoji">
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
          <div className="numbers-display">
            <div
              className={`number-card ${
                status === "correct" && question.a > question.b ? "winner" : ""
              }`}
            >
              {question.a}
            </div>
            <div className="operator-slot">{selected || "?"}</div>
            <div
              className={`number-card ${
                status === "correct" && question.b > question.a ? "winner" : ""
              }`}
            >
              {question.b}
            </div>
          </div>

          <div className="buttons-grid">
            {[">", "=", "<"].map((op) => (
              <button
                key={op}
                className="action-btn"
                onClick={() => handleAnswer(op)}
                disabled={status !== "idle"}
              >
                {op}
              </button>
            ))}
          </div>
          <div className="current-score">⭐ النقاط: {score}</div>
        </div>
      </div>
    </div>
  );
}
