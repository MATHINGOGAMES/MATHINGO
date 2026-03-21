import React from "react";
import { useTranslation } from "react-i18next";

export default function GameWrapper({ children, title, instructionKey }) {
  const { t } = useTranslation();

  return (
    <div className="game-universal-container">
      <div className="worm-section">
        <div className="bubble-container">
          <div className="speech-bubble">{t(instructionKey)} 🐊</div>
        </div>
        <div className="worm-avatar">🐊</div>
      </div>

      <h2 className="game-inner-title">{t(title)}</h2>

      <div className="game-content-area">
        {children} {/* هنا توضع اللعبة (ذاكرة، ألوان، أرقام) */}
      </div>
    </div>
  );
}
