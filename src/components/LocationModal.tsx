import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ROMANIAN_COUNTIES, POPULAR_LOCATIONS } from '../data/romaniaLocations';
import { MapPin, X, Navigation, Check, Search, ChevronRight } from 'lucide-react';

export const LocationModal: React.FC = () => {
  const {
    locationModalOpen,
    setLocationModalOpen,
    currentLocation,
    setCurrentLocation,
    useMyLocation,
    language,
    t
  } = useApp();

  const [searchFilter, setSearchFilter] = useState('');
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null);

  if (!locationModalOpen) return null;

  const handleSelect = (county: string, city: string, label: string) => {
    setCurrentLocation({ county, city, label });
    setLocationModalOpen(false);
  };

  const handleUseGPS = () => {
    useMyLocation();
    setLocationModalOpen(false);
  };

  const filteredCounties = ROMANIAN_COUNTIES.filter(
    (c) =>
      c.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.cities.some((city) => city.toLowerCase().includes(searchFilter.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                {t('selectLocation')}
              </h3>
              <p className="text-xs text-slate-500">{t('locationSubtitle')}</p>
            </div>
          </div>
          <button
            onClick={() => setLocationModalOpen(false)}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Actions */}
        <div className="p-4 border-b border-slate-100 space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder={t('searchCountyPlaceholder')}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100 hover:bg-slate-100/80 focus:bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-2xl text-xs sm:text-sm text-slate-800 transition-all outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleSelect('România', 'Toate orașele', t('allRomania'))}
              className={`flex items-center justify-center gap-1.5 p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                currentLocation.county === 'România'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <span>🇷🇴</span>
              <span>{t('allRomania')}</span>
            </button>

            <button
              onClick={handleUseGPS}
              className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5 text-blue-600" />
              <span>{t('useMyLocation')}</span>
            </button>
          </div>
        </div>

        {/* Popular Locations Chips */}
        {!searchFilter && !selectedCounty && (
          <div className="p-4 border-b border-slate-100 bg-slate-50/40">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              {t('popularCities')}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_LOCATIONS.map((loc) => (
                <button
                  key={loc.label}
                  onClick={() => handleSelect(loc.county, loc.city, loc.label)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                    currentLocation.label === loc.label
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  {loc.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Counties & Cities List */}
        <div className="overflow-y-auto p-4 flex-1 divide-y divide-slate-100">
          {selectedCounty ? (
            <div>
              <button
                onClick={() => setSelectedCounty(null)}
                className="mb-3 text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline cursor-pointer"
              >
                {t('backToAllCounties')}
              </button>
              <p className="font-extrabold text-sm text-slate-900 mb-2">
                {t('citiesIn')} {selectedCounty}:
              </p>
              <div className="space-y-1">
                {ROMANIAN_COUNTIES.find((c) => c.name === selectedCounty)?.cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => handleSelect(selectedCounty, city, `${city}, ${selectedCounty}`)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-blue-50 text-left transition-colors cursor-pointer group"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-blue-700">
                      {city}
                    </span>
                    <Check className="w-4 h-4 text-blue-600 opacity-0 group-hover:opacity-100" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                {t('allCountiesInRo')}
              </p>
              <div className="space-y-1">
                {filteredCounties.map((county) => (
                  <button
                    key={county.code}
                    onClick={() => setSelectedCounty(county.name)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 text-left transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center">
                        {county.code}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-slate-800">
                        {county.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400 group-hover:text-blue-600 text-xs">
                      <span>{county.cities.length} {language === 'ro' ? 'orașe' : 'cities'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
