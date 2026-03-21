import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useMathingoAudio } from "../../hooks/useMathingoAudio";
import { GAME_LEVELS } from "../../config/gameLevels";
import "./NumberComparison.css"; // تأكدي من إنشاء ملف التنسيق

export default function NumberComparison({ level, onComplete }) {
  const { t, i18n } = useTranslation();
  const { playSound, speak } = useMathingoAudio();

  // حالة الأرقام الحالية
  const [numbers, setNumbers] = useState({ left: 0, right: 0 });
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState(null); // 'correct' أو 'wrong'

  // 1️⃣ دالة توليد التحدي بناءً على المستوى (Logic)
  const generateChallenge = useCallback(() => {
    // جلب الإعدادات من الملف المركزي (نطاق الأرقام)
    const config =
      GAME_LEVELS.COMPARING_NUMBERS[level] || GAME_LEVELS.COMPARING_NUMBERS[1];

    let n1 = Math.floor(Math.random() * config.maxRange) + 1;
    let n2 = Math.floor(Math.random() * config.maxRange) + 1;

    // في المستوى الأول، نمنع التساوي لجعل البداية سهلة
    if (level === 1 && n1 === n2) {
      n2 = n1 === config.maxRange ? n1 - 1 : n1 + 1;
    }

    setNumbers({ left: n1, right: n2 });
    setIsAnswered(false);
    setFeedback(null);
  }, [level]);

  // توليد أرقام جديدة عند تغير المستوى
  useEffect(() => {
    generateChallenge();
  }, [level, generateChallenge]);

  // 2️⃣ التحقق من الإجابة (The Logic Engine)
  const handleChoice = (operator) => {
    if (isAnswered) return;

    let correct = false;
    if (operator === ">") correct = numbers.left > numbers.right;
    if (operator === "<") correct = numbers.left < numbers.right;
    if (operator === "=") correct = numbers.left === numbers.right;

    setIsAnswered(true);

    if (correct) {
      setFeedback("correct");
      playSound("success");
      speak(i18n.language === "ar" ? "إجابة عبقرية!" : "Genius answer!");

      // الانتقال للمستوى التالي بعد ثانيتين
      setTimeout(() => {
        onComplete();
      }, 2000);
    } else {
      setFeedback("wrong");
      playSound("error");
      speak(i18n.language === "ar" ? "حاولي ثانية" : "Try again");

      // السماح بالمحاولة مرة أخرى بعد ثانية
      setTimeout(() => {
        setIsAnswered(false);
        setFeedback(null);
      }, 1000);
    }
  };

  const isRtl = i18n.language === "ar";

  return (
    <div className={`comparison-game ${isRtl ? "rtl" : "ltr"}`}>
      {/* منطقة التعليمات والتمساح */}
      <div className="instruction-zone">
        <div className="crocodile-status">
          <span className="croc-emoji">🐊</span>
          <div className="speech-bubble">{t("compare_instruction")}</div>
        </div>
      </div>

      {/* ساحة المعركة الرقمية */}
      <div className="battle-arena">
        {/* الرقم الأيسر */}
        <div className="number-card left-card">
          <span className="digit">{numbers.left}</span>
          <div className="visual-aid">
            {/* عرض حبات تفاح صغيرة بعدد الرقم لمساعدة الطفل بصرياً */}
            {[...Array(Math.min(numbers.left, 10))].map((_, i) => (
              <span key={i}>🍎</span>
            ))}
          </div>
        </div>

        {/* أزرار الاختيار (أفواه التمساح) */}
        <div className="operators-grid">
          <button
            className={`op-btn ${
              feedback === "correct" && numbers.left > numbers.right
                ? "winner"
                : ""
            }`}
            onClick={() => handleChoice(">")}
            disabled={isAnswered}
          >
            {">"}
          </button>

          <button
            className={`op-btn ${
              feedback === "correct" && numbers.left === numbers.right
                ? "winner"
                : ""
            }`}
            onClick={() => handleChoice("=")}
            disabled={isAnswered}
          >
            {"="}
          </button>

          <button
            className={`op-btn ${
              feedback === "correct" && numbers.left < numbers.right
                ? "winner"
                : ""
            }`}
            onClick={() => handleChoice("<")}
            disabled={isAnswered}
          >
            {"<"}
          </button>
        </div>

        {/* الرقم الأيمن */}
        <div className="number-card right-card">
          <span className="digit">{numbers.right}</span>
          <div className="visual-aid">
            {[...Array(Math.min(numbers.right, 10))].map((_, i) => (
              <span key={i}>🍎</span>
            ))}
          </div>
        </div>
      </div>

      {/* مؤشر المستوى */}
      <div className="level-tag">
        {t("level")}: {level}
      </div>
    </div>
  );
}
