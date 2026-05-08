import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User as UserIcon, Loader2 } from 'lucide-react';
import { apiClient } from '../apiClient';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Chatbot = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    { id: 1, text: `Hello ${user?.username || 'there'}. I'm your Serenity companion. How are you feeling today?`, sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

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
      
      // Simulate real typing delay
      setTimeout(() => {
        setMessages(prev => [...prev, { id: Date.now(), text: response.reply, sender: 'bot' }]);
        setIsTyping(false);
      }, 600);
      
    } catch (error) {
      console.error(error);
      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now(), text: "I'm having trouble connecting right now. Please try again later.", sender: 'bot' }]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-8 h-[80vh] flex flex-col">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Serenity Companion</h1>
        <p className="text-gray-500 dark:text-gray-400">A safe space to express your thoughts.</p>
      </div>

      <div className="flex-1 glass rounded-3xl overflow-hidden flex flex-col shadow-sm border border-white/50 dark:border-slate-800/50">
        
        {/* Chat Messages */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
          {messages.map((msg) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id} 
              className={`flex items-start gap-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'bot' && (
                <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                  <Bot size={20} />
                </div>
              )}
              
              <div 
                className={`max-w-[80%] p-4 rounded-2xl ${
                  msg.sender === 'user' 
                    ? 'bg-teal-600 text-white rounded-tr-sm' 
                    : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-tl-sm shadow-sm'
                }`}
              >
                <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              </div>

              {msg.sender === 'user' && (
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-300 flex items-center justify-center shrink-0">
                  <UserIcon size={20} />
                </div>
              )}
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                <Bot size={20} />
              </div>
              <div className="bg-white dark:bg-slate-800 text-gray-800 p-4 rounded-2xl rounded-tl-sm flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white/50 dark:bg-slate-800/80 border-t border-gray-100 dark:border-gray-800">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-full py-3 sm:py-4 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm text-gray-900 dark:text-white"
            />
            <button
              type="submit"
              disabled={isTyping || !inputValue.trim()}
              className="absolute right-2 p-2 sm:p-3 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:hover:bg-teal-600 text-white rounded-full transition-colors flex items-center justify-center"
            >
              {isTyping ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} className="ml-1" />}
            </button>
          </form>
          <p className="text-xs text-center text-gray-400 mt-2">
            This is an AI companion meant for gentle support. It is not a replacement for professional help.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
