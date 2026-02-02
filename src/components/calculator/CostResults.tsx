import { useState, useEffect, useRef } from 'react';
import { CostItem, formatCurrency } from '@/lib/calculateCosts';
import { cn } from '@/lib/utils';

interface CostResultsProps {
  items: CostItem[];
  total: number;
  isVisible: boolean;
}

export function CostResults({ items, total, isVisible }: CostResultsProps) {
  const [visibleItems, setVisibleItems] = useState<number>(0);
  const [displayedTotal, setDisplayedTotal] = useState(0);
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (!isVisible) {
      setVisibleItems(0);
      setDisplayedTotal(0);
      return;
    }

    if (prefersReducedMotion.current) {
      setVisibleItems(items.length);
      setDisplayedTotal(total);
      return;
    }

    // Animate items appearing one by one
    const itemDelay = 400;
    items.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems(index + 1);
        // Accumulate total as items appear (except insurance)
        const runningTotal = items
          .slice(0, index + 1)
          .filter(item => item.showInTotal)
          .reduce((sum, item) => sum + item.value, 0);
        setDisplayedTotal(runningTotal);
      }, index * itemDelay);
    });
  }, [isVisible, items, total]);

  if (!isVisible) return null;

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={item.id}
          className={cn(
            'flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-3 transition-all duration-300',
            index < visibleItems
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none translate-y-4 opacity-0'
          )}
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">{item.icon}</span>
            <span className="text-sm font-medium text-foreground md:text-base">
              {item.label}
            </span>
          </div>
          <span className="text-sm font-semibold text-foreground md:text-base">
            {item.isPerPerson ? (
              <span className="text-muted-foreground">
                od {formatCurrency(item.value)}/osoba
              </span>
            ) : item.value > 0 ? (
              `~${formatCurrency(item.value)}`
            ) : (
              <span className="text-muted-foreground">—</span>
            )}
          </span>
        </div>
      ))}

      {/* Total */}
      <div
        className={cn(
          'mt-4 flex items-center justify-between rounded-lg bg-primary/20 px-4 py-4 transition-all duration-500',
          visibleItems >= items.length
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-4 opacity-0'
        )}
      >
        <span className="text-base font-bold text-foreground md:text-lg">
          Ukupno (bez osiguranja)
        </span>
        <span className="text-lg font-bold text-primary md:text-xl">
          ~{formatCurrency(displayedTotal)}
        </span>
      </div>
    </div>
  );
}
