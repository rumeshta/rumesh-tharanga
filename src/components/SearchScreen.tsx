import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/categories';
import { ListingCard } from './ListingCard';
import {
  Search,
  Filter,
  SlidersHorizontal,
  LayoutGrid,
  List,
  MapPin,
  ArrowUpDown,
  X,
  BookmarkPlus,
  Check,
  ChevronDown
} from 'lucide-react';

export const SearchScreen: React.FC = () => {
  const {
    t,
    language,
    searchQuery,
    setSearchQuery,
    selectedCategoryId,
    setSelectedCategoryId,
    selectedSubcategoryId,
    setSelectedSubcategoryId,
    searchFilters,
    setSearchFilters,
    resetFilters,
    currentLocation,
    setLocationModalOpen,
    listings,
    saveCurrentSearch
  } = useApp();

  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'relevance' | 'newest' | 'oldest' | 'price_asc' | 'price_desc' | 'distance'>('newest');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Active category object
  const activeCategory = CATEGORIES.find((c) => c.id === selectedCategoryId);

  // Filtering & Sorting listings
  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      // Status check
      if (item.status !== 'active' && item.status !== 'sold') return false;

      // Location match
      if (currentLocation.county !== 'România') {
        if (item.location.county !== currentLocation.county) return false;
        if (currentLocation.city !== 'Toate sectoarele' && currentLocation.city !== 'Toate orașele') {
          if (item.location.city !== currentLocation.city) return false;
        }
      }

      // Keyword query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesCat = item.categoryId.toLowerCase().includes(q);
        const matchesBrand = (item.attributes.brand || '').toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesCat && !matchesBrand) {
          return false;
        }
      }

      // Category
      if (selectedCategoryId && item.categoryId !== selectedCategoryId) {
        return false;
      }

      // Subcategory
      if (selectedSubcategoryId && item.subcategoryId !== selectedSubcategoryId) {
        return false;
      }

      // Price filter
      if (searchFilters.minPrice && item.price < Number(searchFilters.minPrice)) return false;
      if (searchFilters.maxPrice && item.price > Number(searchFilters.maxPrice)) return false;

      // Condition filter
      if (searchFilters.condition && item.condition !== searchFilters.condition) return false;

      // Fuel filter (cars)
      if (searchFilters.fuel && item.attributes.fuel !== searchFilters.fuel) return false;

      // Gearbox filter (cars)
      if (searchFilters.gearbox && item.attributes.gearbox !== searchFilters.gearbox) return false;

      // Storage filter (phones)
      if (searchFilters.storage && item.attributes.storage !== searchFilters.storage) return false;

      // Property type filter (sale/rent)
      if (searchFilters.propertyType && item.attributes.propertyType !== searchFilters.propertyType) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (sortBy === 'price_asc') {
        return a.price - b.price;
      }
      if (sortBy === 'price_desc') {
        return b.price - a.price;
      }
      if (sortBy === 'distance') {
        return (a.location.distanceKm || 99) - (b.location.distanceKm || 99);
      }
      // Relevance (promoted first, then views)
      if (a.isPromoted && !b.isPromoted) return -1;
      if (!a.isPromoted && b.isPromoted) return 1;
      return b.views - a.views;
    });
  }, [listings, searchQuery, selectedCategoryId, selectedSubcategoryId, searchFilters, sortBy, currentLocation]);

  const activeFiltersCount = Object.keys(searchFilters).filter((k) => !!searchFilters[k]).length;

  const handleSaveSearch = () => {
    saveCurrentSearch(searchQuery || (activeCategory ? (language === 'ro' ? activeCategory.nameRo : activeCategory.nameEn) : t('allLabel')));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="pb-24 pt-3 max-w-7xl mx-auto px-3 sm:px-4 space-y-4">
      {/* Top Search & Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-3 sm:p-4 shadow-2xs space-y-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full pl-10 pr-9 py-2.5 bg-slate-100 hover:bg-slate-100/80 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-xs sm:text-sm text-slate-800 transition-all outline-hidden"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter button */}
          <button
            onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
            className={`relative p-2.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
              activeFiltersCount > 0
                ? 'bg-blue-50 border-blue-300 text-blue-700'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">{t('filters')}</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* Categories Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={() => {
              setSelectedCategoryId(null);
              setSelectedSubcategoryId(null);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
              !selectedCategoryId
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {t('allCategories')}
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategoryId(cat.id === selectedCategoryId ? null : cat.id);
                setSelectedSubcategoryId(null);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                selectedCategoryId === cat.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {language === 'ro' ? cat.nameRo : cat.nameEn}
            </button>
          ))}
        </div>

        {/* Subcategories if category selected */}
        {activeCategory && (
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 shrink-0">{t('subcategoriesLabel')}</span>
            <button
              onClick={() => setSelectedSubcategoryId(null)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shrink-0 ${
                !selectedSubcategoryId
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {t('allLabel')}
            </button>
            {activeCategory.subcategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() =>
                  setSelectedSubcategoryId(sub.id === selectedSubcategoryId ? null : sub.id)
                }
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium shrink-0 ${
                  selectedSubcategoryId === sub.id
                    ? 'bg-blue-100 text-blue-800 font-bold'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {language === 'ro' ? sub.nameRo : sub.nameEn}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filter Drawer / Accordion */}
      {filterDrawerOpen && (
        <div className="bg-white rounded-2xl border border-blue-200 p-4 sm:p-5 shadow-md space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              <span>{t('filters')}</span>
            </h3>
            <button
              onClick={resetFilters}
              className="text-xs font-bold text-rose-600 hover:text-rose-700 cursor-pointer"
            >
              {t('clearFilters')}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Price Range */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {t('priceRange')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={searchFilters.minPrice || ''}
                  onChange={(e) =>
                    setSearchFilters((prev) => ({ ...prev, minPrice: e.target.value }))
                  }
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={searchFilters.maxPrice || ''}
                  onChange={(e) =>
                    setSearchFilters((prev) => ({ ...prev, maxPrice: e.target.value }))
                  }
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden"
                />
              </div>
            </div>

            {/* Condition */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {t('condition')}
              </label>
              <select
                value={searchFilters.condition || ''}
                onChange={(e) =>
                  setSearchFilters((prev) => ({ ...prev, condition: e.target.value || undefined }))
                }
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden"
              >
                <option value="">{t('allConditions')}</option>
                <option value="new">{t('condNew')}</option>
                <option value="like_new">{t('condLikeNew')}</option>
                <option value="good">{t('condGood')}</option>
                <option value="fair">{t('condFair')}</option>
                <option value="for_parts">{t('condForParts')}</option>
              </select>
            </div>

            {/* Category-Specific Filters */}
            {selectedCategoryId === 'vehicule' && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">{t('fuelLabel')}</label>
                  <select
                    value={searchFilters.fuel || ''}
                    onChange={(e) =>
                      setSearchFilters((prev) => ({ ...prev, fuel: e.target.value || undefined }))
                    }
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden"
                  >
                    <option value="">{t('allLabel')}</option>
                    <option value="Benzină">{t('fuelPetrol')}</option>
                    <option value="Diesel">{t('fuelDiesel')}</option>
                    <option value="Hibrid">{t('fuelHybrid')}</option>
                    <option value="Electric">{t('fuelElectric')}</option>
                    <option value="GPL">{t('fuelLpg')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">{t('gearboxLabel')}</label>
                  <select
                    value={searchFilters.gearbox || ''}
                    onChange={(e) =>
                      setSearchFilters((prev) => ({ ...prev, gearbox: e.target.value || undefined }))
                    }
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden"
                  >
                    <option value="">{t('allLabel')}</option>
                    <option value="Manuală">{t('gearboxManual')}</option>
                    <option value="Automată">{t('gearboxAutomatic')}</option>
                  </select>
                </div>
              </>
            )}

            {selectedCategoryId === 'imobiliare' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">{t('transactionTypeLabel')}</label>
                <select
                  value={searchFilters.propertyType || ''}
                  onChange={(e) =>
                    setSearchFilters((prev) => ({ ...prev, propertyType: e.target.value || undefined }))
                  }
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden"
                >
                  <option value="">{t('allLabel')}</option>
                  <option value="Vânzare">{t('transSale')}</option>
                  <option value="Închiriere">{t('transRent')}</option>
                </select>
              </div>
            )}

            {selectedCategoryId === 'telefoane' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">{t('storageLabel')}</label>
                <select
                  value={searchFilters.storage || ''}
                  onChange={(e) =>
                    setSearchFilters((prev) => ({ ...prev, storage: e.target.value || undefined }))
                  }
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden"
                >
                  <option value="">{t('allLabel')}</option>
                  <option value="64GB">64GB</option>
                  <option value="128GB">128GB</option>
                  <option value="256GB">256GB</option>
                  <option value="512GB">512GB</option>
                  <option value="1TB">1TB</option>
                </select>
              </div>
            )}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => setFilterDrawerOpen(false)}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer shadow-xs"
            >
              {t('applyFilters')}
            </button>
          </div>
        </div>
      )}

      {/* Control Bar: Results count, Save search, Sort, Grid/List */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-3">
          <span className="text-xs sm:text-sm font-bold text-slate-800">
            {filteredListings.length} {t('listingsFound')}
          </span>

          {/* Location indicator */}
          <button
            onClick={() => setLocationModalOpen(true)}
            className="flex items-center gap-1 text-xs text-blue-600 font-semibold hover:underline cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>
              {currentLocation.county === 'România'
                ? t('allRomania')
                : currentLocation.label}
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Save Search Button */}
          <button
            onClick={handleSaveSearch}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              saveSuccess
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
            }`}
          >
            {saveSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t('saved')}</span>
              </>
            ) : (
              <>
                <BookmarkPlus className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">{t('saveThisSearch')}</span>
              </>
            )}
          </button>

          {/* Sort By Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none pl-3 pr-8 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-hidden cursor-pointer"
            >
              <option value="newest">{t('sortNewest')}</option>
              <option value="relevance">{t('sortRelevance')}</option>
              <option value="price_asc">{t('sortPriceAsc')}</option>
              <option value="price_desc">{t('sortPriceDesc')}</option>
              <option value="distance">{t('sortDistance')}</option>
              <option value="oldest">{t('sortOldest')}</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-2.5 w-3 h-3 text-slate-400 pointer-events-none" />
          </div>

          {/* Layout Toggle */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
            <button
              onClick={() => setLayout('grid')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                layout === 'grid'
                  ? 'bg-white text-blue-600 shadow-2xs font-bold'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
              title="Grid"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayout('list')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                layout === 'list'
                  ? 'bg-white text-blue-600 shadow-2xs font-bold'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
              title="List"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Listings Result Grid or List */}
      {filteredListings.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-black text-slate-800">{t('noResultsFound')}</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">{t('noResultsSub')}</p>
          <div className="pt-2">
            <button
              onClick={() => {
                setSearchQuery('');
                resetFilters();
                setSelectedCategoryId(null);
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 cursor-pointer shadow-xs"
            >
              {t('clearFilters')}
            </button>
          </div>
        </div>
      ) : (
        <div
          className={
            layout === 'grid'
              ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4'
              : 'space-y-3'
          }
        >
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} layout={layout} />
          ))}
        </div>
      )}
    </div>
  );
};
