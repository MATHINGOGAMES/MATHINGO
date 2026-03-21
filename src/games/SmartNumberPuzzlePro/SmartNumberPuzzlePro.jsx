import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useGameEngine } from "../../hooks/useGameEngine"; // تأكدي من المسار
import { GAME_LEVELS } from "../../config/gameLevels"; // ربط ملف المستويات الجديد
import GameLayout from "../../components/layout/GameLayout";
import "./SmartNumberPuzzlePro.css";

// دالة جلب الإعدادات من الملف المركزي
const getGameConfig = (gameKey, level) => {
  const levels = GAME_LEVELS?.[gameKey] ?? {};
  return (
    levels?.[level] ??
    levels?.[1] ?? {
      count: 3,
      maxRange: 10,
    }
  );
};

export default function SmartNumberPuzzlePro({ level = 1, onComplete }) {
  const { t, i18n } = useTranslation();
  const { incrementScore } = useGameEngine("easy"); // استخدام المحرك الخاص بنا

  const [numbers, setNumbers] = useState([]);
  const [slots, setSlots] = useState([]);
  const [dragging, setDragging] = useState(null);
  const [feedback, setFeedback] = useState(null);

  // جلب الإعدادات بناءً على المستوى الحالي
  const config = getGameConfig("SMART_PUZZLE_PRO", level);

  const generatePuzzle = useCallback(() => {
    const nums = new Set();
    while (nums.size < config.count) {
      nums.add(Math.floor(Math.random() * config.maxRange) + 1);
    }
    // خلط الأرقام عشوائياً
    const shuffled = [...nums].sort(() => Math.random() - 0.5);
    setNumbers(shuffled);
    setSlots(new Array(config.count).fill(null));
    setFeedback(null);
  }, [config]);

  useEffect(() => {
    generatePuzzle();
  }, [generatePuzzle]);

  const handleDragStart = (num) => {
    setDragging(num);
  };

  const handleDrop = (index) => {
    if (dragging === null) return;
    const newSlots = [...slots];
    if (newSlots.includes(dragging)) return;

    newSlots[index] = dragging;
    setSlots(newSlots);
    setDragging(null);
    checkAnswer(newSlots);
  };

  const checkAnswer = (current) => {
    if (current.includes(null)) return;

    // التحقق هل الأرقام مرتبة تصاعدياً
    const isCorrect = current.every(
      (val, i, arr) => i === 0 || arr[i - 1] <= val
    );

    if (isCorrect) {
      setFeedback("success");
      incrementScore(10); // إضافة النقاط
      setTimeout(() => onComplete?.(), 1500);
    } else {
      setFeedback("fail");
      setTimeout(() => generatePuzzle(), 1500);
    }
  };

  const isRtl = i18n.language === "ar";

  return (
    <div className="puzzle-pro-container">
      <h2 className="puzzle-title">
        {t("smart_puzzle_pro", "رتب الأرقام من الأصغر إلى الأكبر 🧩")}
      </h2>

      {/* 🔢 منطقة الأرقام القابلة للسحب */}
      <div className="numbers-pool">
        {numbers.map((num) => (
          <div
            key={num}
            draggable
            onDragStart={() => handleDragStart(num)}
            className="puzzle-number-card"
          >
            {num}
          </div>
        ))}
      </div>

      {/* 🎯 منطقة الإسقاط (Slots) */}
      <div
        className="slots-container"
        style={{ direction: isRtl ? "rtl" : "ltr" }}
      >
        {slots.map((slot, index) => (
          <div
            key={index}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(index)}
            className={`drop-zone ${feedback && slot !== null ? feedback : ""}`}
          >
            {slot ?? "?"}
          </div>
        ))}
      </div>

      {/* 💬 رسائل التفاعل */}
      <div className={`feedback-message ${feedback || ""}`}>
        {feedback === "success" && `🌟 ${t("correct")}`}
        {feedback === "fail" && `🔄 ${t("try_again")}`}
      </div>
    </div>
  );
}
