import React from "react";
import "./GameLayout.css"; // تأكد من وجود ملف التنسيق أو احذف السطر إذا لم ينشأ بعد

const GameLayout = ({ children, score, level }) => {
  return (
    <div className="game-layout-container">
      <header className="game-header">
        <div className="stat-box">
          <span>⭐ {score}</span>
        </div>
        <div className="stat-box">
          <span>Level: {level}</span>
        </div>
      </header>

      <main className="game-content">{children}</main>
    </div>
  );
};

// السطر السحري الذي يحل المشكلة الحالية 👇
export default GameLayout;
