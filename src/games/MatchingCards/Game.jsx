import React, { useState, useEffect } from "react";
import { useGameEngine } from "../../hooks/useGameEngine";
import GameLayout from "../../components/layout/GameLayout";
import { generateQuestions } from "./utils/generateQuestions";
import "./style.css";
const { speak } = useVoice();
const { t } = useTranslation();

// عند حدوث تطابق ناجح:
if (isMatch) {
  incrementScore(10);
  speak(t("excellent")); // سينطق "ممتاز" باللغة المختارة!
}
const MatchingCards = ({ level, onComplete }) => {
  // 1. توليد البطاقات عند بدء اللعبة أو تغيير المستوى
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]); // البطاقات المفتوحة حالياً (كحد أقصى 2)
  const [matchedIds, setMatchedIds] = useState([]); // معرفات البطاقات التي تم مطابقتها بنجاح

  // استخدام المحرك الموحد لإدارة النقاط والوقت والمستويات
  const { score, incrementScore, nextLevel } = useGameEngine();

  useEffect(() => {
    const newCards = generateQuestions(level, "colors"); // يمكن تغيير 'colors' إلى 'math' أو 'shapes'
    setCards(newCards);
    setMatchedIds([]);
    setFlippedCards([]);
  }, [level]);

  // 2. منطق اختيار البطاقة
  const handleCardClick = (card) => {
    // منع النقر إذا كانت البطاقة مفتوحة أصلاً أو مطابقة أو إذا كان هناك بطاقتان مفتوحتان بالفعل
    if (
      flippedCards.length === 2 ||
      flippedCards.find((c) => c.id === card.id) ||
      matchedIds.includes(card.matchId)
    ) {
      return;
    }

    const newFlipped = [...flippedCards, card];
    setFlippedCards(newFlipped);

    // التحقق من التطابق عند فتح بطاقتين
    if (newFlipped.length === 2) {
      if (newFlipped[0].matchId === newFlipped[1].matchId) {
        // تطابق ناجح!
        setMatchedIds([...matchedIds, card.matchId]);
        setFlippedCards([]);
        incrementScore(10); // زيادة النقاط

        // التحقق من نهاية المرحلة
        if (matchedIds.length + 1 === cards.length / 2) {
          setTimeout(() => onComplete(), 1000);
        }
      } else {
        // فشل التطابق: إغلاق البطاقات بعد ثانية واحدة
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  return (
    <GameLayout score={score} level={level}>
      <div className="matching-grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card-item ${
              flippedCards.find((c) => c.id === card.id) ||
              matchedIds.includes(card.matchId)
                ? "flipped"
                : ""
            }`}
            onClick={() => handleCardClick(card)}
          >
            <div className="card-inner">
              <div className="card-front">?</div>
              <div
                className="card-back"
                style={{
                  backgroundColor:
                    card.type === "color" ? card.content : "#fff",
                }}
              >
                {card.type !== "color" && card.displayText}
                {card.type === "color" && (
                  <span className="color-icon">{card.displayText}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </GameLayout>
  );
};

export default MatchingCards;
