import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { destinationList, travelStyles, DestinationId, TravelStyle } from '@/data/destinations';

interface TripCalculatorFormProps {
  destination: DestinationId | '';
  days: number;
  travelers: number;
  style: TravelStyle;
  onDestinationChange: (value: DestinationId) => void;
  onDaysChange: (value: number) => void;
  onTravelersChange: (value: number) => void;
  onStyleChange: (value: TravelStyle) => void;
  onCalculate: () => void;
  isDestinationLocked?: boolean;
}

export function TripCalculatorForm({
  destination,
  days,
  travelers,
  style,
  onDestinationChange,
  onDaysChange,
  onTravelersChange,
  onStyleChange,
  onCalculate,
  isDestinationLocked = false,
}: TripCalculatorFormProps) {
  return (
    <div className="space-y-6">
      {/* Destination */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground">Destinacija</Label>
        <Select
          value={destination}
          onValueChange={(value) => onDestinationChange(value as DestinationId)}
          disabled={isDestinationLocked}
        >
          <SelectTrigger className="w-full bg-secondary/50 text-foreground">
            <SelectValue placeholder="Izaberi destinaciju" />
          </SelectTrigger>
          <SelectContent>
            {destinationList.map((dest) => (
              <SelectItem key={dest.id} value={dest.id}>
                {dest.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Days slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-foreground">Broj dana</Label>
          <span className="text-lg font-bold text-primary">{days}</span>
        </div>
        <Slider
          value={[days]}
          onValueChange={(value) => onDaysChange(value[0])}
          min={3}
          max={21}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>3 dana</span>
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
          <SelectTrigger className="w-full bg-secondary/50 text-foreground">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {num} {num === 1 ? 'osoba' : num < 5 ? 'osobe' : 'osoba'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Travel style */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-foreground">Stil putovanja</Label>
        <RadioGroup
          value={style}
          onValueChange={(value) => onStyleChange(value as TravelStyle)}
          className="flex flex-wrap gap-3"
        >
          {travelStyles.map((s) => (
            <div key={s.id} className="flex items-center">
              <RadioGroupItem
                value={s.id}
                id={s.id}
                className="peer sr-only"
              />
              <Label
                htmlFor={s.id}
                className="cursor-pointer rounded-lg border border-border bg-secondary/30 px-4 py-2 text-sm font-medium text-foreground transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/20 peer-data-[state=checked]:text-primary hover:bg-secondary/50"
              >
                {s.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
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
