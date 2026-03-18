import React, { useState } from "react";
import GamesHub from "./pages/GamesHub";

// 1. الاستيرادات (تأكد من إضافة PatternLogic)
import ComparingNumbers from "./games/ComparingNumbers/ComparingNumbers";
import NumberSorting from "./games/NumberSorting/NumberSorting";
import MemoryMatch from "./games/MemoryMatch/MemoryMatch";
import AdditionBalance from "./games/AdditionBalance/AdditionBalance";
import CountingFruits from "./games/CountingFruits/CountingFruits";
import PatternLogic from "./games/PatternLogic/PatternLogic"; // أضف هذا السطر
import NumberWords from "./games/NumberWords/NumberWords";
import ShapeHunter from "./games/ShapeHunter/ShapeHunter";
import ShadowMatch from "./games/ShadowMatch/ShadowMatch";
import OddOneOut from "./games/OddOneOut/OddOneOut";
import SizeComparison from "./games/SizeComparison/SizeComparison";
import ColorSorting from "./games/ColorSorting/ColorSorting";
import MiniPuzzle from "./games/MiniPuzzle/MiniPuzzle";
import TimeFun from "./games/TimeFun/TimeFun";
import AnimalHome from "./games/AnimalHome/AnimalHome";
export default function App() {
  const [currentGame, setCurrentGame] = useState(null);
  const [score, setScore] = useState(0);

  const goToHub = () => setCurrentGame(null);
  const updateScore = (points) => setScore((prev) => prev + points);

  const renderGame = () => {
    switch (currentGame) {
      // 2. تصحيح الأسماء والمكونات هنا:
      case "counting-fruits": // تأكد أنها أحرف صغيرة كما في gamesConfig
        return (
          <CountingFruits onFinish={goToHub} onScoreUpdate={updateScore} />
        );
case "animal-home": // تأكد أنها أحرف صغيرة كما في gamesConfig
        return (
          <AnimalHome onFinish={goToHub} onScoreUpdate={updateScore} />
        );
 case "time-fun": // تأكد أنها أحرف صغيرة كما في gamesConfig
        return (
          <TimeFun onFinish={goToHub} onScoreUpdate={updateScore} />
        );
case "mini-puzzle": // تأكد أنها أحرف صغيرة كما في gamesConfig
        return (
          <MiniPuzzle onFinish={goToHub} onScoreUpdate={updateScore} />
        );
        case "color-sorting": // تأكد أنها أحرف صغيرة كما في gamesConfig
        return (
          <ColorSorting onFinish={goToHub} onScoreUpdate={updateScore} />
        );
      case "shadow-match": // تأكد أنها أحرف صغيرة كما في gamesConfig
        return <ShadowMatch onFinish={goToHub} onScoreUpdate={updateScore} />;
      case "size-comparison": // تأكد أنها أحرف صغيرة كما في gamesConfig
        return (
          <SizeComparison onFinish={goToHub} onScoreUpdate={updateScore} />
        );
      case "odd-one-out": // تأكد أنها أحرف صغيرة كما في gamesConfig
        return <OddOneOut onFinish={goToHub} onScoreUpdate={updateScore} />;
      case "shape-hunter": // تأكد أنها أحرف صغيرة كما في gamesConfig
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
        return <GamesHub onSelectGame={(id) => setCurrentGame(id)} />;
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>
          ماتينجو 🐊 <span className="score-badge">نقاطك: {score}</span>
        </h1>
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
