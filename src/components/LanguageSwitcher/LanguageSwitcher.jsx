import React from "react";
import { useTranslation } from "react-i18next";
import { useVoice } from "../../hooks/useVoice";
import "./LanguageSwitcher.css";

// مصفوفة اللغات العشر - يجب تعريفها هنا لتجنب خطأ ReferenceError
const languages = [
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const { speak } = useVoice();

  const changeLanguage = (lng, label) => {
    i18n.changeLanguage(lng);
    // تغيير اتجاه الصفحة بناءً على اللغة
    document.body.dir = lng === "ar" ? "rtl" : "ltr";

    // نطق اسم اللغة فور اختيارها
    setTimeout(() => {
      speak(label);
    }, 100);
  };

  return (
    <div className="lang-switcher-container">
      {languages.map((lang) => (
        <button
          key={lang.code}
          className={`lang-btn ${i18n.language === lang.code ? "active" : ""}`}
          onClick={() => changeLanguage(lang.code, lang.label)}
          title={lang.label}
        >
          <span className="flag-icon">{lang.flag}</span>
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
