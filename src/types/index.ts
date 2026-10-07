export type Language = 'ro' | 'en';

export type UserType = 'personal' | 'business' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  location: string;
  county: string;
  city: string;
  accountType: UserType;
  isVerified: boolean;
  rating: number;
  reviewsCount: number;
  responseRate: string;
  responseTime: string;
  memberSince: string;
  bio?: string;
  businessInfo?: {
    shopName: string;
    companyName: string;
    cif?: string;
    address?: string;
    openingHours?: string;
    website?: string;
    banner?: string;
    verifiedBusiness?: boolean;
  };
}

export interface Subcategory {
  id: string;
  slug: string;
  nameRo: string;
  nameEn: string;
  itemCount: number;
}

export interface Category {
  id: string;
  slug: string;
  nameRo: string;
  nameEn: string;
  icon: string;
  color: string;
  itemCount: number;
  subcategories: Subcategory[];
}

export type ListingCondition = 'new' | 'like_new' | 'good' | 'fair' | 'for_parts';

export type ListingStatus = 'active' | 'pending' | 'draft' | 'expired' | 'sold' | 'rejected';

export type PromotionType = 'bump' | 'top_ad' | 'featured' | 'highlight' | null;

export interface ListingLocation {
  county: string;
  city: string;
  area?: string;
  lat?: number;
  lng?: number;
  distanceKm?: number;
}

export interface ListingAttributes {
  // Cars
  brand?: string;
  model?: string;
  year?: number;
  mileage?: number;
  fuel?: 'Benzină' | 'Diesel' | 'Hibrid' | 'Electric' | 'GPL';
  gearbox?: 'Manuală' | 'Automată';
  engineSize?: number; // cm3
  bodyType?: string;
  color?: string;
  vin?: string;

  // Real estate
  propertyType?: 'Vânzare' | 'Închiriere';
  rooms?: number;
  surface?: number; // mp
  floor?: string;
  buildingYear?: number;
  heating?: string;
  furnished?: 'Da' | 'Nu' | 'Parțial';
  parking?: boolean;
  balcony?: boolean;
  lift?: boolean;

  // Phones & Electronics
  storage?: string;
  ram?: string;
  screenSize?: string;
  warranty?: boolean;

  // Jobs
  jobType?: 'Full-time' | 'Part-time' | 'Remote' | 'Freelance' | 'Internship' | 'Sezonier';
  salaryMin?: number;
  salaryMax?: number;
  salaryPeriod?: 'lună' | 'oră' | 'proiect';
  experience?: string;
  contractType?: string;

  // Custom
  [key: string]: any;
}

export interface ListingContactInfo {
  contactName: string;
  phone: string;
  email?: string;
  hidePhone?: boolean;
  allowWhatsapp?: boolean;
  contactPref: 'both' | 'chat' | 'phone';
  callHours?: string;
}

export interface Listing {
  id: string;
  sellerId: string;
  seller: {
    name: string;
    avatar: string;
    accountType: UserType;
    isVerified: boolean;
    rating: number;
    phone: string;
    city: string;
  };
  contactInfo?: ListingContactInfo;
  categoryId: string;
  subcategoryId: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  price: number;
  currency: 'RON' | 'EUR';
  isNegotiable: boolean;
  isFree?: boolean;
  condition: ListingCondition;
  location: ListingLocation;
  images: string[];
  attributes: ListingAttributes;
  views: number;
  favoritesCount: number;
  status: ListingStatus;
  createdAt: string;
  updatedAt: string;
  isPromoted: boolean;
  promotionType: PromotionType;
  promotionExpiresAt?: string;
  isFeatured?: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  image?: string;
  createdAt: string;
  isRead: boolean;
}

export interface ChatConversation {
  id: string;
  listingId: string;
  listing: {
    title: string;
    price: number;
    currency: 'RON' | 'EUR';
    image: string;
    city: string;
    status: ListingStatus;
  };
  buyerId: string;
  sellerId: string;
  otherUser: {
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;
    isVerified: boolean;
  };
  lastMessage: string;
  lastMessageDate: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export interface SavedSearch {
  id: string;
  title: string;
  query: string;
  categoryId?: string;
  county?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  alertEnabled: boolean;
  createdAt: string;
  matchingCount: number;
}

export interface SellerReview {
  id: string;
  authorName: string;
  authorAvatar: string;
  rating: number;
  comment: string;
  date: string;
  listingTitle: string;
}

export interface NotificationItem {
  id: string;
  type: 'message' | 'price_drop' | 'saved_search' | 'ad_approved' | 'ad_sold' | 'promotion' | 'security';
  title: string;
  body: string;
  date: string;
  isRead: boolean;
  listingId?: string;
}

export interface PromotionPackage {
  id: PromotionType;
  nameRo: string;
  nameEn: string;
  badgeRo: string;
  badgeEn: string;
  descRo: string;
  descEn: string;
  price: number;
  durationDays: number;
  icon: string;
  highlightColor: string;
}

export interface ReportItem {
  id: string;
  listingId: string;
  listingTitle: string;
  reporterId: string;
  reporterName: string;
  reason: string;
  details: string;
  date: string;
  status: 'pending' | 'reviewed' | 'actioned';
}
