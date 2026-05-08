import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Send, ArrowLeft, Phone, Video, MoreVertical, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_COUNSELORS = {
  '1': { name: 'Dr. Sarah Jenkins', title: 'Clinical Psychologist', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200' },
  '2': { name: 'Michael Chen, LCSW', title: 'Licensed Clinical Social Worker', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200' },
  '3': { name: 'Dr. Emily Carter', title: 'Psychiatrist', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200&h=200' }
};

const CounselorChat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const counselor = MOCK_COUNSELORS[id] || { name: 'Counselor', title: 'Therapist', image: 'https://via.placeholder.com/150' };
  
  const [messages, setMessages] = useState([
    { id: 1, text: `Hello. I'm ${counselor.name}. This is a secure and private channel. How can I support you today?`, sender: 'counselor', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
  ]);
  const [input, setInput] = useState('');
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = {
      id: Date.now(),
      text: input,
      sender: 'user',
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    
    setMessages(prev => [...prev, newMsg]);
    setInput('');

    // Simulate counselor typing
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: `Thank you for sharing that with me. I'm here to listen. (This is a mock chat response).`,
        sender: 'counselor',
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      }]);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto h-[80vh] flex flex-col bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-lg animate-fade-in relative z-10">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-800 p-4 flex items-center justify-between z-20 shadow-sm relative">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/counseling')}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src={counselor.image} alt={counselor.name} className="w-10 h-10 rounded-full object-cover" />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
            </div>
            <div>
              <h1 className="font-bold text-gray-900 dark:text-white leading-tight">{counselor.name}</h1>
              <p className="text-xs text-teal-600 dark:text-teal-400 font-medium">{counselor.title}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-800 transition text-gray-500">
            <Phone className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-800 transition text-gray-500">
            <Video className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-800 transition text-gray-500 hidden sm:flex">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Security Banner */}
      <div className="bg-teal-50 dark:bg-teal-900/20 py-2 px-4 flex items-center justify-center gap-2 text-xs text-teal-700 dark:text-teal-400 border-b border-teal-100 dark:border-teal-900/30">
        <ShieldCheck className="w-4 h-4" /> End-to-end encrypted secure channel
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-gray-50/50 dark:bg-slate-900/50 relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
        
        <div className="text-center text-xs text-gray-400 dark:text-gray-500 my-4 uppercase tracking-wider font-semibold">Today</div>

        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex flex-col max-w-[80%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
            >
              <div 
                className={`p-3 sm:p-4 rounded-2xl ${
                  msg.sender === 'user' 
                    ? 'bg-teal-600 text-white rounded-br-sm shadow-md' 
                    : 'bg-white dark:bg-slate-800 border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-sm shadow-sm'
                }`}
              >
                <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              </div>
              <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.time}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={endOfMessagesRef} className="h-1 text-transparent">_</div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-gray-800 z-20 relative">
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-100 dark:bg-slate-800 border-0 rounded-full px-6 py-3 sm:py-4 focus:ring-2 focus:ring-teal-500 outline-none text-gray-900 dark:text-white pr-12 text-sm sm:text-base"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full w-12 h-12 flex items-center justify-center shrink-0 transition shadow-md"
          >
            <Send className="w-5 h-5 ml-1" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CounselorChat;
