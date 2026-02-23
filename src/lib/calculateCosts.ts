import { Destination, TravelStyle } from '@/data/destinations';

export interface InsuranceDetails {
  cheapestName: string;
  cheapestTotal: number;
  expensiveName: string;
  expensiveTotal: number;
  averageTotal: number;
}

export interface CostBreakdown {
  flights: number;
  accommodation: number;
  food: number;
  transport: number;
  sim: number;
  insurance: number;
  insuranceDetails: InsuranceDetails;
  total: number;
}

export interface CostItem {
  id: keyof Omit<CostBreakdown, 'total' | 'insuranceDetails'>;
  icon: string;
  label: string;
  value: number;
  isPerPerson?: boolean;
  showInTotal?: boolean;
  insuranceDetails?: InsuranceDetails;
}

// Insurance rates in EUR per person per day — Serbian insurers
// Indexed as [zoneIndex][tierIndex] where zone: 0=Balkans, 1=Europe, 2=World; tier: 0=budget, 1=standard, 2=premium
const INSURANCE_RATES: Record<string, { name: string; rates: number[][] }> = {
  grawe:    { name: 'Grawe',    rates: [[0.85, 1.20, 2.50], [1.20, 1.80, 3.50], [1.85, 2.80, 5.50]] },
  sava:     { name: 'Sava',     rates: [[1.00, 1.50, 2.80], [1.40, 2.10, 3.90], [2.20, 3.20, 6.20]] },
  wiener:   { name: 'Wiener',   rates: [[1.10, 1.60, 3.00], [1.55, 2.25, 4.20], [2.40, 3.50, 6.80]] },
  uniqa:    { name: 'Uniqa',    rates: [[1.30, 1.90, 3.50], [1.80, 2.60, 4.80], [2.80, 4.00, 7.50]] },
  generali: { name: 'Generali', rates: [[1.40, 2.00, 3.80], [1.90, 2.80, 5.20], [3.00, 4.40, 8.20]] },
};

const EUR_TO_RSD = 117;

function getInsuranceDetails(insZone: number, style: TravelStyle, days: number): InsuranceDetails {
  const tierIndex = style === 'budget' ? 0 : style === 'comfort' ? 2 : 1;
  const zoneIndex = insZone - 1;

  const insurerRates = Object.values(INSURANCE_RATES).map(ins => ({
    name: ins.name,
    rate: ins.rates[zoneIndex][tierIndex],
  }));

  insurerRates.sort((a, b) => a.rate - b.rate);
  const cheapest = insurerRates[0];
  const expensive = insurerRates[insurerRates.length - 1];
  const avgRate = insurerRates.reduce((s, r) => s + r.rate, 0) / insurerRates.length;

  return {
    cheapestName: cheapest.name,
    cheapestTotal: Math.round(cheapest.rate * days * EUR_TO_RSD),
    expensiveName: expensive.name,
    expensiveTotal: Math.round(expensive.rate * days * EUR_TO_RSD),
    averageTotal: Math.round(avgRate * days * EUR_TO_RSD),
  };
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

  const flights = costs.flight[style] * travelers;
  const accommodation = costs.accommodation[style] * nights * rooms;
  const food = costs.food[style] * days * travelers;
  const transport = costs.transport[style] * days;
  const sim = costs.isEU ? 0 : costs.sim;

  const insuranceDetails = getInsuranceDetails(costs.insZone, style, days);
  const insurance = insuranceDetails.averageTotal;

  const total = flights + accommodation + food + transport + sim;

  return {
    flights,
    accommodation,
    food,
    transport,
    sim,
    insurance,
    insuranceDetails,
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

  if (!isEU && breakdown.sim > 0) {
    items.push({ id: 'sim', icon: '📱', label: 'SIM / Internet', value: breakdown.sim, showInTotal: true });
  }

  items.push({
    id: 'insurance',
    icon: '🏥',
    label: 'Putno osiguranje',
    value: breakdown.insurance,
    isPerPerson: true,
    showInTotal: false,
    insuranceDetails: breakdown.insuranceDetails,
  });

  return items;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('sr-RS', {
    style: 'decimal',
    maximumFractionDigits: 0,
  }).format(value) + ' din';
}
