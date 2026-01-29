
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, StressResult, MoodEntry, AIAnalysis } from '../types';
import { db } from '../services/db';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { 
  Plus, 
  Activity, 
  TrendingUp, 
  Zap, 
  ShieldCheck,
  ChevronRight,
  Smile,
  Frown,
  Wind
} from 'lucide-react';
import { MOOD_EMOJIS } from '../constants';

const Dashboard: React.FC<{ user: User }> = ({ user }) => {
  const [stressHistory, setStressHistory] = useState<StressResult[]>([]);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [aiHistory, setAiHistory] = useState<AIAnalysis[]>([]);

  useEffect(() => {
    setStressHistory(db.stress.getHistory(user.id));
    setMoodHistory(db.mood.getWeekly(user.id));
    setAiHistory(db.ai.getHistory(user.id));
  }, [user.id]);

  const latestStress = stressHistory[stressHistory.length - 1];
  const latestAi = aiHistory[aiHistory.length - 1];

  const chartData = moodHistory.map(m => ({
    date: new Date(m.date).toLocaleDateString('en-US', { weekday: 'short' }),
    mood: m.mood === 'Happy' ? 5 : m.mood === 'Calm' ? 4 : m.mood === 'Sad' ? 2 : m.mood === 'Anxious' ? 1 : 0
  }));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-brand text-gray-800">Mind Wellness Dashboard</h1>
          <p className="text-gray-500">Welcome back, {user.name}. How are you feeling today?</p>
        </div>
        <div className="flex gap-2">
          <Link 
            to="/mood-tracker"
            className="flex items-center space-x-2 bg-indigo-500 text-white px-4 py-2.5 rounded-xl hover:bg-indigo-600 transition-all font-medium"
          >
            <Plus size={18} />
            <span>Track Mood</span>
          </Link>
        </div>
      </header>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-50 p-2.5 rounded-2xl text-blue-500">
              <Activity size={24} />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Stress Level</span>
          </div>
          <div className="mt-2">
            <h3 className="text-2xl font-bold text-gray-800">
              {latestStress ? latestStress.level : 'Take the test'}
            </h3>
            <p className="text-sm text-gray-500 mt-1">Based on your latest assessment</p>
          </div>
          <Link to="/stress-quiz" className="mt-6 text-indigo-500 text-sm font-semibold flex items-center hover:underline">
            Test again <ChevronRight size={16} />
          </Link>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-rose-50 p-2.5 rounded-2xl text-rose-500">
              <Smile size={24} />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Current Mood</span>
          </div>
          <div className="mt-2">
            <h3 className="text-2xl font-bold text-gray-800">
              {moodHistory.length > 0 ? moodHistory[moodHistory.length - 1].mood : 'No data'}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {moodHistory.length > 0 ? MOOD_EMOJIS[moodHistory[moodHistory.length - 1].mood] : '---'}
            </p>
          </div>
          <Link to="/mood-tracker" className="mt-6 text-rose-500 text-sm font-semibold flex items-center hover:underline">
            View history <ChevronRight size={16} />
          </Link>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-emerald-50 p-2.5 rounded-2xl text-emerald-500">
              <Wind size={24} />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Daily Tip</span>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-600 leading-relaxed italic">
              "Focus on your breath for just 60 seconds. It can reset your entire nervous system."
            </p>
          </div>
          <Link to="/exercises" className="mt-6 text-emerald-500 text-sm font-semibold flex items-center hover:underline">
            Try breathing <ChevronRight size={16} />
          </Link>
        </div>
      </div>

      {/* Analytics & History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <TrendingUp size={20} className="mr-2 text-indigo-500" />
            Mood Trend (Past Week)
          </h2>
          <div className="h-64">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="mood" 
                    stroke="#6366f1" 
                    strokeWidth={4} 
                    dot={{ r: 6, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <p>Start tracking to see your mood journey</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <Zap size={20} className="mr-2 text-amber-500" />
            Latest AI Insights
          </h2>
          {latestAi ? (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                <p className="text-amber-800 text-sm italic">"{latestAi.empatheticSummary}"</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {latestAi.tips.map((tip, idx) => (
                  <span key={idx} className="bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full">
                    {tip}
                  </span>
                ))}
              </div>
              <Link to="/ai-analysis" className="block text-center bg-slate-50 py-3 rounded-xl text-indigo-500 font-bold hover:bg-slate-100 transition-colors">
                New Analysis
              </Link>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 py-12">
              <p className="text-center">Describe how you're feeling and let AI help you understand.</p>
              <Link to="/ai-analysis" className="mt-4 bg-indigo-50 text-indigo-600 px-6 py-2 rounded-xl font-bold hover:bg-indigo-100">
                Start Analysis
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
