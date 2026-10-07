import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Globe,
  Bell,
  Heart,
  Wifi,
  ChevronDown,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Smartphone
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    t,
    language,
    setLanguage,
    currentLocation,
    setLocationModalOpen,
    dataSavingMode,
    setDataSavingMode,
    setCurrentView,
    favorites,
    totalUnreadNotifications,
    notifications,
    markNotificationAsRead,
    openListing,
    listings,
    setApkModalOpen
  } = useApp();

  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs safe-top">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 h-15 flex items-center justify-between gap-2">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-2 group text-left cursor-pointer focus:outline-hidden"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-xl tracking-tighter">R</span>
              {/* Subtle Romanian flag micro-dot */}
              <div className="absolute -bottom-0.5 -right-0.5 flex rounded-full overflow-hidden w-2.5 h-2.5 border border-white">
                <span className="w-1/3 bg-blue-600 h-full" />
                <span className="w-1/3 bg-amber-400 h-full" />
                <span className="w-1/3 bg-red-600 h-full" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-black text-xl tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                  Repedero
                </span>
                <span className="hidden xs:inline-block text-[10px] font-bold px-1.5 py-0.2 rounded-sm bg-blue-100 text-blue-800">
                  RO
                </span>
              </div>
              <p className="text-[10px] font-medium text-slate-500 -mt-1 hidden sm:block">
                {t('tagline')}
              </p>
            </div>
          </button>

          {/* Location Selector Pill */}
          <button
            onClick={() => setLocationModalOpen(true)}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer border border-slate-200/80"
          >
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span className="max-w-[140px] truncate">{currentLocation.label}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Data saving indicator */}
          {dataSavingMode && (
            <button
              onClick={() => setDataSavingMode(false)}
              title={t('dataSavingActive')}
              className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold border border-amber-200"
            >
              <Wifi className="w-3 h-3 text-amber-600" />
              <span>{language === 'ro' ? 'Date reduse' : 'Data Saver'}</span>
            </button>
          )}

          {/* Language Switch */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-full border border-slate-200 text-xs">
            <button
              onClick={() => setLanguage('ro')}
              className={`px-2 py-1 rounded-full font-bold transition-all text-xs cursor-pointer ${
                language === 'ro'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🇷🇴 RO
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded-full font-bold transition-all text-xs cursor-pointer ${
                language === 'en'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🇬🇧 EN
            </button>
          </div>

          {/* APK / Android Install Button */}
          <button
            onClick={() => setApkModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer"
            title="Descarcă APK sau instalează aplicația pe Android"
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-100" />
            <span className="hidden sm:inline">Android APK</span>
            <span className="sm:hidden text-[10px]">APK</span>
          </button>

          {/* Favorites Button */}
          <button
            onClick={() => setCurrentView('favorites')}
            className="relative p-2 rounded-full text-slate-600 hover:bg-slate-100 hover:text-rose-600 transition-colors cursor-pointer"
            title={t('favorites')}
          >
            <Heart className="w-5 h-5" />
            {favorites.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </button>

          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
              className="relative p-2 rounded-full text-slate-600 hover:bg-slate-100 hover:text-blue-600 transition-colors cursor-pointer"
              title={t('notifications')}
            >
              <Bell className="w-5 h-5" />
              {totalUnreadNotifications > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {totalUnreadNotifications}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {notifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in zoom-in-95">
                <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-blue-600" />
                    <span className="font-bold text-sm text-slate-800">{t('notifications')}</span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    {totalUnreadNotifications} {t('notificationsNew')}
                  </span>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-slate-400 text-xs">
                      {t('noNewNotifications')}
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => {
                          markNotificationAsRead(notif.id);
                          if (notif.listingId) {
                            const found = listings.find((l) => l.id === notif.listingId);
                            if (found) openListing(found);
                          }
                          setNotifDropdownOpen(false);
                        }}
                        className={`p-3.5 hover:bg-blue-50/60 transition-colors cursor-pointer text-left ${
                          !notif.isRead ? 'bg-blue-50/30' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-bold text-slate-800">{notif.title}</p>
                          <span className="text-[10px] text-slate-400 shrink-0">{notif.date}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 line-clamp-2">{notif.body}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
