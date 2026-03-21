import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useMathingoAudio } from "../../hooks/useMathingoAudio";
import { GAME_LEVELS } from "../../config/gameLevels";
import "./MemoryMatch.css";

const CARD_IMAGES = ["🍎", "🍌", "🍇", "🍓", "🍒", "🍍", "🥝", "🍋"];

export default function MemoryMatch({ level, onComplete }) {
  const { t, i18n } = useTranslation();
  const { playSound, speak } = useMathingoAudio();

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const generateLevel = useCallback(() => {
    const config =
      GAME_LEVELS.MEMORY_MATCH[level] || GAME_LEVELS.MEMORY_MATCH[1];

    const selectedIcons = CARD_IMAGES.slice(0, config.pairs);
    const shuffledCards = [...selectedIcons, ...selectedIcons]
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({
        id: `card-${level}-${index}-${Math.random()}`,
        icon,
      }));

    setCards(shuffledCards);
    setMatched([]);
    setFlipped([]);
    setDisabled(false);

    console.log(`🎮 تم تجهيز المستوى ${level} بـ ${config.pairs} أزواج`);
  }, [level]);

  useEffect(() => {
    generateLevel();
  }, [level, generateLevel]);

  const handleCardClick = (index) => {
    if (disabled || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setDisabled(true);

      if (cards[newFlipped[0]].icon === cards[newFlipped[1]].icon) {
        const matchMsg = i18n.language === "ar" ? "رائع!" : "Great!";
        speak(matchMsg);
        playSound("success");

        setMatched((prev) => [...prev, ...newFlipped]);
        setFlipped([]);
        setDisabled(false);
      } else {
        playSound("error");
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 800);
      }
    }
  };

  useEffect(() => {
    if (cards.length > 0 && matched.length === cards.length) {
      const winMsg = i18n.language === "ar" ? "أحسنتِ يا بطلة!" : "Well done!";
      speak(winMsg);

      const timer = setTimeout(() => {
        onComplete();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [matched, cards.length, onComplete, i18n.language, speak]);

  const currentConfig =
    GAME_LEVELS.MEMORY_MATCH[level] || GAME_LEVELS.MEMORY_MATCH[1];
  const gridCols = currentConfig.cols;

  return (
    <div className="game-container">
      <div className="worm-section">
        <div className="bubble-container">
          <div className="speech-bubble">
            {t("memory_find_pairs")} 🐊
            <span style={{ fontSize: "0.8rem", color: "orange" }}>
              {" "}
              (المستوى: {level})
            </span>
          </div>
        </div>
        <div className="worm-avatar">🐊</div>
      </div>

      <div
        className="memory-premium-grid"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
          gap: "10px",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        {cards.map((card, index) => {
          const isOpen = flipped.includes(index) || matched.includes(index);
          return (
            <div key={card.id} className="card-scene">
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
  );
} // 👈 هذا القوس كان ناقصاً في كودكِ السابق
