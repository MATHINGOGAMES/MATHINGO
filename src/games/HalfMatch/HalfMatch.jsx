import React, { useState, useEffect, useCallback } from "react";
import { useMathingoAudio } from "../../hooks/useMathingoAudio";
import "./HalfMatch.css";

export default function HalfMatch({ onFinish, onScoreUpdate }) {
  const { playSound } = useMathingoAudio();

  const [currentStage, setCurrentStage] = useState(1);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("idle");
  const [gameStarted, setGameStarted] = useState(false);

  const initialWormMessage = "أهلاً بك! جد الرقم المكمل لعدد الفواكه.";
  const [wormMessage, setWormMessage] = useState(initialWormMessage);

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

  const generatePairs = useCallback((stage) => {
    const allPairs = [
      { id: 1, fruits: "🍎", number: "1️⃣" },
      { id: 2, fruits: "🍌🍌", number: "2️⃣" },
      { id: 3, fruits: "🍇🍇🍇", number: "3️⃣" },
      { id: 4, fruits: "🍓🍓🍓🍓", number: "4️⃣" },
    ];
    const pairsCount = stage === 1 ? 2 : stage === 2 ? 3 : 4;
    const selected = allPairs.slice(0, pairsCount);
    const deck = [];
    selected.forEach((p) => {
      deck.push({ type: "fruits", content: p.fruits, pairId: p.id });
      deck.push({ type: "number", content: p.number, pairId: p.id });
    });
    return deck.sort(() => Math.random() - 0.5);
  }, []);

  useEffect(() => {
    setCards(generatePairs(currentStage));
    setMatched([]);
    setFlipped([]);
  }, [currentStage, generatePairs]);

  useEffect(() => {
    if (gameStarted && wormMessage) {
      const timer = setTimeout(() => speakMessage(wormMessage), 100);
      return () => clearTimeout(timer);
    }
  }, [wormMessage, gameStarted, speakMessage]);

  const handleFlip = (index) => {
    if (status !== "idle" || flipped.includes(index) || matched.includes(index))
      return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setStatus("checking");
      const [first, second] = newFlipped;

      if (cards[first].pairId === cards[second].pairId) {
        playSound("success");
        const newMatched = [...matched, first, second];
        setMatched(newMatched);
        setScore((s) => s + 1);
        onScoreUpdate?.(1);
        setWormMessage("ممتاز! لقد وجدت التطابق.");
        setFlipped([]);
        setStatus("idle");

        if (newMatched.length === cards.length) {
          setTimeout(() => {
            if (currentStage < 3) {
              setWormMessage("رائع! لننتقل لتحدي أكبر.");
              setCurrentStage((s) => s + 1);
              setStatus("idle");
            } else {
              onFinish?.();
            }
          }, 1500);
        }
      } else {
        playSound("error");
        setWormMessage("لا، ركز وجرب العد مرة أخرى.");
        setTimeout(() => {
          setFlipped([]);
          setStatus("idle");
        }, 1200);
      }
    }
  };

  if (!gameStarted) {
    return (
      <div className="mathingo-start-overlay">
        <div className="mathingo-card">
          <div className="mathingo-icon">🧠</div>
          <h2 className="mathingo-title">تحدي الذاكرة والأرقام</h2>
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
              style={{ width: `${(matched.length / cards.length) * 100}%` }}
            ></div>
          </div>
          <div className="badge round-badge">
            {matched.length / 2} / {cards.length / 2}
          </div>
        </div>

        <div className="game-card-main">
          <div className={`memory-grid grid-size-${cards.length}`}>
            {cards.map((card, index) => {
              const isOpen = flipped.includes(index) || matched.includes(index);
              return (
                <div
                  key={`${card.pairId}-${card.type}`}
                  className={`memory-card ${isOpen ? "flipped" : ""}`}
                  onClick={() => handleFlip(index)}
                >
                  <div className="card-front">{card.content}</div>
                  <div className="card-back">❓</div>
                </div>
              );
            })}
          </div>
          <div className="current-score">⭐ النقاط: {score}</div>
        </div>
      </div>
    </div>
  );
}
