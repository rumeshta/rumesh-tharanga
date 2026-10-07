import React from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  ShoppingBag,
  Heart,
  Bookmark,
  MessageSquare,
  Sparkles,
  Store,
  ShieldCheck,
  Settings,
  LogOut,
  ChevronRight,
  CheckCircle2,
  Lock,
  Building,
  UserCheck,
  CreditCard,
  Smartphone
} from 'lucide-react';

export const AccountScreen: React.FC = () => {
  const {
    currentUser,
    setAuthModalOpen,
    logoutUser,
    switchUserRole,
    setCurrentView,
    openSellerShop,
    t,
    language,
    setLanguage,
    setApkModalOpen
  } = useApp();

  if (!currentUser) {
    return (
      <div className="pb-24 pt-6 max-w-md mx-auto px-4 text-center space-y-4">
        <div className="w-20 h-20 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto shadow-sm">
          <User className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-black text-slate-900">
          {language === 'ro' ? 'Contul Tău Repedero' : 'Your Repedero Account'}
        </h1>
        <p className="text-xs text-slate-500">
          {language === 'ro'
            ? 'Autentifică-te pentru a publica anunțuri, salva favorite și comunica cu cumpărătorii.'
            : 'Log in to post listings, bookmark favorites and chat with buyers.'}
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

  const accountMenu = [
    {
      id: 'my_ads',
      label: t('myAds'),
      icon: ShoppingBag,
      onClick: () => setCurrentView('my_ads')
    },
    {
      id: 'seller_shop',
      label: currentUser.accountType === 'business' ? t('sellerShop') : t('openSellerShop'),
      icon: Store,
      badge: currentUser.accountType === 'business' ? t('active') : (language === 'ro' ? 'Nou' : 'New'),
      onClick: () => {
        if (currentUser.accountType === 'business') {
          openSellerShop(currentUser.id);
        } else {
          switchUserRole('business');
          openSellerShop('seller-shop-auto');
        }
      }
    },
    {
      id: 'favorites',
      label: t('favorites'),
      icon: Heart,
      onClick: () => setCurrentView('favorites')
    },
    {
      id: 'saved_searches',
      label: t('savedSearches'),
      icon: Bookmark,
      onClick: () => setCurrentView('saved_searches')
    },
    {
      id: 'messages',
      label: t('navMessages'),
      icon: MessageSquare,
      onClick: () => setCurrentView('messages')
    },
    {
      id: 'safety_center',
      label: t('safetyCenter'),
      icon: ShieldCheck,
      onClick: () => setCurrentView('safety_center')
    },
    {
      id: 'admin_panel',
      label: t('adminPanel'),
      icon: Lock,
      badge: 'Super Admin',
      onClick: () => {
        switchUserRole('admin');
        setCurrentView('admin_panel');
      }
    },
    {
      id: 'android_apk',
      label: language === 'ro' ? 'Aplicație Android & APK' : 'Android App & APK Build',
      icon: Smartphone,
      badge: 'rumesh-tharanga.apk',
      onClick: () => setApkModalOpen(true)
    },
    {
      id: 'settings',
      label: t('settings'),
      icon: Settings,
      onClick: () => setCurrentView('settings')
    }
  ];

  return (
    <div className="pb-28 pt-2 max-w-2xl mx-auto px-3 sm:px-4 space-y-4 animate-in fade-in duration-200">
      {/* Profile Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-3.5">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-100 shadow-sm"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h2 className="font-extrabold text-base sm:text-lg text-slate-900 truncate">
                {currentUser.name}
              </h2>
              {currentUser.isVerified && (
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              )}
            </div>
            <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
                {currentUser.accountType === 'business'
                  ? t('businessSeller')
                  : currentUser.accountType === 'admin'
                  ? 'Administrator'
                  : t('individualSeller')}
              </span>
              <span className="text-xs text-amber-500 font-bold">
                ★ {currentUser.rating} ({currentUser.reviewsCount} {language === 'ro' ? 'recenzii' : 'reviews'})
              </span>
            </div>
          </div>
        </div>

        {/* Demo Role Switcher (Allows testing personal, business shop and admin modes easily) */}
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            {t('demoSwitcherLabel')}
          </span>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={() => switchUserRole('personal')}
              className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentUser.accountType === 'personal'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {t('personalAccount')}
            </button>
            <button
              onClick={() => switchUserRole('business')}
              className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentUser.accountType === 'business'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {t('businessStoreAccount')}
            </button>
            <button
              onClick={() => switchUserRole('admin')}
              className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentUser.accountType === 'admin'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {t('marketplaceAdmin')}
            </button>
          </div>
        </div>
      </div>

      {/* Account Menu Items */}
      <div className="bg-white rounded-3xl border border-slate-200/80 divide-y divide-slate-100 overflow-hidden shadow-xs">
        {accountMenu.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={item.onClick}
              className="w-full p-4 hover:bg-slate-50 transition-colors flex items-center justify-between gap-3 text-left cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-blue-700 transition-colors">
                  {item.label}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {item.badge && (
                  <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[10px] font-extrabold">
                    {item.badge}
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </div>
            </button>
          );
        })}

        {/* Logout button */}
        <button
          onClick={logoutUser}
          className="w-full p-4 hover:bg-rose-50 text-rose-600 transition-colors flex items-center gap-3 text-left cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <LogOut className="w-4 h-4" />
          </div>
          <span className="font-bold text-xs sm:text-sm">{t('logout')}</span>
        </button>
      </div>
    </div>
  );
};
