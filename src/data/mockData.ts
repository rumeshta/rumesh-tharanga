import { Listing, User, ChatConversation, SellerReview, NotificationItem, PromotionPackage, ReportItem } from '../types';

export const INITIAL_PROMOTION_PACKAGES: PromotionPackage[] = [
  {
    id: 'bump',
    nameRo: 'Bump Up (Ridică în Top)',
    nameEn: 'Bump Up',
    badgeRo: 'Reîmprospătat',
    badgeEn: 'Bumped',
    descRo: 'Mută anunțul imediat pe prima poziție în categoria sa și în căutări.',
    descEn: 'Move your ad to the top of its category and search results instantly.',
    price: 9.99,
    durationDays: 1,
    icon: 'ArrowUpCircle',
    highlightColor: 'bg-blue-600'
  },
  {
    id: 'top_ad',
    nameRo: 'Top Ad (Poziție de Top)',
    nameEn: 'Top Ad',
    badgeRo: 'Top Ad',
    badgeEn: 'Top Ad',
    descRo: 'Afișează anunțul în secțiunea specială de sus a paginii timp de 7 zile.',
    descEn: 'Pin your ad to the top featured section of results for 7 days.',
    price: 29.99,
    durationDays: 7,
    icon: 'Sparkles',
    highlightColor: 'bg-amber-500'
  },
  {
    id: 'featured',
    nameRo: 'Recomandat (Prima Pagină)',
    nameEn: 'Featured Ad',
    badgeRo: 'Recomandat',
    badgeEn: 'Featured',
    descRo: 'Apare direct pe pagina principală Repedero vizitată de mii de cumpărători.',
    descEn: 'Appears directly on the Repedero home page showcase.',
    price: 39.99,
    durationDays: 14,
    icon: 'Flame',
    highlightColor: 'bg-rose-500'
  },
  {
    id: 'highlight',
    nameRo: 'Evidențiere Vizuală',
    nameEn: 'Highlight Border',
    badgeRo: 'Evidențiat',
    badgeEn: 'Highlighted',
    descRo: 'Anunțul iese în evidență printr-un fundal colorat și chenar premium distinctiv.',
    descEn: 'Your listing stands out with a distinctive premium colored border.',
    price: 14.99,
    durationDays: 7,
    icon: 'Eye',
    highlightColor: 'bg-purple-600'
  }
];

export const MOCK_USERS: User[] = [
  {
    id: 'user-current',
    name: 'Mihai Dumitrescu',
    email: 'mihai.dumitrescu@repedero.ro',
    phone: '+40 722 849 192',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    location: 'București, Sector 1',
    county: 'București',
    city: 'Sector 1',
    accountType: 'personal',
    isVerified: true,
    rating: 4.9,
    reviewsCount: 18,
    responseRate: '98%',
    responseTime: '< 15 min',
    memberSince: '2023',
    bio: 'Vânzător activ în București. Răspund rapid la mesaje și apeluri.'
  },
  {
    id: 'seller-shop-auto',
    name: 'Auto Mihai SRL',
    email: 'contact@automihai-auto.ro',
    phone: '+40 740 123 456',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    location: 'București, Sector 3',
    county: 'București',
    city: 'Sector 3',
    accountType: 'business',
    isVerified: true,
    rating: 4.8,
    reviewsCount: 142,
    responseRate: '96%',
    responseTime: '< 10 min',
    memberSince: '2021',
    bio: 'Parc auto autorizat cu peste 10 ani de experiență. Oferim garanție 12 luni, factură fiscală cu TVA deductibil și verificare în 150 puncte.',
    businessInfo: {
      shopName: 'Auto Mihai SRL - Parc Auto Rulate',
      companyName: 'SC AUTO MIHAI DEALER SRL',
      cif: 'RO38920194',
      address: 'Bulevardul Theodor Pallady 51, București',
      openingHours: 'Luni - Vineri: 09:00 - 18:30, Sâmbătă: 10:00 - 15:00',
      website: 'https://automihai.ro',
      banner: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=1200&auto=format&fit=crop&q=80',
      verifiedBusiness: true
    }
  },
  {
    id: 'seller-shop-tech',
    name: 'ElectroCluj Store',
    email: 'vanzari@electrocluj.ro',
    phone: '+40 755 987 654',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    location: 'Cluj-Napoca',
    county: 'Cluj',
    city: 'Cluj-Napoca',
    accountType: 'business',
    isVerified: true,
    rating: 4.9,
    reviewsCount: 88,
    responseRate: '99%',
    responseTime: '< 5 min',
    memberSince: '2022',
    bio: 'Magazin specializat în telefoane Apple & Samsung noi și second-hand verificate, cu garanție 24 luni și bon fiscal.',
    businessInfo: {
      shopName: 'ElectroCluj GSM & IT',
      companyName: 'SC TECH CLUJ SOLUTIONS SRL',
      cif: 'RO41209312',
      address: 'Strada Memorandumului 14, Cluj-Napoca',
      openingHours: 'Luni - Sâmbătă: 10:00 - 20:00',
      website: 'https://electrocluj.ro',
      banner: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1200&auto=format&fit=crop&q=80',
      verifiedBusiness: true
    }
  },
  {
    id: 'seller-realty',
    name: 'Habitat Imobiliare',
    email: 'office@habitatimobiliare.ro',
    phone: '+40 733 445 566',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    location: 'Timișoara',
    county: 'Timiș',
    city: 'Timișoara',
    accountType: 'business',
    isVerified: true,
    rating: 4.7,
    reviewsCount: 64,
    responseRate: '94%',
    responseTime: '< 30 min',
    memberSince: '2022',
    bio: 'Agenție imobiliară dedicată proprietăților premium din Timișoara și împrejurimi. Comision 0% la dezvoltatori.',
    businessInfo: {
      shopName: 'Habitat Imobiliare Timișoara',
      companyName: 'HABITAT REAL ESTATE GROUP SRL',
      cif: 'RO32918821',
      address: 'Piața Unirii 8, Timișoara',
      openingHours: 'Luni - Vineri: 09:00 - 18:00',
      website: 'https://habitatimobiliare.ro',
      banner: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80',
      verifiedBusiness: true
    }
  },
  {
    id: 'seller-radup',
    name: 'Radu Popescu',
    email: 'radu.popescu@gmail.com',
    phone: '+40 766 554 321',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    location: 'Brașov',
    county: 'Brașov',
    city: 'Brașov',
    accountType: 'personal',
    isVerified: true,
    rating: 5.0,
    reviewsCount: 12,
    responseRate: '92%',
    responseTime: '< 20 min',
    memberSince: '2023'
  }
];

export const MOCK_LISTINGS: Listing[] = [
  {
    id: 'ad-car-1',
    sellerId: 'seller-shop-auto',
    seller: {
      name: 'Auto Mihai SRL',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
      accountType: 'business',
      isVerified: true,
      rating: 4.8,
      phone: '+40 740 123 456',
      city: 'București, Sector 3'
    },
    categoryId: 'vehicule',
    subcategoryId: 'autoturisme',
    title: 'BMW Seria 3 320d M-Sport xDrive 2021 | Panoramic | Piele Dakota',
    titleEn: 'BMW 3 Series 320d M-Sport xDrive 2021 | Panoramic Roof | Dakota Leather',
    description: 'BMW Seria 3 (G20) 320d Mild-Hybrid 190 CP cu pachet M Sport original de fabrică. Tracțiune integrală xDrive, cutie automată Steptronic 8 rapoarte. Trapă panoramică electrică, jante M 19 inch, faruri BMW Laser, sistem audio Harman Kardon, scaune sport încălzite cu memorie, navigație Live Cockpit Professional. Istoric complet doar în reprezentanță BMW, carte service la zi. TVA deductibil inclus în preț. Garanție 12 luni sau 20.000 km inclusă.',
    descriptionEn: 'BMW 3 Series (G20) 320d Mild-Hybrid 190 HP with factory original M Sport package. xDrive all-wheel drive, 8-speed Steptronic automatic transmission. Electric panoramic glass roof, 19-inch M wheels, BMW Laser lights, Harman Kardon surround audio, heated memory sport seats, Live Cockpit Professional navigation. Full official BMW dealership service history, updated service book. Deductible VAT included. 12-month or 20,000 km warranty included.',
    price: 139500,
    currency: 'RON',
    isNegotiable: true,
    condition: 'like_new',
    contactInfo: {
      contactName: 'Mihai Dealer Auto',
      phone: '+40 740 123 456',
      email: 'contact@automihai-auto.ro',
      hidePhone: false,
      allowWhatsapp: true,
      contactPref: 'both',
      callHours: '09:00 - 18:30'
    },
    location: {
      county: 'București',
      city: 'Sector 3',
      area: 'Theodor Pallady',
      distanceKm: 3.2
    },
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=800&auto=format&fit=crop&q=80'
    ],
    attributes: {
      brand: 'BMW',
      model: 'Seria 3',
      year: 2021,
      mileage: 68400,
      fuel: 'Diesel',
      gearbox: 'Automată',
      engineSize: 1995,
      bodyType: 'Sedan',
      color: 'Albastru Portimao',
      vin: 'WBA5R11030FL98212'
    },
    views: 1420,
    favoritesCount: 54,
    status: 'active',
    createdAt: '2026-10-06T14:20:00Z',
    updatedAt: '2026-10-06T14:20:00Z',
    isPromoted: true,
    promotionType: 'top_ad',
    isFeatured: true
  },
  {
    id: 'ad-phone-1',
    sellerId: 'seller-shop-tech',
    seller: {
      name: 'ElectroCluj GSM & IT',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      accountType: 'business',
      isVerified: true,
      rating: 4.9,
      phone: '+40 755 987 654',
      city: 'Cluj-Napoca'
    },
    categoryId: 'telefoane',
    subcategoryId: 'iphone',
    title: 'iPhone 15 Pro 256GB Natural Titanium | Sigilat | Factură & Garanție 24 luni',
    titleEn: 'iPhone 15 Pro 256GB Natural Titanium | Sealed Box | Invoice & 24 Months Warranty',
    description: 'Apple iPhone 15 Pro, capacitate 256GB, culoarea Natural Titanium. Telefonul este nou, cutie sigilată cu sigiliile Apple intacte. Liber de rețea (neverlocked), compatibil eSIM și nano-SIM. Oferim garanție 2 ani, factură fiscală și bon. Livrare prin curier cu verificare colet sau ridicare personală din magazinul nostru din centrul Clujului (str. Memorandumului).',
    descriptionEn: 'Apple iPhone 15 Pro, 256GB capacity, Natural Titanium color. Brand new in sealed box with original Apple seals intact. Factory unlocked (neverlocked), eSIM and physical nano-SIM compatible. Includes 2-year warranty, fiscal invoice and receipt. Courier delivery with package inspection on arrival or local pickup from our store in central Cluj-Napoca (Memorandumului St.).',
    price: 4899,
    currency: 'RON',
    isNegotiable: false,
    condition: 'new',
    contactInfo: {
      contactName: 'ElectroCluj GSM & IT',
      phone: '+40 755 987 654',
      email: 'vanzari@electrocluj.ro',
      hidePhone: false,
      allowWhatsapp: true,
      contactPref: 'both',
      callHours: '09:00 - 19:00'
    },
    location: {
      county: 'Cluj',
      city: 'Cluj-Napoca',
      area: 'Centru',
      distanceKm: 1.4
    },
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80'
    ],
    attributes: {
      brand: 'Apple',
      model: 'iPhone 15 Pro',
      storage: '256GB',
      ram: '8GB',
      warranty: true
    },
    views: 890,
    favoritesCount: 38,
    status: 'active',
    createdAt: '2026-10-07T08:15:00Z',
    updatedAt: '2026-10-07T08:15:00Z',
    isPromoted: true,
    promotionType: 'bump',
    isFeatured: true
  },
  {
    id: 'ad-prop-1',
    sellerId: 'seller-realty',
    seller: {
      name: 'Habitat Imobiliare',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      accountType: 'business',
      isVerified: true,
      rating: 4.7,
      phone: '+40 733 445 566',
      city: 'Timișoara'
    },
    categoryId: 'imobiliare',
    subcategoryId: 'ap-vanzare',
    title: 'Apartament 3 camere modern 78 mp | Zonă Centrală | Loc parcare subteran',
    titleEn: 'Modern 3-Room Apartment 78 sqm | Central Area | Underground Parking Space',
    description: 'Vânzare apartament spațios cu 3 camere, decomandat, suprafață utilă 78 mp + balcon generos de 8 mp. Situat la etajul 3/5 într-un imobil finalizat în 2022 cu lift modern. Centrală termică proprie cu încălzire în pardoseală, aer condiționat în fiecare cameră, finisaje premium din import. Include loc de parcare în garajul subteran al blocului. Acte gata pentru vânzare imediată, se acceptă credit ipotecar.',
    descriptionEn: 'Spacious 3-room apartment for sale, detached layout, 78 sqm usable living space + generous 8 sqm balcony. Located on 3rd floor out of 5 in modern residence completed in 2022 with elevator. Individual underfloor heating, air conditioning in each room, premium imported finishes. Includes reserved underground parking spot. All legal documentation ready for immediate sale, mortgage accepted.',
    price: 645000,
    currency: 'RON',
    isNegotiable: true,
    condition: 'like_new',
    contactInfo: {
      contactName: 'Habitat Imobiliare Timișoara',
      phone: '+40 733 445 566',
      email: 'office@habitatimobiliare.ro',
      hidePhone: false,
      allowWhatsapp: true,
      contactPref: 'both',
      callHours: '09:00 - 18:00'
    },
    location: {
      county: 'Timiș',
      city: 'Timișoara',
      area: 'Piața Unirii',
      distanceKm: 2.1
    },
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format&fit=crop&q=80'
    ],
    attributes: {
      propertyType: 'Vânzare',
      rooms: 3,
      surface: 78,
      floor: 'Etaj 3 din 5',
      buildingYear: 2022,
      heating: 'Centrală proprie în pardoseală',
      furnished: 'Parțial',
      parking: true,
      balcony: true,
      lift: true
    },
    views: 2100,
    favoritesCount: 71,
    status: 'active',
    createdAt: '2026-10-05T11:00:00Z',
    updatedAt: '2026-10-05T11:00:00Z',
    isPromoted: true,
    promotionType: 'top_ad',
    isFeatured: true
  },
  {
    id: 'ad-laptop-1',
    sellerId: 'user-current',
    seller: {
      name: 'Mihai Dumitrescu',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      accountType: 'personal',
      isVerified: true,
      rating: 4.9,
      phone: '+40 722 849 192',
      city: 'București, Sector 1'
    },
    categoryId: 'electronice',
    subcategoryId: 'laptopuri',
    title: 'MacBook Pro 16 M3 Max 36GB RAM 1TB SSD Space Black | Baterie 99%',
    titleEn: 'MacBook Pro 16 M3 Max 36GB RAM 1TB SSD Space Black | 99% Battery Health',
    description: 'Vând laptop Apple MacBook Pro 16 inch cu procesor Apple M3 Max (14-core CPU, 30-core GPU), memorie 36GB Unified Memory, stocare rapidă 1TB NVMe SSD. Culoare Space Black. Folosit doar în birou cu monitor extern și tastatură, aspect 10/10 fără nicio urmă de uzură. Sănătatea bateriei este 99% la 38 cicluri de încărcare. Vine cu cutia originală completă și încărcătorul MagSafe de 140W.',
    descriptionEn: 'For sale: Apple MacBook Pro 16-inch with Apple M3 Max chip (14-core CPU, 30-core GPU), 36GB Unified Memory, fast 1TB NVMe SSD. Space Black colorway. Office desktop use only with external monitor and keyboard, flawless 10/10 condition. Battery health is at 99% with only 38 charge cycles. Comes complete with original box and 140W MagSafe charger.',
    price: 13200,
    currency: 'RON',
    isNegotiable: true,
    condition: 'like_new',
    contactInfo: {
      contactName: 'Mihai Dumitrescu',
      phone: '+40 722 849 192',
      email: 'mihai.dumitrescu@repedero.ro',
      hidePhone: false,
      allowWhatsapp: true,
      contactPref: 'both',
      callHours: '10:00 - 21:00'
    },
    location: {
      county: 'București',
      city: 'Sector 1',
      area: 'Pipera / Floreasca',
      distanceKm: 0.8
    },
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80'
    ],
    attributes: {
      brand: 'Apple',
      model: 'MacBook Pro 16 M3 Max',
      storage: '1TB SSD',
      ram: '36GB',
      screenSize: '16.2 inch Liquid Retina XDR',
      warranty: true
    },
    views: 540,
    favoritesCount: 29,
    status: 'active',
    createdAt: '2026-10-06T18:40:00Z',
    updatedAt: '2026-10-06T18:40:00Z',
    isPromoted: false,
    promotionType: null,
    isFeatured: false
  },
  {
    id: 'ad-furniture-1',
    sellerId: 'seller-radup',
    seller: {
      name: 'Radu Popescu',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      accountType: 'personal',
      isVerified: true,
      rating: 5.0,
      phone: '+40 766 554 321',
      city: 'Brașov'
    },
    categoryId: 'casa-gradina',
    subcategoryId: 'mobila',
    title: 'Canapea extensibilă 3 locuri catifea verde smarald + ladă depozitare',
    titleEn: 'Extendable 3-Seater Emerald Green Velvet Sofa Bed + Storage Compartment',
    description: 'Canapea de living cumpărată acum 8 luni, tapițerie din catifea fină premium tratată hidrofob, ușor de curățat. Sistem facil de extindere cu balamale germane, saltea confortabilă cu arcuri pocket ideale pentru dormit zilnic. Ladă încăpătoare pentru pilote și perne. O vindem din cauza reamenajării spațiului. Asigur ajutor la demontare și coborâre.',
    descriptionEn: 'Living room sofa bought 8 months ago, upholstered in fine hydrophobic velvet, water and stain repellent. Easy unfolding mechanism with German hinges, comfortable pocket spring mattress ideal for daily sleeping. Generous storage chest for duvets and pillows. Selling due to room redecoration. Help provided for disassembly and loading.',
    price: 1850,
    currency: 'RON',
    isNegotiable: true,
    condition: 'good',
    contactInfo: {
      contactName: 'Radu Popescu',
      phone: '+40 766 554 321',
      email: 'radu.popescu@gmail.com',
      hidePhone: false,
      allowWhatsapp: true,
      contactPref: 'both',
      callHours: '09:00 - 20:00'
    },
    location: {
      county: 'Brașov',
      city: 'Brașov',
      area: 'Astra',
      distanceKm: 4.5
    },
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&auto=format&fit=crop&q=80'
    ],
    attributes: {
      material: 'Catifea',
      color: 'Verde Smarald',
      seats: 3,
      extendable: true
    },
    views: 310,
    favoritesCount: 19,
    status: 'active',
    createdAt: '2026-10-04T16:10:00Z',
    updatedAt: '2026-10-04T16:10:00Z',
    isPromoted: false,
    promotionType: null,
    isFeatured: false
  },
  {
    id: 'ad-job-1',
    sellerId: 'seller-shop-tech',
    seller: {
      name: 'ElectroCluj GSM & IT',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      accountType: 'business',
      isVerified: true,
      rating: 4.9,
      phone: '+40 755 987 654',
      city: 'Cluj-Napoca'
    },
    categoryId: 'locuri-de-munca',
    subcategoryId: 'full-time',
    title: 'Tehnician Service GSM & Laptopuri | Salariu 4.500 - 6.500 lei net',
    titleEn: 'Smartphone & Laptop Service Technician | Salary 4,500 - 6,500 RON Net',
    description: 'Angajăm tehnician service cu experiență în diagnoză și reparații hardware pentru telefoane smartphone (Apple, Samsung) și laptopuri. Oferim contract pe perioadă nedeterminată, mediu de lucru modern cu scule profesionale de micro-lipire, bonusuri lunare de performanță și training continuu. Căutăm o persoană serioasă, atentă la detalii și dornică de învățare.',
    descriptionEn: 'Hiring service technician with experience in diagnosis and hardware micro-repairs for smartphones (Apple, Samsung) and laptops. We offer an open-ended employment contract, modern workspace equipped with professional micro-soldering tools, monthly performance bonuses, and continuous training. Seeking a reliable, detail-oriented professional.',
    price: 5500,
    currency: 'RON',
    isNegotiable: true,
    condition: 'new',
    contactInfo: {
      contactName: 'Departament HR ElectroCluj',
      phone: '+40 755 987 654',
      email: 'recrutare@electrocluj.ro',
      hidePhone: false,
      allowWhatsapp: false,
      contactPref: 'both',
      callHours: '09:00 - 17:00'
    },
    location: {
      county: 'Cluj',
      city: 'Cluj-Napoca',
      area: 'Centru',
      distanceKm: 1.5
    },
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80'
    ],
    attributes: {
      jobType: 'Full-time',
      salaryMin: 4500,
      salaryMax: 6500,
      salaryPeriod: 'lună',
      experience: '1-3 ani',
      contractType: 'Nedeterminată'
    },
    views: 480,
    favoritesCount: 15,
    status: 'active',
    createdAt: '2026-10-06T09:30:00Z',
    updatedAt: '2026-10-06T09:30:00Z',
    isPromoted: true,
    promotionType: 'highlight',
    isFeatured: false
  },
  {
    id: 'ad-watch-1',
    sellerId: 'user-current',
    seller: {
      name: 'Mihai Dumitrescu',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      accountType: 'personal',
      isVerified: true,
      rating: 4.9,
      phone: '+40 722 849 192',
      city: 'București, Sector 1'
    },
    categoryId: 'moda',
    subcategoryId: 'ceasuri',
    title: 'Ceas Tissot PRX Powermatic 80 cadran albastru | Pachet complet',
    titleEn: 'Tissot PRX Powermatic 80 Blue Dial Watch 40mm | Full Set Box & Papers',
    description: 'Ceas automat bărbătesc Tissot PRX Powermatic 80, diametru 40 mm, cadran spectaculos albastru texturat tip waffle. Rezervă de mers 80 ore, geam safir antireflex, brățară integrată din oțel inoxidabil cu toate zalele incluse. Cumpărat din magazin autorizat din România în 2023. Stare impecabilă, purtat ocazional la evenimente.',
    descriptionEn: 'Men’s automatic Tissot PRX Powermatic 80 watch, 40mm diameter, stunning textured blue waffle dial. 80-hour power reserve, anti-reflective sapphire crystal, integrated stainless steel bracelet with all links included. Purchased from authorized Romanian dealer in 2023. Mint condition, worn only on special occasions.',
    price: 2650,
    currency: 'RON',
    isNegotiable: true,
    condition: 'like_new',
    contactInfo: {
      contactName: 'Mihai Dumitrescu',
      phone: '+40 722 849 192',
      email: 'mihai.dumitrescu@repedero.ro',
      hidePhone: false,
      allowWhatsapp: true,
      contactPref: 'both',
      callHours: '10:00 - 21:00'
    },
    location: {
      county: 'București',
      city: 'Sector 1',
      area: 'Dorobanți',
      distanceKm: 1.1
    },
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80'
    ],
    attributes: {
      brand: 'Tissot',
      model: 'PRX Powermatic 80',
      diameter: '40mm',
      movement: 'Automatic'
    },
    views: 670,
    favoritesCount: 42,
    status: 'active',
    createdAt: '2026-10-05T15:20:00Z',
    updatedAt: '2026-10-05T15:20:00Z',
    isPromoted: false,
    promotionType: null,
    isFeatured: false
  },
  {
    id: 'ad-bike-1',
    sellerId: 'seller-radup',
    seller: {
      name: 'Radu Popescu',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      accountType: 'personal',
      isVerified: true,
      rating: 5.0,
      phone: '+40 766 554 321',
      city: 'Brașov'
    },
    categoryId: 'vehicule',
    subcategoryId: 'biciclete',
    title: 'Bicicletă Mountain Bike Scott Scale 965 29" M | Furcă RockShox | Deore 12v',
    titleEn: 'Scott Scale 965 29" Mountain Bike Size M | RockShox Fork | Deore 12s',
    description: 'MTB Scott Scale 965 cadru aluminiu 6061 Custom Butted mărimea M. Roți 29 inch pe jante Syncros, furcă pe aer RockShox Judy Silver TK cu blocaj pe ghidon PopLoc. Transmisie Shimano Deore 1x12 viteze, frâne hidraulice pe disc Shimano MT200. Bicicleta a fost întreținută exemplar, revizie făcută la începutul toamnei. Cauciucuri Maxxis Rekon Race în stare foarte bună.',
    descriptionEn: 'Scott Scale 965 MTB with 6061 Custom Butted aluminum frame size M. 29-inch wheels on Syncros rims, RockShox Judy Silver TK air suspension fork with handlebar PopLoc lockout. Shimano Deore 1x12 speed groupset, Shimano MT200 hydraulic disc brakes. Maintained meticulously with full autumn tune-up. Maxxis Rekon Race tires in great condition.',
    price: 3600,
    currency: 'RON',
    isNegotiable: true,
    condition: 'good',
    contactInfo: {
      contactName: 'Radu Popescu',
      phone: '+40 766 554 321',
      email: 'radu.popescu@gmail.com',
      hidePhone: false,
      allowWhatsapp: true,
      contactPref: 'both',
      callHours: '09:00 - 20:00'
    },
    location: {
      county: 'Brașov',
      city: 'Brașov',
      area: 'Centrul Vechi',
      distanceKm: 2.8
    },
    images: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800&auto=format&fit=crop&q=80'
    ],
    attributes: {
      brand: 'Scott',
      wheelSize: '29"',
      frameSize: 'M',
      brakes: 'Discuri hidraulice'
    },
    views: 430,
    favoritesCount: 22,
    status: 'active',
    createdAt: '2026-10-06T12:00:00Z',
    updatedAt: '2026-10-06T12:00:00Z',
    isPromoted: false,
    promotionType: null,
    isFeatured: false
  }
];

export const MOCK_CHATS: ChatConversation[] = [
  {
    id: 'chat-1',
    listingId: 'ad-phone-1',
    listing: {
      title: 'iPhone 15 Pro 256GB Natural Titanium',
      price: 4899,
      currency: 'RON',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300&auto=format&fit=crop&q=80',
      city: 'Cluj-Napoca',
      status: 'active'
    },
    buyerId: 'user-current',
    sellerId: 'seller-shop-tech',
    otherUser: {
      id: 'seller-shop-tech',
      name: 'ElectroCluj GSM & IT',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      isOnline: true,
      isVerified: true
    },
    lastMessage: 'Bună ziua! Da, este disponibil în stoc la magazinul din Cluj.',
    lastMessageDate: '10:42',
    unreadCount: 1,
    messages: [
      {
        id: 'msg-1',
        senderId: 'user-current',
        text: 'Bună ziua! Mai este disponibil produsul?',
        createdAt: '10:39',
        isRead: true
      },
      {
        id: 'msg-2',
        senderId: 'seller-shop-tech',
        text: 'Bună ziua! Da, este disponibil în stoc la magazinul din Cluj. Oferim factură pe loc și verificare.',
        createdAt: '10:42',
        isRead: false
      }
    ]
  },
  {
    id: 'chat-2',
    listingId: 'ad-car-1',
    listing: {
      title: 'BMW Seria 3 320d M-Sport xDrive 2021',
      price: 139500,
      currency: 'RON',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=300&auto=format&fit=crop&q=80',
      city: 'București, Sector 3',
      status: 'active'
    },
    buyerId: 'user-current',
    sellerId: 'seller-shop-auto',
    otherUser: {
      id: 'seller-shop-auto',
      name: 'Auto Mihai SRL',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
      isOnline: false,
      isVerified: true
    },
    lastMessage: 'Vă așteptăm cu drag pentru un test drive oricând de luni până sâmbătă.',
    lastMessageDate: 'Ieri',
    unreadCount: 0,
    messages: [
      {
        id: 'msg-2-1',
        senderId: 'user-current',
        text: 'Salut! Mașina are istoric complet în baza de date BMW?',
        createdAt: 'Ieri 16:20',
        isRead: true
      },
      {
        id: 'msg-2-2',
        senderId: 'seller-shop-auto',
        text: 'Salut! Da, absolut, toate reviziile sunt înregistrate în cheie și se pot verifica online sau la orice reprezentanță.',
        createdAt: 'Ieri 16:35',
        isRead: true
      },
      {
        id: 'msg-2-3',
        senderId: 'seller-shop-auto',
        text: 'Vă așteptăm cu drag pentru un test drive oricând de luni până sâmbătă.',
        createdAt: 'Ieri 16:36',
        isRead: true
      }
    ]
  }
];

export const MOCK_REVIEWS: SellerReview[] = [
  {
    id: 'rev-1',
    authorName: 'Alexandru N.',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'Tranzacție excelentă! Produsul exact cum a fost descris în anunț, comunicare impecabilă și expediere rapidă. Recomand cu încredere!',
    date: 'Acum 3 zile',
    listingTitle: 'BMW Seria 3 320d'
  },
  {
    id: 'rev-2',
    authorName: 'Cristina Munteanu',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'Super serios și punctual. Am cumpărat cu verificare colet, totul a decurs fără nicio problemă.',
    date: 'Acum o săptămână',
    listingTitle: 'iPhone 15 Pro 256GB'
  },
  {
    id: 'rev-3',
    authorName: 'Bogdan Iancu',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    rating: 4,
    comment: 'Vânzător de nota 10, a răspuns imediat la toate întrebările tehnice. Foarte mulțumit de achiziție.',
    date: 'Acum 2 săptămâni',
    listingTitle: 'MacBook Pro 16'
  }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'message',
    title: 'Mesaj nou primit',
    body: 'ElectroCluj GSM & IT ți-a trimis un mesaj pentru "iPhone 15 Pro 256GB Natural Titanium".',
    date: 'Acum 10 minute',
    isRead: false,
    listingId: 'ad-phone-1'
  },
  {
    id: 'notif-2',
    type: 'price_drop',
    title: 'Scădere de preț!',
    body: 'Anunțul tău favorit "MacBook Pro 16 M3 Max" a scăzut cu 500 lei.',
    date: 'Ieri',
    isRead: false,
    listingId: 'ad-laptop-1'
  },
  {
    id: 'notif-3',
    type: 'ad_approved',
    title: 'Anunț aprobat și activ',
    body: 'Anunțul "Ceas Tissot PRX Powermatic 80" a fost verificat de echipa noastră și este acum live pe Repedero.',
    date: 'Acum 2 zile',
    isRead: true,
    listingId: 'ad-watch-1'
  },
  {
    id: 'notif-4',
    type: 'saved_search',
    title: '3 anunțuri noi pentru căutarea salvată',
    body: 'Au apărut anunțuri noi care se potrivesc cu "BMW Seria 3 București".',
    date: 'Acum 3 zile',
    isRead: true,
    listingId: 'ad-car-1'
  }
];

export const MOCK_REPORTS: ReportItem[] = [
  {
    id: 'rep-1',
    listingId: 'ad-suspect-1',
    listingTitle: 'Audi A6 2023 - 5.000 EUR (Preț nerealist)',
    reporterId: 'user-102',
    reporterName: 'George Stan',
    reason: 'Preț suspect / Posibilă tentativă de fraudă',
    details: 'Vânzătorul cere avans prin transfer bancar înainte de vizionare.',
    date: '2026-10-07 09:12',
    status: 'pending'
  }
];
