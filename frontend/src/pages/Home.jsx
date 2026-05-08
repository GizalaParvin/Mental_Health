import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Typed from 'typed.js';
import { Link } from 'react-router-dom';
import { Heart, Activity, Coffee, MessageCircle, ChevronRight, Brain, Sparkles, BookOpen, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const quotes = [
  { text: "Peace comes from within. Do not seek it without.", author: "Buddha" },
  { text: "What you think, you become. What you feel, you attract.", author: "Lao Tzu" },
  { text: "Mental health is not a destination, but a process.", author: "Noam Shpancer" },
  { text: "There is hope, even when your brain tells you there isn't.", author: "John Green" },
];

const Home = () => {
  const { user } = useAuth();
  const [activeFeature, setActiveFeature] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const typedTarget = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedTarget.current, {
      strings: ['Inner Peace', 'Mental Balance', 'True Calmness', 'Deep Focus'],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1500,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    });

    return () => {
      typed.destroy();
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const featureTabs = [
    { title: "Identify Your Thoughts and Feelings", desc: "Based on responses to daily questions, Serenity suggests guided exercises and resources just for you." },
    { title: "Detect Your Patterns", desc: "Easy-to-read graphics based on your responses illustrate patterns and provide strategies for improving your well-being." },
    { title: "Gain Insight on Your Mental Health", desc: "Regular feedback and journaling allow you to identify areas of struggle." },
    { title: "Take Action", desc: "Resources show you new ways to pursue goals, cope with difficult emotions, and alleviate stress immediately." }
  ];

  const selfHelpCards = [
    { title: "Understand Your Emotions", img: "/images/sg_emotions_1776599549104.png" },
    { title: "Challenge Thinking Patterns", img: "/images/sg_patterns_1776599565671.png" },
    { title: "Face Your Fears", img: "/images/sg_fears_1776599582968.png" },
    { title: "Resolve Conflicts", img: "/images/sg_conflicts_1776599595893.png" }
  ];

  return (
    <div className="space-y-32 pb-20">
      {/* Hero Section */}
      <section className="text-center space-y-8 pt-12 min-h-[60vh] flex flex-col justify-center relative overflow-hidden">
        {/* Abstract background blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-[70%] -translate-y-1/2 w-[600px] h-[600px] bg-teal-200/40 dark:bg-teal-900/40 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-200/40 dark:bg-indigo-900/40 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

        <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.6 }} className="space-y-6 max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-teal-700 dark:text-teal-300 font-semibold mb-2 shadow-sm font-medium">
            <Sparkles className="h-4 w-4" /> Your gentle companion
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 dark:text-white leading-[1.1]">
            Find Your <br/>
            <span className="inline-block pt-2 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-indigo-500 to-teal-400">
              <span ref={typedTarget}></span>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Track your mood, manage stress, and find moments of profound calm in your busy life. 
          </p>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.6, delay: 0.2 }}>
          {user ? (
            <Link to="/dashboard" className="inline-block bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-4 px-10 rounded-full text-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all">
              Go to Dashboard
            </Link>
          ) : (
            <Link to="/auth" className="inline-block bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-4 px-10 rounded-full text-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all">
              Start Your Journey
            </Link>
          )}
        </motion.div>
      </section>

      {/* Focus on Well-Being (Split Section) */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-16 tracking-tight max-w-2xl">
          Focus on Your Emotional Well-Being
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Timeline texts */}
          <div className="space-y-8">
            {featureTabs.map((tab, idx) => (
              <div 
                key={idx} 
                onClick={() => setActiveFeature(idx)}
                className={`cursor-pointer transition-all duration-300 border-l-4 pl-6 py-2 ${activeFeature === idx ? 'border-teal-500 opacity-100' : 'border-slate-200 dark:border-slate-700 opacity-50 hover:opacity-80'}`}
              >
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{tab.title}</h3>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  {tab.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Right: Phone Layout Mockup */}
          <div className="relative flex justify-center lg:justify-end py-10">
            {/* Phone Frame */}
            <div className="relative w-[320px] h-[650px] bg-[#FDFBF7] dark:bg-slate-800 rounded-[50px] shadow-2xl border-[12px] border-slate-900 dark:border-slate-600 flex flex-col overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-6 bg-slate-900 rounded-b-3xl w-40 mx-auto z-20"></div> {/* Notch */}
              
              {/* App Content */}
              <div className="flex-1 p-6 pt-20 flex flex-col items-center bg-white dark:bg-slate-900 relative">
                <button className="absolute left-6 top-16 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                  <ChevronRight className="rotate-180 w-5 h-5" />
                </button>
                
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-10">How do you feel?</h4>
                
                {/* Emotion Selector Mockup */}
                <div className="w-full space-y-8">
                  <div className="flex justify-between items-center px-4">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-20 h-20 rounded-full bg-[#fcd34d] flex items-center justify-center shadow-lg transform -rotate-12 transition-transform hover:scale-110">
                        <span className="text-3xl">😄</span>
                      </div>
                      <span className="text-xs font-semibold text-slate-500">Very good</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-20 h-20 rounded-full bg-[#a78bfa] flex items-center justify-center shadow-lg opacity-80">
                        <span className="text-3xl">🙁</span>
                      </div>
                      <span className="text-xs font-semibold text-slate-400">Very bad</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-8">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-16 h-16 rounded-full bg-[#86efac] flex items-center justify-center opacity-80">
                         <span className="text-xl">🙂</span>
                      </div>
                      <span className="text-xs font-semibold text-slate-400">Good</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 mt-12">
                      <div className="w-16 h-16 rounded-full bg-[#93c5fd] flex items-center justify-center opacity-80">
                         <span className="text-xl">😐</span>
                      </div>
                      <span className="text-xs font-semibold text-slate-400">Moderate</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-16 h-16 rounded-full bg-[#60a5fa] flex items-center justify-center opacity-80">
                         <span className="text-xl">☹️</span>
                      </div>
                      <span className="text-xs font-semibold text-slate-400">Bad</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background circular accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-slate-100 dark:bg-slate-800/30 rounded-full -z-10"></div>
          </div>
        </div>
      </section>

      {/* Full Width Lifestyle Image */}
      <section className="w-full h-[70vh] min-h-[500px] relative flex items-end pb-16 px-8">
        <div className="absolute inset-0 w-full h-full">
           <img src="/images/lifestyle_banner_1776599615083.png" alt="Relaxing atmosphere" className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <h2 className="text-5xl md:text-7xl font-bold text-white max-w-2xl tracking-tight leading-[1.1]">
            Serenity Is Always <br/>There for You
          </h2>
        </div>
      </section>

      {/* Self-Guided Help */}
      <section className="max-w-6xl mx-auto px-4 pt-10">
        <div className="mb-12 max-w-3xl">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">Self-Guided Help</h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-light">
            The Serenity App walks you through coping strategies for a variety of issues including 
            depression, burnout, anxiety, phobias, insomnia, and eating disorders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {selfHelpCards.map((card, idx) => (
            <div key={idx} className="group relative rounded-[30px] overflow-hidden bg-slate-100 dark:bg-slate-800 aspect-[3/4] hover:shadow-xl transition-shadow cursor-pointer">
              <img src={card.img} alt={card.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                <h3 className="text-white font-bold text-xl leading-tight">{card.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Inspirational Quotes Section */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <Heart className="w-10 h-10 text-teal-500 mx-auto mb-8 opacity-50" />
        <div className="h-32 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={quoteIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl md:text-3xl font-serif text-slate-800 dark:text-white italic mb-4">
                "{quotes[quoteIndex].text}"
              </h3>
              <p className="text-teal-600 dark:text-teal-400 font-semibold tracking-widest uppercase text-sm">
                — {quotes[quoteIndex].author}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Simplified Custom Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 px-4 text-center">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-xl font-black text-slate-900 dark:text-white">
            <Activity className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            <span>Serenity</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-slate-500">
            <a href="#" className="hover:text-teal-600 transition">About Us</a>
            <a href="#" className="hover:text-teal-600 transition">Privacy Policy</a>
            <a href="#" className="hover:text-teal-600 transition">Terms of Service</a>
            <a href="#" className="hover:text-teal-600 transition">Contact</a>
          </div>
          <p className="text-slate-400 text-sm">© 2026 Serenity Mental Health</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
