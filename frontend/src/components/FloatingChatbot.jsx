import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User as UserIcon, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiClient } from '../apiClient';
import { useAuth } from '../context/AuthContext';

const FloatingChatbot = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  // Initialize with a welcome message
  const [messages, setMessages] = useState([
    { id: 1, text: `Hello ${user?.username || 'friend'}. I'm Serenity AI. How are you feeling today?`, sender: 'bot' }
  ]);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMsg = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, newMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await apiClient('/chatbot', {
        body: { message: newMsg.text }
      });
      
      setMessages(prev => [...prev, { id: Date.now(), text: response.reply, sender: 'bot' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { id: Date.now(), text: "I'm having trouble connecting right now. Please check if your Gemini API key is configured.", sender: 'bot' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 left-4 sm:left-8 w-[350px] sm:w-[400px] h-[500px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col z-[100] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-teal-600 text-white p-4 flex justify-between items-center shadow-md z-10">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold">Serenity AI</h3>
                  <p className="text-xs text-teal-100 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 block animate-pulse"></span> Online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-2 rounded-full transition-colors"
                aria-label="Close Chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex items-start gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  {msg.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                      <Bot size={16} />
                    </div>
                  )}
                  <div className={`max-w-[75%] p-3 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-teal-600 text-white rounded-tr-sm' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-sm shadow-sm border border-slate-100 dark:border-slate-700'}`}>
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                      <Bot size={16} />
                    </div>
                  <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1 border border-slate-100 dark:border-slate-700">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
              <form onSubmit={handleSend} className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-full py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm text-slate-900 dark:text-white"
                />
                <button
                  type="submit"
                  disabled={isTyping || !inputValue.trim()}
                  className="absolute right-2 p-1.5 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white rounded-full transition-colors flex items-center justify-center"
                >
                  {isTyping ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} className="ml-0.5" />}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-[90] bg-teal-600 hover:bg-teal-700 text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center justify-center border-4 border-white dark:border-slate-900"
        aria-label="Toggle Serenity AI Companion"
      >
        <MessageCircle size={28} className={isOpen ? 'hidden' : 'block'} />
        <X size={28} className={isOpen ? 'block' : 'hidden'} />
      </button>
    </>
  );
};

export default FloatingChatbot;
