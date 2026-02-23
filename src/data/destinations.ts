export type DestinationId = 
  | 'grcka' 
  | 'crna-gora'
  | 'turska' 
  | 'egipat' 
  | 'tunis'
  | 'bugarska'
  | 'hrvatska'
  | 'albanija'
  | 'kipar'
  | 'italija'
  | 'spanija' 
  | 'austrija'
  | 'madjarska'
  | 'bosna'
  | 'ceska'
  | 'nemacka'
  | 'slovenija'
  | 'francuska'
  | 'uae'
  | 'gruzija';

export type TravelStyle = 'budget' | 'midrange' | 'comfort';

export interface DestinationCosts {
  flight: { budget: number; midrange: number; comfort: number };
  accommodation: { budget: number; midrange: number; comfort: number };
  food: { budget: number; midrange: number; comfort: number };
  transport: { budget: number; midrange: number; comfort: number };
  sim: number;
  insurance: number;
  isEU: boolean;
  insZone: number; // 1=Balkans/SEE, 2=Europe, 3=World
}

export interface Destination {
  id: DestinationId;
  name: string;
  costs: DestinationCosts;
  miskoTip: string;
  comparisonUrl: string;
}

// Exchange rate: 1 EUR = 117 RSD
// Flight budget = off-peak LCC per person, midrange = mid-season average, comfort = midrange × 1.8
// Accommodation: per room per night
// Insurance zone: 1=Balkans/SEE, 2=Europe, 3=World
// Data sources: Expedia, Google Flights, Kayak, Momondo, BudgetYourTrip, Booking.com,
// Grawe.rs, Wiener.co.rs, Sava-osiguranje.rs, Generali.rs, Uniqa.rs (Feb 2026)

export const destinations: Record<DestinationId, Destination> = {
  'grcka': {
    id: 'grcka',
    name: 'Grčka',
    costs: {
      flight: { budget: 15210, midrange: 24570, comfort: 44226 },
      accommodation: { budget: 5265, midrange: 11700, comfort: 32760 },
      food: { budget: 2500, midrange: 4500, comfort: 8000 },
      transport: { budget: 800, midrange: 1500, comfort: 3000 },
      sim: 0,
      insurance: 350,
      isEU: true,
      insZone: 1,
    },
    miskoTip: 'U Grčkoj, poseta lekaru bez osiguranja može koštati €80-300. Sa osiguranjem: 0 din.',
    comparisonUrl: 'https://policymarket.rs/putno-osiguranje?destination=grcka',
  },
  'crna-gora': {
    id: 'crna-gora',
    name: 'Crna Gora',
    costs: {
      flight: { budget: 14040, midrange: 21060, comfort: 37908 },
      accommodation: { budget: 3510, midrange: 8190, comfort: 23400 },
      food: { budget: 2000, midrange: 3500, comfort: 6500 },
      transport: { budget: 500, midrange: 1000, comfort: 2000 },
      sim: 0,
      insurance: 300,
      isEU: false,
      insZone: 1,
    },
    miskoTip: 'Crna Gora je blizu, ali bolnički troškovi mogu biti iznenađujuće visoki.',
    comparisonUrl: 'https://policymarket.rs/putno-osiguranje?destination=crna-gora',
  },
  'turska': {
    id: 'turska',
    name: 'Turska',
    costs: {
      flight: { budget: 20475, midrange: 29835, comfort: 53703 },
      accommodation: { budget: 4095, midrange: 8775, comfort: 23400 },
      food: { budget: 2000, midrange: 3500, comfort: 6500 },
      transport: { budget: 600, midrange: 1200, comfort: 2500 },
      sim: 1500,
      insurance: 400,
      isEU: false,
      insZone: 2,
    },
    miskoTip: 'U Turskoj, bolnički dan može koštati i do €500. Putno osiguranje pokriva medicinske troškove.',
    comparisonUrl: 'https://policymarket.rs/putno-osiguranje?destination=turska',
  },
  'egipat': {
    id: 'egipat',
    name: 'Egipat',
    costs: {
      flight: { budget: 23400, midrange: 37440, comfort: 67392 },
      accommodation: { budget: 2925, midrange: 7020, comfort: 21060 },
      food: { budget: 1500, midrange: 3000, comfort: 6000 },
      transport: { budget: 500, midrange: 1000, comfort: 2000 },
      sim: 1000,
      insurance: 450,
      isEU: false,
      insZone: 3,
    },
    miskoTip: 'Egipat nema ugovor o zdravstvenom osiguranju sa Srbijom. Bez polise, svi troškovi lečenja su tvoji.',
    comparisonUrl: 'https://policymarket.rs/putno-osiguranje?destination=egipat',
  },
  'tunis': {
    id: 'tunis',
    name: 'Tunis',
    costs: {
      flight: { budget: 22230, midrange: 35100, comfort: 63180 },
      accommodation: { budget: 3276, midrange: 7020, comfort: 18720 },
      food: { budget: 1500, midrange: 2800, comfort: 5500 },
      transport: { budget: 400, midrange: 900, comfort: 2000 },
      sim: 1200,
      insurance: 450,
      isEU: false,
      insZone: 3,
    },
    miskoTip: 'Tunis nema zdravstveni sporazum sa Srbijom - osiguranje je obavezno.',
    comparisonUrl: 'https://policymarket.rs/putno-osiguranje?destination=tunis',
  },
  'bugarska': {
    id: 'bugarska',
    name: 'Bugarska',
    costs: {
      flight: { budget: 9360, midrange: 16965, comfort: 30537 },
      accommodation: { budget: 3510, midrange: 7020, comfort: 17550 },
      food: { budget: 1800, midrange: 3000, comfort: 5500 },
      transport: { budget: 500, midrange: 1000, comfort: 2000 },
      sim: 0,
      insurance: 300,
      isEU: true,
      insZone: 1,
    },
    miskoTip: 'Bugarska je EU, ali medicinski troškovi za strance mogu biti visoki.',
    comparisonUrl: 'https://policymarket.rs/putno-osiguranje?destination=bugarska',
  },
  'hrvatska': {
    id: 'hrvatska',
    name: 'Hrvatska',
    costs: {
      flight: { budget: 11700, midrange: 22815, comfort: 41067 },
      accommodation: { budget: 6435, midrange: 12870, comfort: 31590 },
      food: { budget: 2500, midrange: 4000, comfort: 7000 },
      transport: { budget: 600, midrange: 1200, comfort: 2500 },
      sim: 0,
      insurance: 320,
      isEU: true,
      insZone: 1,
    },
    miskoTip: 'Hrvatska je EU članica, ali privatne klinike naplaćuju i do €300 po poseti.',
    comparisonUrl: 'https://policymarket.rs/putno-osiguranje?destination=hrvatska',
  },
  'albanija': {
    id: 'albanija',
    name: 'Albanija',
    costs: {
      flight: { budget: 11700, midrange: 21645, comfort: 38961 },
      accommodation: { budget: 3276, midrange: 7020, comfort: 18135 },
      food: { budget: 1500, midrange: 2500, comfort: 5000 },
      transport: { budget: 400, midrange: 800, comfort: 1800 },
      sim: 800,
      insurance: 350,
      isEU: false,
      insZone: 1,
    },
    miskoTip: 'Albanija nema sporazum o zdravstvenoj zaštiti sa Srbijom.',
    comparisonUrl: 'https://policymarket.rs/putno-osiguranje?destination=albanija',
  },
  'kipar': {
    id: 'kipar',
    name: 'Kipar',
    costs: {
      flight: { budget: 17550, midrange: 29250, comfort: 52650 },
      accommodation: { budget: 5850, midrange: 12285, comfort: 30420 },
      food: { budget: 2500, midrange: 4500, comfort: 8000 },
      transport: { budget: 700, midrange: 1400, comfort: 3000 },
      sim: 0,
      insurance: 350,
      isEU: true,
      insZone: 2,
    },
    miskoTip: 'Kipar je EU, ali medicinski troškovi mogu biti iznenađujuće visoki.',
    comparisonUrl: 'https://policymarket.rs/putno-osiguranje?destination=kipar',
  },
  'italija': {
    id: 'italija',
    name: 'Italija',
    costs: {
      flight: { budget: 9711, midrange: 22230, comfort: 40014 },
      accommodation: { budget: 7605, midrange: 15795, comfort: 42120 },
      food: { budget: 2800, midrange: 4800, comfort: 8500 },
      transport: { budget: 900, midrange: 1800, comfort: 3500 },
      sim: 0,
      insurance: 350,
      isEU: true,
      insZone: 2,
    },
    miskoTip: 'Italija je EU, ali privatne klinike naplaćuju i do €400 po poseti.',
    comparisonUrl: 'https://policymarket.rs/putno-osiguranje?destination=italija',
  },
  'spanija': {
    id: 'spanija',
    name: 'Španija',
    costs: {
      flight: { budget: 14040, midrange: 28665, comfort: 51597 },
      accommodation: { budget: 7020, midrange: 14625, comfort: 36270 },
      food: { budget: 3000, midrange: 5000, comfort: 9000 },
      transport: { budget: 1000, midrange: 2000, comfort: 4000 },
      sim: 0,
      insurance: 380,
      isEU: true,
      insZone: 2,
    },
    miskoTip: 'U Španiji, hitna pomoć može koštati €200+. Osiguranje ti štedi novce i brige.',
    comparisonUrl: 'https://policymarket.rs/putno-osiguranje?destination=spanija',
  },
  'austrija': {
    id: 'austrija',
    name: 'Austrija',
    costs: {
      flight: { budget: 14040, midrange: 25740, comfort: 46332 },
      accommodation: { budget: 7605, midrange: 14040, comfort: 37440 },
      food: { budget: 3000, midrange: 5000, comfort: 9000 },
      transport: { budget: 800, midrange: 1600, comfort: 3500 },
      sim: 0,
      insurance: 350,
      isEU: true,
      insZone: 2,
    },
    miskoTip: 'Austrija ima visoke medicinske troškove - osiguranje je preporučljivo.',
    comparisonUrl: 'https://policymarket.rs/putno-osiguranje?destination=austrija',
  },
  'madjarska': {
    id: 'madjarska',
    name: 'Mađarska',
    costs: {
      flight: { budget: 9360, midrange: 18135, comfort: 32643 },
      accommodation: { budget: 4680, midrange: 9360, comfort: 21645 },
      food: { budget: 2000, midrange: 3500, comfort: 6000 },
      transport: { budget: 600, midrange: 1200, comfort: 2500 },
      sim: 0,
      insurance: 320,
      isEU: true,
      insZone: 1,
    },
    miskoTip: 'Mađarska je popularna destinacija, ali privatne klinike naplaćuju visoke cene.',
    comparisonUrl: 'https://policymarket.rs/putno-osiguranje?destination=madjarska',
  },
  'bosna': {
    id: 'bosna',
    name: 'Bosna i Hercegovina',
    costs: {
      flight: { budget: 9360, midrange: 17550, comfort: 31590 },
      accommodation: { budget: 4095, midrange: 8190, comfort: 19305 },
      food: { budget: 1500, midrange: 3000, comfort: 5500 },
      transport: { budget: 400, midrange: 800, comfort: 1500 },
      sim: 0,
      insurance: 300,
      isEU: false,
      insZone: 1,
    },
    miskoTip: 'BiH je blizu, ali nema zdravstveni sporazum sa Srbijom — osiguranje je preporučljivo.',
    comparisonUrl: 'https://policymarket.rs/putno-osiguranje?destination=bosna',
  },
  'ceska': {
    id: 'ceska',
    name: 'Češka',
    costs: {
      flight: { budget: 12870, midrange: 25155, comfort: 45279 },
      accommodation: { budget: 5850, midrange: 10530, comfort: 25740 },
      food: { budget: 2500, midrange: 4500, comfort: 8000 },
      transport: { budget: 700, midrange: 1500, comfort: 3000 },
      sim: 0,
      insurance: 350,
      isEU: true,
      insZone: 2,
    },
    miskoTip: 'Češka ima visoke medicinske troškove za strance bez osiguranja.',
    comparisonUrl: 'https://policymarket.rs/putno-osiguranje?destination=ceska',
  },
  'nemacka': {
    id: 'nemacka',
    name: 'Nemačka',
    costs: {
      flight: { budget: 15210, midrange: 28080, comfort: 50544 },
      accommodation: { budget: 7020, midrange: 13455, comfort: 31590 },
      food: { budget: 3500, midrange: 6000, comfort: 11000 },
      transport: { budget: 1000, midrange: 2000, comfort: 4000 },
      sim: 0,
      insurance: 380,
      isEU: true,
      insZone: 2,
    },
    miskoTip: 'Nemačka ima jedan od najskupljih zdravstvenih sistema — osiguranje je obavezno.',
    comparisonUrl: 'https://policymarket.rs/putno-osiguranje?destination=nemacka',
  },
  'slovenija': {
    id: 'slovenija',
    name: 'Slovenija',
    costs: {
      flight: { budget: 11700, midrange: 22230, comfort: 40014 },
      accommodation: { budget: 5616, midrange: 11466, comfort: 27495 },
      food: { budget: 2500, midrange: 4500, comfort: 8500 },
      transport: { budget: 700, midrange: 1400, comfort: 3000 },
      sim: 0,
      insurance: 350,
      isEU: true,
      insZone: 2,
    },
    miskoTip: 'Slovenija je EU članica, ali privatne klinike naplaćuju visoke cene.',
    comparisonUrl: 'https://policymarket.rs/putno-osiguranje?destination=slovenija',
  },
  'francuska': {
    id: 'francuska',
    name: 'Francuska',
    costs: {
      flight: { budget: 17550, midrange: 38610, comfort: 69498 },
      accommodation: { budget: 10530, midrange: 20475, comfort: 53820 },
      food: { budget: 3500, midrange: 6000, comfort: 12000 },
      transport: { budget: 1000, midrange: 2000, comfort: 4000 },
      sim: 0,
      insurance: 380,
      isEU: true,
      insZone: 2,
    },
    miskoTip: 'Francuska ima jedan od najskupljih zdravstvenih sistema u Evropi.',
    comparisonUrl: 'https://policymarket.rs/putno-osiguranje?destination=francuska',
  },
  'uae': {
    id: 'uae',
    name: 'UAE (Dubai)',
    costs: {
      flight: { budget: 40950, midrange: 56160, comfort: 101088 },
      accommodation: { budget: 10530, midrange: 21060, comfort: 64350 },
      food: { budget: 4000, midrange: 8000, comfort: 15000 },
      transport: { budget: 1500, midrange: 3000, comfort: 6000 },
      sim: 2000,
      insurance: 500,
      isEU: false,
      insZone: 3,
    },
    miskoTip: 'Dubai ima vrhunsku medicinsku negu, ali po veoma visokim cenama — osiguranje je obavezno.',
    comparisonUrl: 'https://policymarket.rs/putno-osiguranje?destination=uae',
  },
  'gruzija': {
    id: 'gruzija',
    name: 'Gruzija',
    costs: {
      flight: { budget: 21060, midrange: 35100, comfort: 63180 },
      accommodation: { budget: 3276, midrange: 7956, comfort: 19305 },
      food: { budget: 1200, midrange: 2500, comfort: 5000 },
      transport: { budget: 500, midrange: 1000, comfort: 2500 },
      sim: 1500,
      insurance: 450,
      isEU: false,
      insZone: 3,
    },
    miskoTip: 'Gruzija nema zdravstveni sporazum sa Srbijom — putno osiguranje je obavezno.',
    comparisonUrl: 'https://policymarket.rs/putno-osiguranje?destination=gruzija',
  },
};

export const destinationList = Object.values(destinations);

export interface TravelStyleInfo {
  id: TravelStyle;
  label: string;
  description: string;
}

export const travelStyles: TravelStyleInfo[] = [
  { 
    id: 'budget', 
    label: 'Budget',
    description: 'Hosteli, jeftini smeštaj, priprema hrane, javni prevoz'
  },
  { 
    id: 'midrange', 
    label: 'Mid-range',
    description: 'Hoteli 3★, restorani srednje klase, kombinovan prevoz'
  },
  { 
    id: 'comfort', 
    label: 'Komfor',
    description: 'Hoteli 4-5★, fine dining, rent-a-car ili taksi'
  },
];
