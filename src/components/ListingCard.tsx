import React from 'react';
import { Listing } from '../types';
import { useApp } from '../context/AppContext';
import {
  Heart,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  Flame,
  ArrowUpCircle,
  Eye
} from 'lucide-react';

interface ListingCardProps {
  listing: Listing;
  layout?: 'grid' | 'list';
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing, layout = 'grid' }) => {
  const { openListing, isFavorite, toggleFavorite, dataSavingMode, language, t } = useApp();
  const favorite = isFavorite(listing.id);

  // Bilingual title
  const displayTitle = language === 'en' && listing.titleEn ? listing.titleEn : listing.title;

  // Format price
  const formattedPrice = new Intl.NumberFormat('ro-RO').format(listing.price);

  // Condition tag in RO/EN
  const conditionLabels: Record<string, { ro: string; en: string }> = {
    new: { ro: 'Nou sigilat', en: 'New sealed' },
    like_new: { ro: 'Ca nou', en: 'Like new' },
    good: { ro: 'Stare bună', en: 'Good condition' },
    fair: { ro: 'Stare acceptabilă', en: 'Fair condition' },
    for_parts: { ro: 'Pentru piese', en: 'For parts' }
  };

  // Optimize image URL if dataSavingMode
  const imageUrl = dataSavingMode
    ? `${listing.images[0] || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&auto=format&fit=crop&q=40'}&blur=1`
    : listing.images[0] || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80';

  if (layout === 'list') {
    return (
      <div
        onClick={() => openListing(listing)}
        className={`group bg-white rounded-2xl border p-3 flex gap-3.5 hover:shadow-md transition-all cursor-pointer relative overflow-hidden ${
          listing.promotionType === 'highlight'
            ? 'border-purple-300 ring-2 ring-purple-100 bg-purple-50/20'
            : listing.promotionType === 'top_ad'
            ? 'border-amber-300 bg-amber-50/10'
            : 'border-slate-200/80 hover:border-blue-300'
        }`}
      >
        {/* Thumbnail */}
        <div className="relative w-32 h-28 sm:w-40 sm:h-32 shrink-0 rounded-xl overflow-hidden bg-slate-100">
          <img
            src={imageUrl}
            alt={listing.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Promotion Badge */}
          {listing.promotionType === 'top_ad' && (
            <div className="absolute top-1.5 left-1.5 bg-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>TOP AD</span>
            </div>
          )}
          {listing.promotionType === 'featured' && (
            <div className="absolute top-1.5 left-1.5 bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
              <Flame className="w-3 h-3" />
              <span>{t('promoted')}</span>
            </div>
          )}

          {listing.status === 'sold' && (
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center text-white text-xs font-black uppercase tracking-wider">
              {t('sold')}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold text-sm sm:text-base text-slate-900 line-clamp-2 leading-snug group-hover:text-blue-700 transition-colors">
                {displayTitle}
              </h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(listing.id);
                }}
                className={`p-1.5 rounded-full transition-colors cursor-pointer shrink-0 ${
                  favorite
                    ? 'text-rose-500 bg-rose-50'
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Price */}
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-extrabold text-base sm:text-lg text-blue-700">
                {listing.isFree ? t('freePrice') : `${formattedPrice} ${listing.currency === 'RON' ? 'lei' : '€'}`}
              </span>
              {listing.isNegotiable && (
                <span className="text-[11px] font-medium text-slate-500">
                  {t('negotiable')}
                </span>
              )}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-slate-500 text-[11px]">
            <div className="flex items-center gap-1 truncate">
              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="truncate">
                {listing.location.city}
                {listing.location.area ? `, ${listing.location.area}` : ''}
              </span>
              {listing.location.distanceKm && (
                <span className="text-slate-400 hidden sm:inline">
                  • {listing.location.distanceKm} km {t('distanceAway')}
                </span>
              )}
            </div>
            <span className="shrink-0 text-slate-400">{t('today')}</span>
          </div>
        </div>
      </div>
    );
  }

  // Grid layout
  return (
    <div
      onClick={() => openListing(listing)}
      className={`group bg-white rounded-2xl border overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between relative ${
        listing.promotionType === 'highlight'
          ? 'border-purple-300 ring-2 ring-purple-100 bg-purple-50/15'
          : listing.promotionType === 'top_ad'
          ? 'border-amber-300/80 shadow-amber-500/5'
          : 'border-slate-200/80 hover:border-blue-300'
      }`}
    >
      {/* Top Image Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
        <img
          src={imageUrl}
          alt={listing.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(listing.id);
          }}
          className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
            favorite
              ? 'bg-rose-50 text-rose-500 shadow-md scale-105'
              : 'bg-white/80 hover:bg-white text-slate-600 hover:text-slate-900 shadow-xs'
          }`}
          title={t('saveAd')}
        >
          <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
        </button>

        {/* Promoted Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
          {listing.promotionType === 'top_ad' && (
            <span className="bg-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-md flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              <span>TOP AD</span>
            </span>
          )}
          {listing.promotionType === 'featured' && (
            <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-md flex items-center gap-1">
              <Flame className="w-2.5 h-2.5" />
              <span>{t('promoted')}</span>
            </span>
          )}
          {listing.promotionType === 'bump' && (
            <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-xs flex items-center gap-1">
              <ArrowUpCircle className="w-2.5 h-2.5" />
              <span>TOP</span>
            </span>
          )}
        </div>

        {/* Condition pill bottom left */}
        <div className="absolute bottom-2 left-2">
          <span className="bg-slate-900/70 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
            {conditionLabels[listing.condition]?.[language] || 'Folosit'}
          </span>
        </div>

        {/* Sold Overlay */}
        {listing.status === 'sold' && (
          <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-xs flex items-center justify-center text-white text-sm font-black uppercase tracking-wider">
            {t('sold')}
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Price */}
          <div className="flex items-baseline justify-between gap-1 mb-1">
            <span className="font-black text-base sm:text-lg text-blue-700 tracking-tight">
              {listing.isFree ? t('freePrice') : `${formattedPrice} ${listing.currency === 'RON' ? 'lei' : '€'}`}
            </span>
            {listing.isNegotiable && (
              <span className="text-[10px] font-semibold text-slate-400 uppercase">
                {language === 'ro' ? 'Negociabil' : 'Negotiable'}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-bold text-xs sm:text-sm text-slate-800 line-clamp-2 leading-snug group-hover:text-blue-700 transition-colors">
            {displayTitle}
          </h3>
        </div>

        {/* Location & Meta Footer */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1 truncate">
            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="truncate">{listing.location.city}</span>
          </div>
          <span className="text-slate-400 shrink-0">{t('today')}</span>
        </div>
      </div>
    </div>
  );
};
