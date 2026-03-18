// src/hooks/useMathingoAudio.js
import { useCallback } from "react";

export const useMathingoAudio = () => {
  // دالة لتشغيل المؤثرات الصوتية (نجاح/خطأ)
  const playSound = useCallback((type) => {
    const audioFiles = {
      success:
        "https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3", // صوت نجاح
      error:
        "https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3", // صوت خطأ
    };

    const audio = new Audio(audioFiles[type]);
    audio.play().catch((e) => console.log("Audio play blocked by browser"));
  }, []);

  // دالة لنطق النصوص (تحويل النص إلى كلام)
  const speak = useCallback((text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US"; // يمكنك تغييرها لـ 'ar-SA' إذا أردت نطقاً عربياً
      utterance.rate = 1;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  return { playSound, speak };
};
