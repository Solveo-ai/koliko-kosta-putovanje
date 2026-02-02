import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { destinations, DestinationId, TravelStyle } from '@/data/destinations';
import { calculateCosts, getCostItems, CostBreakdown } from '@/lib/calculateCosts';
import { TripCalculatorForm } from './TripCalculatorForm';
import { CostResults } from './CostResults';
import { MiskoQuote } from './MiskoQuote';
import { EmailCapture } from './EmailCapture';

interface TripCalculatorProps {
  defaultDestination?: DestinationId;
  autoCalculate?: boolean;
}

export function TripCalculator({ defaultDestination, autoCalculate = false }: TripCalculatorProps) {
  const [destination, setDestination] = useState<DestinationId | ''>(defaultDestination || '');
  const [days, setDays] = useState(7);
  const [travelers, setTravelers] = useState(2);
  const [style, setStyle] = useState<TravelStyle>('midrange');
  const [results, setResults] = useState<CostBreakdown | null>(null);
  const [showResults, setShowResults] = useState(false);

  const selectedDestination = destination ? destinations[destination] : null;

  const handleCalculate = () => {
    if (!selectedDestination) return;
    
    const breakdown = calculateCosts(selectedDestination, days, travelers, style);
    setResults(breakdown);
    setShowResults(true);
  };

  // Auto-calculate on mount for destination-specific pages
  useEffect(() => {
    if (autoCalculate && defaultDestination) {
      handleCalculate();
    }
  }, []);

  // Recalculate when inputs change if results are already showing
  useEffect(() => {
    if (showResults && selectedDestination) {
      const breakdown = calculateCosts(selectedDestination, days, travelers, style);
      setResults(breakdown);
    }
  }, [destination, days, travelers, style, showResults]);

  const costItems = results && selectedDestination 
    ? getCostItems(results, selectedDestination.costs.isEU)
    : [];

  const comparisonUrl = selectedDestination
    ? `${selectedDestination.comparisonUrl}&utm_source=calculator&utm_medium=trip-cost&utm_campaign=${selectedDestination.id}`
    : '#';

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Calculator Form */}
      <Card className="border-border/50 bg-card">
        <CardContent className="p-6">
          <TripCalculatorForm
            destination={destination}
            days={days}
            travelers={travelers}
            style={style}
            onDestinationChange={setDestination}
            onDaysChange={setDays}
            onTravelersChange={setTravelers}
            onStyleChange={setStyle}
            onCalculate={handleCalculate}
            isDestinationLocked={!!defaultDestination}
          />
        </CardContent>
      </Card>

      {/* Results */}
      {showResults && results && selectedDestination && (
        <>
          <Card className="border-border/50 bg-card">
            <CardContent className="p-6">
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                Procena troškova za {selectedDestination.name}
              </h3>
              <CostResults
                items={costItems}
                total={results.total}
                isVisible={showResults}
              />
            </CardContent>
          </Card>

          {/* Miško Quotes */}
          <div className="space-y-4">
            <MiskoQuote
              quote="Osiguranje je manje od 1% ukupnog troška — a pokriva medicinske račune do €30,000."
            />
            <MiskoQuote
              quote={selectedDestination.miskoTip}
              variant="tip"
            />
          </div>

          {/* CTA Section */}
          <Card className="border-primary/30 bg-card">
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
