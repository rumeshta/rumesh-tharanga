import React from 'react';
import { useApp } from '../context/AppContext';
import { Bookmark, Bell, Trash2, Search, ArrowRight } from 'lucide-react';

export const SavedSearchesScreen: React.FC = () => {
  const {
    savedSearches,
    removeSavedSearch,
    executeSearch,
    setCurrentLocation,
    t
  } = useApp();

  return (
    <div className="pb-24 pt-2 max-w-3xl mx-auto px-3 sm:px-4 space-y-4 animate-in fade-in duration-200">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Bookmark className="w-6 h-6 text-blue-600" />
          <span>{t('savedSearches')}</span>
        </h1>
        <p className="text-xs text-slate-500">
          {t('savedSearchesSubtitle')}
        </p>
      </div>

      {savedSearches.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">{t('noSavedSearches')}</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">{t('noSavedSearchesSub')}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {savedSearches.map((ss) => (
            <div
              key={ss.id}
              className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between gap-3 shadow-2xs hover:shadow-xs transition-shadow"
            >
              <div
                onClick={() => {
                  if (ss.county) {
                    setCurrentLocation({
                      county: ss.county,
                      city: ss.city || 'Toate sectoarele',
                      label: `${ss.city || ss.county}`
                    });
                  }
                  executeSearch(ss.query);
                }}
                className="flex-1 min-w-0 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-sm text-slate-900 hover:text-blue-600 truncate">
                    {ss.title}
                  </h3>
                  {ss.alertEnabled && (
                    <span className="p-1 rounded-full bg-emerald-50 text-emerald-600" title="Alerte active">
                      <Bell className="w-3 h-3" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  📍 {ss.county || t('allRomania')} • {t('postedOn')} {ss.createdAt}
                </p>
                <span className="inline-block text-[11px] font-bold text-blue-600 mt-1">
                  {ss.matchingCount} {t('matchingAdsCount')}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => executeSearch(ss.query)}
                  className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs flex items-center gap-1 cursor-pointer"
                >
                  <span>{t('viewBtn')}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  onClick={() => removeSavedSearch(ss.id)}
                  className="p-2 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600 cursor-pointer"
                  title={t('delete')}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
