import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/categories';
import { ROMANIAN_COUNTIES } from '../data/romaniaLocations';
import { generateAISuggestions } from '../services/aiService';
import { ListingCondition, PromotionType } from '../types';
import {
  Sparkles,
  Upload,
  Image as ImageIcon,
  X,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Camera,
  MapPin,
  Check,
  ShieldCheck,
  Flame,
  ArrowUpCircle,
  Eye,
  Info,
  Phone,
  Mail,
  Clock,
  User,
  MessageSquare
} from 'lucide-react';

export const PostAdScreen: React.FC = () => {
  const {
    t,
    language,
    currentUser,
    setAuthModalOpen,
    currentLocation,
    addListing,
    setCurrentView,
    promotionPackages,
    openListing
  } = useApp();

  // Wizard Steps: 1: Category, 2: Photos, 3: Details & AI, 4: Location & Contact, 5: Preview
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [selectedCatId, setSelectedCatId] = useState<string>('telefoane');
  const [selectedSubId, setSelectedSubId] = useState<string>('iphone');

  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80'
  ]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>(4200);
  const [currency, setCurrency] = useState<'RON' | 'EUR'>('RON');
  const [isNegotiable, setIsNegotiable] = useState(true);
  const [isFree, setIsFree] = useState(false);
  const [condition, setCondition] = useState<ListingCondition>('like_new');

  // Category specific attributes
  const [attributes, setAttributes] = useState<Record<string, any>>({
    brand: 'Apple',
    model: 'iPhone 15 Pro',
    storage: '256GB'
  });

  // Location
  const [county, setCounty] = useState(currentLocation.county === 'România' ? 'București' : currentLocation.county);
  const [city, setCity] = useState(currentLocation.city === 'Toate orașele' ? 'Sector 1' : currentLocation.city);
  const [area, setArea] = useState('');

  // Contact Information State
  const [contactName, setContactName] = useState(currentUser?.name || 'Mihai Dumitrescu');
  const [contactPhone, setContactPhone] = useState(
    currentUser?.phone
      ? currentUser.phone.replace('+40 ', '').replace('+40', '').trim()
      : '722 849 192'
  );
  const [contactEmail, setContactEmail] = useState(currentUser?.email || '');
  const [hidePhone, setHidePhone] = useState(false);
  const [allowWhatsapp, setAllowWhatsapp] = useState(true);
  const [callHours, setCallHours] = useState('09:00 - 20:00');
  const [contactPref, setContactPref] = useState<'both' | 'chat' | 'phone'>('both');

  // Promotion selected
  const [selectedPromo, setSelectedPromo] = useState<PromotionType>(null);

  // AI Assistant state
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiGeneratedNotice, setAiGeneratedNotice] = useState(false);

  // Validation
  const [errorMsg, setErrorMsg] = useState('');

  // Sample image gallery to simulate instant camera/gallery upload
  const SAMPLE_PRESET_IMAGES = [
    'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=80'
  ];

  const handleAddSampleImage = (url: string) => {
    if (images.length >= 8) return;
    setImages((prev) => [...prev, url]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Run AI Assistant
  const handleAIAssist = async () => {
    setIsGeneratingAI(true);
    setErrorMsg('');
    try {
      const suggestions = await generateAISuggestions({
        rawTitle: title || 'iPhone 15 Pro 256GB',
        categoryHint: selectedCatId,
        imagesCount: images.length
      });

      if (suggestions) {
        setTitle(suggestions.suggestedTitle);
        setDescription(suggestions.suggestedDescription);
        if (suggestions.suggestedPriceRON) setPrice(suggestions.suggestedPriceRON);
        if (suggestions.categoryId) setSelectedCatId(suggestions.categoryId);
        if (suggestions.subcategoryId) setSelectedSubId(suggestions.subcategoryId);
        if (suggestions.attributes) {
          setAttributes((prev) => ({ ...prev, ...suggestions.attributes }));
        }
        setAiGeneratedNotice(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  // Submit Listing
  const handlePublish = () => {
    if (!title.trim()) {
      setErrorMsg(t('enterTitleError'));
      setCurrentStep(3);
      return;
    }

    if (contactPref !== 'chat' && !contactPhone.trim()) {
      setErrorMsg(t('enterPhoneError'));
      setCurrentStep(4);
      return;
    }

    const created = addListing({
      title,
      description,
      price: isFree ? 0 : Number(price) || 0,
      currency,
      isNegotiable,
      isFree,
      condition,
      categoryId: selectedCatId,
      subcategoryId: selectedSubId,
      images: images.length > 0 ? images : [SAMPLE_PRESET_IMAGES[0]],
      attributes,
      location: {
        county,
        city,
        area: area || 'Centru',
        distanceKm: 1.8
      },
      contactInfo: {
        contactName: contactName.trim() || currentUser?.name || 'Vânzător Repedero',
        phone: contactPhone.trim().startsWith('+40') ? contactPhone.trim() : `+40 ${contactPhone.trim()}`,
        email: contactEmail.trim(),
        hidePhone,
        allowWhatsapp,
        callHours: callHours.trim(),
        contactPref
      },
      isPromoted: selectedPromo !== null,
      promotionType: selectedPromo
    });

    openListing(created);
  };

  // Check login requirement
  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-3xl border border-slate-200 text-center space-y-4 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto">
          <Camera className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-black text-slate-900">
          {t('connectToPublish')}
        </h2>
        <p className="text-xs text-slate-500">
          {t('connectToPublishDesc')}
        </p>
        <button
          onClick={() => setAuthModalOpen(true)}
          className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md cursor-pointer"
        >
          {t('loginRegister')}
        </button>
      </div>
    );
  }

  const selectedCategoryObj = CATEGORIES.find((c) => c.id === selectedCatId) || CATEGORIES[0];
  const citiesInCounty = ROMANIAN_COUNTIES.find((c) => c.name === county)?.cities || ['Centru'];

  return (
    <div className="pb-28 pt-2 max-w-2xl mx-auto px-3 sm:px-4 space-y-5 animate-in fade-in duration-200">
      {/* Wizard Header */}
      <div className="text-center space-y-1">
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          {t('postAdTitle')}
        </h1>
        <p className="text-xs text-slate-500">{t('postAdSubtitle')}</p>

        {/* Step Progress Indicators */}
        <div className="flex items-center justify-center gap-1.5 pt-3">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s === currentStep
                  ? 'w-8 bg-blue-600'
                  : s < currentStep
                  ? 'w-4 bg-emerald-500'
                  : 'w-3 bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold text-center">
          {errorMsg}
        </div>
      )}

      {/* STEP 1: CATEGORY SELECTION */}
      {currentStep === 1 && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 space-y-4 shadow-xs">
          <h2 className="font-extrabold text-base text-slate-900">
            {t('stepCategory')}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCatId(cat.id);
                  if (cat.subcategories.length > 0) {
                    setSelectedSubId(cat.subcategories[0].id);
                  }
                }}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  selectedCatId === cat.id
                    ? 'border-blue-600 bg-blue-50/70 text-blue-900 ring-2 ring-blue-100 font-bold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span className="text-xs sm:text-sm font-extrabold line-clamp-1">
                  {language === 'ro' ? cat.nameRo : cat.nameEn}
                </span>
                <span className="text-[10px] text-slate-400 mt-1">
                  {cat.subcategories.length} {language === 'ro' ? 'subcategorii' : 'subcategories'}
                </span>
              </button>
            ))}
          </div>

          {/* Subcategory */}
          <div className="pt-3 border-t border-slate-100">
            <label className="block text-xs font-extrabold text-slate-800 mb-2">
              {language === 'ro' ? 'Alege subcategoria specifică:' : 'Select specific subcategory:'}
            </label>
            <div className="flex flex-wrap gap-1.5">
              {selectedCategoryObj.subcategories.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubId(sub.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedSubId === sub.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {language === 'ro' ? sub.nameRo : sub.nameEn}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 flex justify-end">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <span>{t('continueToPhotos')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: PHOTO UPLOAD */}
      {currentStep === 2 && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-base text-slate-900">
              {t('stepPhotos')}
            </h2>
            <span className="text-xs text-slate-400 font-medium">
              {images.length} / 8 {language === 'ro' ? 'fotografii' : 'photos'}
            </span>
          </div>
          <p className="text-xs text-slate-500">{t('uploadPhotosHint')}</p>

          {/* Photos Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="relative aspect-square rounded-2xl overflow-hidden border border-slate-200 group bg-slate-100"
              >
                <img src={img} alt="upload" className="w-full h-full object-cover" />
                {idx === 0 && (
                  <span className="absolute bottom-1 left-1 bg-blue-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md">
                    {t('cover')}
                  </span>
                )}
                <button
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-1 right-1 p-1 rounded-full bg-slate-900/60 hover:bg-rose-600 text-white transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            {images.length < 8 && (
              <div className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 hover:border-blue-400 bg-slate-50 flex flex-col items-center justify-center p-2 text-center text-slate-400 hover:text-blue-600 transition-colors">
                <Camera className="w-6 h-6 mb-1" />
                <span className="text-[10px] font-bold">{t('uploadLabel')}</span>
              </div>
            )}
          </div>

          {/* Preset Photo Library Helper */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <span className="text-[11px] font-bold text-slate-600 block">
              {t('presetHelperText')}
            </span>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {SAMPLE_PRESET_IMAGES.map((preset, i) => (
                <button
                  key={i}
                  onClick={() => handleAddSampleImage(preset)}
                  className="w-14 h-14 rounded-xl overflow-hidden border border-slate-200 hover:border-blue-600 shrink-0 transition-all cursor-pointer opacity-80 hover:opacity-100"
                >
                  <img src={preset} alt="preset" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs"
            >
              {t('back')}
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <span>{t('continueToDetails')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: DETAILS & AI ASSISTANT */}
      {currentStep === 3 && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-base text-slate-900">
              {t('stepDetails')}
            </h2>
          </div>

          {/* AI Feature Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 space-y-2">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-blue-600 text-white">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-black text-xs sm:text-sm text-slate-900">
                    {t('aiAssistButton')}
                  </h3>
                  <p className="text-[11px] text-slate-600">{t('aiAssistHint')}</p>
                </div>
              </div>
            </div>

            <div className="pt-1 flex justify-end">
              <button
                onClick={handleAIAssist}
                disabled={isGeneratingAI}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isGeneratingAI ? t('aiGenerating') : t('aiAutoGenerate')}</span>
              </button>
            </div>

            {aiGeneratedNotice && (
              <p className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> {t('aiSuccessNotice')}
              </p>
            )}
          </div>

          {/* Title input */}
          <div>
            <label className="block text-xs font-extrabold text-slate-800 mb-1">
              {t('titleLabel')} *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t('titlePlaceholder')}
              className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl text-xs sm:text-sm font-medium outline-hidden"
            />
          </div>

          {/* Price & Currency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-extrabold text-slate-800 mb-1">
                {t('priceLabel')} *
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  disabled={isFree}
                  value={isFree ? '' : price}
                  onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : '')}
                  placeholder="ex: 1500"
                  className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl text-xs sm:text-sm font-bold text-blue-700 outline-hidden disabled:opacity-40"
                />
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as any)}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-hidden"
                >
                  <option value="RON">lei</option>
                  <option value="EUR">€</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col justify-end gap-1.5 pb-1">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isNegotiable}
                  onChange={(e) => setIsNegotiable(e.target.checked)}
                  className="rounded-sm text-blue-600"
                />
                <span>{t('isPriceNegotiable')}</span>
              </label>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFree}
                  onChange={(e) => {
                    setIsFree(e.target.checked);
                    if (e.target.checked) setPrice(0);
                  }}
                  className="rounded-sm text-blue-600"
                />
                <span>{t('isItemFree')}</span>
              </label>
            </div>
          </div>

          {/* Condition */}
          <div>
            <label className="block text-xs font-extrabold text-slate-800 mb-1.5">
              {t('condition')}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {(['new', 'like_new', 'good', 'fair', 'for_parts'] as ListingCondition[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCondition(c)}
                  className={`p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    condition === c
                      ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {c === 'new'
                    ? t('condNew')
                    : c === 'like_new'
                    ? t('condLikeNew')
                    : c === 'good'
                    ? t('condGood')
                    : c === 'fair'
                    ? t('condFair')
                    : t('condForParts')}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-extrabold text-slate-800 mb-1">
              {t('descLabel')} *
            </label>
            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t('descPlaceholder')}
              className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl text-xs sm:text-sm font-medium outline-hidden leading-relaxed"
            />
          </div>

          <div className="pt-3 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs"
            >
              {t('back')}
            </button>
            <button
              onClick={() => {
                if (!title.trim()) {
                  setErrorMsg(t('enterTitleError'));
                  return;
                }
                setErrorMsg('');
                setCurrentStep(4);
              }}
              className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <span>{t('continueToLocation')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: LOCATION & CONTACT */}
      {currentStep === 4 && (
        <div className="space-y-4">
          {/* Section: Location */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 space-y-4 shadow-xs">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-extrabold text-sm sm:text-base text-slate-900">
                  {t('locationSectionTitle')}
                </h2>
                <p className="text-xs text-slate-500">
                  {t('locationSectionSubtitle')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-extrabold text-slate-800 mb-1">
                  {t('countyLabel')}
                </label>
                <select
                  value={county}
                  onChange={(e) => {
                    setCounty(e.target.value);
                    const newCities =
                      ROMANIAN_COUNTIES.find((c) => c.name === e.target.value)?.cities || [];
                    setCity(newCities[0] || '');
                  }}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-hidden focus:border-blue-500"
                >
                  {ROMANIAN_COUNTIES.map((c) => (
                    <option key={c.code} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-800 mb-1">
                  {t('cityLabel')}
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-hidden focus:border-blue-500"
                >
                  {citiesInCounty.map((ct) => (
                    <option key={ct} value={ct}>
                      {ct}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-800 mb-1">
                {t('areaLabel')}
              </label>
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder={t('areaPlaceholder')}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-hidden focus:border-blue-500"
              />
            </div>
          </div>

          {/* DEDICATED SECTION: CONTACT INFORMATION */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 space-y-4 shadow-xs">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-extrabold text-sm sm:text-base text-slate-900">
                  {t('contactSectionTitle')}
                </h2>
                <p className="text-xs text-slate-500">
                  {t('contactSectionSubtitle')}
                </p>
              </div>
            </div>

            {/* Contact Person Name */}
            <div>
              <label className="block text-xs font-extrabold text-slate-800 mb-1">
                {t('contactNameLabel')}
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder={t('contactNamePlaceholder')}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold outline-hidden focus:border-blue-500"
                />
              </div>
            </div>

            {/* Primary Phone Number with Romania flag prefix */}
            <div>
              <label className="block text-xs font-extrabold text-slate-800 mb-1">
                {t('contactPhoneLabel')}
              </label>
              <div className="flex rounded-xl overflow-hidden border border-slate-200 focus-within:border-blue-500 bg-slate-50">
                <div className="px-3.5 py-2.5 bg-slate-100 border-r border-slate-200 flex items-center gap-1.5 text-xs font-bold text-slate-700 shrink-0">
                  <span>🇷🇴</span>
                  <span>+40</span>
                </div>
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder={t('contactPhonePlaceholder')}
                  className="w-full p-2.5 bg-transparent text-xs sm:text-sm font-bold text-slate-900 outline-hidden"
                />
              </div>
            </div>

            {/* Contact Email & Calling Hours */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-extrabold text-slate-800 mb-1">
                  {t('contactEmailLabel')}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder={t('contactEmailPlaceholder')}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-800 mb-1">
                  {t('callHoursLabel')}
                </label>
                <div className="relative">
                  <Clock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={callHours}
                    onChange={(e) => setCallHours(e.target.value)}
                    placeholder={t('callHoursPlaceholder')}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Privacy & Messaging Checkboxes */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              <label className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-slate-100/60 transition-colors">
                <input
                  type="checkbox"
                  checked={hidePhone}
                  onChange={(e) => setHidePhone(e.target.checked)}
                  className="rounded-sm text-blue-600 mt-0.5 shrink-0"
                />
                <div className="text-xs">
                  <span className="font-bold text-slate-800 block">{t('hidePhoneLabel')}</span>
                  <span className="text-[11px] text-slate-500">{t('hidePhoneDesc')}</span>
                </div>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 cursor-pointer hover:bg-emerald-50 transition-colors">
                <input
                  type="checkbox"
                  checked={allowWhatsapp}
                  onChange={(e) => setAllowWhatsapp(e.target.checked)}
                  className="rounded-sm text-emerald-600 shrink-0"
                />
                <div className="text-xs flex items-center gap-2 font-bold text-emerald-900">
                  <span className="text-base">💬</span>
                  <span>{t('allowWhatsappLabel')}</span>
                </div>
              </label>
            </div>

            {/* Contact preference */}
            <div className="pt-2 border-t border-slate-100">
              <label className="block text-xs font-extrabold text-slate-800 mb-1.5">
                {t('howContactLabel')}
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setContactPref('both')}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    contactPref === 'both'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {t('contactBoth')}
                </button>
                <button
                  type="button"
                  onClick={() => setContactPref('chat')}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    contactPref === 'chat'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {t('contactChatOnly')}
                </button>
                <button
                  type="button"
                  onClick={() => setContactPref('phone')}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    contactPref === 'phone'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {t('contactPhoneOnly')}
                </button>
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(3)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs"
            >
              {t('back')}
            </button>
            <button
              onClick={() => {
                if (contactPref !== 'chat' && !contactPhone.trim()) {
                  setErrorMsg(t('enterPhoneError'));
                  return;
                }
                setErrorMsg('');
                setCurrentStep(5);
              }}
              className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <span>{t('previewAd')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: PREVIEW & PROMOTION UPSELL */}
      {currentStep === 5 && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="font-extrabold text-base text-slate-900">
                {t('stepPreview')}
              </h2>
              <button
                onClick={() => setCurrentStep(3)}
                className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
              >
                {t('editAd')}
              </button>
            </div>

            {/* Ad Preview Card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="flex gap-3">
                <img
                  src={images[0] || SAMPLE_PRESET_IMAGES[0]}
                  alt="preview"
                  className="w-24 h-24 rounded-xl object-cover shrink-0"
                />
                <div className="min-w-0 space-y-1">
                  <span className="font-black text-lg text-blue-700">
                    {isFree ? t('freePrice') : `${price} ${currency === 'RON' ? 'lei' : '€'}`}
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 line-clamp-2">{title}</h3>
                  <p className="text-xs text-slate-500">
                    📍 {city}, {county} {area ? `(${area})` : ''}
                  </p>
                </div>
              </div>

              <div className="text-xs text-slate-600 line-clamp-3 bg-white p-3 rounded-xl border border-slate-100">
                {description}
              </div>
            </div>

            {/* Seller Contact Preview Card */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2.5">
              <h4 className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span>{t('sellerContactPreview')}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">{t('contactNameLabel')}</span>
                  <span className="font-bold text-slate-800">{contactName || currentUser?.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">{t('contactPhoneLabel')}</span>
                  <span className="font-bold text-slate-800">+40 {contactPhone}</span>
                </div>
                {contactEmail && (
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">{t('contactEmailLabel')}</span>
                    <span className="font-medium text-slate-700">{contactEmail}</span>
                  </div>
                )}
                {callHours && (
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">{t('callHoursLabel')}</span>
                    <span className="font-medium text-slate-700">🕒 {callHours}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-[11px]">
                {hidePhone && (
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">
                    🔒 {t('hidePhoneLabel')}
                  </span>
                )}
                {allowWhatsapp && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    ✓ WhatsApp
                  </span>
                )}
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold">
                  {contactPref === 'chat'
                    ? t('contactChatOnly')
                    : contactPref === 'phone'
                    ? t('contactPhoneOnly')
                    : t('contactBoth')}
                </span>
              </div>
            </div>
          </div>

          {/* Promotion Packages Option */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 space-y-3 shadow-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                  {t('sellFasterTitle')}
                </h3>
                <p className="text-xs text-slate-500">
                  {t('sellFasterSubtitle')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {promotionPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPromo(selectedPromo === pkg.id ? null : pkg.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    selectedPromo === pkg.id
                      ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-100'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-extrabold text-xs text-slate-900">
                        {language === 'ro' ? pkg.nameRo : pkg.nameEn}
                      </span>
                      <span className="font-black text-xs text-blue-700">
                        {pkg.price} lei
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-2">
                      {language === 'ro' ? pkg.descRo : pkg.descEn}
                    </p>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-bold">
                    <span>{t('validDays')} {pkg.durationDays} {t('daysLabel')}</span>
                    {selectedPromo === pkg.id && (
                      <span className="text-blue-600 font-extrabold flex items-center gap-0.5">
                        <Check className="w-3 h-3" /> {t('selectedBadge')}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Final Action Button */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrentStep(4)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs"
            >
              {t('back')}
            </button>
            <button
              onClick={handlePublish}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-800 hover:to-indigo-700 text-white font-extrabold text-sm shadow-xl shadow-blue-600/30 transition-all cursor-pointer flex items-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>{t('publishNow')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
