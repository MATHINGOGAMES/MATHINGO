import React, { useState, useEffect } from "react";

const OddOneOut = ({ onFinish, onScoreUpdate }) => {
  const groups = {
    fruits: ["🍎", "🍌", "🍇", "🍓"],
    animals: ["🦁", "🐱", "🐶", "🦊"],
    vehicles: ["🚗", "🚀", "✈️", "🚢"],
  };

  const [level, setLevel] = useState(1);
  const [options, setOptions] = useState([]);
  const [oddItem, setOddItem] = useState("");
  const maxLevels = 10;

  const generateLevel = () => {
    const keys = Object.keys(groups);
    const mainKey = keys[Math.floor(Math.random() * keys.length)];
    const oddKey = keys.find((k) => k !== mainKey);

    const mainItems = [...groups[mainKey]]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const target =
      groups[oddKey][Math.floor(Math.random() * groups[oddKey].length)];

    setOddItem(target);
    setOptions([...mainItems, target].sort(() => Math.random() - 0.5));
  };

  useEffect(() => {
    generateLevel();
  }, [level]);

  const check = (item) => {
    if (item === oddItem) {
      onScoreUpdate(15);
      if (level < maxLevels)
        setTimeout(() => setLevel((prev) => prev + 1), 600);
      else setTimeout(onFinish, 1500);
    }
  };

  return (
    <div className="game-container">
      <div className="level-badge">
        المرحلة: {level} / {maxLevels}
      </div>
      <h3 style={{ fontSize: "1.5rem" }}>من هو المختلف؟ 🧐</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {options.map((item, i) => (
          <button
            key={i}
            onClick={() => check(item)}
            style={{
              fontSize: "4rem",
              padding: "15px",
              background: "white",
              borderRadius: "20px",
              border: "3px solid #eee",
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};
export default OddOneOut;
