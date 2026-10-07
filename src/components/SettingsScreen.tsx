import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ChevronLeft,
  Globe,
  MapPin,
  Wifi,
  Bell,
  Lock,
  Shield,
  CreditCard,
  HelpCircle,
  FileText,
  Trash2,
  Check
} from 'lucide-react';

export const SettingsScreen: React.FC = () => {
  const {
    goBack,
    t,
    language,
    setLanguage,
    currentLocation,
    setLocationModalOpen,
    dataSavingMode,
    setDataSavingMode
  } = useApp();

  const [infoModalText, setInfoModalText] = React.useState<string | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = React.useState(false);

  return (
    <div className="pb-28 pt-2 max-w-2xl mx-auto px-3 sm:px-4 space-y-4 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <button
          onClick={goBack}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{t('back')}</span>
        </button>
      </div>

      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          {t('settings')}
        </h1>
        <p className="text-xs text-slate-500">{t('settingsSubtitle')}</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 space-y-4 shadow-xs">
        {/* Language Selection */}
        <div>
          <label className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5 mb-2">
            <Globe className="w-4 h-4 text-blue-600" />
            <span>{t('language')}</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setLanguage('ro')}
              className={`p-3 rounded-2xl border flex items-center justify-between text-xs font-extrabold transition-all cursor-pointer ${
                language === 'ro'
                  ? 'border-blue-600 bg-blue-50/70 text-blue-900 shadow-2xs'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>🇷🇴</span>
                <span>Română</span>
              </div>
              {language === 'ro' && <Check className="w-4 h-4 text-blue-600" />}
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`p-3 rounded-2xl border flex items-center justify-between text-xs font-extrabold transition-all cursor-pointer ${
                language === 'en'
                  ? 'border-blue-600 bg-blue-50/70 text-blue-900 shadow-2xs'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>🇬🇧</span>
                <span>English</span>
              </div>
              {language === 'en' && <Check className="w-4 h-4 text-blue-600" />}
            </button>
          </div>
        </div>

        {/* Location setting */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-blue-600" />
            <div>
              <span className="font-bold text-xs sm:text-sm text-slate-800 block">
                {t('defaultLocationLabel')}
              </span>
              <span className="text-xs text-slate-500">
                {currentLocation.county === 'România' ? t('allRomania') : currentLocation.label}
              </span>
            </div>
          </div>
          <button
            onClick={() => setLocationModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
          >
            {t('change')}
          </button>
        </div>

        {/* Data saving mode toggle */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Wifi className="w-4 h-4 text-amber-600" />
            <div>
              <span className="font-bold text-xs sm:text-sm text-slate-800 block">
                {t('dataSavingMode')}
              </span>
              <span className="text-xs text-slate-500">
                {t('dataSavingSettingDesc')}
              </span>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={dataSavingMode}
              onChange={(e) => setDataSavingMode(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Terms & Legal */}
        <div className="pt-3 border-t border-slate-100 space-y-2">
          <button
            onClick={() => setInfoModalText(language === 'ro' ? 'Termeni și Condiții Repedero: Marketplace de încredere conform legislației României și Uniunii Europene. Toate tranzacțiile respectă normele de protecție a consumatorilor.' : 'Repedero Terms and Conditions: Trusted marketplace compliant with Romanian and European Union laws.')}
            className="w-full flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-xl text-left text-xs font-bold text-slate-700 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-400" />
              <span>{t('termsOfUse')}</span>
            </div>
            <span>→</span>
          </button>

          <button
            onClick={() => setInfoModalText(language === 'ro' ? 'Politica de Confidențialitate Repedero conform Regulamentului GDPR (UE) 2016/679. Datele tale personale sunt criptate și securizate.' : 'Repedero Privacy Policy: Full compliance with EU GDPR regulations. Your personal information is encrypted and never sold.')}
            className="w-full flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-xl text-left text-xs font-bold text-slate-700 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-slate-400" />
              <span>{t('privacyPolicy')}</span>
            </div>
            <span>→</span>
          </button>
        </div>

        {/* Delete account */}
        <div className="pt-3 border-t border-slate-100">
          <button
            onClick={() => setDeleteConfirmOpen(true)}
            className="w-full py-2.5 rounded-xl hover:bg-rose-50 text-rose-600 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>{t('deleteAccountBtn')}</span>
          </button>
        </div>
      </div>

      {/* Info Modal */}
      {infoModalText && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <p className="text-xs text-slate-700 leading-relaxed font-medium">{infoModalText}</p>
            <button
              onClick={() => setInfoModalText(null)}
              className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
            >
              {t('close')}
            </button>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {deleteConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="font-extrabold text-base text-slate-900">{t('deleteAccountBtn')}</h3>
            <p className="text-xs text-slate-600">
              {language === 'ro'
                ? 'Sigur doriți să ștergeți contul? Această acțiune este ireversibilă conform GDPR.'
                : 'Are you sure you want to delete your account? This action cannot be undone under GDPR.'}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteConfirmOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                {t('cancel')}
              </button>
              <button
                onClick={() => {
                  setDeleteConfirmOpen(false);
                  setInfoModalText(language === 'ro' ? 'Contul tău a fost programat pentru ștergere conform GDPR.' : 'Account scheduled for deletion per GDPR request.');
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs"
              >
                {t('delete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
