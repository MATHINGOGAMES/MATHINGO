// src/App.jsx
import React, { useState, useEffect } from "react";
import GamesHub from "./pages/GamesHub";
import { MATHINGO_GAMES } from "./data/gamesConfig";
import { useMathingoAudio } from "./hooks/useMathingoAudio";
import * as GameComponents from "./games";
import Confetti from "react-confetti";
export default function App() {
  const [currentGame, setCurrentGame] = useState(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [stars, setStars] = useState(0);

  const { playSound, speak } = useMathingoAudio();

  // ✅ تحميل البيانات
  useEffect(() => {
    const savedScore = localStorage.getItem("score");
    const savedLevel = localStorage.getItem("level");
    const savedStars = localStorage.getItem("stars");

    if (savedScore) setScore(Number(savedScore));
    if (savedLevel) setLevel(Number(savedLevel));
    if (savedStars) setStars(Number(savedStars));
  }, []);

  // ✅ حفظ البيانات
  useEffect(() => {
    localStorage.setItem("score", score);
    localStorage.setItem("level", level);
    localStorage.setItem("stars", stars);
  }, [score, level, stars]);

  // 🔙 العودة
  const goToHub = () => {
    playSound("success");
    setCurrentGame(null);
  };

  // ⭐ تحديث النقاط
  const updateScore = (points) => {
    if (points > 0) playSound("success");

    const newScore = score + points;
    setScore(newScore);

    // ⭐ نجوم
    const newStars = Math.floor(newScore / 3);
    setStars(newStars);

    if (points > 0 && newScore % 3 === 0) {
      speak("رائع! حصلت على نجمة!");
    }

    // 🆙 مستوى
    const newLevel = Math.floor(newScore / 5) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
      speak("مستوى جديد!");
    }
  };

  // 🎮 اختيار لعبة
  const handleSelectGame = (gameId) => {
    const game = MATHINGO_GAMES.find((g) => g.id === gameId);
    if (!game) return;

    if (level >= game.minLevel) {
      setCurrentGame(gameId);
      playSound("success");
    } else {
      speak("هذه اللعبة مقفلة، ارفع مستواك أولاً!");
    }
  };

  // 🧠 عرض اللعبة
  const renderGame = () => {
    if (!currentGame) {
      return (
        <GamesHub
          games={MATHINGO_GAMES}
          currentLevel={level}
          onSelectGame={handleSelectGame}
        />
      );
    }

    const componentName = currentGame
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
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
    MATHINGO_GAMES.find((g) => g.id === currentGame)?.color || "#f0f8ff";

  return (
    <div className="app-container">
      <header className="app-header">
        <h2>
          🐊 مستوى: {level} | نقاط: {score} | ⭐ {stars}
        </h2>

        {currentGame && (
          <button className="back-btn" onClick={goToHub}>
            🏠 العودة للرئيسية
          </button>
        )}
      </header>

      <div
        className="game-wrapper"
        style={{
          backgroundColor: currentGame ? currentColor : "transparent",
        }}
      >
        {renderGame()}
      </div>
    </div>
  );
}
