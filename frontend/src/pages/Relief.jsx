import { useState, useEffect } from 'react';
import { Wind, PlayCircle, Music, Minus, Plus, Activity, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const relaxingQuotes = [
  { text: "Breathe in deeply to bring your mind home to your body.", author: "Thich Nhat Hanh" },
  { text: "Tension is who you think you should be. Relaxation is who you are.", author: "Chinese Proverb" },
  { text: "Sometimes the most productive thing you can do is relax.", author: "Mark Black" },
  { text: "Relax. No one else knows what they’re doing either.", author: "Ricky Gervais" },
  { text: "Peace begins with a smile.", author: "Mother Teresa" },
  { text: "The greatest weapon against stress is our ability to choose one thought over another.", author: "William James" },
  { text: "Almost everything will work again if you unplug it for a few minutes… including you.", author: "Anne Lamott" },
  { text: "Take rest; a field that has rested gives a bountiful crop.", author: "Ovid" },
];

const Relief = () => {
  const [activeTab, setActiveTab] = useState('breathe');
  const [breathePhase, setBreathePhase] = useState('Inhale');
  const [breatheCycle, setBreatheCycle] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % relaxingQuotes.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (activeTab !== 'breathe') return;

    // A simple 4-7-8 breathing technique emulation or simplified version (e.g. 4s inhale, 4s exhale)
    const interval = setInterval(() => {
      setBreathePhase(prev => {
        if (prev === 'Inhale') return 'Hold';
        if (prev === 'Hold') return 'Exhale';
        setBreatheCycle(c => c + 1);
        return 'Inhale';
      });
    }, 4000); // 4 seconds per phase for simplicity

    return () => clearInterval(interval);
  }, [activeTab]);

  return (
    <div className="space-y-8 animate-fade-in py-8 max-w-4xl mx-auto px-2 sm:px-0">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Instant Relief</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">Tools to help you ground yourself and find calm in the moment.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
        <button
          onClick={() => setActiveTab('breathe')}
          className={`flex-1 sm:flex-none justify-center px-4 sm:px-6 py-3 sm:py-2 rounded-xl sm:rounded-full font-medium transition-all flex items-center gap-2 ${activeTab === 'breathe' ? 'bg-teal-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
        >
          <Wind className="h-4 w-4" /> Breathe
        </button>
        <button
          onClick={() => setActiveTab('yoga')}
          className={`flex-1 sm:flex-none justify-center px-4 sm:px-6 py-3 sm:py-2 rounded-xl sm:rounded-full font-medium transition-all flex items-center gap-2 ${activeTab === 'yoga' ? 'bg-orange-500 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
        >
          <Activity className="h-4 w-4" /> Yoga
        </button>
        <button
          onClick={() => setActiveTab('videos')}
          className={`flex-1 sm:flex-none justify-center px-4 sm:px-6 py-3 sm:py-2 rounded-xl sm:rounded-full font-medium transition-all flex items-center gap-2 ${activeTab === 'videos' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
        >
          <PlayCircle className="h-4 w-4" /> Meditation
        </button>
        <button
          onClick={() => setActiveTab('sounds')}
          className={`flex-1 sm:flex-none justify-center px-4 sm:px-6 py-3 sm:py-2 rounded-xl sm:rounded-full font-medium transition-all flex items-center gap-2 min-w-[200px] sm:min-w-0 ${activeTab === 'sounds' ? 'bg-rose-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
        >
          <Music className="h-4 w-4" /> Nature Sounds
        </button>
      </div>

      <div className="glass p-4 sm:p-8 rounded-3xl min-h-[400px] flex items-center justify-center relative overflow-hidden">
        <AnimatePresence mode="wait">

          {activeTab === 'breathe' && (
            <motion.div
              key="breathe"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center w-full"
            >
              <h2 className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-12">Box Breathing</h2>

              <div className="relative flex items-center justify-center w-48 h-48 mx-auto mb-12">
                <motion.div
                  className="absolute inset-0 bg-teal-400/20 rounded-full blur-2xl"
                  animate={{
                    scale: breathePhase === 'Inhale' ? 1.5 : breathePhase === 'Hold' ? 1.5 : 1,
                    opacity: breathePhase === 'Hold' ? 0.8 : 0.4
                  }}
                  transition={{ duration: 4, ease: "easeInOut" }}
                />

                <motion.div
                  className="w-32 h-32 bg-gradient-to-tr from-teal-400 to-emerald-400 rounded-full flex flex-col items-center justify-center text-white shadow-lg z-10"
                  animate={{
                    scale: breathePhase === 'Inhale' ? 1.3 : breathePhase === 'Hold' ? 1.3 : 1
                  }}
                  transition={{ duration: 4, ease: "easeInOut" }}
                >
                  <span className="text-lg font-bold">{breathePhase}</span>
                </motion.div>
              </div>

              <p className="text-slate-500 dark:text-slate-400">Cycles completed: {breatheCycle}</p>
            </motion.div>
          )}

          {activeTab === 'yoga' && (
            <motion.div
              key="yoga"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex flex-col items-center"
            >
              <h2 className="text-2xl font-bold text-orange-500 dark:text-orange-400 mb-2 text-center">Gentle Stretch & Yoga</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-6 text-center">Release physical tension to calm the mind.</p>

              <div className="w-full max-w-2xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-800 bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/v7AYKMP6rOE"
                  title="Yoga For Complete Beginners - 20 Minute Home Yoga Workout!"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          )}

          {activeTab === 'videos' && (
            <motion.div
              key="videos"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex flex-col items-center"
            >
              <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-2 text-center">Guided Meditation</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-6 text-center">Find a comfortable position and follow along.</p>

              <div className="w-full max-w-2xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-800 bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/inpok4MKVLM"
                  title="5 Minute Meditation You Can Do Anywhere"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          )}

          {activeTab === 'sounds' && (
            <motion.div
              key="sounds"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex-col items-center justify-center space-y-6 text-center"
            >
              <h2 className="text-2xl font-bold text-rose-600 dark:text-rose-400 mb-6">Sound Therapy</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">Listen to the calming sounds of nature. (Mock player)</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <SoundCard icon="🌧️" title="Gentle Rain" />
                <SoundCard icon="🌊" title="Ocean Waves" />
                <SoundCard icon="🌲" title="Forest Ambience" />
                <SoundCard icon="🔥" title="Crackling Fire" />
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Relaxing Quotes Section below the main tools */}
      <div className="mt-12 bg-white/40 dark:bg-slate-800/40 rounded-3xl p-8 border border-white/50 dark:border-slate-700/50 shadow-sm text-center relative overflow-hidden">
        <Quote className="absolute top-6 left-6 w-16 h-16 text-teal-500/10 dark:text-teal-400/10 rotate-180" />
        <div className="h-24 flex items-center justify-center relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={quoteIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xl md:text-2xl font-medium text-slate-800 dark:text-slate-100 italic mb-2">
                "{relaxingQuotes[quoteIndex].text}"
              </p>
              <p className="text-teal-600 dark:text-teal-400 font-semibold text-sm uppercase tracking-wider">
                — {relaxingQuotes[quoteIndex].author}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const SoundCard = ({ icon, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);

  return (
    <div className="bg-white/60 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-colors ${isPlaying ? 'bg-rose-100 dark:bg-rose-900/30 ring-2 ring-rose-500' : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600'}`}
        >
          {isPlaying ? '⏸' : icon}
        </button>
        <span className="font-medium text-slate-800 dark:text-white">{title}</span>
      </div>

      {isPlaying && (
        <div className="flex items-center gap-2">
          <button onClick={() => setVolume(Math.max(0, volume - 10))}><Minus className="h-4 w-4 text-slate-500" /></button>
          <div className="w-16 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-rose-500" style={{ width: `${volume}%` }}></div>
          </div>
          <button onClick={() => setVolume(Math.min(100, volume + 10))}><Plus className="h-4 w-4 text-slate-500" /></button>
        </div>
      )}
    </div>
  )
}

export default Relief;
