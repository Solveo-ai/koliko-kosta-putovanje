import { TripCalculator } from '@/components/calculator/TripCalculator';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEOHead } from '@/components/seo/SEOHead';

export default function KolikoKostaPutovanje() {
  return (
    <PageLayout>
      <SEOHead
        title="Koliko košta putovanje? | Kalkulator troškova putovanja"
        description="Izračunaj koliko košta tvoje putovanje. Proceni troškove leta, smeštaja, hrane i prevoza za najpopularnije destinacije."
        canonicalPath="/"
      />
      
      <section className="py-12 md:py-16">
        <div className="container px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              Koliko košta tvoje putovanje?
            </h1>
            <p className="mb-8 text-base text-muted-foreground md:text-lg">
              Izaberi destinaciju i saznaj okvirne troškove za prevoz, smeštaj i osiguranje.
            </p>
          </div>

          <TripCalculator />
        </div>
      </section>
    </PageLayout>
  );
}
