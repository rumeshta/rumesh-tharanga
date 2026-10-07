import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShoppingBag,
  Search,
  Sparkles,
  Globe2,
  ArrowRight,
  Check
} from 'lucide-react';

export const OnboardingModal: React.FC = () => {
  const { onboardingOpen, setOnboardingOpen, language, setLanguage, t } = useApp();
  const [step, setStep] = useState(1);

  if (!onboardingOpen) return null;

  const handleFinish = () => {
    localStorage.setItem('repedero_onboarding_done', 'true');
    setOnboardingOpen(false);
  };

  const screens = [
    {
      step: 1,
      icon: ShoppingBag,
      color: 'bg-blue-600',
      title: language === 'ro' ? 'Bine ai venit la Repedero' : 'Welcome to Repedero',
      desc: language === 'ro'
        ? 'Cumpără și vinde aproape orice în România. Mașini, imobiliare, telefoane, locuri de muncă și servicii.'
        : 'Buy and sell almost anything in Romania. Cars, real estate, phones, jobs and local services.'
    },
    {
      step: 2,
      icon: Search,
      color: 'bg-indigo-600',
      title: language === 'ro' ? 'Găsește rapid' : 'Find quickly',
      desc: language === 'ro'
        ? 'Caută produse verificate aproape de tine, filtrează după județ, oraș și caracteristici detaliate.'
        : 'Search verified items near you, filter by county, city and precise specifications.'
    },
    {
      step: 3,
      icon: Sparkles,
      color: 'bg-amber-600',
      title: language === 'ro' ? 'Vinde simplu' : 'Sell easily',
      desc: language === 'ro'
        ? 'Publică un anunț în doar câteva minute. Beneficiază de asistentul inteligent Repedero pentru descrieri automate.'
        : 'Post an ad in minutes with our smart assistant for automated titles and descriptions.'
    },
    {
      step: 4,
      icon: Globe2,
      color: 'bg-emerald-600',
      title: language === 'ro' ? 'Alege limba / Choose language' : 'Select your language',
      desc: language === 'ro'
        ? 'Selectează limba preferată pentru utilizarea platformei:'
        : 'Pick your preferred language for the Repedero marketplace:'
    }
  ];

  const currentScreen = screens[step - 1];
  const Icon = currentScreen.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col items-center text-center relative overflow-hidden">
        {/* Glow Accent */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-blue-100 rounded-full blur-3xl pointer-events-none" />

        {/* Skip button */}
        {step < 4 && (
          <button
            onClick={handleFinish}
            className="absolute top-5 right-5 text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            {t('skip')}
          </button>
        )}

        {/* Icon */}
        <div className={`w-18 h-18 rounded-2xl ${currentScreen.color} text-white flex items-center justify-center shadow-lg shadow-blue-500/25 mb-6 transform transition-all duration-300`}>
          <Icon className="w-9 h-9" />
        </div>

        {/* Step dots */}
        <div className="flex gap-1.5 mb-5">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s === step ? 'w-6 bg-blue-600' : 'w-2 bg-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 tracking-tight">
          {currentScreen.title}
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed max-w-xs mb-6">
          {currentScreen.desc}
        </p>

        {/* Step 4 Language options */}
        {step === 4 && (
          <div className="w-full space-y-2.5 mb-6">
            <button
              onClick={() => setLanguage('ro')}
              className={`w-full p-3.5 rounded-2xl border flex items-center justify-between transition-all cursor-pointer ${
                language === 'ro'
                  ? 'border-blue-600 bg-blue-50/70 text-blue-900 shadow-xs'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🇷🇴</span>
                <span className="font-extrabold text-sm">Română</span>
              </div>
              {language === 'ro' && <Check className="w-5 h-5 text-blue-600" />}
            </button>

            <button
              onClick={() => setLanguage('en')}
              className={`w-full p-3.5 rounded-2xl border flex items-center justify-between transition-all cursor-pointer ${
                language === 'en'
                  ? 'border-blue-600 bg-blue-50/70 text-blue-900 shadow-xs'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🇬🇧</span>
                <span className="font-extrabold text-sm">English</span>
              </div>
              {language === 'en' && <Check className="w-5 h-5 text-blue-600" />}
            </button>
          </div>
        )}

        {/* Action Button */}
        {step < 4 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
          >
            <span>{t('next')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleFinish}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-800 hover:to-indigo-700 active:scale-[0.99] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/35 transition-all cursor-pointer"
          >
            <span>{t('getStarted')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
