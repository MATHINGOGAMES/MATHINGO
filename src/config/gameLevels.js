// src/config/gameLevels.js
export const GAME_LEVELS = {
  // 🧠 لعبة الذاكرة
  MEMORY_MATCH: {
    1: {
      pairs: 2,
      grid: { cols: 2, rows: 2 },
      previewTime: 2000, // ⏱️ عرض البطاقات قبل الإخفاء
      shuffle: false,
      difficulty: "easy",
    },
    2: {
      pairs: 4,
      grid: { cols: 4, rows: 2 },
      previewTime: 1500,
      shuffle: true,
      difficulty: "easy",
    },
    3: {
      pairs: 6,
      grid: { cols: 4, rows: 3 },
      previewTime: 1200,
      shuffle: true,
      difficulty: "medium",
    },
    4: {
      pairs: 8,
      grid: { cols: 4, rows: 4 },
      previewTime: 800,
      shuffle: true,
      difficulty: "hard",
    },
  },
  ///
  // 🧩 لغز ترتيب الأرقام (التي أضفناها للتو)
  SMART_PUZZLE_PRO: {
    1: { count: 3, maxRange: 10, difficulty: "easy" },
    2: { count: 3, maxRange: 20, difficulty: "easy" },
    3: { count: 4, maxRange: 30, difficulty: "medium" },
    4: { count: 5, maxRange: 50, difficulty: "hard" },
    5: { count: 6, maxRange: 100, difficulty: "expert" },
  },

  // 🔢 لعبة مقارنة الأعداد
  COMPARING_NUMBERS: {
    1: {
      maxRange: 5,
      allowEqual: false,
      mode: "compare", // > < =
      timeLimit: null,
      voice: true,
      difficulty: "easy",
    },
    2: {
      maxRange: 10,
      allowEqual: false,
      mode: "findGreater", // اختر الأكبر
      timeLimit: null,
      voice: true,
      difficulty: "easy",
    },
    3: {
      maxRange: 20,
      allowEqual: true,
      mode: "compare",
      timeLimit: 10,
      voice: true,
      difficulty: "medium",
    },
    4: {
      maxRange: 50,
      allowEqual: true,
      mode: "findSmaller", // اختر الأصغر
      timeLimit: 8,
      voice: true,
      difficulty: "hard",
    },
    5: {
      maxRange: 100,
      allowEqual: true,
      mode: "mixed", // عشوائي
      timeLimit: 6,
      voice: false,
      difficulty: "expert",
    },
  },
};
