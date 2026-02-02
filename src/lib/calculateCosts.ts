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

  // Insurance: per person (display only, not in total)
  const insurance = costs.insurance;

  // Total excludes insurance
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
