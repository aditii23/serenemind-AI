
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { User } from './types';
import { db } from './services/db';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import StressQuiz from './pages/StressQuiz';
import MoodTracker from './pages/MoodTracker';
import AIAnalysisPage from './pages/AIAnalysis';
import ExercisesPage from './pages/Exercises';
import EmergencyPage from './pages/Emergency';
import { 
  Home, 
  BrainCircuit, 
  Heart, 
  Wind, 
  ShieldAlert, 
  LayoutDashboard,
  LogOut,
  Sparkles
} from 'lucide-react';

const Navbar: React.FC<{ user: User | null; onLogout: () => void }> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-indigo-500 p-2 rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold font-brand text-gray-800">SereneMind</span>
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <NavLink to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" />
            <NavLink to="/stress-quiz" icon={<BrainCircuit size={20} />} label="Stress Test" />
            <NavLink to="/mood-tracker" icon={<Heart size={20} />} label="Mood" />
            <NavLink to="/ai-analysis" icon={<Wind size={20} />} label="AI Analysis" />
            <NavLink to="/exercises" icon={<Home size={20} />} label="Exercises" />
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-600 hidden sm:inline">Hi, {user.name}</span>
                <button 
                  onClick={() => { onLogout(); navigate('/login'); }}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-indigo-500 text-white px-5 py-2 rounded-xl font-medium hover:bg-indigo-600 transition-colors">
                Get Started
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink: React.FC<{ to: string; icon: React.ReactNode; label: string }> = ({ to, icon, label }) => (
  <Link to={to} className="flex items-center space-x-1.5 text-gray-500 hover:text-indigo-500 transition-colors font-medium text-sm">
    {icon}
    <span>{label}</span>
  </Link>
);

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = db.auth.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const handleLogout = () => {
    db.auth.logout();
    setUser(null);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar user={user} onLogout={handleLogout} />
        
        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <Routes>
            <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} />
            <Route path="/" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
            <Route path="/stress-quiz" element={user ? <StressQuiz user={user} /> : <Navigate to="/login" />} />
            <Route path="/mood-tracker" element={user ? <MoodTracker user={user} /> : <Navigate to="/login" />} />
            <Route path="/ai-analysis" element={user ? <AIAnalysisPage user={user} /> : <Navigate to="/login" />} />
            <Route path="/exercises" element={user ? <ExercisesPage /> : <Navigate to="/login" />} />
            <Route path="/emergency" element={<EmergencyPage />} />
          </Routes>
        </main>

        <footer className="bg-white border-t border-gray-100 py-6">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-gray-400 text-xs">
              SereneMind AI is for wellness support only. Not a substitute for professional medical advice.
            </p>
            <Link to="/emergency" className="text-red-400 font-semibold text-xs mt-2 inline-block hover:underline">
              In crisis? Get Emergency Help
            </Link>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
