import miskoAvatar from '@/assets/misko-avatar.png';

interface MiskoQuoteProps {
  quote: string;
  variant?: 'default' | 'tip';
}

export function MiskoQuote({ quote, variant = 'default' }: MiskoQuoteProps) {
  return (
    <div className="flex items-start gap-4 rounded-lg border border-border bg-card p-4 md:p-5">
      <img
        src={miskoAvatar}
        alt="Miško"
        className="h-10 w-10 flex-shrink-0 rounded-full md:h-12 md:w-12"
      />
      <p className="text-sm leading-relaxed text-foreground md:text-base">
        {variant === 'tip' && <span className="mr-1">💡</span>}
        {quote}
      </p>
    </div>
  );
}
