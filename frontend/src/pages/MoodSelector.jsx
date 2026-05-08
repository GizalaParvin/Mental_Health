import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiClient } from '../apiClient';
import { Check, Loader2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const moods = [
  { id: 'Happy', emoji: '😊', color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' },
  { id: 'Neutral', emoji: '😐', color: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700' },
  { id: 'Stressed', emoji: '😫', color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800' },
  { id: 'Anxiety', emoji: '😰', color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800' },
  { id: 'Sad', emoji: '😢', color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800' },
  { id: 'Angry', emoji: '😡', color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800' },
  { id: 'Grief', emoji: '💔', color: 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-700' },
];

const MoodSelector = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [intensity, setIntensity] = useState(5);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [suggestion, setSuggestion] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMood) return;

    setIsSubmitting(true);
    try {
      const response = await apiClient('/mood', {
        body: { mood: selectedMood.id, intensity, notes }
      });
      setSuggestion(response.suggestion);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (suggestion) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto mt-8 glass p-8 rounded-3xl text-center space-y-6"
      >
        <div className="w-20 h-20 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="h-10 w-10" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Logged Successfully</h2>
        
        <div className="bg-white/50 dark:bg-slate-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
          <h3 className="text-sm font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-3">Our Suggestion For You</h3>
          <p className="text-lg text-gray-800 dark:text-gray-200">{suggestion}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link to="/dashboard" className="px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-800 dark:text-white rounded-xl font-medium transition-colors">
            Go to Dashboard
          </Link>
          <Link to="/relief" className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
            Try Relief Exercises <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">How are you feeling right now?</h1>
        <p className="text-gray-500 dark:text-gray-400">Be honest with yourself. This is a safe space.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {moods.map((mood) => (
            <motion.button
              key={mood.id}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedMood(mood)}
              className={`p-6 rounded-2xl border flex flex-col items-center justify-center gap-3 transition-all ${
                selectedMood?.id === mood.id 
                  ? `${mood.color} ring-4 ring-opacity-50 ring-teal-500 shadow-md` 
                  : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
              }`}
            >
              <span className="text-4xl">{mood.emoji}</span>
              <span className="font-semibold">{mood.id}</span>
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {selectedMood && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-8 glass p-6 sm:p-8 rounded-3xl"
            >
              <div className="space-y-4">
                <div className="flex justify-between box-border">
                  <label className="font-bold text-gray-900 dark:text-white block">Intensity</label>
                  <span className="text-teal-600 dark:text-teal-400 font-bold">{intensity} / 10</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={intensity} 
                  onChange={(e) => setIntensity(e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-teal-600"
                />
                <div className="flex justify-between text-xs text-gray-500 font-medium">
                  <span>Mild</span>
                  <span>Moderate</span>
                  <span>Severe</span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="font-bold text-gray-900 dark:text-white block">Thoughts / Notes (Optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="What's on your mind?..."
                  className="w-full bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 rounded-xl p-4 focus:ring-2 focus:ring-teal-500 outline-none resize-none h-32"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2"
              >
                {isSubmitting ? <Loader2 className="h-6 w-6 animate-spin" /> : 'Log Mood & Get Support'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
};

export default MoodSelector;
