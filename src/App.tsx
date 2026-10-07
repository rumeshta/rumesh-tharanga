import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { CategoriesScreen } from './components/CategoriesScreen';
import { SearchScreen } from './components/SearchScreen';
import { PostAdScreen } from './components/PostAdScreen';
import { ChatScreen } from './components/ChatScreen';
import { AccountScreen } from './components/AccountScreen';
import { ListingDetailScreen } from './components/ListingDetailScreen';
import { SellerShopScreen } from './components/SellerShopScreen';
import { MyAdsScreen } from './components/MyAdsScreen';
import { FavoritesScreen } from './components/FavoritesScreen';
import { SavedSearchesScreen } from './components/SavedSearchesScreen';
import { SafetyCenterScreen } from './components/SafetyCenterScreen';
import { AdminPanel } from './components/AdminPanel';
import { SettingsScreen } from './components/SettingsScreen';
import { LocationModal } from './components/LocationModal';
import { OnboardingModal } from './components/OnboardingModal';
import { AuthModal } from './components/AuthModal';
import { ShareModal } from './components/ShareModal';
import { ReportModal } from './components/ReportModal';
import { ApkModal } from './components/ApkModal';

const AppContent: React.FC = () => {
  const { currentView, apkModalOpen, setApkModalOpen } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Top Universal Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'home' && <HomeScreen />}
        {currentView === 'categories' && <CategoriesScreen />}
        {currentView === 'search' && <SearchScreen />}
        {currentView === 'post_ad' && <PostAdScreen />}
        {currentView === 'messages' && <ChatScreen />}
        {currentView === 'account' && <AccountScreen />}
        {currentView === 'listing_detail' && <ListingDetailScreen />}
        {currentView === 'seller_shop' && <SellerShopScreen />}
        {currentView === 'my_ads' && <MyAdsScreen />}
        {currentView === 'favorites' && <FavoritesScreen />}
        {currentView === 'saved_searches' && <SavedSearchesScreen />}
        {currentView === 'safety_center' && <SafetyCenterScreen />}
        {currentView === 'admin_panel' && <AdminPanel />}
        {currentView === 'settings' && <SettingsScreen />}
      </main>

      {/* Bottom Mobile Navigation */}
      <BottomNav />

      {/* Global Modals */}
      <LocationModal />
      <OnboardingModal />
      <AuthModal />
      <ShareModal />
      <ReportModal />
      <ApkModal isOpen={apkModalOpen} onClose={() => setApkModalOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
