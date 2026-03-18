import React, { useState, useEffect } from "react";

const ShapeHunter = ({ onFinish, onScoreUpdate }) => {
  const shapes = ["🔴", "🟦", "🔺", "⭐", "🌙", "☁️", "🍀", "💎"];
  const [target, setTarget] = useState("");
  const [options, setOptions] = useState([]);
  const [level, setLevel] = useState(1);
  const maxLevels = 10;
  const [message, setMessage] = useState("أين هو الشكل المطلوب؟");

  const generateLevel = () => {
    const newTarget = shapes[Math.floor(Math.random() * shapes.length)];
    setTarget(newTarget);

    // تزداد الصعوبة: 4 أشكال في البداية ثم 6 ثم 9 أشكال!
    const count = level < 4 ? 4 : level < 7 ? 6 : 9;

    let newOptions = [newTarget];
    while (newOptions.length < count) {
      const s = shapes[Math.floor(Math.random() * shapes.length)];
      if (!newOptions.includes(s)) newOptions.push(s);
    }
    setOptions(newOptions.sort(() => Math.random() - 0.5));
    setMessage(`ابحث عن: ${newTarget}`);
  };

  useEffect(() => {
    generateLevel();
  }, [level]);

  const check = (s) => {
    if (s === target) {
      onScoreUpdate(10);
      if (level < maxLevels) {
        setLevel(level + 1);
      } else {
        setMessage("بطلة الأشكال! 🎉");
        setTimeout(onFinish, 1500);
      }
    } else {
      setMessage("ركزي جيداً.. جربي مرة أخرى! 🧐");
    }
  };

  return (
    <div
      className="game-container"
      style={{ textAlign: "center", padding: "10px" }}
    >
      <div
        className="level-badge"
        style={{
          background: "#4caf50",
          color: "white",
          padding: "8px 15px",
          borderRadius: "50px",
          display: "inline-block",
          marginBottom: "15px",
          fontSize: "1.2rem",
        }}
      >
        المرحلة: {level} / {maxLevels}
      </div>

      <h2 style={{ fontSize: "1.4rem", margin: "10px 0" }}>
        أين هو الشكل:
        <span
          style={{ fontSize: "3.5rem", display: "block", margin: "10px 0" }}
        >
          {target}
        </span>
      </h2>

      {/* تحسين عرض الشبكة ليكون أخف على المعالج */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: level < 7 ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
          gap: "12px",
          marginTop: "10px",
          justifyItems: "center",
        }}
      >
        {options.map((s, i) => (
          <button
            key={`${level}-${i}`} // تغيير الـ Key مع كل مستوى لتنشيط الأزرار
            onClick={() => check(s)}
            style={{
              fontSize: "3rem",
              width: "85px",
              height: "85px",
              background: "white",
              borderRadius: "20px",
              border: "3px solid #f0f0f0",
              boxShadow: "0 4px #ddd",
              touchAction: "manipulation", // تحسين استجابة اللمس على الهاتف
            }}
          >
            {s}
          </button>
        ))}
      </div>

      <h3 style={{ marginTop: "20px", color: "#555", minHeight: "1.5em" }}>
        {message}
      </h3>
    </div>
  );
};
export default ShapeHunter;
