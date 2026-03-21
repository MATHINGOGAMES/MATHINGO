import React from "react";
import { useTranslation } from "react-i18next"; // ✅ الخطوة 1: استيراد هوك الترجمة
import "./GameLayout.css";

const GameLayout = ({ children, score, level, title }) => {
  const { t } = useTranslation(); // ✅ الخطوة 2: تعريف دالة t داخل المكون

  return (
    <div className="game-screen-wrapper">
      {/* البار العلوي الاحترافي */}
      <div className="game-top-bar">
        <div className="stat-item score">
          <span className="stat-icon">⭐</span>
          <span className="stat-value">{score}</span>
        </div>

        <h2 className="game-active-title">{title}</h2>

        <div className="stat-item level">
          <span className="stat-icon">🎯</span>
          {/* ✅ الآن t("level") ستعمل ولن تسبب خطأ */}
          <span className="stat-label">{t("level")}:</span>
          <span className="stat-value">{level}</span>
        </div>
      </div>

      <div className="game-main-content">{children}</div>
    </div>
  );
};

export default GameLayout;
