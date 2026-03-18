// src/useSound.js
export const useSound = () => {
  const playPop = () => {
    const audio = new Audio(
      "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3"
    );
    audio.volume = 0.5; // مستوى الصوت 50%
    audio.play().catch((e) => console.log("الصوت يحتاج تفاعل أولاً"));
  };

  const playSuccess = () => {
    const audio = new Audio(
      "https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3"
    );
    audio.play();
  };

  return { playPop, playSuccess };
};
