import { useState } from 'react';
import { PhoneCall, X, Wind } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EmergencyButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-red-500 hover:bg-red-600 text-white rounded-full p-4 shadow-xl border-2 border-white dark:border-slate-800 flex items-center justify-center animate-pulse"
        aria-label="Emergency Calm"
      >
        <HeartPulseIcon className="h-6 w-6" />
      </motion.button>

      {/* Emergency Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl relative"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="text-center space-y-6 mt-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Take a Deep Breath</h2>
                <p className="text-gray-600 dark:text-gray-300">You are safe. Follow the circle.</p>

                {/* Breathing Circle */}
                <div className="flex justify-center py-8">
                  <div className="relative flex items-center justify-center w-32 h-32">
                    <div className="absolute inset-0 bg-teal-400/20 rounded-full animate-breathe blur-xl"></div>
                    <div className="w-24 h-24 bg-gradient-to-tr from-teal-400 to-emerald-400 rounded-full flex items-center justify-center text-white shadow-lg z-10">
                      <Wind className="h-8 w-8" />
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-6 border-t border-gray-100 dark:border-gray-800">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Need to talk to someone right now?</p>
                  <a 
                    href="tel:988" 
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                  >
                    <PhoneCall className="h-5 w-5" />
                    Call Crisis Lifeline (988)
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

function HeartPulseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
    </svg>
  )
}

export default EmergencyButton;
