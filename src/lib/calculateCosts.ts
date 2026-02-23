import { Destination, InsuranceTier } from '@/data/destinations';

// Insurance rates in EUR per person per day — Serbian insurers, mid-package (~30,000€ coverage)
// Indexed by zone: 0=Balkans/SEE, 1=Europe, 2=World
export const INSURANCE_RATES: Record<string, { name: string; rates: [number, number, number] }> = {
  generali: { name: 'Generali', rates: [1.40, 2.00, 4.00] },
  grawe:    { name: 'Grawe',    rates: [0.85, 1.20, 2.50] },
  sava:     { name: 'Sava',     rates: [1.00, 1.50, 2.90] },
  uniqa:    { name: 'Uniqa',    rates: [1.30, 1.90, 3.80] },
  wiener:   { name: 'Wiener',   rates: [1.10, 1.60, 3.20] },
};

export interface TransportBreakdown {
  transportPP: number;
  accommodationPP: number;
  insurancePP: number;
  totalPP: number;
  totalGroup: number;
}

export interface InsurerRow {
  name: string;
  dailyRate: number;
  total: number;
}

export interface AccommodationTier {
  tier: string;
  perNight: number;
  total: number;
}

export interface CalcResult {
  plane: TransportBreakdown;
  planeBudget: TransportBreakdown; // budget LCC flight
  planeAvg: TransportBreakdown;   // average flight
  car: TransportBreakdown | null;
  savingsPP: number | null;
  cheaperOption: 'plane' | 'car' | null;
  insurerTable: InsurerRow[];
  accommodationTiers: AccommodationTier[];
  avgInsuranceRate: number;
}

function getAvgInsuranceRate(insZone: 1 | 2 | 3): number {
  const zoneIndex = insZone - 1;
  const rates = Object.values(INSURANCE_RATES).map(ins => ins.rates[zoneIndex]);
  return rates.reduce((s, r) => s + r, 0) / rates.length;
}

function buildBreakdown(
  transportPP: number,
  accommodationPPPerNight: number,
  avgInsRate: number,
  days: number,
  travelers: number,
): TransportBreakdown {
  const accommodationPP = accommodationPPPerNight * days;
  const insurancePP = avgInsRate * days;
  const totalPP = transportPP + accommodationPP + insurancePP;
  return {
    transportPP: Math.round(transportPP * 100) / 100,
    accommodationPP: Math.round(accommodationPP * 100) / 100,
    insurancePP: Math.round(insurancePP * 100) / 100,
    totalPP: Math.round(totalPP * 100) / 100,
    totalGroup: Math.round(totalPP * travelers * 100) / 100,
  };
}

export function calculateCosts(
  destination: Destination,
  days: number,
  travelers: number,
  _tier: InsuranceTier,
  flightType: 'budget' | 'avg' = 'budget',
): CalcResult {
  const avgRate = getAvgInsuranceRate(destination.insZone);
  const accomMid = destination.accommodationMid;

  // Plane breakdowns for both flight types
  const planeBudget = buildBreakdown(destination.flightBudget, accomMid, avgRate, days, travelers);
  const planeAvg = buildBreakdown(destination.flightAvg, accomMid, avgRate, days, travelers);
  const plane = flightType === 'budget' ? planeBudget : planeAvg;

  // Car breakdown
  let car: TransportBreakdown | null = null;
  if (destination.carTotal !== null) {
    const carPP = destination.carTotal / travelers;
    car = buildBreakdown(carPP, accomMid, avgRate, days, travelers);
  }

  // Savings comparison (plane budget vs car)
  let savingsPP: number | null = null;
  let cheaperOption: 'plane' | 'car' | null = null;
  if (car) {
    const diff = Math.abs(plane.totalPP - car.totalPP);
    savingsPP = Math.round(diff * 100) / 100;
    cheaperOption = plane.totalPP <= car.totalPP ? 'plane' : 'car';
  }

  // Insurer table
  const zoneIndex = destination.insZone - 1;
  const insurerTable: InsurerRow[] = Object.values(INSURANCE_RATES)
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(ins => ({
      name: ins.name,
      dailyRate: ins.rates[zoneIndex],
      total: Math.round(ins.rates[zoneIndex] * days * 100) / 100,
    }));

  // Accommodation tiers
  const accommodationTiers: AccommodationTier[] = [
    { tier: 'Budget', perNight: destination.accommodationBudget, total: Math.round(destination.accommodationBudget * days * 100) / 100 },
    { tier: 'Mid-range', perNight: destination.accommodationMid, total: Math.round(destination.accommodationMid * days * 100) / 100 },
    { tier: 'Luxury', perNight: destination.accommodationLuxury, total: Math.round(destination.accommodationLuxury * days * 100) / 100 },
  ];

  return {
    plane,
    planeBudget,
    planeAvg,
    car,
    savingsPP,
    cheaperOption,
    insurerTable,
    accommodationTiers,
    avgInsuranceRate: avgRate,
  };
}

export function formatCurrency(value: number): string {
  return '€' + new Intl.NumberFormat('sr-RS', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}
