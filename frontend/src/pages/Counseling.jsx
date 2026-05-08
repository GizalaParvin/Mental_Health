import { useState } from 'react';
import { Video, Calendar, Star, Clock, UserCheck, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const MOCK_COUNSELORS = [
  {
    id: 1,
    name: 'Dr. Sarah Jenkins',
    title: 'Clinical Psychologist',
    specialties: ['Anxiety', 'Depression', 'CBT'],
    rating: 4.9,
    reviews: 124,
    availability: 'Available Today',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 2,
    name: 'Michael Chen, LCSW',
    title: 'Licensed Clinical Social Worker',
    specialties: ['Relationships', 'Stress', 'Career'],
    rating: 4.8,
    reviews: 89,
    availability: 'Next Available: Tomorrow',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 3,
    name: 'Dr. Emily Carter',
    title: 'Psychiatrist',
    specialties: ['Trauma', 'PTSD', 'ADHD'],
    rating: 5.0,
    reviews: 210,
    availability: 'Available in 2 Days',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200&h=200'
  }
];

const Counseling = () => {
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [messagingTherapist, setMessagingTherapist] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-10 animate-fade-in px-2 sm:px-0">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Professional Counseling</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
          Connect with licensed therapists and counselors from the comfort of your home. 
          Book a secure video session or start a text chat.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_COUNSELORS.map((counselor, idx) => (
          <motion.div 
            key={counselor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/60 dark:bg-slate-800/60 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all flex flex-col"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="relative">
                <img 
                  src={counselor.image} 
                  alt={counselor.name} 
                  className="w-16 h-16 rounded-full object-cover border-2 border-teal-100 dark:border-teal-900"
                />
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white leading-tight">{counselor.name}</h3>
                <p className="text-sm text-teal-600 dark:text-teal-400 font-medium">{counselor.title}</p>
                <div className="flex items-center gap-1 mt-1 text-sm text-gray-500 dark:text-gray-400">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span>{counselor.rating} ({counselor.reviews} reviews)</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {counselor.specialties.map(spec => (
                <span key={spec} className="bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 text-xs px-2.5 py-1 rounded-full">
                  {spec}
                </span>
              ))}
            </div>

            <div className="mt-auto space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-slate-900/50 p-2 rounded-lg">
                <Clock className="w-4 h-4 text-teal-500" />
                {counselor.availability}
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setSelectedTherapist(counselor)}
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" /> Book
                </button>
                <button 
                  onClick={() => setMessagingTherapist(counselor)}
                  className="flex-1 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:hover:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 py-2 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" /> Message
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedTherapist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-8 shadow-2xl relative border border-gray-100 dark:border-gray-800"
          >
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="w-10 h-10 text-teal-600 dark:text-teal-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Booking Demo</h2>
              <p className="text-gray-500 dark:text-gray-400">
                You selected <strong>{selectedTherapist.name}</strong>. In a full implementation, this would open a calendar to select a date and time.
              </p>
              <button 
                onClick={() => setSelectedTherapist(null)}
                className="w-full mt-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-3 rounded-xl transition"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {messagingTherapist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-8 shadow-2xl relative border border-gray-100 dark:border-gray-800"
          >
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Message {messagingTherapist.name}</h2>
              <p className="text-gray-500 dark:text-gray-400">
                This would open a direct secure messaging channel with {messagingTherapist.name}.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <button 
                  onClick={() => {
                    navigate(`/counselor-chat/${messagingTherapist.id}`);
                    setMessagingTherapist(null);
                  }}
                  className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl transition hover:bg-indigo-700"
                >
                  Start Chat
                </button>
                <button 
                  onClick={() => setMessagingTherapist(null)}
                  className="w-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold py-3 rounded-xl transition hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Counseling;
