import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="bg-card border-b border-border">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center">
          <span className="text-xl tracking-tight text-foreground">
            <span className="font-normal">policy</span>
            <span className="font-bold">market</span>
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          <a
            href="https://policymarket.rs/kontakt"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-foreground transition-colors hover:text-primary"
          >
            Kontaktirajte nas
          </a>
          <a
            href="https://policymarket.rs/blog"
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
