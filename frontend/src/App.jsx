import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages to be created
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import MoodSelector from './pages/MoodSelector';
import Tracker from './pages/Tracker';
import Relief from './pages/Relief';
import Chatbot from './pages/Chatbot';
import Contacts from './pages/Contacts';
import Focus from './pages/Focus';
import Counseling from './pages/Counseling';
import CounselorChat from './pages/CounselorChat';
import FloatingChatbot from './components/FloatingChatbot';
import Splash from './components/Splash';

import Navbar from './components/Navbar';
import EmergencyButton from './components/EmergencyButton';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Only show splash screen once per session
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    
    if (!hasSeenSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem('hasSeenSplash', 'true');
      }, 3500); // 3.5 seconds
      return () => clearTimeout(timer);
    } else {
      setShowSplash(false);
    }
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AnimatePresence>
            {showSplash && <Splash key="splashScreen" />}
          </AnimatePresence>

          <div className="min-h-screen flex flex-col pt-16">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                
                {/* Protected Routes */}
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/mood" element={<ProtectedRoute><MoodSelector /></ProtectedRoute>} />
                <Route path="/tracker" element={<ProtectedRoute><Tracker /></ProtectedRoute>} />
                <Route path="/contacts" element={<ProtectedRoute><Contacts /></ProtectedRoute>} />
                <Route path="/relief" element={<ProtectedRoute><Relief /></ProtectedRoute>} />
                <Route path="/chatbot" element={<ProtectedRoute><Chatbot /></ProtectedRoute>} />
                <Route path="/focus" element={<ProtectedRoute><Focus /></ProtectedRoute>} />
                <Route path="/counseling" element={<ProtectedRoute><Counseling /></ProtectedRoute>} />
                <Route path="/counselor-chat/:id" element={<ProtectedRoute><CounselorChat /></ProtectedRoute>} />
                
                {/* Catch all */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
            <EmergencyButton />
          </div>
        </Router>
        <FloatingChatbot />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
