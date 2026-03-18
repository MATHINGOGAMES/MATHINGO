import React, { useState, useEffect } from "react";
import { useMathingoAudio } from "../../hooks/useMathingoAudio";

export default function TimeFun({ onFinish, onScoreUpdate }) {
  const { playSound, speak } = useMathingoAudio();
  const [level, setLevel] = useState({});

  const activities = [
    { id: 'day', name: 'النهار', icon: '☀️', tasks: ['🏫', '⚽', '🍦'] },
    { id: 'night', name: 'الليل', icon: '🌙', tasks: ['🛌', '✨', '🦉'] }
  ];

  const generateLevel = () => {
    // اختيار وقت عشوائي (نهار أو ليل)
    const time = activities[Math.floor(Math.random() * activities.length)];
    // اختيار مهمة صحيحة ومهمة خاطئة
    const correctTask = time.tasks[Math.floor(Math.random() * time.tasks.length)];
    const otherTime = activities.find(a => a.id !== time.id);
    const wrongTask = otherTime.tasks[Math.floor(Math.random() * otherTime.tasks.length)];

    const options = [correctTask, wrongTask].sort(() => Math.random() - 0.5);
    
    setLevel({ time, correctTask, options });
    speak(`What do we do in the ${time.id}?`);
  };

  useEffect(() => { generateLevel(); }, []);

  const handleSelect = (task) => {
    if (task === level.correctTask) {
      playSound('success');
      onScoreUpdate(50);
      setTimeout(onFinish, 1500);
    } else {
      playSound('error');
    }
  };

  return (
    <div className="mathingo-container time-game">
      <h2 className="instruction-text">ماذا نفعل في وقت {level.time?.name}؟</h2>
      
      <div className={`time-indicator ${level.time?.id}`}>
        {level.time?.icon}
      </div>

      <div className="time-options">
        {level.options?.map((opt, index) => (
          <button 
            key={index} 
            className="time-btn" 
            onClick={() => handleSelect(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}