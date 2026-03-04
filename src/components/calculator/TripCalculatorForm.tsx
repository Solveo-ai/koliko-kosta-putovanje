import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { destinationGroups, accommodationLevels, DestinationId, AccommodationLevel } from '@/data/destinations';

interface TripCalculatorFormProps {
  destination: DestinationId | '';
  days: number;
  travelers: number;
  accomLevel: AccommodationLevel;
  onDestinationChange: (value: DestinationId) => void;
  onDaysChange: (value: number) => void;
  onTravelersChange: (value: number) => void;
  onAccomLevelChange: (value: AccommodationLevel) => void;
  onCalculate: () => void;
}

export function TripCalculatorForm({
  destination,
  days,
  travelers,
  accomLevel,
  onDestinationChange,
  onDaysChange,
  onTravelersChange,
  onAccomLevelChange,
  onCalculate,
}: TripCalculatorFormProps) {
  return (
    <div className="space-y-6">
      {/* Destination (grouped) */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground">Destinacija</Label>
        <Select
          value={destination}
          onValueChange={(value) => onDestinationChange(value as DestinationId)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Izaberi destinaciju" />
          </SelectTrigger>
          <SelectContent>
            {destinationGroups.map((group) => (
              <SelectGroup key={group.label}>
                <SelectLabel>{group.label}</SelectLabel>
                {group.destinations.map((dest) => (
                  <SelectItem key={dest.id} value={dest.id}>
                    {dest.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Days slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-foreground">Broj dana</Label>
          <span className="text-lg font-bold text-primary">{days} {days === 1 ? 'dan' : 'dana'}</span>
        </div>
        <Slider
          value={[days]}
          onValueChange={(value) => onDaysChange(value[0])}
          min={1}
          max={21}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>1 dan</span>
          <span>21 dan</span>
        </div>
      </div>

      {/* Travelers */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground">Putnika</Label>
        <Select
          value={travelers.toString()}
          onValueChange={(value) => onTravelersChange(parseInt(value, 10))}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {num} {num === 1 ? 'osoba' : num < 5 ? 'osobe' : 'osoba'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Accommodation level toggle */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-foreground">Nivo smeštaja</Label>
        <ToggleGroup
          type="single"
          value={accomLevel}
          onValueChange={(v) => { if (v) onAccomLevelChange(v as AccommodationLevel); }}
          className="grid grid-cols-3 w-full gap-0 rounded-xl border border-border bg-muted p-1"
        >
          {accommodationLevels.map((t) => (
            <ToggleGroupItem
              key={t.id}
              value={t.id}
              className="flex-col gap-0.5 rounded-lg border-0 bg-transparent px-2 py-2.5 shadow-none transition-all data-[state=on]:bg-card data-[state=on]:shadow-sm data-[state=on]:border data-[state=on]:border-border"
            >
              <span className="text-xs sm:text-sm font-semibold leading-tight text-center">{t.label}</span>
              <span className="text-[10px] sm:text-[11px] leading-tight text-muted-foreground text-center">{t.description}</span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      {/* Calculate button */}
      <Button
        onClick={onCalculate}
        disabled={!destination}
        size="lg"
        className="w-full text-base font-semibold"
      >
        Izračunaj troškove
      </Button>
    </div>
  );
}
