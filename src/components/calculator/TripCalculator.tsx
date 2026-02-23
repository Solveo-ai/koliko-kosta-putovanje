import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { destinations, DestinationId, AccommodationLevel } from '@/data/destinations';
import { calculateCosts, CalcResult } from '@/lib/calculateCosts';
import { TripCalculatorForm } from './TripCalculatorForm';
import { CostResults } from './CostResults';
import { MiskoQuote } from './MiskoQuote';
import { EmailCapture } from './EmailCapture';

export function TripCalculator() {
  const [destination, setDestination] = useState<DestinationId | ''>('');
  const [days, setDays] = useState(7);
  const [travelers, setTravelers] = useState(2);
  const [accomLevel, setAccomLevel] = useState<AccommodationLevel>('mid');
  const [flightType, setFlightType] = useState<'budget' | 'avg'>('budget');
  const [results, setResults] = useState<CalcResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  const selectedDestination = destination ? destinations[destination] : null;

  const handleCalculate = () => {
    if (!selectedDestination) return;
    const result = calculateCosts(selectedDestination, days, travelers, accomLevel, flightType);
    setResults(result);
    setShowResults(true);
  };

  // Recalculate when inputs change if results are already showing
  useEffect(() => {
    if (showResults && selectedDestination) {
      const result = calculateCosts(selectedDestination, days, travelers, accomLevel, flightType);
      setResults(result);
    }
  }, [destination, days, travelers, accomLevel, flightType, showResults]);

  const comparisonUrl = selectedDestination
    ? `https://app-stg.policymarket.shop/sr-RS?utm_source=calculator&utm_medium=trip-cost&utm_campaign=${selectedDestination.id}`
    : 'https://app-stg.policymarket.shop/sr-RS';

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Calculator Form */}
      <Card className="border-border bg-card shadow-sm">
        <CardContent className="p-6">
          <TripCalculatorForm
            destination={destination}
            days={days}
            travelers={travelers}
            accomLevel={accomLevel}
            onDestinationChange={setDestination}
            onDaysChange={setDays}
            onTravelersChange={setTravelers}
            onAccomLevelChange={setAccomLevel}
            onCalculate={handleCalculate}
          />
        </CardContent>
      </Card>

      {/* Results */}
      {showResults && results && selectedDestination && (
        <>
          <Card className="border-border bg-card shadow-sm">
            <CardContent className="p-6">
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                Procena troškova za {selectedDestination.name}
              </h3>
              <CostResults
                result={results}
                destination={selectedDestination}
                travelers={travelers}
                flightType={flightType}
                onFlightTypeChange={setFlightType}
              />
            </CardContent>
          </Card>

          {/* Miško Quotes */}
          <div className="space-y-4">
            <MiskoQuote
              quote="Putno osiguranje pokriva medicinske troškove u inostranstvu — do €30,000 pokrića za mali deo ukupnog budžeta."
            />
            <MiskoQuote
              quote={selectedDestination.miskoTip}
              variant="tip"
            />
          </div>

          {/* CTA Section */}
          <Card className="border-primary/30 bg-card shadow-sm">
            <CardContent className="space-y-6 p-6">
              <Button
                asChild
                size="lg"
                className="w-full text-base font-semibold"
              >
                <a
                  href={comparisonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Uporedi putno osiguranje za {selectedDestination.name} →
                </a>
              </Button>

              <div className="border-t border-border pt-6">
                <EmailCapture destination={selectedDestination.name} />
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
