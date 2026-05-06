import policymarketLogo from "@/assets/policymarket-logo.svg";

export function Header() {
  return (
    <header className="bg-card border-b border-border">
      <div className="container flex h-16 items-center justify-between px-4">
        <a href="https://policymarket.shop/sr">
          <img src={policymarketLogo} alt="PolicyMarket" className="h-6" />
        </a>
        <nav className="flex items-center gap-6">
          <a
            href="https://mktg-stg.policymarket.shop/sr/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-foreground transition-colors hover:text-primary"
          >
            Kontaktirajte nas
          </a>
          <a
            href="https://mktg-stg.policymarket.shop/sr/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-foreground transition-colors hover:text-primary"
          >
            Blog
          </a>
        </nav>
      </div>
    </header>
  );
}
