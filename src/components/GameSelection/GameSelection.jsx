import React from "react";
import { useTranslation } from "react-i18next";
import { GAMES_LIST } from "../../games"; // استيراد القائمة من سجل الألعاب
import "./GameSelection.css";

const GameSelection = ({ onSelectGame }) => {
  const { t } = useTranslation();

  return (
    <div className="game-selection-container">
      <h1 className="main-title">{t("welcome")}</h1>
      <div className="games-grid">
        {GAMES_LIST.map((game) => (
          <button
            key={game.id}
            className="game-card"
            onClick={() => onSelectGame(game.id)}
          >
            <span className="game-icon">{game.flag || game.icon}</span>
            <span className="game-name">{t(game.id) || game.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// هذا هو السطر الذي يحل الخطأ الحالي 👇
export default GameSelection;
