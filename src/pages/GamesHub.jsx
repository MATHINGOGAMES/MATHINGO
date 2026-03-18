import React from "react";
import { MATHINGO_GAMES } from "../data/gamesConfig";

export default function GamesHub({ onSelectGame }) {
  const handleGameClick = (e, gameId) => {
    // هذه السطور تمنع المتصفح من تنفيذ أي سلوك افتراضي (مثل الانتقال لرابط)
    e.preventDefault();
    e.stopPropagation();
    console.log("تم اختيار اللعبة بنجاح:", gameId);
    onSelectGame(gameId);
  };

  return (
    <div className="hub-container">
      <h2 className="hub-title">مرحباً بك في ماتينجو! ✨</h2>
      <div className="games-grid">
        {MATHINGO_GAMES.map((game) => (
          <div
            key={game.id}
            className="game-card"
            style={{ "--card-color": game.color, cursor: "pointer" }}
            onClick={(e) => handleGameClick(e, game.id)}
          >
            <span className="game-icon">{game.icon}</span>
            <h3 className="game-card-title">{game.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
