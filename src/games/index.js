// استيراد جميع الألعاب (الاستيرادات صحيحة كما هي لديك)
import ComparingNumbers from "./ComparingNumbers/ComparingNumbers";
import NumberSorting from "./NumberSorting/NumberSorting";
import MemoryMatch from "./MemoryMatch/MemoryMatch";
import AdditionBalance from "./AdditionBalance/AdditionBalance";
import CountingFruits from "./CountingFruits/CountingFruits";
import PatternLogic from "./PatternLogic/PatternLogic";
import NumberWords from "./NumberWords/NumberWords";
import ShapeHunter from "./ShapeHunter/ShapeHunter";
import ShadowMatch from "./ShadowMatch/ShadowMatch";
import OddOneOut from "./OddOneOut/OddOneOut";
import SizeComparison from "./SizeComparison/SizeComparison";
import AnimalSounds from "./AnimalSounds/AnimalSounds";
import HalfMatch from "./HalfMatch/HalfMatch";
import ColorSorting from "./ColorSorting/ColorSorting";
import MiniPuzzle from "./MiniPuzzle/MiniPuzzle";
import TimeFun from "./TimeFun/TimeFun";
import AnimalHome from "./AnimalHome/AnimalHome";

// 1. سجل المكونات (تأكد أن المفاتيح تطابق الـ ID تماماً)
export const GAMES_COMPONENTS = {
  "comparing-numbers": ComparingNumbers,
  "number-sorting": NumberSorting,
  "memory-match": MemoryMatch, // تم التعديل هنا ليطابق الـ ID
  "addition-balance": AdditionBalance,
  "counting-fruits": CountingFruits,
  "pattern-logic": PatternLogic,
  "number-words": NumberWords,
  "shape-hunter": ShapeHunter,
  "shadow-match": ShadowMatch,
  "odd-one-out": OddOneOut,
  "size-comparison": SizeComparison,
  "animal-sounds": AnimalSounds,
  "half-match": HalfMatch,
  "color-sorting": ColorSorting,
  "mini-puzzle": MiniPuzzle,
  "time-fun": TimeFun,
  "animal-home": AnimalHome,
};

// 2. قائمة المعلومات (أضفت لك بقية الألعاب لتظهر في الواجهة)
export const GAMES_LIST = [
  { id: "memory-match", name: "ذاكرة الصور", icon: "🧠" },
  { id: "color-sorting", name: "فرز الألوان", icon: "🎨" },
  { id: "counting-fruits", name: "عد الفواكه", icon: "🍎" },
  { id: "comparing-numbers", name: "مقارنة الأرقام", icon: "⚖️" },
  { id: "number-sorting", name: "ترتيب الأعداد", icon: "🔢" },
  { id: "shape-hunter", name: "صائد الأشكال", icon: "📐" },
  { id: "addition-balance", name: "ميزان الجمع", icon: "➕" },
  { id: "animal-sounds", name: "أصوات الحيوانات", icon: "🦁" },
  { id: "time-fun", name: "مرح الوقت", icon: "⏰" },
  { id: "pattern-logic", name: "النمط المنطقي", icon: "🧩" },
];
