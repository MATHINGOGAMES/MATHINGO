// src/data/gamesConfig.js
import ComparingNumbers from "../games/ComparingNumbers/ComparingNumbers";
import NumberSorting from "../games/NumberSorting/NumberSorting";
import MemoryMatch from "../games/MemoryMatch/MemoryMatch";
import AdditionBalance from "../games/AdditionBalance/AdditionBalance";
import CountingFruits from "../games/CountingFruits/CountingFruits";
import PatternLogic from "../games/PatternLogic/PatternLogic";
import NumberWords from "../games/NumberWords/NumberWords";
import ShapeHunter from "../games/ShapeHunter/ShapeHunter";
import ShadowMatch from "../games/ShadowMatch/ShadowMatch";
import OddOneOut from "../games/OddOneOut/OddOneOut";
import SizeComparison from "../games/SizeComparison/SizeComparison";
import ColorSorting from "../games/ColorSorting/ColorSorting";
import MiniPuzzle from "../games/MiniPuzzle/MiniPuzzle";
import TimeFun from "../games/TimeFun/TimeFun";
import AnimalHome from "../games/AnimalHome/AnimalHome";
import HalfMatch from "../games/HalfMatch/HalfMatch";
import AnimalSounds from "../games/AnimalSounds/AnimalSounds";
import NumberComparison from "../games/NumberComparison/NumberComparison";
import SmartNumberPuzzlePro from "../games/SmartNumberPuzzlePro/SmartNumberPuzzlePro";
export const MATHINGO_GAMES = [
  {
    id: "smart-puzzle-pro",
    titleKey: "smart_puzzle_pro_max_title",
    icon: "🧩",
    color: "#4CAF50",
    component: SmartNumberPuzzlePro,
  },
  {
    id: "numbers", // المعرف الذي نستخدمه في App.jsx
    title: "تمساح ",
    icon: "🐊",
    color: "#22c55e",
    component: NumberComparison, // المكون الذي برمجناه للتو
    minLevel: 1,
    sendScore: true,
    useOnFinish: true,
  },
  {
    id: "comparing-numbers",
    title: "تمساح الأرقام",
    icon: "🐊",
    color: "#ff5722",
    component: ComparingNumbers,
    minLevel: 1,
    sendScore: true,
    useOnFinish: true,
  },
  {
    id: "number-sorting",
    title: "ترتيب الفقاعات",
    icon: "🎈",
    color: "#1cb0f6",
    component: NumberSorting,
    minLevel: 1,
    sendScore: true,
    useOnFinish: true,
  },
  {
    id: "memory-match",
    title: "ذاكرة الأرقام",
    icon: "🧠",
    color: "#ffc107",
    component: MemoryMatch,
    minLevel: 1,
    sendScore: true,
    useOnFinish: true,
  },
  {
    id: "addition-balance",
    title: "ميزان الجمع",
    icon: "🧮",
    color: "#4caf50",
    component: AdditionBalance,
    minLevel: 1,
    sendScore: true,
    useOnFinish: true,
  },
  {
    id: "counting-fruits",
    title: "عد الفواكه",
    icon: "🍎",
    color: "#ff5722",
    component: CountingFruits,
    minLevel: 1,
    sendScore: true,
    useOnFinish: true,
  },
  {
    id: "pattern-logic",
    title: "إكمال النمط",
    icon: "🧩",
    color: "#ff5722",
    component: PatternLogic,
    minLevel: 1,
    sendScore: true,
    useOnFinish: true,
  },
  {
    id: "number-words",
    title: "كلمات الأرقام",
    icon: "📝",
    color: "#ff5722",
    component: NumberWords,
    minLevel: 1,
    sendScore: true,
    useOnFinish: true,
  },
  {
    id: "shape-hunter",
    title: "صائد الأشكال",
    icon: "⭕",
    color: "#ff5722",
    component: ShapeHunter,
    minLevel: 1,
    sendScore: true,
    useOnFinish: true,
  },
  {
    id: "shadow-match",
    title: "سباق الظلال",
    icon: "👤",
    color: "#ff5722",
    component: ShadowMatch,
    minLevel: 1,
    sendScore: true,
    useOnFinish: true,
  },
  {
    id: "odd-one-out",
    title: "اوجد الشكل المختلف",
    icon: "🧐",
    color: "#ff5722",
    component: OddOneOut,
    minLevel: 1,
    sendScore: true,
    useOnFinish: true,
  },
  {
    id: "size-comparison",
    title: "الأكبر والأصغر",
    icon: "🐘",
    color: "#ff5722",
    component: SizeComparison,
    minLevel: 1,
    sendScore: true,
    useOnFinish: true,
  },
  {
    id: "Animal-Sounds",
    title: "تعرف على أصوات الحيوانات",
    icon: "🐥",
    color: "#ff5722",
    component: AnimalSounds,
    minLevel: 1,
    sendScore: true,
    useOnFinish: true,
  },
  {
    id: "Half-Match",
    title: "تعرّف على الشكل",
    icon: "🌓",
    color: "#ff5722",
    component: HalfMatch,
    minLevel: 1,
    sendScore: true,
    useOnFinish: true,
  },
  {
    id: "color-sorting",
    title: "تمييز الألوان",
    icon: "🎨",
    color: "#ff5722",
    component: ColorSorting,
    minLevel: 1,
    sendScore: true,
    useOnFinish: true,
  },
  {
    id: "mini-puzzle",
    title: "لغز قصير",
    icon: "🧩",
    color: "#ff5722",
    component: MiniPuzzle,
    minLevel: 1,
    sendScore: true,
    useOnFinish: true,
  },
  {
    id: "time-fun",
    title: "وقت المرح",
    icon: "⏰",
    color: "#ff5722",
    component: TimeFun,
    minLevel: 1,
    sendScore: true,
    useOnFinish: true,
  },
  {
    id: "animal-home",
    title: "خمن بيتي",
    icon: "🏡",
    color: "#ff5722",
    component: AnimalHome,
    minLevel: 1,
    sendScore: true,
    useOnFinish: true,
  },
]; // أضف بقية الألعاب بنفس الطريقة...
