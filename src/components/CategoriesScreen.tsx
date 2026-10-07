import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/categories';
import {
  ChevronRight,
  Search,
  Sparkles,
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

export const CategoriesScreen: React.FC = () => {
  const {
    t,
    language,
    setSelectedCategoryId,
    setSelectedSubcategoryId,
    setCurrentView
  } = useApp();

  const [expandedCat, setExpandedCat] = useState<string | null>('vehicule');
  const [filterQuery, setFilterQuery] = useState('');

  const filteredCategories = CATEGORIES.filter((cat) => {
    const name = language === 'ro' ? cat.nameRo : cat.nameEn;
    const matchesCat = name.toLowerCase().includes(filterQuery.toLowerCase());
    const matchesSub = cat.subcategories.some((sub) => {
      const subName = language === 'ro' ? sub.nameRo : sub.nameEn;
      return subName.toLowerCase().includes(filterQuery.toLowerCase());
    });
    return matchesCat || matchesSub;
  });

  const handleSubcategoryClick = (catId: string, subId: string) => {
    setSelectedCategoryId(catId);
    setSelectedSubcategoryId(subId);
    setCurrentView('search');
  };

  const handleCategoryHeaderClick = (catId: string) => {
    setSelectedCategoryId(catId);
    setSelectedSubcategoryId(null);
    setCurrentView('search');
  };

  return (
    <div className="pb-24 pt-3 max-w-4xl mx-auto px-3 sm:px-4 space-y-4">
      {/* Title & Filter */}
      <div className="space-y-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {t('navCategories')}
          </h1>
          <p className="text-xs text-slate-500">
            {language === 'ro'
              ? 'Explorează toate domeniile și categoriile Repedero'
              : 'Explore all categories and sectors on Repedero'}
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder={
              language === 'ro'
                ? 'Filtrează categorii (ex: autoturisme, laptopuri, apartamente)...'
                : 'Filter categories (e.g. cars, laptops, property)...'
            }
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-2xl text-xs sm:text-sm text-slate-800 transition-all outline-hidden"
          />
        </div>
      </div>

      {/* Categories Accordion / List */}
      <div className="space-y-3">
        {filteredCategories.map((cat) => {
          const IconComp = ICON_COMPONENTS[cat.icon] || Sparkles;
          const isExpanded = expandedCat === cat.id;

          return (
            <div
              key={cat.id}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs transition-all"
            >
              {/* Category Header */}
              <div className="p-3.5 sm:p-4 flex items-center justify-between gap-3 hover:bg-slate-50/70 transition-colors">
                <button
                  onClick={() => handleCategoryHeaderClick(cat.id)}
                  className="flex items-center gap-3 text-left flex-1 cursor-pointer"
                >
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shrink-0 shadow-xs`}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-extrabold text-sm sm:text-base text-slate-900 hover:text-blue-700 transition-colors">
                      {language === 'ro' ? cat.nameRo : cat.nameEn}
                    </h2>
                    <span className="text-xs text-slate-400 font-medium">
                      {cat.itemCount} {t('activeAdsCount')}
                    </span>
                  </div>
                </button>

                {/* Accordion toggle */}
                <button
                  onClick={() => setExpandedCat(isExpanded ? null : cat.id)}
                  className="p-2 rounded-xl hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                  title="Extinde subcategorii"
                >
                  <ChevronRight
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isExpanded ? 'rotate-90 text-blue-600' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Subcategories */}
              {isExpanded && (
                <div className="bg-slate-50/70 border-t border-slate-100 p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 gap-2 animate-in fade-in duration-200">
                  {cat.subcategories.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => handleSubcategoryClick(cat.id, sub.id)}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white text-slate-700 hover:text-blue-700 hover:shadow-2xs border border-transparent hover:border-slate-200/80 transition-all cursor-pointer text-left group"
                    >
                      <span className="text-xs sm:text-sm font-semibold">
                        {language === 'ro' ? sub.nameRo : sub.nameEn}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 group-hover:text-blue-600">
                        <span>{sub.itemCount}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
