import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  AlertTriangle,
  Lock,
  CreditCard,
  UserCheck,
  PackageCheck,
  ChevronLeft,
  PhoneCall,
  Check
} from 'lucide-react';

export const SafetyCenterScreen: React.FC = () => {
  const { goBack, t, language } = useApp();

  const safetyGuidelines = [
    {
      title: t('safePillar1Title'),
      desc: t('safePillar1Desc'),
      icon: UserCheck
    },
    {
      title: t('safePillar2Title'),
      desc: t('safePillar2Desc'),
      icon: CreditCard
    },
    {
      title: t('safePillar3Title'),
      desc: t('safePillar3Desc'),
      icon: PackageCheck
    },
    {
      title: t('safePillar4Title'),
      desc: t('safePillar4Desc'),
      icon: AlertTriangle
    }
  ];

  return (
    <div className="pb-24 pt-2 max-w-3xl mx-auto px-3 sm:px-4 space-y-5 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <button
          onClick={goBack}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{t('back')}</span>
        </button>
      </div>

      <div className="text-center space-y-2">
        <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto shadow-sm">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          {t('safetyCenter')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          {t('safetyCenterSubtitle')}
        </p>
      </div>

      {/* Main Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {safetyGuidelines.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2 shadow-2xs"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-sm text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Warning around phishing */}
      <div className="bg-rose-50 border border-rose-200 rounded-3xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-rose-800">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
          <h3 className="font-black text-sm sm:text-base">
            {t('phishingWarningTitle')}
          </h3>
        </div>
        <ul className="text-xs text-rose-900 space-y-1.5 list-disc list-inside font-medium leading-relaxed">
          <li>{t('phishingTip1')}</li>
          <li>{t('phishingTip2')}</li>
          <li>{t('phishingTip3')}</li>
        </ul>
      </div>

      {/* Contact Support */}
      <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 text-center space-y-3 shadow-lg">
        <h3 className="font-black text-base">{t('suspiciousBehaviorTitle')}</h3>
        <p className="text-xs text-slate-300 max-w-md mx-auto">
          {t('suspiciousBehaviorDesc')}
        </p>
      </div>
    </div>
  );
};
