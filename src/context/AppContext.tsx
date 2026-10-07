import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  User,
  Listing,
  ChatConversation,
  SavedSearch,
  NotificationItem,
  PromotionPackage,
  ReportItem,
  PromotionType
} from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import {
  MOCK_LISTINGS,
  MOCK_USERS,
  MOCK_CHATS,
  MOCK_NOTIFICATIONS,
  INITIAL_PROMOTION_PACKAGES,
  MOCK_REPORTS
} from '../data/mockData';

export type AppView =
  | 'home'
  | 'categories'
  | 'search'
  | 'post_ad'
  | 'messages'
  | 'account'
  | 'listing_detail'
  | 'seller_shop'
  | 'my_ads'
  | 'favorites'
  | 'saved_searches'
  | 'safety_center'
  | 'admin_panel'
  | 'settings';

interface AppContextType {
  // Language & i18n
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof TRANSLATIONS['ro']) => string;

  // Location
  currentLocation: {
    county: string;
    city: string;
    label: string;
  };
  setCurrentLocation: (loc: { county: string; city: string; label: string }) => void;
  useMyLocation: () => void;

  // Data saving mode
  dataSavingMode: boolean;
  setDataSavingMode: (val: boolean) => void;

  // Navigation & Views
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  navigateHistory: AppView[];
  goBack: () => void;

  // Auth & Current User
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  loginUser: (method: 'google' | 'facebook' | 'email' | 'phone', emailOrPhone: string, type?: 'personal' | 'business') => void;
  logoutUser: () => void;
  switchUserRole: (type: 'personal' | 'business' | 'admin') => void;

  // Listings state & CRUD
  listings: Listing[];
  selectedListing: Listing | null;
  setSelectedListing: (listing: Listing | null) => void;
  openListing: (listing: Listing) => void;
  addListing: (listingData: Partial<Listing>) => Listing;
  updateListing: (id: string, updates: Partial<Listing>) => void;
  deleteListing: (id: string) => void;
  markListingAsSold: (id: string) => void;
  pauseListing: (id: string) => void;
  promoteListing: (id: string, packageId: PromotionType) => void;
  bumpListing: (id: string) => void;

  // Seller profile / shop
  selectedSellerId: string | null;
  openSellerShop: (sellerId: string) => void;

  // Search state
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategoryId: string | null;
  setSelectedCategoryId: (catId: string | null) => void;
  selectedSubcategoryId: string | null;
  setSelectedSubcategoryId: (subId: string | null) => void;
  searchFilters: Record<string, any>;
  setSearchFilters: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  resetFilters: () => void;
  executeSearch: (query?: string, categoryId?: string, subcategoryId?: string) => void;

  // Favorites
  favorites: string[];
  toggleFavorite: (listingId: string) => void;
  isFavorite: (listingId: string) => boolean;

  // Saved searches
  savedSearches: SavedSearch[];
  saveCurrentSearch: (title: string) => void;
  removeSavedSearch: (id: string) => void;

  // Chats & messaging
  chats: ChatConversation[];
  activeChatId: string | null;
  setActiveChatId: (id: string | null) => void;
  openChatWithListing: (listing: Listing) => void;
  sendMessage: (chatId: string, text: string, image?: string) => void;
  totalUnreadMessages: number;

  // Notifications
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  totalUnreadNotifications: number;

  // Promotions & Admin
  promotionPackages: PromotionPackage[];
  updatePromotionPrice: (pkgId: PromotionType, newPrice: number) => void;
  reports: ReportItem[];
  submitReport: (listingId: string, reason: string, details: string) => void;
  resolveReport: (reportId: string) => void;

  // Modals
  authModalOpen: boolean;
  setAuthModalOpen: (val: boolean) => void;
  shareModalOpen: boolean;
  shareListing: Listing | null;
  openShareModal: (listing: Listing) => void;
  closeShareModal: () => void;
  reportModalOpen: boolean;
  reportListing: Listing | null;
  openReportModal: (listing: Listing) => void;
  closeReportModal: () => void;
  onboardingOpen: boolean;
  setOnboardingOpen: (val: boolean) => void;
  locationModalOpen: boolean;
  setLocationModalOpen: (val: boolean) => void;
  apkModalOpen: boolean;
  setApkModalOpen: (val: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Language
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('repedero_lang') as Language) || 'ro';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('repedero_lang', lang);
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = language === 'ro'
      ? 'Repedero - Cumpără. Vinde. Descoperă. | Anunțuri Gratuite România'
      : 'Repedero - Buy. Sell. Discover. | Free Classifieds Romania';
  }, [language]);

  const t = (key: keyof typeof TRANSLATIONS['ro']): string => {
    return TRANSLATIONS[language][key] || TRANSLATIONS['ro'][key] || String(key);
  };

  // Location
  const [currentLocation, setCurrentLocation] = useState<{ county: string; city: string; label: string }>(() => {
    const saved = localStorage.getItem('repedero_loc');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return { county: 'București', city: 'Toate sectoarele', label: 'București' };
  });

  useEffect(() => {
    localStorage.setItem('repedero_loc', JSON.stringify(currentLocation));
  }, [currentLocation]);

  const useMyLocation = () => {
    // Geolocation simulation for Romania
    setCurrentLocation({
      county: 'București',
      city: 'Sector 1',
      label: '📍 București, Sector 1 (Detectat)'
    });
  };

  // Data saving mode
  const [dataSavingMode, setDataSavingModeState] = useState<boolean>(() => {
    return localStorage.getItem('repedero_data_saving') === 'true';
  });

  const setDataSavingMode = (val: boolean) => {
    setDataSavingModeState(val);
    localStorage.setItem('repedero_data_saving', String(val));
  };

  // Navigation History
  const [currentView, setCurrentViewState] = useState<AppView>('home');
  const [navigateHistory, setNavigateHistory] = useState<AppView[]>(['home']);

  const setCurrentView = (view: AppView) => {
    setNavigateHistory((prev) => [...prev, view]);
    setCurrentViewState(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (navigateHistory.length > 1) {
      const newHistory = [...navigateHistory];
      newHistory.pop(); // remove current
      const previous = newHistory[newHistory.length - 1];
      setNavigateHistory(newHistory);
      setCurrentViewState(previous);
    } else {
      setCurrentViewState('home');
    }
  };

  // Auth User
  const [currentUser, setCurrentUser] = useState<User | null>(MOCK_USERS[0]);

  const loginUser = (
    method: 'google' | 'facebook' | 'email' | 'phone',
    emailOrPhone: string,
    type: 'personal' | 'business' = 'personal'
  ) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: method === 'phone' ? `Utilizator ${emailOrPhone.slice(-4)}` : emailOrPhone.split('@')[0] || 'Utilizator Repedero',
      email: method === 'email' || method === 'google' || method === 'facebook' ? emailOrPhone : 'utilizator@repedero.ro',
      phone: method === 'phone' ? emailOrPhone : '+40 722 000 000',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      location: 'București',
      county: 'București',
      city: 'Sector 1',
      accountType: type,
      isVerified: true,
      rating: 5.0,
      reviewsCount: 1,
      responseRate: '100%',
      responseTime: '< 10 min',
      memberSince: '2026',
      bio: type === 'business' ? 'Magazin autorizat Repedero' : 'Membru activ Repedero',
      businessInfo:
        type === 'business'
          ? {
              shopName: `${emailOrPhone.split('@')[0]} Shop SRL`,
              companyName: `${emailOrPhone.split('@')[0].toUpperCase()} COMMERCE SRL`,
              cif: 'RO58192031',
              address: 'Strada Victoriei 45, București',
              openingHours: 'Luni - Vineri: 09:00 - 18:00',
              website: 'https://magazinul-meu.ro',
              verifiedBusiness: true
            }
          : undefined
    };
    setCurrentUser(newUser);
    setAuthModalOpen(false);
  };

  const logoutUser = () => {
    setCurrentUser(null);
  };

  const switchUserRole = (type: 'personal' | 'business' | 'admin') => {
    if (type === 'admin') {
      setCurrentUser({
        id: 'admin-super',
        name: 'Administrator Repedero',
        email: 'admin@repedero.ro',
        phone: '+40 720 000 001',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        location: 'București',
        county: 'București',
        city: 'Centru',
        accountType: 'admin',
        isVerified: true,
        rating: 5.0,
        reviewsCount: 50,
        responseRate: '100%',
        responseTime: '< 1 min',
        memberSince: '2020'
      });
    } else if (type === 'business') {
      setCurrentUser(MOCK_USERS[1]); // Auto Mihai SRL
    } else {
      setCurrentUser(MOCK_USERS[0]); // Personal
    }
  };

  // Listings
  const [listings, setListings] = useState<Listing[]>(MOCK_LISTINGS);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [selectedSellerId, setSelectedSellerId] = useState<string | null>(null);

  const openListing = (listing: Listing) => {
    setSelectedListing(listing);
    // increment view count
    setListings((prev) =>
      prev.map((item) => (item.id === listing.id ? { ...item, views: item.views + 1 } : item))
    );
    setCurrentView('listing_detail');
  };

  const openSellerShop = (sellerId: string) => {
    setSelectedSellerId(sellerId);
    setCurrentView('seller_shop');
  };

  const addListing = (listingData: Partial<Listing>): Listing => {
    const contactInfo = listingData.contactInfo;
    const newListing: Listing = {
      id: `ad-${Date.now()}`,
      sellerId: currentUser?.id || 'user-current',
      seller: {
        name: contactInfo?.contactName || currentUser?.name || 'Vânzător Repedero',
        avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        accountType: currentUser?.accountType || 'personal',
        isVerified: currentUser?.isVerified ?? true,
        rating: currentUser?.rating || 5.0,
        phone: contactInfo?.phone || currentUser?.phone || '+40 722 000 000',
        city: currentUser?.location || 'București'
      },
      contactInfo: contactInfo,
      categoryId: listingData.categoryId || 'diverse',
      subcategoryId: listingData.subcategoryId || '',
      title: listingData.title || 'Anunț nou',
      titleEn: listingData.titleEn || listingData.title || 'New Ad',
      description: listingData.description || '',
      descriptionEn: listingData.descriptionEn || listingData.description || '',
      price: listingData.price || 0,
      currency: listingData.currency || 'RON',
      isNegotiable: listingData.isNegotiable ?? true,
      isFree: listingData.isFree ?? false,
      condition: listingData.condition || 'good',
      location: listingData.location || {
        county: currentLocation.county,
        city: currentLocation.city,
        area: 'Centru',
        distanceKm: 1.5
      },
      images: listingData.images && listingData.images.length > 0
        ? listingData.images
        : ['https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80'],
      attributes: listingData.attributes || {},
      views: 0,
      favoritesCount: 0,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPromoted: listingData.isPromoted || false,
      promotionType: listingData.promotionType || null,
      isFeatured: listingData.isFeatured || false
    };

    setListings((prev) => [newListing, ...prev]);

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      type: 'ad_approved',
      title: language === 'ro' ? 'Anunț publicat cu succes' : 'Ad published successfully',
      body: language === 'ro' ? `Anunțul tău "${newListing.title}" este acum activ.` : `Your ad "${newListing.title}" is now live.`,
      date: 'Chiar acum',
      isRead: false,
      listingId: newListing.id
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return newListing;
  };

  const updateListing = (id: string, updates: Partial<Listing>) => {
    setListings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates, updatedAt: new Date().toISOString() } : item))
    );
  };

  const deleteListing = (id: string) => {
    setListings((prev) => prev.filter((item) => item.id !== id));
  };

  const markListingAsSold = (id: string) => {
    setListings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'sold' } : item))
    );
  };

  const pauseListing = (id: string) => {
    setListings((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus = item.status === 'active' ? 'draft' : 'active';
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
  };

  const promoteListing = (id: string, packageId: PromotionType) => {
    setListings((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isPromoted: true,
            promotionType: packageId,
            isFeatured: packageId === 'featured' || packageId === 'top_ad'
          };
        }
        return item;
      })
    );
  };

  const bumpListing = (id: string) => {
    setListings((prev) => {
      const target = prev.find((i) => i.id === id);
      if (!target) return prev;
      const rest = prev.filter((i) => i.id !== id);
      const bumped: Listing = {
        ...target,
        isPromoted: true,
        promotionType: 'bump',
        updatedAt: new Date().toISOString()
      };
      return [bumped, ...rest];
    });
  };

  // Search state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string | null>(null);
  const [searchFilters, setSearchFilters] = useState<Record<string, any>>({});

  const resetFilters = () => {
    setSearchFilters({});
    setSelectedSubcategoryId(null);
  };

  const executeSearch = (query?: string, categoryId?: string, subcategoryId?: string) => {
    if (query !== undefined) setSearchQuery(query);
    if (categoryId !== undefined) setSelectedCategoryId(categoryId);
    if (subcategoryId !== undefined) setSelectedSubcategoryId(subcategoryId);
    setCurrentView('search');
  };

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(['ad-car-1', 'ad-laptop-1']);

  const toggleFavorite = (listingId: string) => {
    setFavorites((prev) => {
      if (prev.includes(listingId)) {
        return prev.filter((id) => id !== listingId);
      } else {
        return [...prev, listingId];
      }
    });
    setListings((prev) =>
      prev.map((item) => {
        if (item.id === listingId) {
          const inc = favorites.includes(listingId) ? -1 : 1;
          return { ...item, favoritesCount: Math.max(0, item.favoritesCount + inc) };
        }
        return item;
      })
    );
  };

  const isFavorite = (listingId: string) => favorites.includes(listingId);

  // Saved searches
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([
    {
      id: 'ss-1',
      title: 'BMW Seria 3 București',
      query: 'BMW Seria 3',
      county: 'București',
      city: 'Toate sectoarele',
      alertEnabled: true,
      createdAt: '2026-10-04',
      matchingCount: 8
    },
    {
      id: 'ss-2',
      title: 'iPhone 15 Pro Cluj',
      query: 'iPhone 15 Pro',
      county: 'Cluj',
      city: 'Cluj-Napoca',
      alertEnabled: true,
      createdAt: '2026-10-06',
      matchingCount: 3
    }
  ]);

  const saveCurrentSearch = (title: string) => {
    const newSS: SavedSearch = {
      id: `ss-${Date.now()}`,
      title: title || searchQuery || 'Căutare salvată',
      query: searchQuery,
      categoryId: selectedCategoryId || undefined,
      county: currentLocation.county,
      city: currentLocation.city,
      alertEnabled: true,
      createdAt: new Date().toISOString().split('T')[0],
      matchingCount: 5
    };
    setSavedSearches((prev) => [newSS, ...prev]);
  };

  const removeSavedSearch = (id: string) => {
    setSavedSearches((prev) => prev.filter((item) => item.id !== id));
  };

  // Chats
  const [chats, setChats] = useState<ChatConversation[]>(MOCK_CHATS);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const openChatWithListing = (listing: Listing) => {
    // Check if chat exists
    let existing = chats.find((c) => c.listingId === listing.id);
    if (!existing) {
      existing = {
        id: `chat-${Date.now()}`,
        listingId: listing.id,
        listing: {
          title: listing.title,
          price: listing.price,
          currency: listing.currency,
          image: listing.images[0] || '',
          city: listing.location.city,
          status: listing.status
        },
        buyerId: currentUser?.id || 'user-current',
        sellerId: listing.sellerId,
        otherUser: {
          id: listing.sellerId,
          name: listing.seller.name,
          avatar: listing.seller.avatar,
          isOnline: true,
          isVerified: listing.seller.isVerified
        },
        lastMessage: 'Conversație inițiată',
        lastMessageDate: 'Acum',
        unreadCount: 0,
        messages: [
          {
            id: `msg-${Date.now()}`,
            senderId: currentUser?.id || 'user-current',
            text: language === 'ro' ? 'Bună ziua! Mai este disponibil anunțul?' : 'Hello! Is this ad still available?',
            createdAt: 'Chiar acum',
            isRead: true
          }
        ]
      };
      setChats((prev) => [existing!, ...prev]);
    }
    setActiveChatId(existing.id);
    setCurrentView('messages');
  };

  const sendMessage = (chatId: string, text: string, image?: string) => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      senderId: currentUser?.id || 'user-current',
      text,
      image,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false
    };

    setChats((prev) =>
      prev.map((c) => {
        if (c.id === chatId) {
          return {
            ...c,
            lastMessage: text,
            lastMessageDate: newMsg.createdAt,
            messages: [...c.messages, newMsg]
          };
        }
        return c;
      })
    );

    // Simulated seller reply after 2.5 seconds
    setTimeout(() => {
      const sellerReplies = language === 'ro'
        ? [
            'Bună ziua! Da, produsul este disponibil.',
            'Prețul este ușor negociabil dacă veniți să îl ridicați personal.',
            'Vă pot oferi detalii suplimentare sau poze pe WhatsApp.',
            'Puteți trece oricând să îl vedeți și testați!'
          ]
        : [
            'Hello! Yes, the item is still available.',
            'The price is slightly negotiable if you pick it up in person.',
            'I can send you additional high-res photos.',
            'Feel free to test it anytime!'
          ];
      const randomReply = sellerReplies[Math.floor(Math.random() * sellerReplies.length)];

      const replyMsg = {
        id: `msg-reply-${Date.now()}`,
        senderId: 'seller-auto',
        text: randomReply,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: false
      };

      setChats((prev) =>
        prev.map((c) => {
          if (c.id === chatId) {
            return {
              ...c,
              lastMessage: randomReply,
              lastMessageDate: replyMsg.createdAt,
              unreadCount: c.unreadCount + 1,
              messages: [...c.messages, replyMsg]
            };
          }
          return c;
        })
      );
    }, 2500);
  };

  const totalUnreadMessages = chats.reduce((acc, c) => acc + c.unreadCount, 0);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isRead: true } : item))
    );
  };

  const totalUnreadNotifications = notifications.filter((n) => !n.isRead).length;

  // Promotions & Admin
  const [promotionPackages, setPromotionPackages] = useState<PromotionPackage[]>(INITIAL_PROMOTION_PACKAGES);

  const updatePromotionPrice = (pkgId: PromotionType, newPrice: number) => {
    setPromotionPackages((prev) =>
      prev.map((p) => (p.id === pkgId ? { ...p, price: newPrice } : p))
    );
  };

  const [reports, setReports] = useState<ReportItem[]>(MOCK_REPORTS);

  const submitReport = (listingId: string, reason: string, details: string) => {
    const targetListing = listings.find((l) => l.id === listingId);
    const newRep: ReportItem = {
      id: `rep-${Date.now()}`,
      listingId,
      listingTitle: targetListing?.title || 'Anunț raportat',
      reporterId: currentUser?.id || 'anon',
      reporterName: currentUser?.name || 'Anonim',
      reason,
      details,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'pending'
    };
    setReports((prev) => [newRep, ...prev]);
    setReportModalOpen(false);
  };

  const resolveReport = (reportId: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: 'reviewed' } : r))
    );
  };

  // Modals state
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [shareModalOpen, setShareModalOpen] = useState<boolean>(false);
  const [shareListing, setShareListing] = useState<Listing | null>(null);

  const openShareModal = (listing: Listing) => {
    setShareListing(listing);
    setShareModalOpen(true);
  };

  const closeShareModal = () => {
    setShareModalOpen(false);
    setShareListing(null);
  };

  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);
  const [reportListing, setReportListing] = useState<Listing | null>(null);

  const openReportModal = (listing: Listing) => {
    setReportListing(listing);
    setReportModalOpen(true);
  };

  const closeReportModal = () => {
    setReportModalOpen(false);
    setReportListing(null);
  };

  const [onboardingOpen, setOnboardingOpen] = useState<boolean>(() => {
    return localStorage.getItem('repedero_onboarding_done') !== 'true';
  });

  const [locationModalOpen, setLocationModalOpen] = useState<boolean>(false);
  const [apkModalOpen, setApkModalOpen] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentLocation,
        setCurrentLocation,
        useMyLocation,
        dataSavingMode,
        setDataSavingMode,
        currentView,
        setCurrentView,
        navigateHistory,
        goBack,
        currentUser,
        setCurrentUser,
        loginUser,
        logoutUser,
        switchUserRole,
        listings,
        selectedListing,
        setSelectedListing,
        openListing,
        addListing,
        updateListing,
        deleteListing,
        markListingAsSold,
        pauseListing,
        promoteListing,
        bumpListing,
        selectedSellerId,
        openSellerShop,
        searchQuery,
        setSearchQuery,
        selectedCategoryId,
        setSelectedCategoryId,
        selectedSubcategoryId,
        setSelectedSubcategoryId,
        searchFilters,
        setSearchFilters,
        resetFilters,
        executeSearch,
        favorites,
        toggleFavorite,
        isFavorite,
        savedSearches,
        saveCurrentSearch,
        removeSavedSearch,
        chats,
        activeChatId,
        setActiveChatId,
        openChatWithListing,
        sendMessage,
        totalUnreadMessages,
        notifications,
        markNotificationAsRead,
        totalUnreadNotifications,
        promotionPackages,
        updatePromotionPrice,
        reports,
        submitReport,
        resolveReport,
        authModalOpen,
        setAuthModalOpen,
        shareModalOpen,
        shareListing,
        openShareModal,
        closeShareModal,
        reportModalOpen,
        reportListing,
        openReportModal,
        closeReportModal,
        onboardingOpen,
        setOnboardingOpen,
        locationModalOpen,
        setLocationModalOpen,
        apkModalOpen,
        setApkModalOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
