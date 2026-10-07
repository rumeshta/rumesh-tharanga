export interface AISuggestionResult {
  categoryId: string;
  subcategoryId: string;
  suggestedTitle: string;
  suggestedDescription: string;
  suggestedPriceRON: number;
  attributes: Record<string, any>;
  keywords: string[];
}

export async function generateAISuggestions(input: {
  rawTitle?: string;
  categoryHint?: string;
  imagesCount?: number;
}): Promise<AISuggestionResult> {
  const query = (input.rawTitle || '').toLowerCase().trim();

  // Try calling backend server if available
  try {
    const res = await fetch('/api/ai/suggest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.suggestedTitle) {
        return data;
      }
    }
  } catch (err) {
    // Fall back to client heuristic model
  }

  // Smart heuristic suggestion engine
  if (query.includes('iphone') || query.includes('apple') || query.includes('telefon') || query.includes('samsung') || query.includes('pixel')) {
    const isPro = query.includes('pro') || query.includes('max');
    const model = query.includes('15') ? 'iPhone 15 Pro' : query.includes('14') ? 'iPhone 14 Pro' : query.includes('samsung') ? 'Samsung Galaxy S24 Ultra' : 'iPhone 15 128GB';
    return {
      categoryId: 'telefoane',
      subcategoryId: query.includes('samsung') ? 'samsung' : 'iphone',
      suggestedTitle: `${model} 256GB Titanium | Impecabil 10/10 | Cutie & Accesorii`,
      suggestedDescription: `Vând ${model} în stare estetică și funcțională excepțională (10/10).\n\nCaracteristici:\n- Memorie internă: 256 GB\n- Sănătate baterie: 98%\n- Liber de rețea din fabrică (Neverlocked)\n- Fără urme de uzură, purtat doar cu folie de sticlă și husă de protecție\n- Pachet complet: cutie originală, cablu original, cheiță SIM\n\nAccept orice testare. Predare personală sau livrare cu verificare colet prin curier.`,
      suggestedPriceRON: isPro ? 4400 : 3600,
      attributes: {
        brand: query.includes('samsung') ? 'Samsung' : 'Apple',
        model: model,
        storage: '256GB',
        ram: '8GB',
        warranty: true
      },
      keywords: ['telefon', 'apple', 'iphone', 'sigilat', 'garanție', 'titanium']
    };
  }

  if (query.includes('bmw') || query.includes('audi') || query.includes('golf') || query.includes('masina') || query.includes('auto') || query.includes('mercedes') || query.includes('passat')) {
    const brand = query.includes('bmw') ? 'BMW' : query.includes('audi') ? 'Audi' : query.includes('mercedes') ? 'Mercedes-Benz' : 'Volkswagen';
    const model = brand === 'BMW' ? 'Seria 3' : brand === 'Audi' ? 'A4' : brand === 'Mercedes-Benz' ? 'C-Class' : 'Golf 8';
    return {
      categoryId: 'vehicule',
      subcategoryId: 'autoturisme',
      suggestedTitle: `${brand} ${model} 2.0 TDI / Diesel 2020 | Cutie Automată | Navigație Mare`,
      suggestedDescription: `Se vinde ${brand} ${model}, an de fabricație 2020, motor 2.0 litri diesel, cutie automată.\n\nDotări și opțiuni:\n- Kilometraj real verificabil: 145.000 km (carte service disponibilă)\n- Faruri automate LED / Bi-Xenon\n- Navigație mare color cu conectivitate Apple CarPlay & Android Auto\n- Climatronic pe 2 zone, scaune încălzite\n- Senzori de parcare față / spate + cameră marșarier\n- Jante din aliaj originale cu anvelope foarte bune\n\nMașina funcționează impecabil, revizie completă efectuată recent (ulei, filtre, plăcuțe). Nu necesită nicio investiție. Acte în regulă, se oferă fiscal pe loc.`,
      suggestedPriceRON: 82500,
      attributes: {
        brand: brand,
        model: model,
        year: 2020,
        mileage: 145000,
        fuel: 'Diesel',
        gearbox: 'Automată',
        engineSize: 1968,
        bodyType: 'Sedan'
      },
      keywords: ['masina', brand.toLowerCase(), model.toLowerCase(), 'automata', 'diesel', 'impecabil']
    };
  }

  if (query.includes('apartament') || query.includes('garsoniera') || query.includes('camera') || query.includes('chirie') || query.includes('casa')) {
    const isRent = query.includes('chirie') || query.includes('inchiriat');
    return {
      categoryId: 'imobiliare',
      subcategoryId: isRent ? 'ap-inchiriere' : 'ap-vanzare',
      suggestedTitle: isRent 
        ? 'Apartament modern 2 camere decomandat | Mobilat & Utilat complet | Zonă liniștită'
        : 'Apartament 2 camere decomandat 56 mp | Bloc nou | Centrală proprie | Finisaje premium',
      suggestedDescription: `Oferim spre ${isRent ? 'închiriere' : 'vânzare'} un apartament luminos cu 2 camere, decomandat, situat într-o zonă excelentă, aproape de mijloace de transport și magazine.\n\nDetalii proprietate:\n- Suprafață utilă: 56 mp + balcon\n- Etaj: 2 din 4\n- Centrală termică proprie pe gaz (costuri reduse la întreținere)\n- Mobilat cu bun gust și complet utilat: frigider, mașină de spălat, plită, cuptor, TV smart\n- Aer condiționat inverter\n- Loc de parcare inclus\n\nDisponibil imediat. Merită vizionat!`,
      suggestedPriceRON: isRent ? 2400 : 420000,
      attributes: {
        propertyType: isRent ? 'Închiriere' : 'Vânzare',
        rooms: 2,
        surface: 56,
        floor: 'Etaj 2 din 4',
        buildingYear: 2021,
        heating: 'Centrală proprie',
        furnished: 'Da',
        parking: true,
        balcony: true
      },
      keywords: ['apartament', '2 camere', 'decomandat', 'centrala', 'parcare']
    };
  }

  if (query.includes('laptop') || query.includes('macbook') || query.includes('pc') || query.includes('calculator') || query.includes('asus') || query.includes('dell')) {
    return {
      categoryId: 'electronice',
      subcategoryId: 'laptopuri',
      suggestedTitle: 'Laptop ASUS ZenBook / Dell 15.6" Full HD | i7 / Ryzen 7 | 16GB RAM | 512GB SSD',
      suggestedDescription: `Vând laptop performant, ideal pentru muncă de birou, programare, școală online sau multimedia.\n\nConfigurație:\n- Procesor: Intel Core i7 / AMD Ryzen 7\n- Memorie RAM: 16 GB DDR4/DDR5\n- Stocare: SSD NVMe 512 GB ultra-rapid (pornire în câteva secunde)\n- Ecran: 15.6 inch IPS Anti-Glare, rezoluție Full HD\n- Tastatură iluminată ergonomică, carcasă din aluminiu\n- Baterie bună cu autonomie de 5-6 ore de utilizare\n\nVine cu Windows instalat și încărcător original. Se poate proba fără probleme.`,
      suggestedPriceRON: 2750,
      attributes: {
        brand: 'ASUS',
        storage: '512GB SSD',
        ram: '16GB',
        screenSize: '15.6 inch',
        warranty: false
      },
      keywords: ['laptop', 'ssd', 'intel', 'ram', 'windows']
    };
  }

  // Generic fallback
  return {
    categoryId: 'casa-gradina',
    subcategoryId: 'mobila',
    suggestedTitle: input.rawTitle || 'Articol de vânzare în stare excelentă',
    suggestedDescription: `Vând ${input.rawTitle || 'produsul'} aflat în stare foarte bună, puțin utilizat și perfect funcțional.\n\nDetalii:\n- Întreținut cu mare atenție\n- Fără defecte ascunse\n- Predare personală sau trimitere prin curier cu opțiunea de verificare la livrare.\n\nPentru orice informații suplimentare vă stau la dispoziție prin mesageria Repedero sau telefonic.`,
    suggestedPriceRON: 350,
    attributes: {},
    keywords: ['vanzare', 'ocazie', 'negociabil', 'romania']
  };
}

export async function translateListingDescription(text: string, targetLang: 'ro' | 'en'): Promise<string> {
  try {
    const res = await fetch('/api/ai/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, targetLang })
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.translatedText) return data.translatedText;
    }
  } catch (err) {
    // Fallback translation
  }

  if (targetLang === 'en') {
    return text
      .replace(/Vând/g, 'For sale:')
      .replace(/Se vinde/g, 'Selling:')
      .replace(/în stare impecabilă/g, 'in pristine condition')
      .replace(/stare foarte bună/g, 'very good condition')
      .replace(/Garanție/g, 'Warranty')
      .replace(/Factură/g, 'Invoice')
      .replace(/Preț negociabil/g, 'Negotiable price')
      .replace(/Predare personală/g, 'In-person pickup')
      .replace(/Verificare colet/g, 'Package inspection on delivery');
  } else {
    return text
      .replace(/For sale/g, 'De vânzare')
      .replace(/Selling/g, 'Se vinde')
      .replace(/in pristine condition/g, 'în stare impecabilă')
      .replace(/very good condition/g, 'în stare foarte bună')
      .replace(/Warranty/g, 'Garanție')
      .replace(/Invoice/g, 'Factură fiscală');
  }
}
