import { Destination, TravelStyle } from '@/data/destinations';

export interface CostBreakdown {
  flights: number;
  accommodation: number;
  food: number;
  transport: number;
  sim: number;
  insurance: number;
  total: number;
}

export interface CostItem {
  id: keyof Omit<CostBreakdown, 'total'>;
  icon: string;
  label: string;
  value: number;
  isPerPerson?: boolean;
  showInTotal?: boolean;
}

// Insurance rates in EUR per person per day — Serbian insurers
// Indexed as [zoneIndex][tierIndex] where zone: 0=Balkans, 1=Europe, 2=World; tier: 0=budget, 1=standard, 2=premium
const INSURANCE_RATES: Record<string, number[][]> = {
  grawe:    [[0.85, 1.20, 2.50], [1.20, 1.80, 3.50], [1.85, 2.80, 5.50]],
  sava:     [[1.00, 1.50, 2.80], [1.40, 2.10, 3.90], [2.20, 3.20, 6.20]],
  wiener:   [[1.10, 1.60, 3.00], [1.55, 2.25, 4.20], [2.40, 3.50, 6.80]],
  uniqa:    [[1.30, 1.90, 3.50], [1.80, 2.60, 4.80], [2.80, 4.00, 7.50]],
  generali: [[1.40, 2.00, 3.80], [1.90, 2.80, 5.20], [3.00, 4.40, 8.20]],
};

const EUR_TO_RSD = 117;

function getInsuranceAvgRate(insZone: number, style: TravelStyle): number {
  const tierIndex = style === 'budget' ? 0 : style === 'comfort' ? 2 : 1;
  const zoneIndex = insZone - 1; // zone 1,2,3 → index 0,1,2
  const rates = Object.values(INSURANCE_RATES).map(r => r[zoneIndex][tierIndex]);
  return rates.reduce((a, b) => a + b, 0) / rates.length;
}

export function calculateCosts(
  destination: Destination,
  days: number,
  travelers: number,
  style: TravelStyle
): CostBreakdown {
  const costs = destination.costs;
  const rooms = Math.ceil(travelers / 2);
  const nights = days - 1;

  // Flights: cost per person × travelers (flat, doesn't scale with duration)
  const flights = costs.flight[style] * travelers;

  // Accommodation: cost per night × nights × rooms
  const accommodation = costs.accommodation[style] * nights * rooms;

  // Food: cost per day × days × travelers
  const food = costs.food[style] * days * travelers;

  // Local transport: cost per day × days (shared, not multiplied by travelers)
  const transport = costs.transport[style] * days;

  // SIM/Data: flat rate per trip (0 for EU countries)
  const sim = costs.isEU ? 0 : costs.sim;

  // Insurance: average rate across 5 Serbian insurers × days, per person (in RSD)
  const insuranceRateEur = getInsuranceAvgRate(costs.insZone, style);
  const insurance = Math.round(insuranceRateEur * days * EUR_TO_RSD);

  // Total excludes insurance (insurance shown separately per person)
  const total = flights + accommodation + food + transport + sim;

  return {
    flights,
    accommodation,
    food,
    transport,
    sim,
    insurance,
    total,
  };
}

export function getCostItems(breakdown: CostBreakdown, isEU: boolean): CostItem[] {
  const items: CostItem[] = [
    { id: 'flights', icon: '✈️', label: 'Letovi', value: breakdown.flights, showInTotal: true },
    { id: 'accommodation', icon: '🏠', label: 'Smeštaj', value: breakdown.accommodation, showInTotal: true },
    { id: 'food', icon: '🍽️', label: 'Hrana', value: breakdown.food, showInTotal: true },
    { id: 'transport', icon: '🚌', label: 'Prevoz', value: breakdown.transport, showInTotal: true },
  ];

  // Only show SIM for non-EU countries
  if (!isEU && breakdown.sim > 0) {
    items.push({ id: 'sim', icon: '📱', label: 'SIM / Internet', value: breakdown.sim, showInTotal: true });
  }

  // Insurance always shown last, marked as per person
  items.push({
    id: 'insurance',
    icon: '🏥',
    label: 'Putno osiguranje',
    value: breakdown.insurance,
    isPerPerson: true,
    showInTotal: false,
  });

  return items;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('sr-RS', {
    style: 'decimal',
    maximumFractionDigits: 0,
  }).format(value) + ' din';
}
