import React, { useState, useEffect, useCallback } from "react";
import { useMathingoAudio } from "../../hooks/useMathingoAudio";
import "./MemoryMatch.css";

export default function MemoryMatch({ onFinish, onScoreUpdate }) {
  const { playSound } = useMathingoAudio();

  // 🎮 الحالات الأساسية
  const [currentStage, setCurrentStage] = useState(1);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("idle");
  const [gameStarted, setGameStarted] = useState(false);
  const [wormMessage, setWormMessage] = useState(
    "أين تختبئ الصور المتشابهة؟ ركز جيداً!"
  );

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

  // توليد البطاقات بناءً على المرحلة
  const generateCards = useCallback((stage) => {
    const icons = ["🍎", "🍌", "🍓", "🍇", "🍊", "🍍", "🥝", "🍉"];
    // عدد الأزواج: المرحلة 1 (2 أزواج)، المرحلة 2 (4 أزواج)، المرحلة 3 (6 أزواج)
    const pairsCount = stage === 1 ? 2 : stage === 2 ? 4 : 6;
    const selectedIcons = icons.slice(0, pairsCount);
    const deck = [...selectedIcons, ...selectedIcons].sort(
      () => Math.random() - 0.5
    );
    return deck;
  }, []);

  // البداية وتغيير المراحل
  useEffect(() => {
    setCards(generateCards(currentStage));
    setMatched([]);
    setFlipped([]);
  }, [currentStage, generateCards]);

  useEffect(() => {
    if (gameStarted && wormMessage) {
      const timer = setTimeout(() => speakMessage(wormMessage), 100);
      return () => clearTimeout(timer);
    }
  }, [wormMessage, gameStarted, speakMessage]);

  const handleFlip = (index) => {
    if (
      flipped.length === 2 ||
      flipped.includes(index) ||
      matched.includes(index)
    )
      return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first] === cards[second]) {
        // ✅ تطابق صحيح
        playSound("success");
        const newMatched = [...matched, first, second];
        setMatched(newMatched);
        setScore((s) => s + 1);
        onScoreUpdate?.(1);
        setWormMessage("رائع! ذاكرتك قوية جداً.");
        setFlipped([]);

        // التحقق من نهاية المرحلة
        if (newMatched.length === cards.length) {
          setTimeout(() => {
            if (currentStage < 3) {
              setWormMessage("أنهيت المرحلة! لنزد عدد البطاقات الآن.");
              setTimeout(() => setCurrentStage((s) => s + 1), 2000);
            } else {
              setWormMessage("أنت ملك الذاكرة! أحسنت صنعاً.");
              onFinish?.();
            }
          }, 1000);
        }
      } else {
        // ❌ خطأ
        playSound("error");
        setWormMessage("لا بأس، حاول تذكر مكانها.");
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  if (!gameStarted) {
    return (
      <div className="start-overlay">
        <div className="start-box">
          <div className="worm-intro">🧠</div>
          <h2>تحدي الذاكرة الذكي</h2>
          <p>ابحث عن الأزواج المتشابهة في أقل وقت ممكن!</p>
          <button className="start-btn" onClick={() => setGameStarted(true)}>
            🚀 اختبر ذاكرتي
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
              style={{ width: `${(matched.length / cards.length) * 100}%` }}
            ></div>
          </div>
          <div className="badge round-badge">
            {matched.length / 2} / {cards.length / 2}
          </div>
        </div>

        <div className="game-card-main">
          <div className={`memory-grid grid-cols-${currentStage}`}>
            {cards.map((card, index) => {
              const isFlipped =
                flipped.includes(index) || matched.includes(index);
              return (
                <div
                  key={index}
                  className={`memory-card ${isFlipped ? "flipped" : ""}`}
                  onClick={() => handleFlip(index)}
                >
                  <div className="card-front">{card}</div>
                  <div className="card-back">❓</div>
                </div>
              );
            })}
          </div>
          <div className="current-score">
            ⭐ التطابقات: {matched.length / 2}
          </div>
        </div>
      </div>
    </div>
  );
}
