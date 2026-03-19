import React, { useState } from "react";
import GamesHub from "./pages/GamesHub";
import { useSound } from "./useSound"; // 1. استيراد أداة الصوت

// الاستيرادات الخاصة بالألعاب
import ComparingNumbers from "./games/ComparingNumbers/ComparingNumbers";
import NumberSorting from "./games/NumberSorting/NumberSorting";
import MemoryMatch from "./games/MemoryMatch/MemoryMatch";
import AdditionBalance from "./games/AdditionBalance/AdditionBalance";
import CountingFruits from "./games/CountingFruits/CountingFruits";
import PatternLogic from "./games/PatternLogic/PatternLogic";
import NumberWords from "./games/NumberWords/NumberWords";
import ShapeHunter from "./games/ShapeHunter/ShapeHunter";
import ShadowMatch from "./games/ShadowMatch/ShadowMatch";
import OddOneOut from "./games/OddOneOut/OddOneOut";
import SizeComparison from "./games/SizeComparison/SizeComparison";
import ColorSorting from "./games/ColorSorting/ColorSorting";
import MiniPuzzle from "./games/MiniPuzzle/MiniPuzzle";
import TimeFun from "./games/TimeFun/TimeFun";
import AnimalHome from "./games/AnimalHome/AnimalHome";
import HalfMatch from "./games/HalfMatch/HalfMatch";
import AnimalSounds from "./games/AnimalSounds/AnimalSounds";
export default function App() {
  const [currentGame, setCurrentGame] = useState(null);
  const [score, setScore] = useState(0);

  // 2. تفعيل الأصوات
  const { playPop, playSuccess } = useSound();

  const goToHub = () => {
    playPop(); // صوت عند العودة للرئيسية
    setCurrentGame(null);
  };

  const updateScore = (points) => {
    if (points > 0) playSuccess(); // صوت عند الفوز بنقاط
    setScore((prev) => prev + points);
  };

  const handleSelectGame = (id) => {
    playPop(); // صوت عند اختيار لعبة
    setCurrentGame(id);
  };

  const renderGame = () => {
    switch (currentGame) {
      case "Half-Match":
        return <HalfMatch onFinish={goToHub} onScoreUpdate={updateScore} />;
      case "Animal-Sounds":
        return <AnimalSounds onFinish={goToHub} onScoreUpdate={updateScore} />;
      case "counting-fruits":
        return (
          <CountingFruits onFinish={goToHub} onScoreUpdate={updateScore} />
        );
      case "animal-home":
        return <AnimalHome onFinish={goToHub} onScoreUpdate={updateScore} />;
      case "time-fun":
        return <TimeFun onFinish={goToHub} onScoreUpdate={updateScore} />;
      case "mini-puzzle":
        return <MiniPuzzle onFinish={goToHub} onScoreUpdate={updateScore} />;
      case "color-sorting":
        return <ColorSorting onFinish={goToHub} onScoreUpdate={updateScore} />;
      case "shadow-match":
        return <ShadowMatch onFinish={goToHub} onScoreUpdate={updateScore} />;
      case "size-comparison":
        return (
          <SizeComparison onFinish={goToHub} onScoreUpdate={updateScore} />
        );
      case "odd-one-out":
        return <OddOneOut onFinish={goToHub} onScoreUpdate={updateScore} />;
      case "shape-hunter":
        return <ShapeHunter onFinish={goToHub} onScoreUpdate={updateScore} />;
      case "pattern-logic":
        return <PatternLogic onFinish={goToHub} onScoreUpdate={updateScore} />;
      case "comparing-numbers":
        return (
          <ComparingNumbers onFinish={goToHub} onScoreUpdate={updateScore} />
        );
      case "number-sorting":
        return <NumberSorting onFinish={goToHub} onScoreUpdate={updateScore} />;
      case "memory-match":
        return <MemoryMatch onFinish={goToHub} onScoreUpdate={updateScore} />;
      case "number-words":
        return <NumberWords onFinish={goToHub} onScoreUpdate={updateScore} />;
      case "addition-balance":
        return (
          <AdditionBalance onFinish={goToHub} onScoreUpdate={updateScore} />
        );
      default:
        return <GamesHub onSelectGame={handleSelectGame} />;
    }
    // دالة المشاركة الذكية
    const shareGame = () => {
      const text =
        "اكتشفت هذا الموقع الرائع (Mathingo) لألعاب الذكاء والحساب للأطفال! آمن، تعليمي وبدون إعلانات. جربه مع أطفالك: ";
      const url = window.location.href;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
        text + url
      )}`;
      window.open(whatsappUrl, "_blank");
    };

    // داخل الـ return في App.jsx، أضيفي هذا الزر الجذاب:
    <button
      onClick={shareGame}
      style={{
        backgroundColor: "#25D366", // لون واتساب الأخضر
        color: "white",
        padding: "15px 25px",
        borderRadius: "50px",
        border: "none",
        fontSize: "1.2rem",
        fontWeight: "bold",
        margin: "20px auto",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        cursor: "pointer",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <span>أرسل اللعبة لصديق عبر واتساب</span> 🚀
    </button>;
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h2>
          مرحباً بكم في عالم ماتينجو الممتع 🐊{" "}
          <span className="score-badge">نقاطك: {score}</span>
        </h2>
        {currentGame && (
          <button className="back-btn" onClick={goToHub}>
            🏠 العودة للرئيسية
          </button>
        )}
      </header>

      <main>{renderGame()}</main>
    </div>
  );
}
