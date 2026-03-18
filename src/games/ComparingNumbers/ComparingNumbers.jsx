import React, { useState, useEffect, useCallback } from "react";
import { useMathingoAudio } from "../../hooks/useMathingoAudio";

export default function ComparingNumbers({ onFinish, onScoreUpdate }) {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [result, setResult] = useState(null); // 'success' | 'fail' | null
  const { playSound, speak } = useMathingoAudio();

  const generateChallenge = useCallback(() => {
    const n1 = Math.floor(Math.random() * 10) + 1;
    const n2 = Math.floor(Math.random() * 10) + 1;
    setNum1(n1);
    setNum2(n2);
    setResult(null);
    speak("Which number is bigger?");
  }, [speak]);

  useEffect(() => {
    generateChallenge();
  }, [generateChallenge]);

  const checkAnswer = (operator) => {
    let isCorrect = false;
    if (operator === ">") isCorrect = num1 > num2;
    if (operator === "<") isCorrect = num1 < num2;
    if (operator === "=") isCorrect = num1 === num2;

    if (isCorrect) {
      setResult("success");
      playSound("success");
      speak("Great! The crocodile is happy!");
      onScoreUpdate(20);
      setTimeout(onFinish, 2000);
    } else {
      setResult("fail");
      playSound("error");
      speak("Oops! Try again.");
      setTimeout(() => setResult(null), 1000);
    }
  };

  return (
    <div className="mathingo-container compare-game">
      <h2 className="instruction-text">Help the hungry crocodile! 🐊</h2>

      <div className="comparison-area">
        <div className="number-box">{num1}</div>

        <div className="operators-grid">
          <button className="op-btn" onClick={() => checkAnswer(">")}>
            {" "}
            {num1 > num2 ? "🐊 >" : ">"}{" "}
          </button>
          <button className="op-btn" onClick={() => checkAnswer("=")}>
            {" "}
            ={" "}
          </button>
          <button className="op-btn" onClick={() => checkAnswer("<")}>
            {" "}
            {num2 > num1 ? "< 🐊" : "<"}{" "}
          </button>
        </div>

        <div className="number-box">{num2}</div>
      </div>

      {result === "success" && (
        <div className="celebration">🌟 Awesome! 🌟</div>
      )}
    </div>
  );
}
