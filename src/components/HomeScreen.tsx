import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/categories';
import { ListingCard } from './ListingCard';
import {
  Search,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  PlusCircle,
  Store,
  ChevronRight,
  Flame,
  CheckCircle2,
  Car,
  Building2,
  Smartphone,
  Laptop,
  Armchair,
  Watch,
  Briefcase,
  Wrench,
  Baby,
  Trophy,
  Heart,
  Factory
} from 'lucide-react';

const ICON_COMPONENTS: Record<string, React.ElementType> = {
  Car,
  Building2,
  Smartphone,
  Laptop,
  Armchair,
  Watch,
  Briefcase,
  Wrench,
  Baby,
  Trophy,
  Heart,
  Factory
};

export const HomeScreen: React.FC = () => {
  const {
    t,
    language,
    currentLocation,
    setLocationModalOpen,
    searchQuery,
    setSearchQuery,
    executeSearch,
    listings,
    setCurrentView,
    openSellerShop,
    setSelectedCategoryId
  } = useApp();

  const [inputVal, setInputVal] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(inputVal || searchQuery);
  };

  const quickSearchTags = language === 'ro'
    ? [
        'iPhone 15',
        'BMW Seria 3',
        'apartament București',
        'laptop gaming',
        'canapea extensibilă',
        'bicicletă',
        'loc de muncă'
      ]
    : [
        'iPhone 15',
        'BMW 3 Series',
        'Bucharest apartment',
        'gaming laptop',
        'sofa bed',
        'bicycle',
        'jobs'
      ];

  // Filter listings for sections
  const topAds = listings.filter((l) => l.isPromoted && l.status === 'active');
  const recentAds = listings.filter((l) => l.status === 'active').slice(0, 6);

  return (
    <div className="pb-24 pt-3 space-y-6 max-w-7xl mx-auto px-3 sm:px-4">
      {/* Hero Search Section */}
      <div className="relative rounded-3xl bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white p-5 sm:p-8 shadow-xl overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-blue-100">
            <span>🇷🇴</span>
            <span>{t('subTagline')}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            {language === 'ro' ? (
              <>
                Cumpără și vinde <span className="text-amber-400">orice</span> în România
              </>
            ) : (
              <>
                Buy and sell <span className="text-amber-400">anything</span> in Romania
              </>
            )}
          </h1>

          {/* Location Chip on Mobile */}
          <div className="flex justify-center">
            <button
              onClick={() => setLocationModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md text-white text-xs font-bold transition-all cursor-pointer border border-white/20"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-300" />
              <span>
                {currentLocation.county === 'România'
                  ? t('allRomania')
                  : currentLocation.label}
              </span>
              <span className="text-[10px] text-white/70 underline ml-1">{t('change')}</span>
            </button>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="relative mt-2">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full pl-11 pr-28 py-3.5 sm:py-4 bg-white text-slate-900 rounded-2xl shadow-xl text-xs sm:text-sm font-medium focus:ring-4 focus:ring-blue-400/40 outline-hidden transition-all placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="absolute right-2 px-4 sm:px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
              >
                {t('searchButton')}
              </button>
            </div>
          </form>

          {/* Quick Search Chips */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
            <span className="text-[11px] text-blue-200 font-medium">{t('quickSearch')}</span>
            {quickSearchTags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setInputVal(tag);
                  executeSearch(tag);
                }}
                className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-blue-100 text-[11px] font-medium transition-colors cursor-pointer border border-white/10"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
            <span>{t('browseCategories')}</span>
          </h2>
          <button
            onClick={() => setCurrentView('categories')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
          >
            <span>{t('viewAll')}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2 sm:gap-3">
          {CATEGORIES.map((cat) => {
            const IconComp = ICON_COMPONENTS[cat.icon] || Sparkles;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategoryId(cat.id);
                  setCurrentView('search');
                }}
                className="group flex flex-col items-center p-2.5 sm:p-3 rounded-2xl bg-white hover:bg-blue-50/50 border border-slate-200/80 hover:border-blue-300 transition-all cursor-pointer text-center"
              >
                <div
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform mb-1.5`}
                >
                  <IconComp className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-slate-800 line-clamp-1 group-hover:text-blue-700">
                  {language === 'ro' ? cat.nameRo : cat.nameEn}
                </span>
                <span className="text-[9px] text-slate-400 font-medium hidden sm:inline">
                  {cat.itemCount} {t('adsCount')}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Top Ads (Promoted Listings) Carousel */}
      {topAds.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  {t('featuredListings')}
                </h2>
                <p className="text-[11px] text-slate-500">
                  {t('featuredSubtitle')}
                </p>
              </div>
            </div>
            <button
              onClick={() => setCurrentView('search')}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
            >
              <span>{t('viewAll')}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {topAds.map((listing) => (
              <ListingCard key={listing.id} listing={listing} layout="grid" />
            ))}
          </div>
        </section>
      )}

      {/* Verified Seller Shops Showcase */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 rounded-3xl p-5 sm:p-6 text-white shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white">
                {t('popularShops')}
              </h2>
              <p className="text-xs text-slate-300">
                {t('popularShopsSubtitle')}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Shop 1: Auto Mihai */}
          <div
            onClick={() => openSellerShop('seller-shop-auto')}
            className="group bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/10 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80"
                  alt="Auto Mihai"
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-blue-400/50"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <h3 className="font-extrabold text-sm text-white group-hover:text-blue-300 transition-colors">
                      Auto Mihai SRL
                    </h3>
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <span className="text-[11px] text-amber-300 font-bold">
                    ★ 4.8 ({language === 'ro' ? '142 recenzii' : '142 reviews'})
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-300 line-clamp-2">
                {language === 'ro'
                  ? 'Parc auto autorizat București. Garanție 12 luni, kilometri certificați și verificare 150 puncte.'
                  : 'Authorized car dealership Bucharest. 12-month warranty, certified mileage and 150-point inspection.'}
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-blue-300">
              <span>125 {t('activeAdsCount')}</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                {t('visitShop')}
              </span>
            </div>
          </div>

          {/* Shop 2: ElectroCluj */}
          <div
            onClick={() => openSellerShop('seller-shop-tech')}
            className="group bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/10 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                  alt="ElectroCluj"
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-purple-400/50"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <h3 className="font-extrabold text-sm text-white group-hover:text-blue-300 transition-colors">
                      ElectroCluj GSM & IT
                    </h3>
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <span className="text-[11px] text-amber-300 font-bold">
                    ★ 4.9 ({language === 'ro' ? '88 recenzii' : '88 reviews'})
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-300 line-clamp-2">
                {language === 'ro'
                  ? 'Telefoane Apple & Samsung noi și second-hand verificate, garanție 24 luni, magazin Cluj.'
                  : 'New and inspected Apple & Samsung phones, 24-month warranty, Cluj retail store.'}
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-blue-300">
              <span>48 {t('activeAdsCount')}</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                {t('visitShop')}
              </span>
            </div>
          </div>

          {/* Shop 3: Habitat Imobiliare */}
          <div
            onClick={() => openSellerShop('seller-realty')}
            className="group bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/10 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80"
                  alt="Habitat Imobiliare"
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-emerald-400/50"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <h3 className="font-extrabold text-sm text-white group-hover:text-blue-300 transition-colors">
                      Habitat Imobiliare
                    </h3>
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <span className="text-[11px] text-amber-300 font-bold">
                    ★ 4.7 ({language === 'ro' ? '64 recenzii' : '64 reviews'})
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-300 line-clamp-2">
                {language === 'ro'
                  ? 'Proprietăți premium Timișoara, apartamente noi de la dezvoltatori cu comision 0%.'
                  : 'Premium properties Timișoara, new apartments from developers with 0% commission.'}
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-blue-300">
              <span>32 {t('activeAdsCount')}</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                {t('visitShop')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Listings */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              {t('latestListings')}
            </h2>
            <p className="text-[11px] text-slate-500">
              {t('latestSubtitle')}
            </p>
          </div>
          <button
            onClick={() => setCurrentView('search')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
          >
            <span>{t('viewAll')}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {recentAds.map((listing) => (
            <ListingCard key={listing.id} listing={listing} layout="grid" />
          ))}
        </div>
      </section>

      {/* Trust & Safety Banner */}
      <div className="bg-blue-50/80 border border-blue-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
              {t('tradeInSafety')}
            </h3>
            <p className="text-xs text-slate-600">
              {t('tradeInSafetyDesc')}
            </p>
          </div>
        </div>
        <button
          onClick={() => setCurrentView('safety_center')}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-blue-700 font-bold text-xs border border-blue-200 shadow-2xs shrink-0 cursor-pointer"
        >
          {t('safetyCenter')} →
        </button>
      </div>

      {/* Post Ad CTA Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            {t('haveSomethingToSell')}
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-md">
            {t('haveSomethingToSellDesc')}
          </p>
        </div>
        <button
          onClick={() => setCurrentView('post_ad')}
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-blue-800 font-black text-sm shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <PlusCircle className="w-5 h-5 text-blue-600" />
          <span>{t('postAdTitle')}</span>
        </button>
      </div>
    </div>
  );
};
