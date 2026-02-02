export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-8">
      <div className="container px-4 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} PolicyMarket. Sva prava zadržana.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Podaci su okvirne procene i mogu varirati u zavisnosti od datuma, dostupnosti i drugih faktora.
        </p>
      </div>
    </footer>
  );
}
