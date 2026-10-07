export interface RomanianCounty {
  code: string;
  name: string;
  cities: string[];
}

export const ROMANIAN_COUNTIES: RomanianCounty[] = [
  {
    code: 'B',
    name: 'București',
    cities: [
      'Toate sectoarele',
      'Sector 1',
      'Sector 2',
      'Sector 3',
      'Sector 4',
      'Sector 5',
      'Sector 6'
    ]
  },
  {
    code: 'CJ',
    name: 'Cluj',
    cities: ['Cluj-Napoca', 'Turda', 'Dej', 'Câmpia Turzii', 'Gherla', 'Huedin', 'Florești']
  },
  {
    code: 'TM',
    name: 'Timiș',
    cities: ['Timișoara', 'Lugoj', 'Sânnicolau Mare', 'Jimbolia', 'Recaș', 'Giroc', 'Dumbrăvița']
  },
  {
    code: 'IS',
    name: 'Iași',
    cities: ['Iași', 'Pașcani', 'Hârlău', 'Târgu Frumos', 'Podu Iloaiei', 'Miroslava', 'Ciurea']
  },
  {
    code: 'CT',
    name: 'Constanța',
    cities: ['Constanța', 'Medgidia', 'Mangalia', 'Năvodari', 'Cernavodă', 'Ovidiu', 'Mamaia']
  },
  {
    code: 'BV',
    name: 'Brașov',
    cities: ['Brașov', 'Săcele', 'Făgăraș', 'Zărnești', 'Codlea', 'Râșnov', 'Predeal', 'Ghimbav']
  },
  {
    code: 'SB',
    name: 'Sibiu',
    cities: ['Sibiu', 'Mediaș', 'Cisnădie', 'Avrig', 'Agnita', 'Șelimbăr']
  },
  {
    code: 'BH',
    name: 'Bihor',
    cities: ['Oradea', 'Salonta', 'Marghita', 'Beiuș', 'Aleșd', 'Sânmartin']
  },
  {
    code: 'DJ',
    name: 'Dolj',
    cities: ['Craiova', 'Băilești', 'Calafat', 'Filiași', 'Dăbuleni']
  },
  {
    code: 'PH',
    name: 'Prahova',
    cities: ['Ploiești', 'Câmpina', 'Băicoi', 'Breaza', 'Mizil', 'Sinaia', 'Bușteni']
  },
  {
    code: 'GL',
    name: 'Galați',
    cities: ['Galați', 'Tecuci', 'Târgu Bujor', 'Berești']
  },
  {
    code: 'AR',
    name: 'Arad',
    cities: ['Arad', 'Ineu', 'Lipova', 'Pâncota', 'Curtici']
  },
  {
    code: 'AG',
    name: 'Argeș',
    cities: ['Pitești', 'Mioveni', 'Câmpulung', 'Curtea de Argeș', 'Costești']
  },
  {
    code: 'BC',
    name: 'Bacău',
    cities: ['Bacău', 'Onești', 'Moinești', 'Comănești', 'Buhuși']
  },
  {
    code: 'MS',
    name: 'Mureș',
    cities: ['Târgu Mureș', 'Reghin', 'Sighișoara', 'Târnăveni', 'Luduș']
  },
  {
    code: 'SV',
    name: 'Suceava',
    cities: ['Suceava', 'Fălticeni', 'Rădăuți', 'Câmpulung Moldovenesc', 'Vatra Dornei']
  },
  {
    code: 'DB',
    name: 'Dâmbovița',
    cities: ['Târgoviște', 'Moreni', 'Pucioasa', 'Găești', 'Titu']
  },
  {
    code: 'IF',
    name: 'Ilfov',
    cities: ['Otopeni', 'Voluntari', 'Pantelimon', 'Popești-Leordeni', 'Chitila', 'Bragadiru', 'Buftea', 'Snagov']
  }
];

export const POPULAR_LOCATIONS = [
  { county: 'București', city: 'Toate sectoarele', label: 'București (Toate)' },
  { county: 'București', city: 'Sector 1', label: 'București - Sector 1' },
  { county: 'București', city: 'Sector 2', label: 'București - Sector 2' },
  { county: 'București', city: 'Sector 3', label: 'București - Sector 3' },
  { county: 'Cluj', city: 'Cluj-Napoca', label: 'Cluj-Napoca' },
  { county: 'Timiș', city: 'Timișoara', label: 'Timișoara' },
  { county: 'Iași', city: 'Iași', label: 'Iași' },
  { county: 'Brașov', city: 'Brașov', label: 'Brașov' },
  { county: 'Constanța', city: 'Constanța', label: 'Constanța' },
  { county: 'Sibiu', city: 'Sibiu', label: 'Sibiu' },
  { county: 'Bihor', city: 'Oradea', label: 'Oradea' },
  { county: 'Prahova', city: 'Ploiești', label: 'Ploiești' },
  { county: 'Dolj', city: 'Craiova', label: 'Craiova' },
];
