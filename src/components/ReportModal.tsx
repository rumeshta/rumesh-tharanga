import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Flag, AlertTriangle } from 'lucide-react';

export const ReportModal: React.FC = () => {
  const { reportModalOpen, closeReportModal, reportListing, submitReport, t, language } = useApp();
  const [reasonIndex, setReasonIndex] = useState(0);
  const [details, setDetails] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!reportModalOpen || !reportListing) return null;

  const reasonsList = [
    { ro: 'Scam / Fraudă suspectă', en: 'Scam / Suspicious fraud' },
    { ro: 'Produs contrafăcut / Fals', en: 'Counterfeit / Fake product' },
    { ro: 'Categorie greșită', en: 'Wrong category' },
    { ro: 'Conținut ofensator sau ilegal', en: 'Offensive or illegal content' },
    { ro: 'Preț fals sau nerealist', en: 'False or unrealistic price' },
    { ro: 'Anunț duplicat', en: 'Duplicate listing' },
    { ro: 'Vânzătorul cere date bancare pe WhatsApp', en: 'Seller requests card details on WhatsApp' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const chosenReason = reasonsList[reasonIndex]?.[language] || reasonsList[0][language];
    submitReport(reportListing.id, chosenReason, details);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      closeReportModal();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 space-y-4 shadow-2xl relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-rose-600">
            <Flag className="w-5 h-5" />
            <h3 className="font-extrabold text-base text-slate-900">{t('reportModalTitle')}</h3>
          </div>
          <button
            onClick={closeReportModal}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-600">
          {language === 'ro' ? 'Raportezi:' : 'Reporting:'} <strong>"{reportListing.title}"</strong>
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {t('reportReasonLabel')}
            </label>
            <select
              value={reasonIndex}
              onChange={(e) => setReasonIndex(Number(e.target.value))}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-hidden"
            >
              {reasonsList.map((r, i) => (
                <option key={i} value={i}>
                  {r[language]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {t('reportDetailsLabel')}
            </label>
            <textarea
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder={t('reportDetailsPlaceholder')}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={closeReportModal}
              className="px-4 py-2 rounded-xl text-slate-600 font-bold text-xs"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md cursor-pointer"
            >
              {t('reportSubmitBtn')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
