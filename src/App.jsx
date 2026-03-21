import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useGameEngine } from "./hooks/useGameEngine";
import GameLayout from "./components/layout/GameLayout";
import GameSelection from "./components/GameSelection/GameSelection";
import LanguageSwitcher from "./components/LanguageSwitcher/LanguageSwitcher";
import { GAMES_COMPONENTS } from "./games"; // تأكد من وجود هذا الاستيراد
import "./App.css";

const App = () => {
  const { t } = useTranslation();
  // المحرك العام للعبة (النقاط والمستويات)
  const {
    score,
    level,
    incrementScore,
    goToNextLevel,
    resetGame,
  } = useGameEngine("easy");

  // الحالة التي تخزن اللعبة المختارة حالياً
  const [activeGameId, setActiveGameId] = useState(null);

  // السطر السحري: استخراج المكون البرمجي بناءً على الـ ID المختار
  const ActiveGameComponent = activeGameId
    ? GAMES_COMPONENTS[activeGameId]
    : null;

  return (
    <div className="app-root">
      {/* 1. مبدل اللغات يظهر دائماً */}
      <LanguageSwitcher />

      {/* 2. إذا لم يتم اختيار لعبة، اظهر شاشة الاختيار */}
      {!activeGameId ? (
        <GameSelection onSelectGame={(id) => setActiveGameId(id)} />
      ) : (
        /* 3. إذا تم اختيار لعبة، اظهر واجهة اللعب */
        <div className="game-screen">
          <button
            className="back-btn"
            onClick={() => {
              setActiveGameId(null);
              resetGame();
            }}
          >
            {t("back")}
          </button>

          <GameLayout score={score} level={level}>
            {/* تشغيل المكون الفعلي للعبة وتمرير الوظائف له */}
            {ActiveGameComponent ? (
              <ActiveGameComponent
                level={level}
                onMatch={() => incrementScore(10)}
                onComplete={goToNextLevel}
              />
            ) : (
              <div className="error-msg">
                قريباً... هذه اللعبة قيد التطوير 🚧
              </div>
            )}
          </GameLayout>
        </div>
      )}
    </div>
  );
};

export default App;
