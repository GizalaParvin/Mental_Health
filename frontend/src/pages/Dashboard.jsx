import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Flame, PlusCircle, Activity, Heart, Wind } from 'lucide-react';
import { motion } from 'framer-motion';
import { apiClient } from '../apiClient';

const Dashboard = () => {
  const { user } = useAuth();
  const [recentLog, setRecentLog] = useState(null);

  useEffect(() => {
    const fetchRecentLog = async () => {
      try {
        const logs = await apiClient('/mood');
        if (logs.length > 0) {
          setRecentLog(logs[0]);
        }
      } catch (error) {
        console.error("Failed to fetch recent log", error);
      }
    };
    fetchRecentLog();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const quickActions = [
    {
      title: "Log Your Mood",
      desc: "Check in with yourself.",
      icon: <Activity className="h-6 w-6" />,
      color: "bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800",
      path: "/mood"
    },
    {
      title: "Take a Breather",
      desc: "Instant relief exercises.",
      icon: <Wind className="h-6 w-6" />,
      color: "bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400 border-teal-200 dark:border-teal-800",
      path: "/relief"
    },
    {
      title: "Talk to Someone",
      desc: "Chat with our AI companion.",
      icon: <Heart className="h-6 w-6" />,
      color: "bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 border-rose-200 dark:border-rose-800",
      path: "/chatbot"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-20 px-2 sm:px-0">
      {/* Header section */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/40 dark:bg-slate-800/40 p-4 sm:p-6 rounded-3xl border border-white/50 dark:border-slate-700/50">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-indigo-600 dark:from-teal-400 dark:to-indigo-400">
            {getGreeting()}, {user?.username}!
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1 font-medium text-sm sm:text-base">Ready to focus on your well-being today?</p>
        </div>
        
        {/* Streak Badge */}
        <div className="flex items-center gap-3 bg-white dark:bg-slate-800 px-5 py-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-xl">
            <Flame className="h-6 w-6 text-orange-500" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider">Current Streak</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{user?.streak || 0} Day{user?.streak !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 pl-2">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {quickActions.map((action, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link 
                to={action.path}
                className={`block h-full p-6 rounded-3xl border ${action.color} shadow-sm hover:shadow-md transition-all group`}
              >
                <div className="bg-white/50 dark:bg-black/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm group-hover:scale-110 transition-transform">
                  {action.icon}
                </div>
                <h3 className="font-bold text-lg mb-1">{action.title}</h3>
                <p className="text-sm opacity-80">{action.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recent Log */}
      <section>
        <div className="flex justify-between items-center mb-4 pl-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Mood</h2>
          <Link to="/tracker" className="text-teal-600 dark:text-teal-400 hover:underline text-sm font-medium">View History</Link>
        </div>
        
        {recentLog ? (
          <div className="glass p-6 rounded-3xl backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl bg-gray-100 dark:bg-slate-800 p-4 rounded-2xl">
                {recentLog.mood === 'Happy' ? '😊' : 
                 recentLog.mood === 'Stressed' ? '😫' : 
                 recentLog.mood === 'Angry' ? '😡' : 
                 recentLog.mood === 'Grief' ? '😢' : 
                 recentLog.mood === 'Anxiety' ? '😰' : '😐'}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  {recentLog.mood}
                  <span className="text-sm font-normal text-gray-500 bg-gray-100 dark:bg-slate-800 px-2 py-0.5 rounded pl-1">Intensity: {recentLog.intensity}/10</span>
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(recentLog.createdAt).toLocaleDateString()} at {new Date(recentLog.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
              </div>
            </div>
            {recentLog.notes && (
              <div className="bg-white/50 dark:bg-black/20 p-4 rounded-xl mt-3  text-gray-700 dark:text-gray-300 italic text-sm">
                "{recentLog.notes}"
              </div>
            )}
            {recentLog.recommendedActivity && (
              <div className="mt-4 text-sm font-medium text-teal-700 dark:text-teal-300 bg-teal-50/50 dark:bg-teal-900/20 p-3 rounded-xl inline-block">
                💡 Suggestion: {recentLog.recommendedActivity}
              </div>
            )}
          </div>
        ) : (
          <div className="glass p-8 rounded-3xl text-center">
            <div className="bg-gray-100 dark:bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">You haven't logged your mood yet today.</p>
            <Link 
              to="/mood" 
              className="inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-full transition-colors font-medium"
            >
              <PlusCircle className="h-5 w-5" />
              Log First Mood
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
