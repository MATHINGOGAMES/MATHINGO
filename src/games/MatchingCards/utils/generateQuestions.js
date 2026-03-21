// src/games/MatchingCards/utils/generateQuestions.js

/**
 * دالة لتوليد أزواج البطاقات بناءً على المستوى المختار.
 * @param {string} level - مستوى الصعوبة (easy, medium, hard)
 * @param {string} mode - نوع المحتوى (math, colors, shapes) - سنبدأ بالرياضيات والألوان كمثال
 * @returns {Array} - مصفوفة من البطاقات التي تم خلطها (shuffled)
 */
export const generateQuestions = (level, mode = "math") => {
  // 1. تحديد عدد الأزواج (Pairs) بناءً على المستوى
  let numPairs;
  switch (level) {
    case "medium":
      numPairs = 3; // 6 بطاقات
      break;
    case "hard":
      numPairs = 4; // 8 بطاقات
      break;
    default:
      // easy
      numPairs = 2; // 4 بطاقات
      break;
  }

  // 2. تحديد المحتوى بناءً على النوع (Mode)
  // سنقوم بتخزين المحتوى كأزواج متطابقة
  let allPossiblePairs = [];

  if (mode === "colors") {
    // محتوى ألوان: تطابق اللون مع اللون
    // سنستخدم رموز الألوان السداسية الزاهية (Vibrant colors) التي نحبها
    allPossiblePairs = [
      { id: "pair1", content: "#FF5733", type: "color", displayText: "🔴" }, // أحمر
      { id: "pair2", content: "#33FF57", type: "color", displayText: "🟢" }, // أخضر
      { id: "pair3", content: "#3357FF", type: "color", displayText: "🔵" }, // أزرق
      { id: "pair4", content: "#FFD700", type: "color", displayText: "🟡" }, // أصفر
    ];
  } else if (mode === "shapes") {
    // محتوى أشكال
    allPossiblePairs = [
      { id: "pair1", content: "circle", type: "shape", displayText: "⭕️" },
      { id: "pair2", content: "square", type: "shape", displayText: "🟦" },
      { id: "pair3", content: "triangle", type: "shape", displayText: "🔺" },
      { id: "pair4", content: "star", type: "shape", displayText: "⭐" },
    ];
  } else {
    // محتوى رياضي (Math) افتراضي: تطابق الرقم مع الرقم
    allPossiblePairs = [
      { id: "pair1", content: "1", type: "math", displayText: "1" },
      { id: "pair2", content: "2", type: "math", displayText: "2" },
      { id: "pair3", content: "3", type: "math", displayText: "3" },
      { id: "pair4", content: "4", type: "math", displayText: "4" },
    ];
  }

  // 3. اختيار عدد الأزواج المطلوب بناءً على المستوى
  // سنقوم بخلط المحتوى المتاح واختيار العدد المطلوب فقط
  const shuffledAvailablePairs = allPossiblePairs.sort(
    () => 0.5 - Math.random()
  );
  const selectedPairs = shuffledAvailablePairs.slice(0, numPairs);

  // 4. تكرار الأزواج لإنشاء كل البطاقات (كل بطاقة يجب أن يكون لها توأم)
  const cards = [];
  selectedPairs.forEach((pair) => {
    // إنشاء البطاقة الأولى
    cards.push({
      id: `${pair.id}_1`, // معرف فريد للبطاقة الأولى في الزوج
      matchId: pair.id, // المعرف المشترك للتطابق
      content: pair.content,
      type: pair.type,
      displayText: pair.displayText,
    });
    // إنشاء البطاقة الثانية المطابقة لها
    cards.push({
      id: `${pair.id}_2`, // معرف فريد للبطاقة الثانية
      matchId: pair.id,
      content: pair.content,
      type: pair.type,
      displayText: pair.displayText,
    });
  });

  // 5. خلط البطاقات النهائية بشكل عشوائي تماماً
  return cards.sort(() => 0.5 - Math.random());
};
