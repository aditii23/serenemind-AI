
import React, { useState } from 'react';
import { User, StressLevel } from '../types';
import { db } from '../services/db';
import { STRESS_QUESTIONS } from '../constants';
import { CheckCircle2, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';

const StressQuiz: React.FC<{ user: User }> = ({ user }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<{ score: number; level: StressLevel } | null>(null);

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = score;
    setAnswers(newAnswers);
  };

  const nextStep = () => {
    if (currentStep < STRESS_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const totalScore = answers.reduce((a, b) => a + b, 0);
      const res = db.stress.submit(user.id, totalScore);
      setResult({ score: res.score, level: res.level });
    }
  };

  const prevStep = () => setCurrentStep(currentStep - 1);

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
  };

  if (result) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center animate-in zoom-in duration-300">
        <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex justify-center mb-6">
            <div className={`p-6 rounded-full ${
              result.level === StressLevel.LOW ? 'bg-emerald-100 text-emerald-500' :
              result.level === StressLevel.MODERATE ? 'bg-amber-100 text-amber-500' :
              'bg-rose-100 text-rose-500'
            }`}>
              <CheckCircle2 size={64} />
            </div>
          </div>
          <h2 className="text-3xl font-bold font-brand mb-2">Assessment Complete</h2>
          <p className="text-gray-500 mb-8">Your Stress Level: <span className="font-bold text-gray-800">{result.level}</span></p>
          
          <div className="space-y-4 mb-8 text-left">
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h4 className="font-bold text-gray-800 mb-2">What this means:</h4>
              <p className="text-gray-600 text-sm">
                {result.level === StressLevel.LOW && "You are managing current stressors well. Maintain your healthy habits!"}
                {result.level === StressLevel.MODERATE && "You're experiencing some pressure. Consider incorporating regular relaxation breaks into your schedule."}
                {result.level === StressLevel.HIGH && "Your stress levels are quite elevated. We highly recommend focused mindfulness exercises or talking to a trusted friend or counselor."}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={resetQuiz}
              className="px-8 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw size={18} /> Take Again
            </button>
            <a 
              href="#/exercises" 
              className="px-8 py-3 bg-indigo-500 text-white rounded-xl font-bold hover:bg-indigo-600 transition-colors"
            >
              View Recommended Exercises
            </a>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = STRESS_QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / STRESS_QUESTIONS.length) * 100;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-bold text-indigo-500">Question {currentStep + 1} of {STRESS_QUESTIONS.length}</span>
          <span className="text-sm font-medium text-gray-400">{Math.round(progress)}% Complete</span>
        </div>
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-gray-100 min-h-[400px] flex flex-col">
        <h2 className="text-2xl font-bold text-gray-800 mb-10 leading-relaxed">
          {currentQuestion.text}
        </h2>

        <div className="grid grid-cols-1 gap-4 mb-auto">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option.score)}
              className={`p-5 rounded-2xl border-2 transition-all text-left font-medium ${
                answers[currentStep] === option.score 
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                  : 'border-gray-100 hover:border-gray-200 text-gray-600'
              }`}
            >
              {option.text}
            </button>
          ))}
        </div>

        <div className="flex justify-between mt-12 pt-8 border-t border-gray-50">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center space-x-2 text-gray-400 font-bold disabled:opacity-30 hover:text-gray-600"
          >
            <ArrowLeft size={20} />
            <span>Previous</span>
          </button>
          <button
            onClick={nextStep}
            disabled={answers[currentStep] === undefined}
            className="flex items-center space-x-2 bg-indigo-500 text-white px-8 py-3 rounded-xl font-bold disabled:opacity-50 hover:bg-indigo-600 transition-all"
          >
            <span>{currentStep === STRESS_QUESTIONS.length - 1 ? 'See Results' : 'Next'}</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StressQuiz;
