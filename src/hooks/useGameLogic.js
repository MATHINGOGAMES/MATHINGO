import { useTranslation } from "react-i18next";
import { useMathingoAudio } from "./useMathingoAudio";

export const useGameLogic = () => {
  const { t, i18n } = useTranslation();
  const { speak, playSound } = useMathingoAudio();

  const announceResult = (isWin) => {
    if (isWin) {
      // يقرأ النص تلقائياً من ملفات الترجمة بناءً على المفتاح
      speak(t("game_win_msg"));
      playSound("success");
    } else {
      playSound("error");
    }
  };

  return { t, lang: i18n.language, announceResult, speak };
};
