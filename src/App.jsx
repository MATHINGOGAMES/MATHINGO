// src/App.jsx
import React, { useState } from "react";
import GamesHub from "./pages/GamesHub";
import { MATHINGO_GAMES } from "./data/gamesConfig";
import { useMathingoAudio } from "./hooks/useMathingoAudio";
import * as GameComponents from "./games"; // بعد إضافة index.js لكل الألعاب

export default function App() {
  const [currentGame, setCurrentGame] = useState(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);

  const { playSound, speak } = useMathingoAudio();

  const goToHub = () => {
    playSound("success");
    setCurrentGame(null);
  };

  const updateScore = (points) => {
    if (points > 0) playSound("success");
    const newScore = score + points;
    setScore(newScore);

    // مثال: كل 5 نقاط مستوى أعلى
    const newLevel = Math.floor(newScore / 5) + 1;
    if (newLevel > level) setLevel(newLevel);
  };

  const handleSelectGame = (gameId) => {
    const gameConfig = MATHINGO_GAMES.find((g) => g.id === gameId);
    if (!gameConfig) return;

    if (level >= gameConfig.minLevel) {
      setCurrentGame(gameId);
      playSound("success");
    } else {
      speak("هذه اللعبة ستفتح عند مستوى أعلى!");
    }
  };

  const renderGame = () => {
    if (!currentGame) {
      // عرض GamesHub مع الألعاب المتاحة حسب المستوى
      return (
        <GamesHub
          games={MATHINGO_GAMES.filter((g) => g.minLevel <= level)}
          onSelectGame={handleSelectGame}
          currentLevel={level}
        />
      );
    }

    // تحويل gameId إلى اسم مكون CamelCase
    const componentName = currentGame
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join("");

    const GameComponent = GameComponents[componentName];

    if (!GameComponent) return <h2>⚠️ اللعبة غير موجودة</h2>;

    return (
      <GameComponent
        onFinish={goToHub}
        onScoreUpdate={updateScore}
        currentLevel={level}
      />
    );
  };

  const currentColor =
    MATHINGO_GAMES.find((g) => g.id === currentGame)?.color || "#fff";

  return (
    <div className="app-container">
      <header className="app-header">
        <h2>
          🐊 مستوى: {level} | نقاطك: {score}
        </h2>
        {currentGame && (
          <button className="back-btn" onClick={goToHub}>
            🏠 العودة للرئيسية
          </button>
        )}
      </header>

      {/* حاوية الألعاب المركزية */}
      <div
        className="game-wrapper"
        style={{ backgroundColor: currentGame ? currentColor : "transparent" }}
      >
        {renderGame()}
      </div>
    </div>
  );
}
