import { TripCalculator } from '@/components/calculator/TripCalculator';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEOHead } from '@/components/seo/SEOHead';
import { destinations, DestinationId } from '@/data/destinations';

interface DestinationPageProps {
  destinationId: DestinationId;
}

export function DestinationPage({ destinationId }: DestinationPageProps) {
  const destination = destinations[destinationId];

  return (
    <PageLayout>
      <SEOHead
        title={destination.metaTitle}
        description={destination.metaDescription}
        canonicalPath={`/${destination.slug}`}
      />
      
      <section className="py-12 md:py-16">
        <div className="container px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              Koliko košta putovanje u {destination.name}?
            </h1>
            <p className="mb-8 text-base text-muted-foreground md:text-lg">
              Izračunaj okvirne troškove za letove, smeštaj, hranu i prevoz u {destination.name.toLowerCase()}.
            </p>
          </div>

          <TripCalculator 
            defaultDestination={destinationId} 
            autoCalculate={true}
          />
        </div>
      </section>
    </PageLayout>
  );
}

// Export individual page components for routing
export function GrckaPage() {
  return <DestinationPage destinationId="grcka" />;
}

export function TurskaPage() {
  return <DestinationPage destinationId="turska" />;
}

export function EgipatPage() {
  return <DestinationPage destinationId="egipat" />;
}

export function SpanijaPage() {
  return <DestinationPage destinationId="spanija" />;
}

export function ItalijaPage() {
  return <DestinationPage destinationId="italija" />;
}

export function CrnaGoraPage() {
  return <DestinationPage destinationId="crna-gora" />;
}
