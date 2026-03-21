import { useState, useCallback } from 'react';

/**
 * useGameEngine: المحرك الأساسي لإدارة منطق أي لعبة داخل MATHINGO
 */
export const useGameEngine = (initialLevel = 'easy') => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(initialLevel);
  const [isGameOver, setIsGameOver] = useState(false);

  // زيادة النقاط بطريقة منظمة
  const incrementScore = useCallback((amount = 10) => {
    setScore(prev => prev + amount);
  }, []);

  // الانتقال للمستوى التالي
  const goToNextLevel = useCallback(() => {
    if (level === 'easy') setLevel('medium');
    else if (level === 'medium') setLevel('hard');
    else {
      setIsGameOver(true); // وصل لأعلى مستوى
    }
  }, [level]);

  // إعادة ضبط اللعبة
  const resetGame = useCallback(() => {
    setScore(0);
    setLevel(initialLevel);
    setIsGameOver(false);
  }, [initialLevel]);

  return {
    score,
    level,
    isGameOver,
    incrementScore,
    goToNextLevel,
    resetGame,
    setLevel // للسماح بتغيير المستوى يدوياً من القائمة
  };
};