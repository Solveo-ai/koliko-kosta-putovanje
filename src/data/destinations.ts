export type DestinationId = 'grcka' | 'turska' | 'egipat' | 'spanija' | 'italija' | 'crna-gora';

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
  slug: string;
  costs: DestinationCosts;
  miskoTip: string;
  metaTitle: string;
  metaDescription: string;
  comparisonUrl: string;
}

export const destinations: Record<DestinationId, Destination> = {
  'grcka': {
    id: 'grcka',
    name: 'Grčka',
    slug: 'koliko-kosta-putovanje-u-grcku',
    costs: {
      flight: { budget: 15000, midrange: 25000, comfort: 45000 },
      accommodation: { budget: 4000, midrange: 8000, comfort: 18000 },
      food: { budget: 2500, midrange: 4500, comfort: 8000 },
      transport: { budget: 800, midrange: 1500, comfort: 3000 },
      sim: 0,
      insurance: 350,
      isEU: true,
    },
    miskoTip: 'U Grčkoj, poseta lekaru bez osiguranja košta €80-300. Sa osiguranjem: 0 din.',
    metaTitle: 'Koliko košta putovanje u Grčku 2024? | Kalkulator troškova',
    metaDescription: 'Izračunaj koliko košta putovanje u Grčku. Proceni troškove leta, smeštaja, hrane i prevoza za 2024. godinu.',
    comparisonUrl: 'https://policymarket.rs/putno-osiguranje?destination=grcka',
  },
  'turska': {
    id: 'turska',
    name: 'Turska',
    slug: 'koliko-kosta-putovanje-u-tursku',
    costs: {
      flight: { budget: 12000, midrange: 22000, comfort: 40000 },
      accommodation: { budget: 3500, midrange: 7000, comfort: 15000 },
      food: { budget: 2000, midrange: 3500, comfort: 6500 },
      transport: { budget: 600, midrange: 1200, comfort: 2500 },
      sim: 1500,
      insurance: 400,
      isEU: false,
    },
    miskoTip: 'U Turskoj, bolnički dan košta i do €500. Osiguranje pokriva sve — za cenu jedne kafe.',
    metaTitle: 'Koliko košta putovanje u Tursku 2024? | Kalkulator troškova',
    metaDescription: 'Izračunaj koliko košta putovanje u Tursku. Proceni troškove leta, smeštaja, hrane i prevoza za 2024. godinu.',
    comparisonUrl: 'https://policymarket.rs/putno-osiguranje?destination=turska',
  },
  'egipat': {
    id: 'egipat',
    name: 'Egipat',
    slug: 'koliko-kosta-putovanje-u-egipat',
    costs: {
      flight: { budget: 25000, midrange: 40000, comfort: 70000 },
      accommodation: { budget: 5000, midrange: 10000, comfort: 25000 },
      food: { budget: 1500, midrange: 3000, comfort: 6000 },
      transport: { budget: 500, midrange: 1000, comfort: 2000 },
      sim: 1000,
      insurance: 450,
      isEU: false,
    },
    miskoTip: 'Egipat nema ugovor o zdravstvenom osiguranju sa Srbijom. Bez polise, svi troškovi su tvoji.',
    metaTitle: 'Koliko košta putovanje u Egipat 2024? | Kalkulator troškova',
    metaDescription: 'Izračunaj koliko košta putovanje u Egipat. Proceni troškove leta, smeštaja, hrane i prevoza za 2024. godinu.',
    comparisonUrl: 'https://policymarket.rs/putno-osiguranje?destination=egipat',
  },
  'spanija': {
    id: 'spanija',
    name: 'Španija',
    slug: 'koliko-kosta-putovanje-u-spaniju',
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
    metaTitle: 'Koliko košta putovanje u Španiju 2024? | Kalkulator troškova',
    metaDescription: 'Izračunaj koliko košta putovanje u Španiju. Proceni troškove leta, smeštaja, hrane i prevoza za 2024. godinu.',
    comparisonUrl: 'https://policymarket.rs/putno-osiguranje?destination=spanija',
  },
  'italija': {
    id: 'italija',
    name: 'Italija',
    slug: 'koliko-kosta-putovanje-u-italiju',
    costs: {
      flight: { budget: 12000, midrange: 22000, comfort: 40000 },
      accommodation: { budget: 4500, midrange: 9000, comfort: 20000 },
      food: { budget: 2800, midrange: 4800, comfort: 8500 },
      transport: { budget: 900, midrange: 1800, comfort: 3500 },
      sim: 0,
      insurance: 350,
      isEU: true,
    },
    miskoTip: 'Italija je EU, ali privatne klinike naplaćuju i do €400 po poseti. Budi siguran.',
    metaTitle: 'Koliko košta putovanje u Italiju 2024? | Kalkulator troškova',
    metaDescription: 'Izračunaj koliko košta putovanje u Italiju. Proceni troškove leta, smeštaja, hrane i prevoza za 2024. godinu.',
    comparisonUrl: 'https://policymarket.rs/putno-osiguranje?destination=italija',
  },
  'crna-gora': {
    id: 'crna-gora',
    name: 'Crna Gora',
    slug: 'koliko-kosta-putovanje-u-crnu-goru',
    costs: {
      flight: { budget: 0, midrange: 0, comfort: 15000 },
      accommodation: { budget: 3000, midrange: 6000, comfort: 14000 },
      food: { budget: 2000, midrange: 3500, comfort: 6500 },
      transport: { budget: 500, midrange: 1000, comfort: 2000 },
      sim: 0,
      insurance: 300,
      isEU: false,
    },
    miskoTip: 'Crna Gora je blizu, ali bolnički troškovi mogu biti iznenađujuće visoki. Zaštiti se!',
    metaTitle: 'Koliko košta putovanje u Crnu Goru 2024? | Kalkulator troškova',
    metaDescription: 'Izračunaj koliko košta putovanje u Crnu Goru. Proceni troškove leta, smeštaja, hrane i prevoza za 2024. godinu.',
    comparisonUrl: 'https://policymarket.rs/putno-osiguranje?destination=crna-gora',
  },
};

export const destinationList = Object.values(destinations);

export const travelStyles: { id: TravelStyle; label: string }[] = [
  { id: 'budget', label: 'Budget' },
  { id: 'midrange', label: 'Mid-range' },
  { id: 'comfort', label: 'Komfor' },
];
