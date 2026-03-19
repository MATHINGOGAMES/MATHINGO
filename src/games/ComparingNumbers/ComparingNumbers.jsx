// src/games/ComparingNumbers/ComparingNumbers.jsx
import React, { useState } from "react";
import { useMathingoAudio } from "../../hooks/useMathingoAudio";

export default function ComparingNumbers({ onFinish, onScoreUpdate }) {
  const { playSound } = useMathingoAudio();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const questions = [
    { a: 3, b: 5 },
    { a: 8, b: 2 },
    { a: 4, b: 4 },
  ];

  const handleAnswer = (choice) => {
    const correct =
      (choice === ">" &&
        questions[questionIndex].a > questions[questionIndex].b) ||
      (choice === "<" &&
        questions[questionIndex].a < questions[questionIndex].b) ||
      (choice === "=" &&
        questions[questionIndex].a === questions[questionIndex].b);

    if (correct) {
      playSound("success");
      setScore((prev) => prev + 1);
      onScoreUpdate && onScoreUpdate(1);
    } else {
      playSound("error");
    }

    if (questionIndex + 1 < questions.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      onFinish && onFinish();
    }
  };

  const q = questions[questionIndex];

  return (
    <div style={{ padding: 20 }}>
      <h2>📝 أي الأرقام أكبر؟</h2>
      <p style={{ fontSize: 32 }}>
        {q.a} ? {q.b}
      </p>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <button onClick={() => handleAnswer(">")}>{">"}</button>
        <button onClick={() => handleAnswer("<")}>{"<"}</button>
        <button onClick={() => handleAnswer("=")}>=</button>
      </div>
      <p>النقاط الحالية: {score}</p>
    </div>
  );
}
