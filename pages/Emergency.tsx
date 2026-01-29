
import React from 'react';
import { EMERGENCY_CONTACTS } from '../constants';
import { Phone, ShieldAlert, HeartHandshake, Info } from 'lucide-react';

const EmergencyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-12">
      <div className="bg-rose-50 border-2 border-rose-100 rounded-[3rem] p-8 md:p-12 flex flex-col items-center text-center">
        <div className="bg-rose-500 p-4 rounded-full mb-6 animate-pulse">
          <ShieldAlert size={48} className="text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-brand text-rose-900 mb-4">Emergency Support</h1>
        <p className="text-rose-700 max-w-xl text-lg font-medium leading-relaxed">
          If you or someone you know is in immediate danger or experiencing a crisis, please reach out to professional help right away.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center text-gray-800">
            <Phone size={24} className="mr-2 text-rose-500" />
            Helplines (India)
          </h2>
          <div className="space-y-4">
            {EMERGENCY_CONTACTS.map((c, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-rose-200 transition-all">
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">{c.name}</h3>
                  <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">{c.info}</p>
                  <p className="text-rose-500 text-xl font-black mt-1 group-hover:scale-105 transition-transform">{c.contact}</p>
                </div>
                <a 
                  href={`tel:${c.contact}`}
                  className="bg-rose-100 text-rose-600 p-4 rounded-2xl hover:bg-rose-500 hover:text-white transition-all"
                >
                  <Phone size={24} />
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center text-gray-800">
            <HeartHandshake size={24} className="mr-2 text-indigo-500" />
            What to do now?
          </h2>
          <div className="bg-indigo-50 rounded-3xl p-8 space-y-6">
            <div className="flex gap-4">
              <div className="bg-white h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-indigo-500 shadow-sm">1</div>
              <p className="text-indigo-900 font-medium">Reach out to a trusted friend or family member immediately.</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-white h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-indigo-500 shadow-sm">2</div>
              <p className="text-indigo-900 font-medium">Try to focus on your breathing. Take slow, deep breaths.</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-white h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-indigo-500 shadow-sm">3</div>
              <p className="text-indigo-900 font-medium">Step away from screens and move to a safe, quiet space.</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-white h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-indigo-500 shadow-sm">4</div>
              <p className="text-indigo-900 font-medium">Stay on the call with a helpline until you feel calmer.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-100 p-8 rounded-3xl border border-slate-200 flex items-start gap-4">
        <Info size={24} className="text-slate-400 flex-shrink-0 mt-1" />
        <div>
          <h4 className="font-bold text-slate-800 mb-2 uppercase text-xs tracking-widest">Important Disclaimer</h4>
          <p className="text-slate-500 text-sm leading-relaxed">
            SereneMind AI is a mental wellness support tool and is NOT a medical device. The information and insights provided are not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmergencyPage;
