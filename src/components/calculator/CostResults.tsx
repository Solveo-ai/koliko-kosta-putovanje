import { CalcResult, formatCurrency } from '@/lib/calculateCosts';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Destination } from '@/data/destinations';

interface CostResultsProps {
  result: CalcResult;
  destination: Destination;
  days: number;
  travelers: number;
  flightType: 'budget' | 'avg';
  onFlightTypeChange: (type: 'budget' | 'avg') => void;
}

function ReceiptRow({
  icon,
  label,
  value,
  highlight,
}: {
  icon: string;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between py-3 ${
        highlight ? 'rounded-lg bg-primary/5 px-3 -mx-3' : ''
      }`}
    >
      <span className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>{icon}</span> {label}
      </span>
      <span className={`text-sm font-semibold text-foreground ${highlight ? 'text-primary' : ''}`}>
        {value}
      </span>
    </div>
  );
}

function ReceiptCard({
  title,
  subtitle,
  icon,
  breakdown,
  travelers,
  isCheaper,
  savingsPP,
  transportIcon,
  transportLabel,
  nights,
}: {
  title: string;
  subtitle: string;
  icon: string;
  breakdown: { transportPP: number; accommodationPP: number; insurancePP: number; totalPP: number; totalGroup: number };
  travelers: number;
  isCheaper: boolean;
  savingsPP: number | null;
  transportIcon: string;
  transportLabel: string;
  nights: number;
}) {
  return (
    <Card className="border-border bg-card shadow-sm overflow-hidden">
      <CardContent className="p-0">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-dashed border-border px-5 py-4">
          <div>
            <h4 className="flex items-center gap-2 text-base font-semibold text-foreground">
              <span>{icon}</span> {title}
            </h4>
            <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
          </div>
          {isCheaper && savingsPP != null && savingsPP > 0 && (
            <Badge variant="secondary" className="bg-secondary text-primary text-xs">
              Ušteda {formatCurrency(savingsPP)}/os
            </Badge>
          )}
        </div>

        {/* Line items */}
        <div className="px-5 py-2">
          <ReceiptRow icon={transportIcon} label={transportLabel} value={formatCurrency(breakdown.transportPP)} />
          <div className="border-t border-dashed border-border" />
          <ReceiptRow icon="🏨" label={`Smeštaj (${nights} ${nights === 1 ? 'noć' : 'noći'})`} value={formatCurrency(breakdown.accommodationPP)} />
          <div className="border-t border-dashed border-border" />
          <ReceiptRow icon="🛡️" label="Putno osiguranje" value={formatCurrency(breakdown.insurancePP)} highlight />
        </div>

        {/* Footer total */}
        <div className="border-t border-border bg-primary/5 px-5 py-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-foreground">Ukupno po osobi</span>
            <span className="text-xl font-bold text-primary">{formatCurrency(breakdown.totalPP)}</span>
          </div>
          {travelers > 1 && (
            <div className="mt-1 flex items-center justify-between text-sm text-muted-foreground">
              <span>Za {travelers} osobe</span>
              <span className="font-semibold">{formatCurrency(breakdown.totalGroup)}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function CostResults({ result, destination, days, travelers, flightType, onFlightTypeChange }: CostResultsProps) {
  const planeBreakdown = flightType === 'budget' ? result.planeBudget : result.planeAvg;
  const hasCar = result.car !== null;
  const nights = Math.max(days - 1, 1);

  return (
    <div className="space-y-4">
      {/* 1. Destination summary bar */}
      <Card className="border-border bg-card shadow-sm">
        <CardContent className="flex items-center justify-between px-5 py-4">
          <h3 className="text-lg font-bold text-foreground">{destination.name}</h3>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>📅 {days} {days === 1 ? 'dan' : 'dana'}</span>
            <span>👥 {travelers} {travelers === 1 ? 'osoba' : 'osobe'}</span>
          </div>
        </CardContent>
      </Card>

      {/* 2. Flight type toggle */}
      <ToggleGroup
        type="single"
        value={flightType}
        onValueChange={(v) => { if (v) onFlightTypeChange(v as 'budget' | 'avg'); }}
        className="w-full rounded-xl border border-border bg-muted p-1"
      >
        <ToggleGroupItem
          value="budget"
          className="flex-1 rounded-lg py-2.5 text-sm font-medium data-[state=on]:bg-card data-[state=on]:shadow-sm data-[state=on]:text-foreground"
        >
          ✈️ Jeftiniji letovi
        </ToggleGroupItem>
        <ToggleGroupItem
          value="avg"
          className="flex-1 rounded-lg py-2.5 text-sm font-medium data-[state=on]:bg-card data-[state=on]:shadow-sm data-[state=on]:text-foreground"
        >
          ✈️ Prosečni letovi
        </ToggleGroupItem>
      </ToggleGroup>

      {/* 3. Receipt cards — stacked */}
      <ReceiptCard
        title="Avionom"
        icon="✈️"
        subtitle={flightType === 'budget' ? 'Jeftiniji letovi (LCC)' : 'Prosečna cena leta'}
        breakdown={planeBreakdown}
        travelers={travelers}
        isCheaper={result.cheaperOption === 'plane'}
        savingsPP={result.savingsPP}
        transportIcon="🎫"
        transportLabel="Let (povratna karta)"
        nights={nights}
      />

      {hasCar && result.car && (
        <ReceiptCard
          title="Automobilom"
          icon="🚗"
          subtitle={`${destination.carKm} · ${destination.carRoute}`}
          breakdown={result.car}
          travelers={travelers}
          isCheaper={result.cheaperOption === 'car'}
          savingsPP={result.savingsPP}
          transportIcon="⛽"
          transportLabel="Gorivo + putarina"
          nights={nights}
        />
      )}

      {/* 4. Insurance nudge banner */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 px-5 py-4 text-center text-sm font-medium text-foreground">
        🛡️ Putno osiguranje je najmanji trošak vašeg putovanja — a štiti sve ostalo
      </div>
    </div>
  );
}
