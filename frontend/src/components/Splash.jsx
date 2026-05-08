import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Splash = () => {
  return (
    <motion.div
      key="splashScreen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-[#020617] flex flex-col items-center justify-center overflow-hidden"
    >
        {/* Soft magical glow behind the logo */}
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[400px] h-[400px] bg-teal-500/20 rounded-full blur-[100px]"
        />

        <div className="relative z-10 flex flex-col items-center gap-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.15, 1],
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="bg-white/5 p-6 rounded-[2rem] border border-white/10 shadow-2xl backdrop-blur-md"
            >
              <Heart className="w-16 h-16 text-rose-500 fill-rose-500" />
            </motion.div>
          </motion.div>

          {/* Title sequence */}
          <h1 className="flex text-6xl md:text-8xl font-light font-serif italic text-white tracking-wider overflow-hidden">
            {"Serenity".split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ 
                  delay: 0.5 + index * 0.15, 
                  duration: 1.2,
                  ease: "easeOut"
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </h1>
          
          {/* Subtle loading dots */}
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 1 }}
             className="flex gap-2 mt-4"
          >
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                  className="w-1.5 h-1.5 rounded-full bg-teal-400"
                />
              ))}
          </motion.div>
        </div>
    </motion.div>
  );
};

export default Splash;
