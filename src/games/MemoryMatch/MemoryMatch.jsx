import React, { useState, useEffect, useCallback } from "react";
import { useMathingoAudio } from "../../hooks/useMathingoAudio";
import "./MemoryMatch.css";

const CARD_IMAGES = ["🍎", "🍌", "🍇", "🍓", "🍒", "🍍", "🥝", "🍋"];

export default function MemoryMatch({
  level,
  onMatch,
  onComplete,
  onScoreUpdate,
}) {
  const { playSound } = useMathingoAudio();
  const [gameStarted, setGameStarted] = useState(false);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [showWinEffect, setShowWinEffect] = useState(false);

  const generateLevel = useCallback(() => {
    let pairCount = level <= 1 ? 4 : level === 2 ? 6 : 8;
    const selectedIcons = CARD_IMAGES.slice(0, pairCount);
    const shuffledCards = [...selectedIcons, ...selectedIcons]
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({ id: `card-${index}-${Date.now()}`, icon }));
    setCards(shuffledCards);
    setMatched([]);
    setFlipped([]);
    setDisabled(false);
    setShowWinEffect(false);
  }, [level]);

  useEffect(() => {
    if (gameStarted) generateLevel();
  }, [gameStarted, generateLevel]);

  const handleCardClick = (index) => {
    if (disabled || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setDisabled(true);
      const [first, second] = newFlipped;

      if (cards[first].icon === cards[second].icon) {
        // ✅ تطابق صحيح
        setTimeout(() => {
          setMatched((prev) => [...prev, first, second]);
          setFlipped([]);
          setDisabled(false);
          playSound("success"); // تأكدي أن هذا الصوت موجود في هوك الصوت الخاص بكِ
          onMatch?.();
          onScoreUpdate?.(10);
        }, 300);
      } else {
        // ❌ خطأ
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 800);
      }
    }
  };

  useEffect(() => {
    if (cards.length > 0 && matched.length === cards.length) {
      setShowWinEffect(true);
      setTimeout(onComplete, 2500);
    }
  }, [matched, cards, onComplete]);

  if (!gameStarted) {
    return (
      <div className="mathingo-start-overlay">
        <div className="mathingo-card pop-in">
          <div className="mathingo-icon-bounce">🧠</div>
          <h2 className="mathingo-title">لعبة الذاكرة الذكية</h2>
          <p style={{ marginBottom: "20px", color: "#666" }}>
            هل يمكنكِ إيجاد كل الأزواج؟
          </p>
          <button
            className="mathingo-btn-primary pulse"
            onClick={() => setGameStarted(true)}
          >
            🚀 هيا بنا نلعب!
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="compare-wrapper">
      {showWinEffect && (
        <div className="win-overlay">⭐ أحسنتِ يا بطلة! ⭐</div>
      )}

      <div className="game-container">
        <div className="worm-section">
          <div className="bubble-container">
            <div className="speech-bubble">
              رائع! ابحثي عن الفواكه المتشابهة 🍎
            </div>
          </div>
          <div className="worm-avatar">🐊</div>
        </div>

        <div className="game-card-main">
          <div className="memory-premium-grid">
            {cards.map((card, index) => {
              const isOpen = flipped.includes(index) || matched.includes(index);
              const isMatched = matched.includes(index);

              return (
                <div
                  key={card.id}
                  className={`card-scene ${isMatched ? "card-done" : ""}`}
                >
                  <div
                    className={`card-item ${isOpen ? "is-flipped" : ""}`}
                    onClick={() => handleCardClick(index)}
                  >
                    <div className="card-face card-front-face">🐊</div>
                    <div className="card-face card-back-face">{card.icon}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
