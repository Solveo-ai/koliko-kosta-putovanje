

# PolicyMarket Travel Cost Calculator — Major Refactor

## Overview

Rebuild the calculator data layer and results display to match the PolicyMarket Travel Cost Intelligence Report 2026 specification. The core change: **Transport + Accommodation + Insurance = Total** (removing food, SIM, local transport). All prices switch from RSD to EUR. Transport mode is auto-determined (plane-only vs plane+car). Insurance shown neutrally with all 5 insurers alphabetically.

---

## What Changes

### 1. Data Model Overhaul (`src/data/destinations.ts`)

**Remove:** `food`, `transport` (local), `sim`, `isEU`, `insurance` (flat), `comparisonUrl` fields, `TravelStyle` type (replaced by `InsuranceTier`).

**New data structure per destination:**
- `flightBudget` / `flightAvg` (EUR per person, fixed round-trip)
- `carTotal` (EUR per vehicle round-trip, or `null` if not drivable)
- `carKm` / `carRoute` (info strings)
- `accommodationBudget` / `accommodationMid` / `accommodationLuxury` (EUR per person per night)
- `insZone` (1/2/3)
- Destination groups for dropdown: Mediterranean & Beach, European City Breaks, Long-Haul & Emerging

**New type:** `InsuranceTier = 'budget' | 'standard' | 'premium'` replacing `TravelStyle`.

**Travel styles array:** Updated to reflect insurance tiers (Budget ~15K EUR coverage, Standard ~30K EUR, Premium ~40-60K EUR).

### 2. Calculation Logic Rewrite (`src/lib/calculateCosts.ts`)

**New formula (per person):**
```text
TOTAL = Transport/pp + (Accommodation_mid/night × Days) + (Insurance_avg_rate × Days)
```

**Transport:**
- Plane: `flight_price` (budget LCC or average, user sub-toggle)
- Car: `car_total_RT / num_travellers`

**Accommodation:** `mid_rate × days` (per person — data already assumes 2-per-room sharing). Remove the `Math.ceil(travelers/2)` room calculation since the report data is already per person.

**Insurance:** Market average = mean of all 5 insurers for zone + tier. Uses the single-tier rates (not the 3x3 matrix currently stored — the user specified standard/mid-package rates only per zone).

Insurance rates to use (EUR/person/day):
| Insurer | Balkans | Europe | World |
|---------|---------|--------|-------|
| Generali | 1.40 | 2.00 | 4.00 |
| Grawe | 0.85 | 1.20 | 2.50 |
| Sava | 1.00 | 1.50 | 2.90 |
| Uniqa | 1.30 | 1.90 | 3.80 |
| Wiener | 1.10 | 1.60 | 3.20 |

**Currency:** All calculations in EUR. `formatCurrency` outputs `€XX.XX` instead of RSD.

### 3. Form Changes (`src/components/calculator/TripCalculatorForm.tsx`)

- **Destination dropdown:** Group destinations into 3 categories (Mediterranean, City Breaks, Long-Haul)
- **Days slider:** Range 1-21 (currently 3-21)
- **Travelers selector:** Range 1-10 (currently 1-6)
- **Insurance Tier selector:** Replace "Stil putovanja" radio group with 3-button toggle: Budget / Standard / Premium (default: Standard). Update descriptions to reflect coverage levels
- **Remove:** No transport mode selector needed

### 4. Results Display Overhaul (`src/components/calculator/CostResults.tsx` + `TripCalculator.tsx`)

**Auto transport detection:**
- If destination has `carTotal !== null`: Show 2 side-by-side cards (Plane vs Car)
- If `carTotal === null`: Show single Plane card + message "Ova destinacija je najisplativija avionom iz Beograda."

**Each transport card shows:**
- Transport cost per person
- Accommodation cost (mid-range x days)
- Insurance cost (market avg x days)
- **Total per person** (prominent)
- **Total for group** (if travelers > 1)

**Plane card:** Sub-toggle for Budget LCC / Average fare (default: Budget LCC)

**Car card:** Info line showing distance, route, cost split

**Savings badge:** The cheaper option gets a green badge: "Usteda €XX/os u odnosu na [other]"

**Below cards (shared sections):**
1. **Insurance comparison table** — all 5 insurers alphabetically, showing daily rate + total for trip duration. NO badges, NO "cheapest"/"recommended" labels.
2. **Accommodation tier breakdown** — Budget / Mid-range / Luxury with per-night and total costs.

### 5. Footer Update (`src/components/layout/Footer.tsx`)

Add data sources line:
> "Travel Cost + Insurance Intelligence -- February 2026 -- Grawe -- Wiener -- Sava -- Generali -- Uniqa -- Google Flights -- BudgetYourTrip -- Tolls.eu"

### 6. Remove Food References

- Remove `food` from `CostBreakdown`, `CostItem`, `DestinationCosts`
- Remove `sim` cost item
- Remove `transport` (local transport) cost item
- Remove all food-related lines from `getCostItems`

---

## Files Modified

| File | Change |
|------|--------|
| `src/data/destinations.ts` | Complete data model rewrite — new interface, new destination data with EUR prices, grouped destinations, insurance tier type |
| `src/lib/calculateCosts.ts` | New calculation logic (transport + accom + insurance), EUR formatting, plane vs car breakdown, insurance comparison table data |
| `src/components/calculator/TripCalculatorForm.tsx` | Grouped dropdown, 1-10 travelers, 1-21 days, insurance tier toggle replacing travel style |
| `src/components/calculator/CostResults.tsx` | Side-by-side plane/car cards, flight type sub-toggle, savings badge, insurance table, accommodation breakdown |
| `src/components/calculator/TripCalculator.tsx` | Wire up new state (insurance tier, flight type), pass car/plane breakdowns, remove food/sim references |
| `src/components/layout/Footer.tsx` | Add data sources attribution line |

---

## Technical Details

### New Destination Interface

```typescript
export type InsuranceTier = 'budget' | 'standard' | 'premium';

export interface Destination {
  id: DestinationId;
  name: string;
  subtitle: string;        // e.g. "Halkidiki · Thassos · Corfu"
  group: string;           // "Mediterranean & Beach" | "European City Breaks" | "Long-Haul & Emerging"
  flightBudget: number;    // EUR per person, budget LCC
  flightAvg: number;       // EUR per person, mid-season average
  carTotal: number | null; // EUR round-trip total, null if not drivable
  carKm: string | null;    // e.g. "~820 km"
  carRoute: string | null; // e.g. "via N. Macedonia (Evzoni)"
  accommodationBudget: number; // EUR per person per night
  accommodationMid: number;
  accommodationLuxury: number;
  insZone: 1 | 2 | 3;
  miskoTip: string;
}
```

### Insurance Data (single standard rate per zone, alphabetical)

```typescript
const INSURANCE_RATES = {
  generali: { name: 'Generali', rates: [1.40, 2.00, 4.00] },
  grawe:    { name: 'Grawe',    rates: [0.85, 1.20, 2.50] },
  sava:     { name: 'Sava',     rates: [1.00, 1.50, 2.90] },
  uniqa:    { name: 'Uniqa',    rates: [1.30, 1.90, 3.80] },
  wiener:   { name: 'Wiener',   rates: [1.10, 1.60, 3.20] },
};
```

### Calculation Output

```typescript
export interface TransportBreakdown {
  transportPP: number;
  accommodationPP: number;
  insurancePP: number;
  totalPP: number;
  totalGroup: number;
}

export interface CalcResult {
  plane: TransportBreakdown;
  car: TransportBreakdown | null;
  savingsPP: number | null;       // abs difference if both exist
  cheaperOption: 'plane' | 'car' | null;
  insurerTable: { name: string; dailyRate: number; total: number }[];
  accommodationTiers: { tier: string; perNight: number; total: number }[];
}
```

## What Does NOT Change

- Page routing (`/` route)
- Header component and logo
- Misko quote component structure
- Email capture component
- Color scheme, fonts, overall layout aesthetic
- CTA button to PolicyMarket comparison
- Serbian language throughout

