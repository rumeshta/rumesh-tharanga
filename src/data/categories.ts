import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'vehicule',
    slug: 'vehicule',
    nameRo: 'Vehicule',
    nameEn: 'Vehicles',
    icon: 'Car',
    color: 'from-blue-600 to-indigo-700',
    itemCount: 4280,
    subcategories: [
      { id: 'autoturisme', slug: 'autoturisme', nameRo: 'Autoturisme', nameEn: 'Cars', itemCount: 2840 },
      { id: 'motociclete', slug: 'motociclete', nameRo: 'Motociclete', nameEn: 'Motorcycles', itemCount: 320 },
      { id: 'scutere', slug: 'scutere', nameRo: 'Scutere', nameEn: 'Scooters', itemCount: 140 },
      { id: 'biciclete', slug: 'biciclete', nameRo: 'Biciclete', nameEn: 'Bicycles', itemCount: 290 },
      { id: 'autoutilitare', slug: 'autoutilitare', nameRo: 'Autoutilitare', nameEn: 'Vans & Commercial', itemCount: 195 },
      { id: 'camioane', slug: 'camioane', nameRo: 'Camioane', nameEn: 'Trucks', itemCount: 85 },
      { id: 'piese-auto', slug: 'piese-auto', nameRo: 'Piese auto', nameEn: 'Auto Parts', itemCount: 310 },
      { id: 'anvelope-jante', slug: 'anvelope-jante', nameRo: 'Anvelope și jante', nameEn: 'Tires & Rims', itemCount: 100 }
    ]
  },
  {
    id: 'imobiliare',
    slug: 'imobiliare',
    nameRo: 'Imobiliare',
    nameEn: 'Property',
    icon: 'Building2',
    color: 'from-emerald-600 to-teal-700',
    itemCount: 3150,
    subcategories: [
      { id: 'ap-vanzare', slug: 'ap-vanzare', nameRo: 'Apartamente de vânzare', nameEn: 'Apartments for Sale', itemCount: 1420 },
      { id: 'ap-inchiriere', slug: 'ap-inchiriere', nameRo: 'Apartamente de închiriat', nameEn: 'Apartments for Rent', itemCount: 890 },
      { id: 'case-vanzare', slug: 'case-vanzare', nameRo: 'Case de vânzare', nameEn: 'Houses for Sale', itemCount: 510 },
      { id: 'case-inchiriere', slug: 'case-inchiriere', nameRo: 'Case de închiriat', nameEn: 'Houses for Rent', itemCount: 120 },
      { id: 'terenuri', slug: 'terenuri', nameRo: 'Terenuri', nameEn: 'Land', itemCount: 140 },
      { id: 'spatii-comerciale', slug: 'spatii-comerciale', nameRo: 'Spații comerciale', nameEn: 'Commercial Space', itemCount: 70 }
    ]
  },
  {
    id: 'telefoane',
    slug: 'telefoane',
    nameRo: 'Telefoane și Tablete',
    nameEn: 'Phones & Tablets',
    icon: 'Smartphone',
    color: 'from-violet-600 to-purple-700',
    itemCount: 2980,
    subcategories: [
      { id: 'iphone', slug: 'iphone', nameRo: 'iPhone', nameEn: 'iPhone', itemCount: 1450 },
      { id: 'samsung', slug: 'samsung', nameRo: 'Samsung', nameEn: 'Samsung', itemCount: 820 },
      { id: 'xiaomi', slug: 'xiaomi', nameRo: 'Xiaomi', nameEn: 'Xiaomi', itemCount: 280 },
      { id: 'google-pixel', slug: 'google-pixel', nameRo: 'Google Pixel', nameEn: 'Google Pixel', itemCount: 110 },
      { id: 'tablete', slug: 'tablete', nameRo: 'Tablete', nameEn: 'Tablets', itemCount: 190 },
      { id: 'accesorii-gsm', slug: 'accesorii-gsm', nameRo: 'Accesorii & Piese', nameEn: 'Accessories & Parts', itemCount: 130 }
    ]
  },
  {
    id: 'electronice',
    slug: 'electronice',
    nameRo: 'Electronice & IT',
    nameEn: 'Electronics & IT',
    icon: 'Laptop',
    color: 'from-cyan-600 to-blue-700',
    itemCount: 2640,
    subcategories: [
      { id: 'laptopuri', slug: 'laptopuri', nameRo: 'Laptopuri', nameEn: 'Laptops', itemCount: 920 },
      { id: 'calculatoare', slug: 'calculatoare', nameRo: 'Calculatoare & Gaming', nameEn: 'Desktop & Gaming PCs', itemCount: 430 },
      { id: 'monitoare', slug: 'monitoare', nameRo: 'Monitoare', nameEn: 'Monitors', itemCount: 210 },
      { id: 'televizoare', slug: 'televizoare', nameRo: 'Televizoare', nameEn: 'TVs', itemCount: 340 },
      { id: 'console-jocuri', slug: 'console-jocuri', nameRo: 'Console & Jocuri', nameEn: 'Consoles & Games', itemCount: 360 },
      { id: 'audio-hifi', slug: 'audio-hifi', nameRo: 'Audio & Căști', nameEn: 'Audio & Headphones', itemCount: 240 },
      { id: 'electrocasnice', slug: 'electrocasnice', nameRo: 'Electrocasnice', nameEn: 'Appliances', itemCount: 140 }
    ]
  },
  {
    id: 'casa-gradina',
    slug: 'casa-gradina',
    nameRo: 'Casă și Grădină',
    nameEn: 'Home & Garden',
    icon: 'Armchair',
    color: 'from-amber-600 to-orange-700',
    itemCount: 1850,
    subcategories: [
      { id: 'mobila', slug: 'mobila', nameRo: 'Mobilă & Canapele', nameEn: 'Furniture & Sofas', itemCount: 780 },
      { id: 'dormitoare', slug: 'dormitoare', nameRo: 'Dormitoare & Paturi', nameEn: 'Bedrooms & Beds', itemCount: 320 },
      { id: 'bucatarii', slug: 'bucatarii', nameRo: 'Bucătării & Mese', nameEn: 'Kitchens & Dining', itemCount: 290 },
      { id: 'gradina', slug: 'gradina', nameRo: 'Grădină & Plante', nameEn: 'Garden & Plants', itemCount: 180 },
      { id: 'unelte', slug: 'unelte', nameRo: 'Unelte & Bricolaj', nameEn: 'Tools & DIY', itemCount: 280 }
    ]
  },
  {
    id: 'moda',
    slug: 'moda',
    nameRo: 'Modă și Accesorii',
    nameEn: 'Fashion & Accessories',
    icon: 'Watch',
    color: 'from-pink-600 to-rose-700',
    itemCount: 2210,
    subcategories: [
      { id: 'haine-femei', slug: 'haine-femei', nameRo: 'Haine femei', nameEn: 'Women Clothing', itemCount: 860 },
      { id: 'haine-barbati', slug: 'haine-barbati', nameRo: 'Haine bărbați', nameEn: 'Men Clothing', itemCount: 540 },
      { id: 'incaltaminte', slug: 'incaltaminte', nameRo: 'Încălțăminte', nameEn: 'Footwear', itemCount: 410 },
      { id: 'ceasuri', slug: 'ceasuri', nameRo: 'Ceasuri', nameEn: 'Watches', itemCount: 230 },
      { id: 'genti-bijuterii', slug: 'genti-bijuterii', nameRo: 'Genți și Bijuterii', nameEn: 'Bags & Jewelry', itemCount: 170 }
    ]
  },
  {
    id: 'locuri-de-munca',
    slug: 'locuri-de-munca',
    nameRo: 'Locuri de Muncă',
    nameEn: 'Jobs',
    icon: 'Briefcase',
    color: 'from-indigo-600 to-sky-700',
    itemCount: 1420,
    subcategories: [
      { id: 'full-time', slug: 'full-time', nameRo: 'Full-time', nameEn: 'Full-time', itemCount: 810 },
      { id: 'part-time', slug: 'part-time', nameRo: 'Part-time', nameEn: 'Part-time', itemCount: 230 },
      { id: 'remote-work', slug: 'remote-work', nameRo: 'Remote / Munca de acasă', nameEn: 'Remote Work', itemCount: 210 },
      { id: 'soferi-curieri', slug: 'soferi-curieri', nameRo: 'Șoferi & Curieri', nameEn: 'Drivers & Delivery', itemCount: 120 },
      { id: 'it-software', slug: 'it-software', nameRo: 'IT & Software', nameEn: 'IT & Software', itemCount: 50 }
    ]
  },
  {
    id: 'servicii',
    slug: 'servicii',
    nameRo: 'Servicii',
    nameEn: 'Services',
    icon: 'Wrench',
    color: 'from-amber-700 to-yellow-600',
    itemCount: 970,
    subcategories: [
      { id: 'reparatii-constructii', slug: 'reparatii-constructii', nameRo: 'Meseriași & Construcții', nameEn: 'Craftsmen & Renovation', itemCount: 420 },
      { id: 'curatenie', slug: 'curatenie', nameRo: 'Curățenie', nameEn: 'Cleaning Services', itemCount: 180 },
      { id: 'transport-mutari', slug: 'transport-mutari', nameRo: 'Transport & Mutări', nameEn: 'Transport & Moving', itemCount: 160 },
      { id: 'meditatii-cursuri', slug: 'meditatii-cursuri', nameRo: 'Meditații & Cursuri', nameEn: 'Tutoring & Classes', itemCount: 110 },
      { id: 'auto-service', slug: 'auto-service', nameRo: 'Servicii Auto', nameEn: 'Car Services', itemCount: 100 }
    ]
  },
  {
    id: 'copii-bebelusi',
    slug: 'copii-bebelusi',
    nameRo: 'Copii și Bebeluși',
    nameEn: 'Kids & Baby',
    icon: 'Baby',
    color: 'from-teal-600 to-emerald-600',
    itemCount: 890,
    subcategories: [
      { id: 'carucioare', slug: 'carucioare', nameRo: 'Cărucioare & Scaune auto', nameEn: 'Strollers & Car Seats', itemCount: 360 },
      { id: 'haine-copii', slug: 'haine-copii', nameRo: 'Haine copii', nameEn: 'Kids Clothing', itemCount: 310 },
      { id: 'jucarii', slug: 'jucarii', nameRo: 'Jucării', nameEn: 'Toys', itemCount: 220 }
    ]
  },
  {
    id: 'sport-hobby',
    slug: 'sport-hobby',
    nameRo: 'Sport și Hobby',
    nameEn: 'Sports & Hobby',
    icon: 'Trophy',
    color: 'from-green-600 to-emerald-700',
    itemCount: 760,
    subcategories: [
      { id: 'fitness-sport', slug: 'fitness-sport', nameRo: 'Fitness & Gimnastică', nameEn: 'Fitness & Gym', itemCount: 310 },
      { id: 'pescuit-camping', slug: 'pescuit-camping', nameRo: 'Pescuit & Camping', nameEn: 'Fishing & Camping', itemCount: 240 },
      { id: 'muzica-instrumente', slug: 'muzica-instrumente', nameRo: 'Instrumente Muzicale', nameEn: 'Musical Instruments', itemCount: 120 },
      { id: 'colectii-arta', slug: 'colectii-arta', nameRo: 'Colecții & Artă', nameEn: 'Collectibles & Art', itemCount: 90 }
    ]
  },
  {
    id: 'animale',
    slug: 'animale',
    nameRo: 'Animale de Companie',
    nameEn: 'Pets',
    icon: 'Heart',
    color: 'from-rose-600 to-pink-700',
    itemCount: 520,
    subcategories: [
      { id: 'caini', slug: 'caini', nameRo: 'Câini', nameEn: 'Dogs', itemCount: 210 },
      { id: 'pisici', slug: 'pisici', nameRo: 'Pisici', nameEn: 'Cats', itemCount: 160 },
      { id: 'accesorii-animale', slug: 'accesorii-animale', nameRo: 'Accesorii & Hrană', nameEn: 'Pet Accessories & Food', itemCount: 150 }
    ]
  },
  {
    id: 'afaceri-industrie',
    slug: 'afaceri-industrie',
    nameRo: 'Afaceri și Industrie',
    nameEn: 'Business & Industry',
    icon: 'Factory',
    color: 'from-slate-700 to-gray-800',
    itemCount: 430,
    subcategories: [
      { id: 'echipamente-horeca', slug: 'echipamente-horeca', nameRo: 'Echipamente HoReCa', nameEn: 'Restaurant Equipment', itemCount: 190 },
      { id: 'utilaje-agricole', slug: 'utilaje-agricole', nameRo: 'Utilaje Agricole', nameEn: 'Agricultural Equipment', itemCount: 150 },
      { id: 'echipamente-birou', slug: 'echipamente-birou', nameRo: 'Echipamente Birou', nameEn: 'Office Equipment', itemCount: 90 }
    ]
  }
];
