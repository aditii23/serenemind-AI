
import React, { useState, useEffect } from 'react';
import { User, AIAnalysis } from '../types';
import { db } from '../services/db';
import { analyzeMentalState } from '../services/gemini';
import { Sparkles, Brain, Loader2, ListChecks, History, Quote } from 'lucide-react';

const AIAnalysisPage: React.FC<{ user: User }> = ({ user }) => {
  const [inputText, setInputText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AIAnalysis | null>(null);
  const [history, setHistory] = useState<AIAnalysis[]>([]);

  useEffect(() => {
    setHistory(db.ai.getHistory(user.id));
  }, [user.id]);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || analyzing) return;

    setAnalyzing(true);
    try {
      const analysis = await analyzeMentalState(user.id, inputText);
      const saved = db.ai.saveAnalysis(analysis);
      setResult(saved);
      setHistory(db.ai.getHistory(user.id));
      setInputText('');
    } catch (error) {
      alert("Failed to analyze. Please check your internet and try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-brand text-gray-800">Mind Explorer AI</h1>
        <div className="bg-indigo-100 text-indigo-600 px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
          <Brain size={16} />
          AI Powered Insights
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Sparkles size={20} className="mr-2 text-amber-500" />
          Share Your Thoughts
        </h2>
        <p className="text-gray-500 text-sm mb-6">Describe how your day went, any worries you have, or just express your feelings. AI will help analyze your stress and provide gentle coping tips.</p>
        
        <form onSubmit={handleAnalyze} className="space-y-4">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={analyzing}
            className="w-full p-6 bg-slate-50 border-none rounded-3xl focus:ring-2 focus:ring-indigo-500 h-40 outline-none text-gray-700 leading-relaxed disabled:opacity-50"
            placeholder="Write freely here... No one will judge."
          />
          <button
            type="submit"
            disabled={!inputText.trim() || analyzing}
            className="w-full bg-indigo-500 text-white py-4 rounded-2xl font-bold hover:bg-indigo-600 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100"
          >
            {analyzing ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>AI is thinking...</span>
              </>
            ) : (
              <>
                <Sparkles size={20} />
                <span>Analyze My Feelings</span>
              </>
            )}
          </button>
        </form>
      </div>

      {result && (
        <div className="bg-white p-8 rounded-3xl border border-indigo-100 shadow-xl animate-in slide-in-from-bottom-8 duration-500">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Your Insight Report</h2>
            <div className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
              result.stressLevel === 'High' ? 'bg-rose-100 text-rose-500' : 
              result.stressLevel === 'Moderate' ? 'bg-amber-100 text-amber-500' : 'bg-emerald-100 text-emerald-500'
            }`}>
              {result.stressLevel} Stress
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Detected Emotion</label>
                <div className="text-lg font-bold text-gray-800 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  {result.emotion}
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">AI Summary</label>
                <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-100 relative">
                  <Quote className="absolute top-2 left-2 text-indigo-200" size={32} />
                  <p className="text-indigo-900 italic leading-relaxed pl-4">{result.empatheticSummary}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Gentle Coping Steps</label>
                <div className="space-y-3">
                  {result.tips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-3 bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                      <div className="mt-1">
                        <ListChecks size={18} className="text-emerald-500" />
                      </div>
                      <span className="text-sm font-medium text-emerald-900">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => setResult(null)}
            className="mt-8 w-full py-3 bg-slate-50 rounded-xl text-gray-400 text-sm font-bold hover:bg-slate-100"
          >
            Clear Result
          </button>
        </div>
      )}

      {/* Analysis History */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold flex items-center">
          <History size={20} className="mr-2 text-indigo-500" />
          Previous Explorations
        </h2>
        {history.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {history.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((entry) => (
              <div key={entry.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => setResult(entry)}>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">{new Date(entry.date).toLocaleDateString()}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    entry.stressLevel === 'High' ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-500'
                  }`}>{entry.stressLevel}</span>
                </div>
                <p className="text-sm text-gray-700 line-clamp-2 italic mb-4">"{entry.inputText}"</p>
                <div className="text-xs font-bold text-indigo-500 flex items-center">
                  View Insight <Quote size={12} className="ml-1" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400 border-2 border-dashed border-gray-100 rounded-3xl">
            <p>No previous analysis found. Your first exploration awaits!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAnalysisPage;
