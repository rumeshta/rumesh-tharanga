import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_USERS, MOCK_REVIEWS } from '../data/mockData';
import { CATEGORIES } from '../data/categories';
import { ListingCard } from './ListingCard';
import {
  Store,
  MapPin,
  Clock,
  Star,
  CheckCircle2,
  Phone,
  Mail,
  Globe,
  Building,
  ShieldCheck,
  ChevronLeft,
  Calendar,
  Sparkles,
  MessageSquare
} from 'lucide-react';

export const SellerShopScreen: React.FC = () => {
  const {
    selectedSellerId,
    goBack,
    listings,
    t,
    language,
    openChatWithListing
  } = useApp();

  const [activeTab, setActiveTab] = useState<'listings' | 'about' | 'reviews'>('listings');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);

  // Find seller
  const seller = MOCK_USERS.find((u) => u.id === selectedSellerId) || MOCK_USERS[1];
  const sellerListings = listings.filter((l) => l.sellerId === seller.id || l.seller.name === seller.name);

  // Categories present in this seller's shop
  const shopCategories = Array.from(new Set(sellerListings.map((l) => l.categoryId)));

  const displayedListings = selectedCategoryFilter
    ? sellerListings.filter((l) => l.categoryId === selectedCategoryFilter)
    : sellerListings;

  return (
    <div className="pb-24 pt-2 max-w-5xl mx-auto px-3 sm:px-4 space-y-5 animate-in fade-in duration-200">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={goBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{t('backToSearch')}</span>
        </button>
      </div>

      {/* Shop Header Banner & Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs">
        {/* Cover Image */}
        <div className="relative h-44 sm:h-56 bg-gradient-to-r from-blue-900 to-indigo-900">
          <img
            src={
              seller.businessInfo?.banner ||
              'https://images.unsplash.com/photo-1563720223185-11003d516935?w=1200&auto=format&fit=crop&q=80'
            }
            alt="cover"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        </div>

        {/* Profile Info Overlay */}
        <div className="px-5 pb-5 -mt-16 sm:-mt-20 relative z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
            <div className="relative">
              <img
                src={seller.avatar}
                alt={seller.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-white shadow-xl bg-white"
              />
              {seller.isVerified && (
                <div
                  className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1 rounded-full shadow-md"
                  title={t('verifiedSeller')}
                >
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                  {seller.businessInfo?.shopName || seller.name}
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black uppercase tracking-wider">
                  {t('officialStore')}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {seller.businessInfo?.companyName}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 pt-1">
                <span className="flex items-center gap-1 font-bold text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{seller.rating} ({seller.reviewsCount} {language === 'ro' ? 'recenzii' : 'reviews'})</span>
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>{seller.location}</span>
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t('memberSince')} {seller.memberSince}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats Badges */}
          <div className="flex items-center gap-2 w-full sm:w-auto pt-2 sm:pt-0">
            <div className="flex-1 sm:flex-none text-center px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
              <span className="block font-black text-sm text-blue-700">
                {seller.responseRate}
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase">{t('responseRate')}</span>
            </div>
            <div className="flex-1 sm:flex-none text-center px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
              <span className="block font-black text-sm text-emerald-600">
                {seller.responseTime}
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase">{t('responseTime')}</span>
            </div>
          </div>
        </div>

        {/* Shop Navigation Tabs */}
        <div className="px-5 border-t border-slate-100 flex items-center gap-6">
          <button
            onClick={() => setActiveTab('listings')}
            className={`py-3.5 text-xs sm:text-sm font-extrabold border-b-2 transition-all cursor-pointer ${
              activeTab === 'listings'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {t('tabActive')} ({sellerListings.length})
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`py-3.5 text-xs sm:text-sm font-extrabold border-b-2 transition-all cursor-pointer ${
              activeTab === 'about'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {t('aboutShopAndContact')}
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3.5 text-xs sm:text-sm font-extrabold border-b-2 transition-all cursor-pointer ${
              activeTab === 'reviews'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {t('customerReviewsTab')} ({MOCK_REVIEWS.length})
          </button>
        </div>
      </div>

      {/* Tab: Listings */}
      {activeTab === 'listings' && (
        <div className="space-y-4">
          {/* Shop categories filter chips */}
          {shopCategories.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setSelectedCategoryFilter(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
                  !selectedCategoryFilter
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-700'
                }`}
              >
                {t('allLabel')} ({sellerListings.length})
              </button>
              {shopCategories.map((c) => {
                const catObj = CATEGORIES.find((cat) => cat.id === c);
                const catName = catObj ? (language === 'ro' ? catObj.nameRo : catObj.nameEn) : c;
                return (
                  <button
                    key={c}
                    onClick={() => setSelectedCategoryFilter(c)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                      selectedCategoryFilter === c
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-slate-200 text-slate-700'
                    }`}
                  >
                    {catName}
                  </button>
                );
              })}
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {displayedListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} layout="grid" />
            ))}
          </div>
        </div>
      )}

      {/* Tab: About & Contact */}
      {activeTab === 'about' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4 shadow-xs">
            <h3 className="font-extrabold text-base text-slate-900">
              {t('aboutSellerTitle')} {seller.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium whitespace-pre-line">
              {seller.bio}
            </p>

            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="text-xs text-blue-900">
                <p className="font-bold">{t('verifiedBusinessBadge')}</p>
                <p className="text-blue-700">
                  {t('verifiedBusinessDesc')}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Details Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4 shadow-xs">
            <h3 className="font-extrabold text-base text-slate-900">{t('contactDetailsTitle')}</h3>
            <div className="space-y-3 text-xs text-slate-700 font-medium">
              <div className="flex items-start gap-2.5">
                <Building className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">{t('cifLabel')}</span>
                  <span>{seller.businessInfo?.cif || 'RO38920194'}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">{t('addressLabel')}</span>
                  <span>{seller.businessInfo?.address || seller.location}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">{t('openingHoursLabel')}</span>
                  <span>{seller.businessInfo?.openingHours || (language === 'ro' ? 'Luni - Vineri: 09:00 - 18:00' : 'Monday - Friday: 09:00 - 18:00')}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">{t('salesPhoneLabel')}</span>
                  <span className="text-blue-700 font-bold">{seller.phone}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Globe className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">{t('websiteLabel')}</span>
                  <span className="text-blue-600 underline">
                    {seller.businessInfo?.website || 'https://magazinul-meu.ro'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Reviews */}
      {activeTab === 'reviews' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                {t('verifiedBuyerReviewsTitle')}
              </h3>
              <p className="text-xs text-slate-500">
                {t('verifiedBuyerReviewsSubtitle')}
              </p>
            </div>
            <div className="text-right">
              <span className="font-black text-2xl text-amber-500">★ 4.8</span>
              <p className="text-[11px] text-slate-400">{t('outOfFiveStars')}</p>
            </div>
          </div>

          <div className="space-y-4">
            {MOCK_REVIEWS.map((rev) => (
              <div key={rev.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={rev.authorAvatar}
                      alt={rev.authorName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-xs text-slate-800">{rev.authorName}</h4>
                      <div className="flex text-amber-400 text-xs">
                        {'★'.repeat(rev.rating)}
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400">{rev.date}</span>
                </div>
                <p className="text-xs text-slate-700 leading-normal font-medium">
                  "{rev.comment}"
                </p>
                <div className="text-[10px] text-slate-400 font-medium pt-1">
                  {t('verifiedPurchase')} <span className="font-semibold text-slate-600">{rev.listingTitle}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
