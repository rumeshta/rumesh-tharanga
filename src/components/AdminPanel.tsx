import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PromotionType } from '../types';
import {
  Lock,
  Users,
  ShoppingBag,
  AlertOctagon,
  TrendingUp,
  ShieldCheck,
  Check,
  X,
  Trash2,
  Sparkles,
  ChevronLeft,
  DollarSign,
  Tag,
  CheckCircle2,
  Ban
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const {
    goBack,
    listings,
    deleteListing,
    updateListing,
    promotionPackages,
    updatePromotionPrice,
    reports,
    resolveReport,
    t,
    language
  } = useApp();

  const [activeTab, setActiveTab] = useState<'listings' | 'reports' | 'pricing' | 'users'>('listings');
  const [editingPricePkg, setEditingPricePkg] = useState<PromotionType>(null);
  const [tempPrice, setTempPrice] = useState<number>(0);

  // Stats calculation
  const totalListings = listings.length;
  const activeListings = listings.filter((l) => l.status === 'active').length;
  const promotedListings = listings.filter((l) => l.isPromoted).length;
  const totalRevenueRON = listings.reduce((acc, l) => {
    if (l.promotionType === 'top_ad') return acc + 29.99;
    if (l.promotionType === 'featured') return acc + 39.99;
    if (l.promotionType === 'bump') return acc + 9.99;
    if (l.promotionType === 'highlight') return acc + 14.99;
    return acc;
  }, 3840);

  return (
    <div className="pb-28 pt-2 max-w-5xl mx-auto px-3 sm:px-4 space-y-5 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <button
          onClick={goBack}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{t('back')}</span>
        </button>

        <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-[10px] font-black uppercase tracking-wider">
          Admin Mode
        </span>
      </div>

      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Lock className="w-6 h-6 text-blue-600" />
          <span>
            {language === 'ro' ? 'Panou Administrare Repedero' : 'Repedero Admin Dashboard'}
          </span>
        </h1>
        <p className="text-xs text-slate-500">
          {t('adminPanelSubtitle')}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">{t('kpiActiveAds')}</span>
            <ShoppingBag className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-slate-900">{activeListings}</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">
            {language === 'ro' ? `din ${totalListings} total` : `out of ${totalListings} total`}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">{t('kpiPromotedAds')}</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-amber-600">{promotedListings}</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Top Ad & Bump Up</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">{t('kpiFraudReports')}</span>
            <AlertOctagon className="w-4 h-4 text-rose-500" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-rose-600">
            {reports.filter((r) => r.status === 'pending').length}
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">
            {language === 'ro' ? 'necesită verificare' : 'pending review'}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">{t('kpiRevenue')}</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-emerald-600">
            {new Intl.NumberFormat('ro-RO').format(Math.round(totalRevenueRON))} lei
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">
            {language === 'ro' ? 'monetizare activă' : 'active monetization'}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
        <button
          onClick={() => setActiveTab('listings')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'listings'
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          {t('adminListingsTab')} ({listings.length})
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'reports'
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          {t('adminReportsTab')} ({reports.length})
        </button>
        <button
          onClick={() => setActiveTab('pricing')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'pricing'
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          {t('adminPricingTab')}
        </button>
      </div>

      {/* TAB: Moderare Anunțuri */}
      {activeTab === 'listings' && (
        <div className="bg-white rounded-3xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-xs">
          {listings.map((l) => (
            <div key={l.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={l.images[0]}
                  alt={l.title}
                  className="w-14 h-14 rounded-xl object-cover shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 truncate">
                      {l.title}
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-md font-bold uppercase bg-slate-100 text-slate-600">
                      {l.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    {language === 'ro' ? 'Vânzător:' : 'Seller:'} <strong>{l.seller.name}</strong> • {language === 'ro' ? 'Preț:' : 'Price:'} <strong>{l.price} lei</strong> • {l.location.city}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                {l.status !== 'active' ? (
                  <button
                    onClick={() => updateListing(l.id, { status: 'active' })}
                    className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{t('adminApprove')}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => updateListing(l.id, { status: 'draft' })}
                    className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 text-xs font-bold cursor-pointer"
                  >
                    {t('adminReject')}
                  </button>
                )}

                <button
                  onClick={() => {
                    if (confirm(language === 'ro' ? 'Sigur doriți să ștergeți acest anunț ca administrator?' : 'Are you sure you want to delete this listing as administrator?')) {
                      deleteListing(l.id);
                    }
                  }}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                  title={t('delete')}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB: Rapoarte Utilizatori */}
      {activeTab === 'reports' && (
        <div className="bg-white rounded-3xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-xs">
          {reports.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              {language === 'ro' ? 'Nu există rapoarte nerezolvate.' : 'No pending reports.'}
            </div>
          ) : (
            reports.map((rep) => (
              <div key={rep.id} className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md">
                      {rep.reason}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{rep.date}</span>
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                    rep.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {rep.status}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                    {language === 'ro' ? 'Anunț:' : 'Listing:'} {rep.listingTitle} (ID: {rep.listingId})
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 font-medium bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    "{rep.details}"
                  </p>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    {language === 'ro' ? 'Raportat de:' : 'Reported by:'} {rep.reporterName}
                  </span>
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    onClick={() => {
                      deleteListing(rep.listingId);
                      resolveReport(rep.id);
                      alert(language === 'ro' ? 'Anunțul a fost eliminat și raportul soluționat.' : 'Listing removed and report resolved.');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 cursor-pointer"
                  >
                    {t('adminDeleteListing')}
                  </button>
                  <button
                    onClick={() => resolveReport(rep.id)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                  >
                    {t('adminDismissReport')}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB: Configurare Prețuri Promovare */}
      {activeTab === 'pricing' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-4 shadow-xs">
          <div>
            <h3 className="font-extrabold text-base text-slate-900">
              {language === 'ro'
                ? 'Configurare Prețuri Pachete Promovare (RON)'
                : 'Configure Promotion Package Prices (RON)'}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'ro'
                ? 'Prețurile sunt dinamice și salvate în memoria aplicației'
                : 'Prices are dynamic and saved in application state'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {promotionPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-extrabold text-sm text-slate-900">
                      {language === 'ro' ? pkg.nameRo : pkg.nameEn}
                    </span>
                    <span className="font-black text-sm text-blue-700">
                      {pkg.price} lei
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    {language === 'ro' ? pkg.descRo : pkg.descEn}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-bold">
                    {language === 'ro' ? `Durată: ${pkg.durationDays} zile` : `Duration: ${pkg.durationDays} days`}
                  </span>

                  {editingPricePkg === pkg.id ? (
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        value={tempPrice}
                        onChange={(e) => setTempPrice(Number(e.target.value))}
                        className="w-18 p-1 text-xs font-bold border border-blue-400 rounded-lg bg-white"
                      />
                      <button
                        onClick={() => {
                          updatePromotionPrice(pkg.id, tempPrice);
                          setEditingPricePkg(null);
                        }}
                        className="p-1 rounded-lg bg-blue-600 text-white"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingPricePkg(pkg.id);
                        setTempPrice(pkg.price);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-blue-400 text-xs font-bold text-slate-700 cursor-pointer"
                    >
                      {t('adminChangePrice')}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
