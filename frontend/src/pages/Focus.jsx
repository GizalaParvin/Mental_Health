import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, Wind } from 'lucide-react';

const Focus = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 min default
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Could play an alarm sound here
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const setDuration = (minutes) => {
    setIsActive(false);
    setTimeLeft(minutes * 60);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 flex flex-col items-center animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Focus Mode</h1>
        <p className="text-gray-500 dark:text-gray-400">Clear your mind. Minimize distractions.</p>
      </div>

      <div className="glass w-full p-12 rounded-[3rem] flex flex-col items-center justify-center relative overflow-hidden shadow-2xl shadow-indigo-500/10 dark:shadow-indigo-500/5">
        
        {/* Background animation when active */}
        {isActive && (
          <div className="absolute inset-0 bg-indigo-500/5 dark:bg-indigo-500/10 animate-pulse pointer-events-none" />
        )}

        <div className="flex gap-4 mb-8 sm:mb-10 z-10 relative">
          <button onClick={() => setDuration(15)} className="px-4 py-1.5 rounded-full text-sm font-medium bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700 transition">15m</button>
          <button onClick={() => setDuration(25)} className="px-4 py-1.5 rounded-full text-sm font-medium bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700 transition">25m</button>
          <button onClick={() => setDuration(45)} className="px-4 py-1.5 rounded-full text-sm font-medium bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700 transition">45m</button>
        </div>

        <div className="text-6xl sm:text-[8rem] font-bold text-gray-900 dark:text-white tracking-tighter leading-none mb-8 sm:mb-10 z-10 relative" style={{ fontVariantNumeric: 'tabular-nums' }}>
          {formatTime(timeLeft)}
        </div>

        <div className="flex items-center gap-4 sm:gap-6 z-10 relative">
          <button 
            onClick={resetTimer}
            className="w-14 h-14 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-slate-700 transition"
          >
            <RotateCcw className="text-gray-600 dark:text-gray-300" />
          </button>
          
          <button 
            onClick={toggleTimer}
            className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 ${isActive ? 'bg-indigo-600 text-white shadow-indigo-500/30' : 'bg-teal-600 text-white shadow-teal-500/30'}`}
          >
            {isActive ? <Pause size={32} /> : <Play size={32} className="ml-2" />}
          </button>
          <button className="w-14 h-14 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-slate-700 transition">
            <Volume2 className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>
      
      <p className="mt-8 text-sm text-gray-400 text-center dark:text-gray-500 max-w-sm">
        "Focus on the step in front of you, not the whole staircase."
      </p>
    </div>
  );
};

export default Focus;
