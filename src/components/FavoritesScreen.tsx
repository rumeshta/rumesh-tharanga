import React from 'react';
import { useApp } from '../context/AppContext';
import { ListingCard } from './ListingCard';
import { Heart, Search, ArrowRight } from 'lucide-react';

export const FavoritesScreen: React.FC = () => {
  const { favorites, listings, t, setCurrentView } = useApp();

  const favoriteListings = listings.filter((l) => favorites.includes(l.id));

  return (
    <div className="pb-24 pt-2 max-w-5xl mx-auto px-3 sm:px-4 space-y-4 animate-in fade-in duration-200">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
          <span>{t('favorites')}</span>
        </h1>
        <p className="text-xs text-slate-500">
          {t('favoritesSubtitle')}
        </p>
      </div>

      {favoriteListings.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 mx-auto flex items-center justify-center">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">{t('noFavorites')}</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">{t('noFavoritesSub')}</p>
          <div className="pt-2">
            <button
              onClick={() => setCurrentView('search')}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md cursor-pointer"
            >
              {t('browseAdsBtn')}
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {favoriteListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} layout="grid" />
          ))}
        </div>
      )}
    </div>
  );
};
