import { Link } from 'react-router-dom';
import miskoAvatar from '@/assets/misko-avatar.png';

export function Header() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={miskoAvatar} alt="PolicyMarket" className="h-8 w-8 rounded-full" />
          <span className="text-lg font-bold text-foreground">PolicyMarket</span>
        </Link>
        <nav>
          <a
            href="https://policymarket.rs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Nazad na sajt →
          </a>
        </nav>
      </div>
    </header>
  );
}
