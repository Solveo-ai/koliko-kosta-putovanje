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

export type InsuranceTier = 'budget' | 'standard' | 'premium';

export interface Destination {
  id: DestinationId;
  name: string;
  subtitle: string;
  group: 'Mediterranean & Beach' | 'European City Breaks' | 'Long-Haul & Emerging';
  flightBudget: number;    // EUR per person, budget LCC round-trip
  flightAvg: number;       // EUR per person, mid-season average round-trip
  carTotal: number | null; // EUR round-trip total per vehicle, null if not drivable
  carKm: string | null;
  carRoute: string | null;
  accommodationBudget: number; // EUR per person per night
  accommodationMid: number;
  accommodationLuxury: number;
  insZone: 1 | 2 | 3;     // 1=Balkans/SEE, 2=Europe, 3=World
  miskoTip: string;
}

export const destinations: Record<DestinationId, Destination> = {
  'grcka': {
    id: 'grcka',
    name: 'Grčka',
    subtitle: 'Halkidiki · Thassos · Corfu',
    group: 'Mediterranean & Beach',
    flightBudget: 130,
    flightAvg: 210,
    carTotal: 120,
    carKm: '~820 km',
    carRoute: 'via N. Macedonia (Evzoni)',
    accommodationBudget: 45,
    accommodationMid: 100,
    accommodationLuxury: 280,
    insZone: 1,
    miskoTip: 'U Grčkoj, poseta lekaru bez osiguranja može koštati €80-300. Sa osiguranjem: 0 din.',
  },
  'crna-gora': {
    id: 'crna-gora',
    name: 'Crna Gora',
    subtitle: 'Budva · Bar · Kotor',
    group: 'Mediterranean & Beach',
    flightBudget: 120,
    flightAvg: 180,
    carTotal: 80,
    carKm: '~450 km',
    carRoute: 'via S. Serbia',
    accommodationBudget: 30,
    accommodationMid: 70,
    accommodationLuxury: 200,
    insZone: 1,
    miskoTip: 'Crna Gora je blizu, ali bolnički troškovi mogu biti iznenađujuće visoki.',
  },
  'turska': {
    id: 'turska',
    name: 'Turska',
    subtitle: 'Antalya · Istanbul · Izmir',
    group: 'Mediterranean & Beach',
    flightBudget: 175,
    flightAvg: 255,
    carTotal: null,
    carKm: null,
    carRoute: null,
    accommodationBudget: 35,
    accommodationMid: 75,
    accommodationLuxury: 200,
    insZone: 2,
    miskoTip: 'U Turskoj, bolnički dan može koštati i do €500. Putno osiguranje pokriva medicinske troškove.',
  },
  'egipat': {
    id: 'egipat',
    name: 'Egipat',
    subtitle: 'Hurghada · Sharm el-Sheikh',
    group: 'Mediterranean & Beach',
    flightBudget: 200,
    flightAvg: 320,
    carTotal: null,
    carKm: null,
    carRoute: null,
    accommodationBudget: 25,
    accommodationMid: 60,
    accommodationLuxury: 180,
    insZone: 3,
    miskoTip: 'Egipat nema ugovor o zdravstvenom osiguranju sa Srbijom. Bez polise, svi troškovi lečenja su tvoji.',
  },
  'tunis': {
    id: 'tunis',
    name: 'Tunis',
    subtitle: 'Hammamet · Sousse · Monastir',
    group: 'Mediterranean & Beach',
    flightBudget: 190,
    flightAvg: 300,
    carTotal: null,
    carKm: null,
    carRoute: null,
    accommodationBudget: 28,
    accommodationMid: 60,
    accommodationLuxury: 160,
    insZone: 3,
    miskoTip: 'Tunis nema zdravstveni sporazum sa Srbijom - osiguranje je obavezno.',
  },
  'bugarska': {
    id: 'bugarska',
    name: 'Bugarska',
    subtitle: 'Sunny Beach · Varna · Bansko',
    group: 'Mediterranean & Beach',
    flightBudget: 80,
    flightAvg: 145,
    carTotal: 55,
    carKm: '~330 km',
    carRoute: 'via Kalotina border',
    accommodationBudget: 30,
    accommodationMid: 60,
    accommodationLuxury: 150,
    insZone: 1,
    miskoTip: 'Bugarska je EU, ali medicinski troškovi za strance mogu biti visoki.',
  },
  'hrvatska': {
    id: 'hrvatska',
    name: 'Hrvatska',
    subtitle: 'Istria · Split · Dubrovnik',
    group: 'Mediterranean & Beach',
    flightBudget: 100,
    flightAvg: 195,
    carTotal: 110,
    carKm: '~550–650 km',
    carRoute: 'via Bosnia / Slovenia',
    accommodationBudget: 55,
    accommodationMid: 110,
    accommodationLuxury: 270,
    insZone: 1,
    miskoTip: 'Hrvatska je EU članica, ali privatne klinike naplaćuju i do €300 po poseti.',
  },
  'albanija': {
    id: 'albanija',
    name: 'Albanija',
    subtitle: 'Saranda · Vlorë · Durrës',
    group: 'Mediterranean & Beach',
    flightBudget: 100,
    flightAvg: 185,
    carTotal: 88,
    carKm: '~550 km',
    carRoute: 'via Kosovo / N. Macedonia',
    accommodationBudget: 28,
    accommodationMid: 60,
    accommodationLuxury: 155,
    insZone: 1,
    miskoTip: 'Albanija nema sporazum o zdravstvenoj zaštiti sa Srbijom.',
  },
  'kipar': {
    id: 'kipar',
    name: 'Kipar',
    subtitle: 'Paphos · Limassol',
    group: 'Mediterranean & Beach',
    flightBudget: 150,
    flightAvg: 250,
    carTotal: null,
    carKm: null,
    carRoute: null,
    accommodationBudget: 50,
    accommodationMid: 105,
    accommodationLuxury: 260,
    insZone: 2,
    miskoTip: 'Kipar je EU, ali medicinski troškovi mogu biti iznenađujuće visoki.',
  },
  'italija': {
    id: 'italija',
    name: 'Italija',
    subtitle: 'Rome · Florence · Puglia',
    group: 'European City Breaks',
    flightBudget: 83,
    flightAvg: 190,
    carTotal: 195,
    carKm: '~1,100 km',
    carRoute: 'via Slovenia; Italy tolls',
    accommodationBudget: 65,
    accommodationMid: 135,
    accommodationLuxury: 360,
    insZone: 2,
    miskoTip: 'Italija je EU, ali privatne klinike naplaćuju i do €400 po poseti.',
  },
  'spanija': {
    id: 'spanija',
    name: 'Španija',
    subtitle: 'Barcelona · Madrid · Costa Brava',
    group: 'European City Breaks',
    flightBudget: 120,
    flightAvg: 245,
    carTotal: null,
    carKm: '~2,200 km',
    carRoute: 'Not practical',
    accommodationBudget: 60,
    accommodationMid: 125,
    accommodationLuxury: 310,
    insZone: 2,
    miskoTip: 'U Španiji, hitna pomoć može koštati €200+. Osiguranje ti štedi novce i brige.',
  },
  'austrija': {
    id: 'austrija',
    name: 'Austrija',
    subtitle: 'Vienna · Salzburg · Alps',
    group: 'European City Breaks',
    flightBudget: 120,
    flightAvg: 220,
    carTotal: 112,
    carKm: '~580 km',
    carRoute: 'via Hungary + vignette',
    accommodationBudget: 65,
    accommodationMid: 120,
    accommodationLuxury: 320,
    insZone: 2,
    miskoTip: 'Austrija ima visoke medicinske troškove - osiguranje je preporučljivo.',
  },
  'madjarska': {
    id: 'madjarska',
    name: 'Mađarska',
    subtitle: 'Budapest',
    group: 'European City Breaks',
    flightBudget: 80,
    flightAvg: 155,
    carTotal: 65,
    carKm: '~360 km',
    carRoute: '~3.5h from Belgrade',
    accommodationBudget: 40,
    accommodationMid: 80,
    accommodationLuxury: 185,
    insZone: 1,
    miskoTip: 'Mađarska je popularna destinacija, ali privatne klinike naplaćuju visoke cene.',
  },
  'bosna': {
    id: 'bosna',
    name: 'Bosna i Hercegovina',
    subtitle: 'Sarajevo · Mostar · Jahorina',
    group: 'European City Breaks',
    flightBudget: 80,
    flightAvg: 150,
    carTotal: 55,
    carKm: '~280 km',
    carRoute: '~3h from Belgrade',
    accommodationBudget: 35,
    accommodationMid: 70,
    accommodationLuxury: 165,
    insZone: 1,
    miskoTip: 'BiH je blizu, ali nema zdravstveni sporazum sa Srbijom — osiguranje je preporučljivo.',
  },
  'ceska': {
    id: 'ceska',
    name: 'Češka',
    subtitle: 'Prague · Karlovy Vary',
    group: 'European City Breaks',
    flightBudget: 110,
    flightAvg: 215,
    carTotal: 150,
    carKm: '~900 km',
    carRoute: 'via Hungary & Slovakia',
    accommodationBudget: 50,
    accommodationMid: 90,
    accommodationLuxury: 220,
    insZone: 2,
    miskoTip: 'Češka ima visoke medicinske troškove za strance bez osiguranja.',
  },
  'nemacka': {
    id: 'nemacka',
    name: 'Nemačka',
    subtitle: 'Berlin · Munich · Frankfurt',
    group: 'European City Breaks',
    flightBudget: 130,
    flightAvg: 240,
    carTotal: 235,
    carKm: '~1,300 km',
    carRoute: 'via Austria — long drive',
    accommodationBudget: 60,
    accommodationMid: 115,
    accommodationLuxury: 270,
    insZone: 2,
    miskoTip: 'Nemačka ima jedan od najskupljih zdravstvenih sistema — osiguranje je obavezno.',
  },
  'slovenija': {
    id: 'slovenija',
    name: 'Slovenija',
    subtitle: 'Ljubljana · Lake Bled',
    group: 'European City Breaks',
    flightBudget: 100,
    flightAvg: 190,
    carTotal: 118,
    carKm: '~640 km',
    carRoute: 'via Croatia + vignettes',
    accommodationBudget: 48,
    accommodationMid: 98,
    accommodationLuxury: 235,
    insZone: 2,
    miskoTip: 'Slovenija je EU članica, ali privatne klinike naplaćuju visoke cene.',
  },
  'francuska': {
    id: 'francuska',
    name: 'Francuska',
    subtitle: 'Paris · Nice · Côte d\'Azur',
    group: 'European City Breaks',
    flightBudget: 150,
    flightAvg: 330,
    carTotal: null,
    carKm: '~1,900 km',
    carRoute: 'Not practical',
    accommodationBudget: 90,
    accommodationMid: 175,
    accommodationLuxury: 460,
    insZone: 2,
    miskoTip: 'Francuska ima jedan od najskupljih zdravstvenih sistema u Evropi.',
  },
  'uae': {
    id: 'uae',
    name: 'UAE (Dubai)',
    subtitle: 'Dubai · Abu Dhabi',
    group: 'Long-Haul & Emerging',
    flightBudget: 350,
    flightAvg: 480,
    carTotal: null,
    carKm: null,
    carRoute: null,
    accommodationBudget: 90,
    accommodationMid: 180,
    accommodationLuxury: 550,
    insZone: 3,
    miskoTip: 'Dubai ima vrhunsku medicinsku negu, ali po veoma visokim cenama — osiguranje je obavezno.',
  },
  'gruzija': {
    id: 'gruzija',
    name: 'Gruzija',
    subtitle: 'Tbilisi · Batumi · wine region',
    group: 'Long-Haul & Emerging',
    flightBudget: 180,
    flightAvg: 300,
    carTotal: null,
    carKm: null,
    carRoute: null,
    accommodationBudget: 28,
    accommodationMid: 68,
    accommodationLuxury: 165,
    insZone: 3,
    miskoTip: 'Gruzija nema zdravstveni sporazum sa Srbijom — putno osiguranje je obavezno.',
  },
};

export const destinationList = Object.values(destinations);

export const destinationGroups = [
  { label: '🌊 Mediterranean & Beach', destinations: destinationList.filter(d => d.group === 'Mediterranean & Beach') },
  { label: '🏙️ European City Breaks', destinations: destinationList.filter(d => d.group === 'European City Breaks') },
  { label: '🌍 Long-Haul & Emerging', destinations: destinationList.filter(d => d.group === 'Long-Haul & Emerging') },
];

export interface InsuranceTierInfo {
  id: InsuranceTier;
  label: string;
  description: string;
}

export const insuranceTiers: InsuranceTierInfo[] = [
  {
    id: 'budget',
    label: 'Budget',
    description: '~€15,000 pokriće',
  },
  {
    id: 'standard',
    label: 'Standard',
    description: '~€30,000 pokriće',
  },
  {
    id: 'premium',
    label: 'Premium',
    description: '~€40-60,000 pokriće',
  },
];
