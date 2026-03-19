// src/pages/GamesHub.jsx
import React from "react";

export default function GamesHub({ games, onSelectGame, currentLevel }) {
  return (
    <div className="hub-grid">
      {games.map((game) => (
        <div
          key={game.id}
          className={`hub-card ${currentLevel < game.minLevel ? "locked" : ""}`}
          onClick={() => onSelectGame(game.id)}
        >
          <div className="hub-icon">{game.icon}</div>
          <div className="hub-title">{game.title}</div>
          {currentLevel < game.minLevel && (
            <div className="locked-label">🔒</div>
          )}
        </div>
      ))}
    </div>
  );
}
