import React from "react";
import { useTranslation } from "react-i18next";
import { MATHINGO_GAMES } from "../../data/gamesConfig"; // ✅ الاستيراد صحيح هنا
import "./GameSelection.css";

const GameSelection = ({ onSelectGame }) => {
  const { t } = useTranslation();

  return (
    <div className="game-selection-container">
      <h1 className="main-title">{t("welcome")}</h1>
      <div className="games-grid">
        {/* 🚀 التعديل هنا: نستخدم MATHINGO_GAMES بدلاً من GAMES_LIST */}
        {MATHINGO_GAMES.map((game) => (
          <button
            key={game.id}
            className="game-card"
            style={{ "--card-color": game.color }} // لإعطاء كل بطاقة لونها المميز
            onClick={() => onSelectGame(game.id)}
          >
            <span className="game-icon">{game.icon}</span>
            <span className="game-name">{game.title || t(game.id)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameSelection;
