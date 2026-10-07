import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Home,
  Grid,
  Search,
  PlusCircle,
  MessageSquare,
  User,
  Plus
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { currentView, setCurrentView, t, totalUnreadMessages } = useApp();

  const navItems = [
    {
      id: 'home',
      label: t('navHome'),
      icon: Home,
      view: 'home' as const
    },
    {
      id: 'categories',
      label: t('navCategories'),
      icon: Grid,
      view: 'categories' as const
    },
    {
      id: 'post_ad',
      label: t('navPostAd'),
      icon: Plus,
      isSpecial: true,
      view: 'post_ad' as const
    },
    {
      id: 'messages',
      label: t('navMessages'),
      icon: MessageSquare,
      badge: totalUnreadMessages,
      view: 'messages' as const
    },
    {
      id: 'account',
      label: t('navAccount'),
      icon: User,
      view: 'account' as const
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 safe-bottom">
      <div className="max-w-md md:max-w-xl mx-auto flex items-center justify-around px-2 py-1.5 h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.view;

          if (item.isSpecial) {
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView('post_ad')}
                className="group flex flex-col items-center justify-center -mt-6 cursor-pointer focus:outline-hidden"
              >
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/35 group-hover:scale-105 active:scale-95 transition-all ring-4 ring-white">
                  <Plus className="w-7 h-7 stroke-[2.5]" />
                </div>
                <span className="text-[11px] font-bold text-blue-700 mt-1 tracking-tight">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.view)}
              className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer focus:outline-hidden ${
                isActive
                  ? 'text-blue-600 font-bold'
                  : 'text-slate-500 hover:text-slate-900 font-medium'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'
                  }`}
                />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
