export type DestinationId = 
  | 'grcka' 
  | 'turska' 
  | 'egipat' 
  | 'spanija' 
  | 'italija' 
  | 'crna-gora'
  | 'hrvatska'
  | 'albanija'
  | 'bugarska'
  | 'madjarska'
  | 'austrija'
  | 'francuska'
  | 'portugal'
  | 'kipar'
  | 'tunis';

export type TravelStyle = 'budget' | 'midrange' | 'comfort';

export interface DestinationCosts {
  flight: { budget: number; midrange: number; comfort: number };
  accommodation: { budget: number; midrange: number; comfort: number };
  food: { budget: number; midrange: number; comfort: number };
  transport: { budget: number; midrange: number; comfort: number };
  sim: number;
  insurance: number;
  isEU: boolean;
}

export interface Destination {
  id: DestinationId;
  name: string;
  costs: DestinationCosts;
  miskoTip: string;
  comparisonUrl: string;
}

export const destinations: Record<DestinationId, Destination> = {
  'grcka': {
    id: 'grcka',
    name: 'Grčka',
    costs: {
      flight: { budget: 15000, midrange: 25000, comfort: 45000 },
      accommodation: { budget: 4000, midrange: 8000, comfort: 18000 },
      food: { budget: 2500, midrange: 4500, comfort: 8000 },
      transport: { budget: 800, midrange: 1500, comfort: 3000 },
      sim: 0,
      insurance: 350,
      isEU: true,
    },
    miskoTip: 'U Grčkoj, poseta lekaru bez osiguranja može koštati €80-300. Sa osiguranjem: 0 din.',
    comparisonUrl: 'https://policymarket.rs/putno-osiguranje?destination=grcka',
  },
  'turska': {
    id: 'turska',
    name: 'Turska',
    costs: {
      flight: { budget: 12000, midrange: 22000, comfort: 40000 },
      accommodation: { budget: 3500, midrange: 7000, comfort: 15000 },
      food: { budget: 2000, midrange: 3500, comfort: 6500 },
      transport: { budget: 600, midrange: 1200, comfort: 2500 },
      sim: 1500,
      insurance: 400,
      isEU: false,
    },
    miskoTip: 'U Turskoj, bolnički dan može koštati i do €500. Putno osiguranje pokriva medicinske troškove.',
    comparisonUrl: 'https://policymarket.rs/putno-osiguranje?destination=turska',
  },
  'egipat': {
    id: 'egipat',
    name: 'Egipat',
    costs: {
      flight: { budget: 25000, midrange: 40000, comfort: 70000 },
      accommodation: { budget: 5000, midrange: 10000, comfort: 25000 },
      food: { budget: 1500, midrange: 3000, comfort: 6000 },
      transport: { budget: 500, midrange: 1000, comfort: 2000 },
      sim: 1000,
      insurance: 450,
      isEU: false,
    },
    miskoTip: 'Egipat nema ugovor o zdravstvenom osiguranju sa Srbijom. Bez polise, svi troškovi lečenja su tvoji.',
    comparisonUrl: 'https://policymarket.rs/putno-osiguranje?destination=egipat',
  },
  'spanija': {
    id: 'spanija',
    name: 'Španija',
    costs: {
      flight: { budget: 18000, midrange: 30000, comfort: 55000 },
      accommodation: { budget: 5000, midrange: 10000, comfort: 22000 },
      food: { budget: 3000, midrange: 5000, comfort: 9000 },
      transport: { budget: 1000, midrange: 2000, comfort: 4000 },
      sim: 0,
      insurance: 380,
      isEU: true,
    },
    miskoTip: 'U Španiji, hitna pomoć može koštati €200+. Osiguranje ti štedi novce i brige.',
    comparisonUrl: 'https://policymarket.rs/putno-osiguranje?destination=spanija',
  },
  'italija': {
    id: 'italija',
    name: 'Italija',
    costs: {
      flight: { budget: 12000, midrange: 22000, comfort: 40000 },
      accommodation: { budget: 4500, midrange: 9000, comfort: 20000 },
      food: { budget: 2800, midrange: 4800, comfort: 8500 },
      transport: { budget: 900, midrange: 1800, comfort: 3500 },
      sim: 0,
      insurance: 350,
      isEU: true,
    },
    miskoTip: 'Italija je EU, ali privatne klinike naplaćuju i do €400 po poseti.',
    comparisonUrl: 'https://policymarket.rs/putno-osiguranje?destination=italija',
  },
  'crna-gora': {
    id: 'crna-gora',
    name: 'Crna Gora',
    costs: {
      flight: { budget: 0, midrange: 0, comfort: 15000 },
      accommodation: { budget: 3000, midrange: 6000, comfort: 14000 },
      food: { budget: 2000, midrange: 3500, comfort: 6500 },
      transport: { budget: 500, midrange: 1000, comfort: 2000 },
      sim: 0,
      insurance: 300,
      isEU: false,
    },
    miskoTip: 'Crna Gora je blizu, ali bolnički troškovi mogu biti iznenađujuće visoki.',
    comparisonUrl: 'https://policymarket.rs/putno-osiguranje?destination=crna-gora',
  },
  'hrvatska': {
    id: 'hrvatska',
    name: 'Hrvatska',
    costs: {
      flight: { budget: 0, midrange: 0, comfort: 12000 },
      accommodation: { budget: 4000, midrange: 8000, comfort: 16000 },
      food: { budget: 2500, midrange: 4000, comfort: 7000 },
      transport: { budget: 600, midrange: 1200, comfort: 2500 },
      sim: 0,
      insurance: 320,
      isEU: true,
    },
    miskoTip: 'Hrvatska je EU članica, ali privatne klinike naplaćuju i do €300 po poseti.',
    comparisonUrl: 'https://policymarket.rs/putno-osiguranje?destination=hrvatska',
  },
  'albanija': {
    id: 'albanija',
    name: 'Albanija',
    costs: {
      flight: { budget: 8000, midrange: 15000, comfort: 30000 },
      accommodation: { budget: 2500, midrange: 5000, comfort: 12000 },
      food: { budget: 1500, midrange: 2500, comfort: 5000 },
      transport: { budget: 400, midrange: 800, comfort: 1800 },
      sim: 800,
      insurance: 350,
      isEU: false,
    },
    miskoTip: 'Albanija nema sporazum o zdravstvenoj zaštiti sa Srbijom.',
    comparisonUrl: 'https://policymarket.rs/putno-osiguranje?destination=albanija',
  },
  'bugarska': {
    id: 'bugarska',
    name: 'Bugarska',
    costs: {
      flight: { budget: 8000, midrange: 15000, comfort: 28000 },
      accommodation: { budget: 3000, midrange: 5500, comfort: 12000 },
      food: { budget: 1800, midrange: 3000, comfort: 5500 },
      transport: { budget: 500, midrange: 1000, comfort: 2000 },
      sim: 0,
      insurance: 300,
      isEU: true,
    },
    miskoTip: 'Bugarska je EU, ali medicinski troškovi za strance mogu biti visoki.',
    comparisonUrl: 'https://policymarket.rs/putno-osiguranje?destination=bugarska',
  },
  'madjarska': {
    id: 'madjarska',
    name: 'Mađarska',
    costs: {
      flight: { budget: 10000, midrange: 18000, comfort: 35000 },
      accommodation: { budget: 3500, midrange: 7000, comfort: 15000 },
      food: { budget: 2000, midrange: 3500, comfort: 6000 },
      transport: { budget: 600, midrange: 1200, comfort: 2500 },
      sim: 0,
      insurance: 320,
      isEU: true,
    },
    miskoTip: 'Mađarska je popularna destinacija, ali privatne klinike naplaćuju visoke cene.',
    comparisonUrl: 'https://policymarket.rs/putno-osiguranje?destination=madjarska',
  },
  'austrija': {
    id: 'austrija',
    name: 'Austrija',
    costs: {
      flight: { budget: 12000, midrange: 22000, comfort: 45000 },
      accommodation: { budget: 5000, midrange: 10000, comfort: 22000 },
      food: { budget: 3000, midrange: 5000, comfort: 9000 },
      transport: { budget: 800, midrange: 1600, comfort: 3500 },
      sim: 0,
      insurance: 350,
      isEU: true,
    },
    miskoTip: 'Austrija ima visoke medicinske troškove - osiguranje je preporučljivo.',
    comparisonUrl: 'https://policymarket.rs/putno-osiguranje?destination=austrija',
  },
  'francuska': {
    id: 'francuska',
    name: 'Francuska',
    costs: {
      flight: { budget: 15000, midrange: 28000, comfort: 55000 },
      accommodation: { budget: 5500, midrange: 11000, comfort: 25000 },
      food: { budget: 3500, midrange: 6000, comfort: 12000 },
      transport: { budget: 1000, midrange: 2000, comfort: 4000 },
      sim: 0,
      insurance: 380,
      isEU: true,
    },
    miskoTip: 'Francuska ima jedan od najskupljih zdravstvenih sistema u Evropi.',
    comparisonUrl: 'https://policymarket.rs/putno-osiguranje?destination=francuska',
  },
  'portugal': {
    id: 'portugal',
    name: 'Portugal',
    costs: {
      flight: { budget: 18000, midrange: 32000, comfort: 60000 },
      accommodation: { budget: 4500, midrange: 9000, comfort: 20000 },
      food: { budget: 2500, midrange: 4500, comfort: 8000 },
      transport: { budget: 800, midrange: 1600, comfort: 3500 },
      sim: 0,
      insurance: 380,
      isEU: true,
    },
    miskoTip: 'Portugal je dalja destinacija - putno osiguranje je preporučljivo.',
    comparisonUrl: 'https://policymarket.rs/putno-osiguranje?destination=portugal',
  },
  'kipar': {
    id: 'kipar',
    name: 'Kipar',
    costs: {
      flight: { budget: 15000, midrange: 28000, comfort: 50000 },
      accommodation: { budget: 4000, midrange: 8000, comfort: 18000 },
      food: { budget: 2500, midrange: 4500, comfort: 8000 },
      transport: { budget: 700, midrange: 1400, comfort: 3000 },
      sim: 0,
      insurance: 350,
      isEU: true,
    },
    miskoTip: 'Kipar je EU, ali medicinski troškovi mogu biti iznenađujuće visoki.',
    comparisonUrl: 'https://policymarket.rs/putno-osiguranje?destination=kipar',
  },
  'tunis': {
    id: 'tunis',
    name: 'Tunis',
    costs: {
      flight: { budget: 20000, midrange: 35000, comfort: 60000 },
      accommodation: { budget: 3500, midrange: 7000, comfort: 16000 },
      food: { budget: 1500, midrange: 2800, comfort: 5500 },
      transport: { budget: 400, midrange: 900, comfort: 2000 },
      sim: 1200,
      insurance: 450,
      isEU: false,
    },
    miskoTip: 'Tunis nema zdravstveni sporazum sa Srbijom - osiguranje je obavezno.',
    comparisonUrl: 'https://policymarket.rs/putno-osiguranje?destination=tunis',
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
