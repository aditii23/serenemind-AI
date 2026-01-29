
import React, { useState, useEffect } from 'react';
import { User, MoodType, MoodEntry } from '../types';
import { db } from '../services/db';
import { MOOD_EMOJIS } from '../constants';
import { Calendar, MessageSquare, History, Heart } from 'lucide-react';

const MoodTracker: React.FC<{ user: User }> = ({ user }) => {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [note, setNote] = useState('');
  const [history, setHistory] = useState<MoodEntry[]>([]);
  const [savedToday, setSavedToday] = useState(false);

  useEffect(() => {
    const moods = db.mood.getWeekly(user.id);
    setHistory(moods);
    
    // Check if user already logged mood today
    const today = new Date().toDateString();
    const loggedToday = moods.some(m => new Date(m.date).toDateString() === today);
    setSavedToday(loggedToday);
  }, [user.id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMood) return;

    db.mood.add(user.id, selectedMood, note);
    setSavedToday(true);
    setHistory(db.mood.getWeekly(user.id));
    setSelectedMood(null);
    setNote('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-brand text-gray-800">Mood Tracker</h1>
        <div className="bg-rose-100 text-rose-600 px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
          <Heart size={16} fill="currentColor" />
          Keep Caring for Yourself
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tracker Form */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-fit">
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <Calendar size={20} className="mr-2 text-indigo-500" />
            Daily Log
          </h2>

          {savedToday ? (
            <div className="text-center py-12 px-4 bg-indigo-50 rounded-2xl border border-indigo-100">
              <SmileEmoji size={64} className="mx-auto mb-4 text-indigo-500" />
              <h3 className="text-xl font-bold text-gray-800">Done for Today!</h3>
              <p className="text-gray-500 mt-2">You've successfully logged your mood. Consistency is key to understanding your emotional patterns.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">How do you feel?</label>
                <div className="flex flex-wrap gap-4 justify-between">
                  {(Object.keys(MOOD_EMOJIS) as MoodType[]).map((mood) => (
                    <button
                      key={mood}
                      type="button"
                      onClick={() => setSelectedMood(mood)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all border-2 w-[85px] ${
                        selectedMood === mood 
                          ? 'bg-indigo-500 border-indigo-500 scale-105' 
                          : 'bg-slate-50 border-transparent grayscale hover:grayscale-0 hover:bg-indigo-50'
                      }`}
                    >
                      <span className="text-3xl">{MOOD_EMOJIS[mood]}</span>
                      <span className={`text-[10px] font-bold uppercase tracking-tighter ${selectedMood === mood ? 'text-white' : 'text-gray-400'}`}>
                        {mood}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center">
                  <MessageSquare size={14} className="mr-1" />
                  Add a note (Optional)
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 h-24 outline-none text-gray-700"
                  placeholder="What's making you feel this way?"
                />
              </div>

              <button
                type="submit"
                disabled={!selectedMood}
                className="w-full bg-indigo-500 text-white py-4 rounded-2xl font-bold hover:bg-indigo-600 disabled:opacity-50 transition-all shadow-lg shadow-indigo-100"
              >
                Log Entry
              </button>
            </form>
          )}
        </div>

        {/* History List */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center">
            <History size={20} className="mr-2 text-rose-500" />
            Recent Entries
          </h2>
          {history.length > 0 ? (
            <div className="space-y-4">
              {history.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((entry) => (
                <div key={entry.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                  <div className="text-3xl bg-slate-50 p-3 rounded-xl">{MOOD_EMOJIS[entry.mood]}</div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-gray-800">{entry.mood}</h4>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">
                        {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    {entry.note && (
                      <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                        {entry.note}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-3xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400">
              <History size={48} className="mb-4 opacity-20" />
              <p>No mood logs yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SmileEmoji: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="9" cy="9" r="1" fill="currentColor" />
    <circle cx="15" cy="9" r="1" fill="currentColor" />
  </svg>
);

export default MoodTracker;
