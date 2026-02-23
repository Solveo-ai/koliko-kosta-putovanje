import { CalcResult, formatCurrency, InsurerRow, AccommodationTier } from '@/lib/calculateCosts';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Destination } from '@/data/destinations';

interface CostResultsProps {
  result: CalcResult;
  destination: Destination;
  travelers: number;
  flightType: 'budget' | 'avg';
  onFlightTypeChange: (type: 'budget' | 'avg') => void;
}

function TransportCard({
  title,
  icon,
  breakdown,
  travelers,
  isCheaper,
  savingsPP,
  otherLabel,
  extraInfo,
  flightToggle,
}: {
  title: string;
  icon: string;
  breakdown: { transportPP: number; accommodationPP: number; insurancePP: number; totalPP: number; totalGroup: number };
  travelers: number;
  isCheaper: boolean;
  savingsPP: number | null;
  otherLabel: string;
  extraInfo?: string;
  flightToggle?: React.ReactNode;
}) {
  return (
    <Card className="flex-1 border-border bg-card shadow-sm">
      <CardContent className="p-4 md:p-5">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="flex items-center gap-2 text-base font-semibold text-foreground">
            <span>{icon}</span> {title}
          </h4>
          {isCheaper && savingsPP != null && savingsPP > 0 && (
            <Badge variant="secondary" className="bg-secondary text-primary">
              Ušteda {formatCurrency(savingsPP)}/os
            </Badge>
          )}
        </div>

        {flightToggle}
        {extraInfo && (
          <p className="mb-3 text-xs text-muted-foreground">{extraInfo}</p>
        )}

        <div className="space-y-2">
          <Row label="Prevoz" value={formatCurrency(breakdown.transportPP)} sub="/os" />
          <Row label="Smeštaj" value={formatCurrency(breakdown.accommodationPP)} sub="/os" />
          <Row label="Osiguranje" value={formatCurrency(breakdown.insurancePP)} sub="/os prosek" />
        </div>

        <div className="mt-4 rounded-lg bg-primary/10 p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-foreground">Ukupno po osobi</span>
            <span className="text-lg font-bold text-primary">{formatCurrency(breakdown.totalPP)}</span>
          </div>
          {travelers > 1 && (
            <div className="mt-1 flex items-center justify-between text-sm text-muted-foreground">
              <span>Ukupno za {travelers} osobe</span>
              <span className="font-semibold">{formatCurrency(breakdown.totalGroup)}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function Row({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">
        {value}
        {sub && <span className="ml-1 text-xs text-muted-foreground">{sub}</span>}
      </span>
    </div>
  );
}

function InsuranceTable({ rows }: { rows: InsurerRow[] }) {
  return (
    <Card className="border-border bg-card shadow-sm">
      <CardContent className="p-4 md:p-5">
        <h4 className="mb-3 text-base font-semibold text-foreground">🛡️ Poređenje osiguranja</h4>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-muted-foreground">Osiguravač</TableHead>
              <TableHead className="text-right text-muted-foreground">Dnevno</TableHead>
              <TableHead className="text-right text-muted-foreground">Ukupno</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map(r => (
              <TableRow key={r.name}>
                <TableCell className="font-medium text-foreground">{r.name}</TableCell>
                <TableCell className="text-right text-foreground">{formatCurrency(r.dailyRate)}</TableCell>
                <TableCell className="text-right font-semibold text-foreground">{formatCurrency(r.total)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function AccommodationBreakdown({ tiers }: { tiers: AccommodationTier[] }) {
  return (
    <Card className="border-border bg-card shadow-sm">
      <CardContent className="p-4 md:p-5">
        <h4 className="mb-3 text-base font-semibold text-foreground">🏨 Smeštaj po kategorijama</h4>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-muted-foreground">Kategorija</TableHead>
              <TableHead className="text-right text-muted-foreground">Po noći/os</TableHead>
              <TableHead className="text-right text-muted-foreground">Ukupno/os</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tiers.map(t => (
              <TableRow key={t.tier}>
                <TableCell className="font-medium text-foreground">{t.tier}</TableCell>
                <TableCell className="text-right text-foreground">{formatCurrency(t.perNight)}</TableCell>
                <TableCell className="text-right font-semibold text-foreground">{formatCurrency(t.total)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export function CostResults({ result, destination, travelers, flightType, onFlightTypeChange }: CostResultsProps) {
  const planeBreakdown = flightType === 'budget' ? result.planeBudget : result.planeAvg;
  const hasCar = result.car !== null;

  const flightToggle = (
    <div className="mb-3">
      <ToggleGroup
        type="single"
        value={flightType}
        onValueChange={(v) => { if (v) onFlightTypeChange(v as 'budget' | 'avg'); }}
        className="w-full"
      >
        <ToggleGroupItem value="budget" className="flex-1 text-xs">Budget LCC</ToggleGroupItem>
        <ToggleGroupItem value="avg" className="flex-1 text-xs">Prosečna cena</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Transport cards */}
      <div className={hasCar ? 'grid gap-4 md:grid-cols-2' : ''}>
        <TransportCard
          title="Avionom"
          icon="✈️"
          breakdown={planeBreakdown}
          travelers={travelers}
          isCheaper={result.cheaperOption === 'plane'}
          savingsPP={result.savingsPP}
          otherLabel="auto"
          flightToggle={flightToggle}
        />
        {hasCar && result.car && (
          <TransportCard
            title="Automobilom"
            icon="🚗"
            breakdown={result.car}
            travelers={travelers}
            isCheaper={result.cheaperOption === 'car'}
            savingsPP={result.savingsPP}
            otherLabel="avion"
            extraInfo={`${destination.carKm} · ${destination.carRoute} · ${formatCurrency(destination.carTotal!)} ukupno za vozilo`}
          />
        )}
      </div>

      {!hasCar && (
        <p className="text-center text-sm text-muted-foreground">
          Ova destinacija je najisplativija avionom iz Beograda.
        </p>
      )}

      {/* Insurance comparison table */}
      <InsuranceTable rows={result.insurerTable} />

      {/* Accommodation tier breakdown */}
      <AccommodationBreakdown tiers={result.accommodationTiers} />
    </div>
  );
}
