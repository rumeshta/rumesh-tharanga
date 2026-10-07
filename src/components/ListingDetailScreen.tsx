import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Listing } from '../types';
import { translateListingDescription } from '../services/aiService';
import {
  Heart,
  Share2,
  Flag,
  MapPin,
  Clock,
  Eye,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Phone,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Store,
  Languages,
  Check,
  Flame,
  ArrowUpCircle
} from 'lucide-react';

export const ListingDetailScreen: React.FC = () => {
  const {
    selectedListing,
    setSelectedListing,
    goBack,
    t,
    language,
    toggleFavorite,
    isFavorite,
    openChatWithListing,
    openSellerShop,
    openShareModal,
    openReportModal,
    dataSavingMode,
    listings,
    openListing
  } = useApp();

  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [fullscreenPhoto, setFullscreenPhoto] = useState(false);
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const [translatedDesc, setTranslatedDesc] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);

  if (!selectedListing) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-500">
          {language === 'ro' ? 'Niciun anunț selectat.' : 'No listing selected.'}
        </p>
        <button
          onClick={goBack}
          className="mt-3 px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
        >
          {t('back')}
        </button>
      </div>
    );
  }

  const favorite = isFavorite(selectedListing.id);
  const formattedPrice = new Intl.NumberFormat('ro-RO').format(selectedListing.price);
  const photos = selectedListing.images && selectedListing.images.length > 0
    ? selectedListing.images
    : ['https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80'];

  // Bilingual Title and Description
  const displayTitle = language === 'en' && selectedListing.titleEn
    ? selectedListing.titleEn
    : selectedListing.title;

  const baseDescription = language === 'en' && selectedListing.descriptionEn
    ? selectedListing.descriptionEn
    : selectedListing.description;

  const contact = selectedListing.contactInfo;
  const sellerPhone = contact?.phone || selectedListing.seller.phone;
  const contactName = contact?.contactName || selectedListing.seller.name;

  const conditionLabels: Record<string, { ro: string; en: string }> = {
    new: { ro: 'Nou sigilat', en: 'New sealed' },
    like_new: { ro: 'Ca nou', en: 'Like new' },
    good: { ro: 'Stare foarte bună', en: 'Good condition' },
    fair: { ro: 'Stare acceptabilă', en: 'Fair condition' },
    for_parts: { ro: 'Pentru piese', en: 'For parts' }
  };

  const attributeLabels: Record<string, { ro: string; en: string }> = {
    brand: { ro: 'Marcă', en: 'Brand' },
    model: { ro: 'Model', en: 'Model' },
    year: { ro: 'An fabricație', en: 'Year' },
    mileage: { ro: 'Kilometraj (km)', en: 'Mileage (km)' },
    fuel: { ro: 'Combustibil', en: 'Fuel' },
    gearbox: { ro: 'Cutie de viteze', en: 'Gearbox' },
    engineSize: { ro: 'Capacitate cilindrică (cm³)', en: 'Engine size (cc)' },
    bodyType: { ro: 'Caroserie', en: 'Body type' },
    color: { ro: 'Culoare', en: 'Color' },
    vin: { ro: 'Serie șasiu (VIN)', en: 'VIN' },
    propertyType: { ro: 'Tip tranzacție', en: 'Transaction' },
    rooms: { ro: 'Număr camere', en: 'Rooms' },
    surface: { ro: 'Suprafață utilă (mp)', en: 'Surface area (sqm)' },
    floor: { ro: 'Etaj', en: 'Floor' },
    buildingYear: { ro: 'An construcție', en: 'Year built' },
    heating: { ro: 'Încălzire', en: 'Heating' },
    furnished: { ro: 'Mobilat', en: 'Furnished' },
    parking: { ro: 'Loc parcare', en: 'Parking' },
    balcony: { ro: 'Balcon', en: 'Balcony' },
    lift: { ro: 'Lift', en: 'Elevator' },
    storage: { ro: 'Stocare', en: 'Storage' },
    ram: { ro: 'Memorie RAM', en: 'RAM' },
    warranty: { ro: 'Garanție', en: 'Warranty' },
    jobType: { ro: 'Tip job', en: 'Job type' },
    salaryMin: { ro: 'Salariu minim', en: 'Min salary' },
    salaryMax: { ro: 'Salariu maxim', en: 'Max salary' },
    experience: { ro: 'Experiență necesară', en: 'Experience' },
    contractType: { ro: 'Tip contract', en: 'Contract' }
  };

  const translateAttributeValue = (key: string, val: any): string => {
    if (typeof val === 'boolean') {
      return val ? (language === 'ro' ? 'Da' : 'Yes') : (language === 'ro' ? 'Nu' : 'No');
    }
    const str = String(val);
    if (key === 'fuel') {
      if (str === 'Benzină') return language === 'ro' ? 'Benzină' : 'Petrol';
      if (str === 'Diesel') return 'Diesel';
      if (str === 'Hibrid') return language === 'ro' ? 'Hibrid' : 'Hybrid';
      if (str === 'Electric') return language === 'ro' ? 'Electric' : 'Electric';
      if (str === 'GPL') return 'LPG';
    }
    if (key === 'gearbox') {
      if (str === 'Automată') return language === 'ro' ? 'Automată' : 'Automatic';
      if (str === 'Manuală') return language === 'ro' ? 'Manuală' : 'Manual';
    }
    if (key === 'propertyType') {
      if (str === 'Vânzare') return language === 'ro' ? 'Vânzare' : 'For Sale';
      if (str === 'Închiriere') return language === 'ro' ? 'Închiriere' : 'For Rent';
    }
    if (key === 'furnished') {
      if (str === 'Da') return language === 'ro' ? 'Da' : 'Yes';
      if (str === 'Nu') return language === 'ro' ? 'Nu' : 'No';
      if (str === 'Parțial') return language === 'ro' ? 'Parțial' : 'Partially';
    }
    return str;
  };

  const handleTranslate = async () => {
    if (translatedDesc) {
      setTranslatedDesc(null);
      return;
    }
    setIsTranslating(true);
    const target = language === 'ro' ? 'ro' : 'en';
    const res = await translateListingDescription(baseDescription, target);
    setTranslatedDesc(res);
    setIsTranslating(false);
  };

  const similarAds = listings
    .filter((l) => l.categoryId === selectedListing.categoryId && l.id !== selectedListing.id && l.status === 'active')
    .slice(0, 3);

  return (
    <div className="pb-28 pt-2 max-w-4xl mx-auto px-3 sm:px-4 space-y-5 animate-in fade-in duration-200">
      {/* Top Navigation Row */}
      <div className="flex items-center justify-between">
        <button
          onClick={goBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{t('back')}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => openShareModal(selectedListing)}
            className="p-2 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
            title={t('shareAd')}
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleFavorite(selectedListing.id)}
            className={`p-2 rounded-full bg-white border border-slate-200 transition-colors cursor-pointer ${
              favorite ? 'text-rose-500 bg-rose-50' : 'text-slate-600 hover:text-rose-500'
            }`}
            title={t('saveAd')}
          >
            <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={() => openReportModal(selectedListing)}
            className="p-2 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
            title={t('reportAd')}
          >
            <Flag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Gallery Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs relative">
        <div className="relative aspect-16/10 sm:aspect-16/9 bg-slate-950 flex items-center justify-center overflow-hidden">
          <img
            src={
              dataSavingMode
                ? `${photos[activePhotoIndex]}?w=600&auto=format&fit=crop&q=50`
                : `${photos[activePhotoIndex]}?w=1200&auto=format&fit=crop&q=85`
            }
            alt={selectedListing.title}
            className="w-full h-full object-contain"
          />

          {/* Photo Navigation Arrows */}
          {photos.length > 1 && (
            <>
              <button
                onClick={() =>
                  setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1))
                }
                className="absolute left-3 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() =>
                  setActivePhotoIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0))
                }
                className="absolute right-3 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Fullscreen Button */}
          <button
            onClick={() => setFullscreenPhoto(true)}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-all cursor-pointer"
            title={t('enlargeImage')}
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* Photo Counter */}
          <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/60 text-white text-xs font-bold backdrop-blur-md">
            {activePhotoIndex + 1} / {photos.length}
          </div>

          {/* Promoted Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {selectedListing.promotionType === 'top_ad' && (
              <span className="bg-amber-500 text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>TOP AD</span>
              </span>
            )}
            {selectedListing.promotionType === 'featured' && (
              <span className="bg-rose-600 text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" />
                <span>{t('promoted')}</span>
              </span>
            )}
          </div>
        </div>

        {/* Thumbnails row */}
        {photos.length > 1 && (
          <div className="p-3 bg-slate-50 flex items-center gap-2 overflow-x-auto no-scrollbar border-t border-slate-100">
            {photos.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActivePhotoIndex(idx)}
                className={`w-16 h-12 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  activePhotoIndex === idx
                    ? 'border-blue-600 ring-2 ring-blue-100 scale-105'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {fullscreenPhoto && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4">
          <button
            onClick={() => setFullscreenPhoto(false)}
            className="absolute top-4 right-4 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={photos[activePhotoIndex]}
            alt="zoom"
            className="max-w-full max-h-[85vh] object-contain rounded-xl"
          />
          <div className="mt-4 text-white text-sm font-bold">
            {activePhotoIndex + 1} / {photos.length}
          </div>
        </div>
      )}

      {/* Listing Details Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
        {/* Price & Status */}
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-black text-blue-700 tracking-tight">
                {selectedListing.isFree
                  ? t('freePrice')
                  : `${formattedPrice} ${selectedListing.currency === 'RON' ? 'lei' : '€'}`}
              </span>
              {selectedListing.isNegotiable && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {t('negotiable')}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {t('vatIncluded')}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
              {conditionLabels[selectedListing.condition]?.[language] || 'Folosit'}
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-lg sm:text-2xl font-black text-slate-900 leading-snug">
          {displayTitle}
        </h1>

        {/* Metadata info: location, date, views */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
          <div className="flex items-center gap-1.5 font-medium">
            <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              {selectedListing.location.county}, {selectedListing.location.city}
              {selectedListing.location.area ? ` (${selectedListing.location.area})` : ''}
              {selectedListing.location.distanceKm ? ` • ${selectedListing.location.distanceKm} km ${t('distanceAway')}` : ''}
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Clock className="w-4 h-4 text-slate-400 shrink-0" />
            <span>{t('today')}</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Eye className="w-4 h-4 text-slate-400 shrink-0" />
            <span>{selectedListing.views} {t('viewsCount')}</span>
          </div>
        </div>

        {/* Technical Specifications Table */}
        {Object.keys(selectedListing.attributes).length > 0 && (
          <div className="pt-3 border-t border-slate-100">
            <h3 className="font-extrabold text-sm text-slate-900 mb-3">
              {t('specifications')}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {Object.entries(selectedListing.attributes).map(([key, val]) => {
                if (val === undefined || val === null || val === '') return null;
                const label = attributeLabels[key]?.[language] || key;
                const displayVal = translateAttributeValue(key, val);
                return (
                  <div key={key} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      {label}
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold text-slate-800">
                      {displayVal}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Description & Translation */}
        <div className="pt-3 border-t border-slate-100 space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-slate-900">
              {t('description')}
            </h3>
            <button
              onClick={handleTranslate}
              disabled={isTranslating}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-all cursor-pointer"
            >
              <Languages className="w-3.5 h-3.5" />
              <span>
                {isTranslating
                  ? t('translating')
                  : translatedDesc
                  ? t('viewOriginal')
                  : t('translateAd')}
              </span>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line font-medium">
            {translatedDesc || baseDescription}
          </div>
        </div>

        {/* Safety Recommendation Box */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5 text-xs text-amber-900">
            <p className="font-bold">{t('safetyWarningTitle')}</p>
            <p className="text-amber-800 leading-normal">{t('safetyWarningText')}</p>
          </div>
        </div>
      </div>

      {/* Seller Profile Mini Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={selectedListing.seller.avatar}
              alt={selectedListing.seller.name}
              className="w-13 h-13 rounded-2xl object-cover ring-2 ring-slate-100"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-base text-slate-900 truncate">
                  {contactName}
                </h3>
                {selectedListing.seller.isVerified && (
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                )}
              </div>
              <p className="text-xs text-slate-500">
                {selectedListing.seller.accountType === 'business'
                  ? t('businessSeller')
                  : t('individualSeller')} • {t('memberSince')} 2022
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs font-bold text-amber-500">
                  ★ {selectedListing.seller.rating} ({t('veryGood')})
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-[11px] text-emerald-600 font-bold">
                  {t('repliesFast')}
                </span>
              </div>
            </div>
          </div>

          {/* Visit Shop Button */}
          {selectedListing.seller.accountType === 'business' && (
            <button
              onClick={() => openSellerShop(selectedListing.sellerId)}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-bold text-xs transition-colors cursor-pointer"
            >
              <Store className="w-4 h-4" />
              <span>{t('viewShop')}</span>
            </button>
          )}
        </div>

        {/* Contact Info Details Box */}
        {contact && (
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
            <span className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>{t('contactDetailsTitle')}</span>
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
              <div>
                <span className="text-slate-400 font-bold text-[10px] uppercase block">{t('contactPhoneLabel')}</span>
                <span className="font-bold text-slate-800">{sellerPhone}</span>
              </div>
              {contact.email && (
                <div>
                  <span className="text-slate-400 font-bold text-[10px] uppercase block">{t('contactEmailLabel')}</span>
                  <span className="font-medium text-slate-700">{contact.email}</span>
                </div>
              )}
              {contact.callHours && (
                <div className="sm:col-span-2">
                  <span className="text-slate-400 font-bold text-[10px] uppercase block">{t('callHoursLabel')}</span>
                  <span className="font-medium text-slate-700">🕒 {contact.callHours}</span>
                </div>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-200/60 text-[11px]">
              {contact.allowWhatsapp && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center gap-1">
                  <span>✓</span> WhatsApp
                </span>
              )}
              <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold">
                {contact.contactPref === 'chat'
                  ? t('contactChatOnly')
                  : contact.contactPref === 'phone'
                  ? t('contactPhoneOnly')
                  : t('contactBoth')}
              </span>
            </div>
          </div>
        )}

        {selectedListing.seller.accountType === 'business' && (
          <button
            onClick={() => openSellerShop(selectedListing.sellerId)}
            className="w-full sm:hidden py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5"
          >
            <Store className="w-4 h-4" />
            <span>{t('viewShop')}</span>
          </button>
        )}
      </div>

      {/* Similar Recommended Ads */}
      {similarAds.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-extrabold text-base text-slate-900">
            {t('similarAds')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {similarAds.map((ad) => (
              <div
                key={ad.id}
                onClick={() => openListing(ad)}
                className="bg-white rounded-2xl border border-slate-200/80 p-3 flex gap-3 hover:shadow-md transition-all cursor-pointer"
              >
                <img
                  src={ad.images[0]}
                  alt={ad.title}
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />
                <div className="min-w-0 flex flex-col justify-between">
                  <h4 className="font-bold text-xs text-slate-900 line-clamp-2">
                    {language === 'en' && ad.titleEn ? ad.titleEn : ad.title}
                  </h4>
                  <span className="font-black text-sm text-blue-700">
                    {new Intl.NumberFormat('ro-RO').format(ad.price)} lei
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sticky Bottom Contact Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 sm:p-4 safe-bottom">
        <div className="max-w-4xl mx-auto flex items-center gap-2 sm:gap-3">
          {/* WhatsApp direct button if seller accepts it */}
          {contact?.allowWhatsapp && (
            <a
              href={`https://wa.me/${sellerPhone.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="py-3.5 px-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer shrink-0"
              title="WhatsApp"
            >
              <span>WhatsApp</span>
            </a>
          )}

          {/* Phone button */}
          <button
            onClick={() => setPhoneRevealed(!phoneRevealed)}
            className="flex-1 py-3.5 px-3 rounded-2xl border border-blue-600 bg-blue-50/50 hover:bg-blue-100 text-blue-700 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer"
          >
            <Phone className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="truncate">
              {phoneRevealed
                ? sellerPhone
                : t('showNumber')}
            </span>
          </button>

          {/* Chat message button */}
          <button
            onClick={() => openChatWithListing(selectedListing)}
            className="flex-1 py-3.5 px-3 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 shrink-0" />
            <span className="truncate">{t('sendMessage')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
