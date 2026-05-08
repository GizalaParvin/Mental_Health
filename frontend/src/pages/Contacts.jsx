import { useState, useEffect } from 'react';
import { UserPlus, PhoneCall, Trash2, ShieldCheck, Loader2 } from 'lucide-react';
import { apiClient } from '../apiClient';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Contacts = () => {
  const { user } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', relation: '' });

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const userData = await apiClient('/auth/me');
        setContacts(userData.contacts || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMe();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const updatedContacts = await apiClient('/user/contacts', { body: formData });
      setContacts(updatedContacts);
      setShowForm(false);
      setFormData({ name: '', phone: '', relation: '' });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const updatedContacts = await apiClient(`/user/contacts/${id}`, { method: 'DELETE' });
      setContacts(updatedContacts);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-[60vh]"><Loader2 className="h-8 w-8 animate-spin text-teal-600" /></div>;

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8 animate-fade-in px-2 sm:px-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Support Network</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">Manage your trusted friends and emergency contacts.</p>
        </div>
        {!showForm && (
          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-3 sm:py-2 rounded-xl transition-colors font-medium shadow-sm w-full sm:w-auto"
          >
            <UserPlus size={20} /> <span>Add Contact</span>
          </button>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleAdd} 
            className="glass p-6 rounded-3xl space-y-4 overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="text-teal-500" /> New Trusted Contact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input 
                type="text" required placeholder="Name" 
                className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 focus:ring-2 focus:ring-teal-500 outline-none text-gray-900 dark:text-white"
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} 
              />
              <input 
                type="tel" required placeholder="Phone Number" 
                className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 focus:ring-2 focus:ring-teal-500 outline-none text-gray-900 dark:text-white"
                value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} 
              />
              <input 
                type="text" placeholder="Relation (e.g. Brother, Therapist)" 
                className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 focus:ring-2 focus:ring-teal-500 outline-none text-gray-900 dark:text-white"
                value={formData.relation} onChange={e => setFormData({...formData, relation: e.target.value})} 
              />
            </div>
            <div className="flex gap-3 justify-end pt-2">
              <button 
                type="button" 
                onClick={() => setShowForm(false)} 
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-6 py-2 bg-teal-600 text-white rounded-xl shadow-md hover:bg-teal-700 transition"
              >
                Save Contact
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts.map(contact => (
          <div key={contact._id} className="bg-white/60 dark:bg-slate-800/60 border border-gray-200 dark:border-gray-700 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow relative group">
            <button 
              onClick={() => handleDelete(contact._id)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition opacity-0 group-hover:opacity-100"
            >
              <Trash2 size={18} />
            </button>
            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-2xl flex items-center justify-center text-xl font-bold mb-4">
              {contact.name.charAt(0).toUpperCase()}
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{contact.name}</h3>
            {contact.relation && <p className="text-sm text-center bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 py-1 px-3 rounded-full inline-block mt-2 mb-4">{contact.relation}</p>}
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <a 
                href={`tel:${contact.phone}`} 
                className="w-full flex items-center justify-center gap-2 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/40 text-green-700 dark:text-green-400 py-3 rounded-xl font-medium transition"
              >
                <PhoneCall size={18} /> {contact.phone}
              </a>
            </div>
          </div>
        ))}
        {contacts.length === 0 && !showForm && (
          <div className="col-span-full text-center py-16 bg-white/40 dark:bg-slate-800/40 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700">
            <UserPlus className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">No contacts added yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-1 max-w-sm mx-auto">Having a support network is vital. Add close friends, family members, or your therapist here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contacts;
