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
}: TripCalculatorFormProps) {
  return (
    <div className="space-y-6">
      {/* Destination */}
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
          <SelectTrigger className="w-full">
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
          className="grid gap-3"
        >
          {travelStyles.map((s) => (
            <div key={s.id} className="flex items-start">
              <RadioGroupItem
                value={s.id}
                id={s.id}
                className="peer sr-only"
              />
              <Label
                htmlFor={s.id}
                className="flex w-full cursor-pointer flex-col gap-1 rounded-lg border border-border bg-card px-4 py-3 transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-secondary hover:bg-muted"
              >
                <span className="font-medium text-foreground">{s.label}</span>
                <span className="text-xs text-muted-foreground">{s.description}</span>
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
