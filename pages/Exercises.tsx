
import React, { useState, useEffect, useRef } from 'react';
import { GUIDED_EXERCISES } from '../constants';
import { Exercise } from '../types';
import { Play, Pause, RotateCcw, Wind, Target, Eye, ChevronLeft } from 'lucide-react';

const ExercisesPage: React.FC = () => {
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startExercise = (ex: Exercise) => {
    setActiveExercise(ex);
    const mins = parseInt(ex.duration.split(' ')[0]);
    setTimeLeft(mins * 60);
    setIsActive(true);
  };

  const stopExercise = () => {
    setActiveExercise(null);
    setIsActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (activeExercise) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-12 animate-in zoom-in duration-500">
        <button 
          onClick={stopExercise}
          className="absolute top-24 left-8 flex items-center text-gray-400 hover:text-indigo-500 font-bold"
        >
          <ChevronLeft size={24} /> Back to Library
        </button>

        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold font-brand text-gray-800">{activeExercise.title}</h2>
          <p className="text-indigo-500 font-medium tracking-wide uppercase text-sm">{activeExercise.category}</p>
        </div>

        {activeExercise.category === 'Breathing' && (
          <div className="relative flex items-center justify-center w-64 h-64">
            <div className="absolute w-full h-full rounded-full bg-indigo-500/10 breathe-circle"></div>
            <div className="absolute w-48 h-48 rounded-full bg-indigo-500/20 breathe-circle" style={{ animationDelay: '1s' }}></div>
            <div className="text-6xl font-black text-indigo-500 font-mono tabular-nums">
              {formatTime(timeLeft)}
            </div>
          </div>
        )}

        {activeExercise.category !== 'Breathing' && (
          <div className="text-8xl font-black text-indigo-500 font-mono tabular-nums bg-white p-12 rounded-full shadow-2xl border-4 border-indigo-50">
            {formatTime(timeLeft)}
          </div>
        )}

        <div className="flex gap-6">
          <button 
            onClick={() => setIsActive(!isActive)}
            className="w-16 h-16 bg-indigo-500 text-white rounded-full flex items-center justify-center hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-100"
          >
            {isActive ? <Pause size={32} /> : <Play size={32} />}
          </button>
          <button 
            onClick={() => {
              const mins = parseInt(activeExercise.duration.split(' ')[0]);
              setTimeLeft(mins * 60);
              setIsActive(false);
            }}
            className="w-16 h-16 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center hover:bg-slate-200 transition-all"
          >
            <RotateCcw size={28} />
          </button>
        </div>

        <div className="max-w-md text-center bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
          <p className="text-indigo-800 font-medium leading-relaxed">
            {activeExercise.category === 'Breathing' ? "Slowly inhale through your nose as the circle expands, and exhale through your mouth as it shrinks." : 
             activeExercise.category === 'Grounding' ? "Focus on 5 things you see, 4 you feel, 3 you hear, 2 you smell, and 1 you taste." :
             "Set aside all distractions and focus entirely on your breath for the duration of this session."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold font-brand text-gray-800">Mindfulness Library</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">Short, effective exercises designed to help you regain focus, reduce anxiety, and feel more present.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {GUIDED_EXERCISES.map((ex) => (
          <div key={ex.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group flex flex-col">
            <div className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center ${
              ex.category === 'Breathing' ? 'bg-blue-50 text-blue-500' :
              ex.category === 'Grounding' ? 'bg-emerald-50 text-emerald-500' :
              'bg-amber-50 text-amber-500'
            }`}>
              {ex.category === 'Breathing' && <Wind size={28} />}
              {ex.category === 'Grounding' && <Target size={28} />}
              {ex.category === 'Focus' && <Eye size={28} />}
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{ex.category}</span>
                <span className="text-xs font-bold text-gray-400">{ex.duration}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{ex.title}</h3>
            </div>
            
            <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
              {ex.description}
            </p>

            <button 
              onClick={() => startExercise(ex)}
              className="w-full py-4 bg-slate-50 text-indigo-500 font-bold rounded-2xl group-hover:bg-indigo-500 group-hover:text-white transition-all flex items-center justify-center gap-2"
            >
              Start Session <Play size={18} />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-emerald-50 p-10 rounded-[3rem] border border-emerald-100 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-shrink-0 bg-white p-6 rounded-3xl shadow-sm">
          <Wind size={48} className="text-emerald-500" />
        </div>
        <div className="flex-grow">
          <h4 className="text-xl font-bold text-emerald-900 mb-2">Did you know?</h4>
          <p className="text-emerald-700 leading-relaxed">
            Even 3 minutes of box breathing can lower your cortisol levels by 20%. It's one of the fastest ways to switch your body from "fight-or-flight" to "rest-and-digest" mode.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExercisesPage;
