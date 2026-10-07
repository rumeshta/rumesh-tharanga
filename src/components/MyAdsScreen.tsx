import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Listing, PromotionType } from '../types';
import {
  Sparkles,
  CheckCircle2,
  PauseCircle,
  PlayCircle,
  Trash2,
  Share2,
  BarChart2,
  Flame,
  ArrowUpCircle,
  Plus,
  Eye,
  Heart,
  MessageSquare,
  X
} from 'lucide-react';

export const MyAdsScreen: React.FC = () => {
  const {
    listings,
    currentUser,
    t,
    language,
    markListingAsSold,
    pauseListing,
    deleteListing,
    promoteListing,
    bumpListing,
    openListing,
    openShareModal,
    setCurrentView,
    promotionPackages
  } = useApp();

  const [activeTab, setActiveTab] = useState<'active' | 'pending' | 'draft' | 'expired' | 'sold'>('active');
  const [promoteModalListing, setPromoteModalListing] = useState<Listing | null>(null);
  const [statsModalListing, setStatsModalListing] = useState<Listing | null>(null);

  // My listings
  const myListings = listings.filter((l) => l.sellerId === (currentUser?.id || 'user-current'));
  const filteredListings = myListings.filter((l) => {
    if (activeTab === 'active') return l.status === 'active';
    if (activeTab === 'pending') return l.status === 'pending';
    if (activeTab === 'draft') return l.status === 'draft';
    if (activeTab === 'expired') return l.status === 'expired';
    if (activeTab === 'sold') return l.status === 'sold';
    return true;
  });

  return (
    <div className="pb-28 pt-2 max-w-4xl mx-auto px-3 sm:px-4 space-y-4 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {t('myAds')}
          </h1>
          <p className="text-xs text-slate-500">{t('myAdsSubtitle')}</p>
        </div>
        <button
          onClick={() => setCurrentView('post_ad')}
          className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{t('navPostAd')}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar border-b border-slate-200 pb-1">
        {[
          { id: 'active', label: t('tabActive') },
          { id: 'pending', label: t('tabPending') },
          { id: 'draft', label: t('tabDrafts') },
          { id: 'expired', label: t('tabExpired') },
          { id: 'sold', label: t('tabSold') }
        ].map((tab) => {
          const count = myListings.filter((l) => l.status === tab.id).length;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeTab === tab.id ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Listings List */}
      {filteredListings.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-3">
          <p className="text-sm font-bold text-slate-600">{t('noAdsInTab')}</p>
          <button
            onClick={() => setCurrentView('post_ad')}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
          >
            {t('postAdTitle')}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredListings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-2xs hover:shadow-xs transition-shadow"
            >
              <div className="flex gap-3">
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-24 h-24 rounded-xl object-cover shrink-0 cursor-pointer"
                  onClick={() => openListing(listing)}
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        onClick={() => openListing(listing)}
                        className="font-bold text-sm text-slate-900 hover:text-blue-600 cursor-pointer line-clamp-2"
                      >
                        {language === 'en' && listing.titleEn ? listing.titleEn : listing.title}
                      </h3>
                      {listing.isPromoted && (
                        <span className="bg-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md shrink-0">
                          {t('promoted')}
                        </span>
                      )}
                    </div>
                    <span className="font-black text-base text-blue-700">
                      {new Intl.NumberFormat('ro-RO').format(listing.price)} lei
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {listing.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5" />
                      {listing.favoritesCount}
                    </span>
                    <span>📍 {listing.location.city}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  {listing.status === 'active' && (
                    <button
                      onClick={() => setPromoteModalListing(listing)}
                      className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200 flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>{t('promoteAd')}</span>
                    </button>
                  )}

                  {listing.status === 'active' && (
                    <button
                      onClick={() => markListingAsSold(listing.id)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{t('markAsSold')}</span>
                    </button>
                  )}

                  <button
                    onClick={() => pauseListing(listing.id)}
                    className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-600 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    title={listing.status === 'active' ? t('pauseAd') : t('activateAd')}
                  >
                    {listing.status === 'active' ? (
                      <>
                        <PauseCircle className="w-4 h-4 text-slate-500" />
                        <span className="hidden sm:inline">{t('pauseAd')}</span>
                      </>
                    ) : (
                      <>
                        <PlayCircle className="w-4 h-4 text-blue-600" />
                        <span className="hidden sm:inline">{t('activateAd')}</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setStatsModalListing(listing)}
                    className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-blue-600 cursor-pointer"
                    title={t('adStatisticsTitle')}
                  >
                    <BarChart2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => openShareModal(listing)}
                    className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-blue-600 cursor-pointer"
                    title={t('shareAd')}
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(language === 'ro' ? 'Sigur doriți să ștergeți acest anunț?' : 'Are you sure you want to delete this ad?')) {
                        deleteListing(listing.id);
                      }
                    }}
                    className="p-2 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600 cursor-pointer"
                    title={t('deleteAd')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Promotion Upsell Modal */}
      {promoteModalListing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-3xl p-5 sm:p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h3 className="font-extrabold text-base text-slate-900">
                  {t('promoteModalTitle')}
                </h3>
              </div>
              <button
                onClick={() => setPromoteModalListing(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              {t('promoteModalDesc')} <strong>"{promoteModalListing.title}"</strong>:
            </p>

            <div className="space-y-2">
              {promotionPackages.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => {
                    promoteListing(promoteModalListing.id, pkg.id);
                    setPromoteModalListing(null);
                    alert(language === 'ro' ? `Anunțul a fost promovat cu "${pkg.nameRo}"!` : `Listing boosted with "${pkg.nameEn}"!`);
                  }}
                  className="w-full p-3 rounded-2xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-left transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div>
                    <h4 className="font-extrabold text-xs text-slate-900 group-hover:text-blue-700">
                      {language === 'ro' ? pkg.nameRo : pkg.nameEn}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {language === 'ro' ? pkg.descRo : pkg.descEn}
                    </p>
                  </div>
                  <span className="font-black text-sm text-blue-700 shrink-0 ml-3">
                    {pkg.price} lei
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Stats Modal */}
      {statsModalListing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-slate-900">{t('adStatisticsTitle')}</h3>
              <button
                onClick={() => setStatsModalListing(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h4 className="text-xs font-bold text-slate-600 line-clamp-1">
              {language === 'en' && statsModalListing.titleEn ? statsModalListing.titleEn : statsModalListing.title}
            </h4>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="block font-black text-lg text-blue-700">
                  {statsModalListing.views}
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">{t('viewsStat')}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="block font-black text-lg text-rose-600">
                  {statsModalListing.favoritesCount}
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">{t('favoritesStat')}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="block font-black text-lg text-emerald-600">
                  {Math.floor(statsModalListing.views * 0.12) + 2}
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">{t('messagesStat')}</span>
              </div>
            </div>

            <button
              onClick={() => setStatsModalListing(null)}
              className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
            >
              {t('close')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
