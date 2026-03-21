import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useGameEngine } from "./hooks/useGameEngine";
import GameLayout from "./components/layout/GameLayout";
import GameSelection from "./components/GameSelection/GameSelection";
import LanguageSwitcher from "./components/LanguageSwitcher/LanguageSwitcher";
import { MATHINGO_GAMES } from "./data/gamesConfig"; // الاعتماد على هذا المصدر
import "./App.css";

const App = () => {
  const { t } = useTranslation();

  // 1️⃣ أولاً: تعريف الـ States الأساسية
  const [activeGameId, setActiveGameId] = useState(null);
  const [currentLevel, setCurrentLevel] = useState(1);

  // 2️⃣ ثانياً: تفعيل محرك اللعبة
  const { score, incrementScore, resetGame } = useGameEngine("easy");

  // 3️⃣ ثالثاً: البحث عن اللعبة النشطة من ملف الإعدادات الموحد
  const activeGameData = MATHINGO_GAMES.find((g) => g.id === activeGameId);
  const ActiveGameComponent = activeGameData ? activeGameData.component : null;

  // ✅ معالج إنهاء المستوى
  const handleLevelComplete = () => {
    console.log("تم إنهاء المستوى:", currentLevel);
    setCurrentLevel((prev) => prev + 1);
  };

  // 🔁 العودة للقائمة الرئيسية
  const handleBack = () => {
    setActiveGameId(null);
    resetGame();
    setCurrentLevel(1);
  };

  return (
    <div className="app-root">
      <LanguageSwitcher />

      {!activeGameId ? (
        // واجهة اختيار الألعاب
        <GameSelection onSelectGame={(id) => setActiveGameId(id)} />
      ) : (
        // واجهة اللعبة النشطة
        <div className="game-screen">
          <button className="back-btn" onClick={handleBack}>
            {t("back")}
          </button>

          <GameLayout score={score} level={currentLevel}>
            {ActiveGameComponent ? (
              <ActiveGameComponent
                level={currentLevel}
                onMatch={() => incrementScore(10)}
                onComplete={handleLevelComplete}
              />
            ) : (
              <div className="error-msg">
                قريباً... هذه اللعبة قيد التطوير 🚧
              </div>
            )}
          </GameLayout>

          <div className="level-indicator">
            🎯 {t("level")}: {currentLevel}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
