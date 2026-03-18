import React, { useState, useEffect } from "react";
import { useMathingoAudio } from "../../hooks/useMathingoAudio";

export default function AdditionBalance({ onFinish, onScoreUpdate }) {
  const [problem, setProblem] = useState({ a: 0, b: 0, result: 0 });
  const [options, setOptions] = useState([]);
  const [message, setMessage] = useState("كم مجموع الرقمين؟ 🤔");
  const { playSound, speak } = useMathingoAudio();

  const generateProblem = () => {
    const a = Math.floor(Math.random() * 5) + 1;
    const b = Math.floor(Math.random() * 5) + 1;
    const result = a + b;

    // توليد خيارات عشوائية
    let opts = [result, result + 1, result - 1].filter((n) => n >= 0);
    opts = opts.sort(() => Math.random() - 0.5);

    setProblem({ a, b, result });
    setOptions(opts);
    setMessage(`${a} + ${b} = ؟`);
    speak(`${a} plus ${b}`);
  };

  useEffect(() => {
    generateProblem();
  }, []);

  const handleAnswer = (choice) => {
    if (choice === problem.result) {
      playSound("success");
      setMessage("إجابة عبقرية! ✨");
      onScoreUpdate(50);
      setTimeout(onFinish, 2000);
    } else {
      playSound("error");
      setMessage("حاول مرة أخرى يا بطل 🦾");
    }
  };

  return (
    <div className="mathingo-container">
      <h2 className="instruction-text">{message}</h2>

      <div className="math-expression">
        <span className="num-box">{problem.a}</span>
        <span className="operator">+</span>
        <span className="num-box">{problem.b}</span>
      </div>

      <div className="options-grid">
        {options.map((opt, i) => (
          <button key={i} className="opt-btn" onClick={() => handleAnswer(opt)}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
