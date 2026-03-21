import { useTranslation } from "react-i18next";

export const useVoice = () => {
  const { i18n } = useTranslation();

  const speak = (text) => {
    // التأكد من أن المتصفح يدعم النطق
    if (!window.speechSynthesis) return;

    // إلغاء أي نطق جاري حالياً لتجنب التداخل
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // تحديد اللغة بدقة بناءً على اختيار i18n
    const langMap = {
      ar: "ar-SA",
      en: "en-US",
      fr: "fr-FR",
      es: "es-ES",
      de: "de-DE",
      tr: "tr-TR",
      zh: "zh-CN",
      ja: "ja-JP",
      hi: "hi-IN",
      ru: "ru-RU",
    };

    utterance.lang = langMap[i18n.language] || "en-US";
    utterance.rate = 0.9; // سرعة هادئة تناسب الأطفال
    utterance.pitch = 1.1; // طبقة صوت طفولية قليلاً

    window.speechSynthesis.speak(utterance);
  };

  return { speak };
};
