import React, { useState, useEffect } from "react";
import { useMathingoAudio } from "../../hooks/useMathingoAudio";

export default function MemoryMatch({ onFinish, onScoreUpdate }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const { playSound } = useMathingoAudio();

  useEffect(() => {
    const numbers = [1, 2, 3, 4];
    const pairNumbers = [...numbers, ...numbers]
      .sort(() => Math.random() - 0.5)
      .map((n, i) => ({ id: i, value: n }));
    setCards(pairNumbers);
  }, []);

  const handleClick = (id) => {
    if (flipped.length === 2 || solved.includes(id) || flipped.includes(id))
      return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first].value === cards[second].value) {
        setSolved([...solved, first, second]);
        setFlipped([]);
        playSound("success");
        onScoreUpdate(20);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  useEffect(() => {
    if (solved.length === cards.length && cards.length > 0) {
      setTimeout(onFinish, 1500);
    }
  }, [solved]);

  return (
    <div className="mathingo-container">
      <h2 className="instruction-text">ابحث عن الأرقام المتشابهة! 🧠</h2>
      <div className="memory-grid">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`memory-card ${
              flipped.includes(index) || solved.includes(index)
                ? "is-flipped"
                : ""
            }`}
            onClick={() => handleClick(index)}
          >
            <div className="card-front">?</div>
            <div className="card-back">{card.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
