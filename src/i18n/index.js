import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// 1. القاموس الموحد للغات العشر
const resources = {
  ar: {
    translation: {
      welcome: "مرحباً بك في MATHINGO",
      score: "النجوم",
      level: "المستوى",
      back: "رجوع",
      excellent: "ممتاز!",
      matching: "تطابق الصور",
    },
  },
  en: {
    translation: {
      welcome: "Welcome to MATHINGO",
      score: "Stars",
      level: "Level",
      back: "Back",
      excellent: "Excellent!",
      matching: "Memory Match",
    },
  },
  fr: {
    translation: {
      welcome: "Bienvenue à MATHINGO",
      score: "Étoiles",
      level: "Niveau",
      back: "Retour",
      excellent: "Excellent!",
      matching: "Jeu de Mémoire",
    },
  },
  es: {
    translation: {
      welcome: "Bienvenido a MATHINGO",
      score: "Estrellas",
      level: "Nivel",
      back: "Atrás",
      excellent: "¡Excelente!",
      matching: "Juego de Memoria",
    },
  },
  de: {
    translation: {
      welcome: "Willkommen bei MATHINGO",
      score: "Sterne",
      level: "Ebene",
      back: "Zurück",
      excellent: "Ausgezeichnet!",
      matching: "Gedächtnisspiel",
    },
  },
  tr: {
    translation: {
      welcome: "MATHINGO'ya Hoş Geldiniz",
      score: "Yıldızlar",
      level: "Seviye",
      back: "Geri",
      excellent: "Harika!",
      matching: "Hafıza Oyunu",
    },
  },
  zh: {
    translation: {
      welcome: "欢迎来到 MATHINGO",
      score: "星星",
      level: "级别",
      back: "返回",
      excellent: "太棒了！",
      matching: "记忆匹配",
    },
  },
  ja: {
    translation: {
      welcome: "MATHINGOへようこそ",
      score: "星",
      level: "レベル",
      back: "戻る",
      excellent: "素晴らしい！",
      matching: "神経衰弱",
    },
  },
  hi: {
    translation: {
      welcome: "MATHINGO में आपका स्वागत है",
      score: "सितारे",
      level: "स्तर",
      back: "पीछे",
      excellent: "बहुत बढ़िया!",
      matching: "मेموری मैच",
    },
  },
  ru: {
    translation: {
      welcome: "Добро пожаловать в MATHINGO",
      score: "Звезды",
      level: "Уровень",
      back: "Назад",
      excellent: "Отлично!",
      matching: "Игра на память",
    },
  },
};

// 2. إعداد المحرك
i18n.use(initReactI18next).init({
  resources,
  lng: "ar", // اللغة الافتراضية عند فتح الموقع
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React يحمينا بالفعل من XSS
  },
});

// 3. التصدير ليكون متاحاً لـ main.jsx
export default i18n;
