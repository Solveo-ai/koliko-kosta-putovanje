import { Link } from "react-router-dom";
import policymarketLogo from "@/assets/policymarket-logo.svg";
import { Button } from "@/components/ui/button";
import { openPreferences } from "@/lib/consent";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border py-4 px-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link to="/">
            <img src={policymarketLogo} alt="PolicyMarket" className="h-7" />
          </Link>
          <Button size="sm" variant="outline" onClick={openPreferences}>
            Podešavanja kolačića
          </Button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10 space-y-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
          Politika kolačića
        </h1>

        <p className="text-sm text-muted-foreground">
          Na Sajtu koristimo ‘kolačiće’ (cookies) kako bismo unapredili našu
          uslugu i pružili Vam bolje korisničko iskustvo. Korišćenjem ovog Sajta
          pristajete na upotrebu kolačića. U nastavku se možete detaljnije
          informisati o tome šta su to kolačići, kako ih koristimo i koje su Vaše
          mogućnosti u vezi sa upotrebom kolačića.
        </p>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">
            Opšteno o kolačićima
          </h2>
          <p className="text-sm text-muted-foreground">
            Kolačići su male tekstualne datoteke koja se mogu upotrebljavati za
            prikupljanje podataka o korisnikovim aktivnostima na Sajtu. Kolačići
            se čuvaju na Vašem računaru, tabletu, mobilnom uređaju (zajednički
            nazvani ‘računar’), a čuva ih internet pretraživač korisnika prilikom
            pregledanja internet sadržaja. Kolačići omogućavaju prepoznavanje
            korisnika prilikom njegovih ponovnih poseta Sajtu, čime se poboljšava
            korisničko iskustvo.
          </p>
          <p className="text-sm text-muted-foreground">
            Kolačići prvog lica dolaze sa internet sajta koji posećujete i na taj
            način internet sajtovi prikupljaju podatke koji će Vam olakšati
            korišćenje pri svakoj novoj poseti. Kolačići trećeg lica na Vaš uređaj
            dolaze sa drugih internet mesta koja se nalaze na sajtu koji
            pregledate. Takvi su, na primer, pop-up oglasi i u tom slučaju uloga
            kolačića je da prate određeni sajt iz pozicije oglašavanja. Mi nemamo
            pristup niti kontrolu nad kolačićima trećih lica te Vas upućujemo da
            se upoznate sa odgovarajućim pravilima o kolačićima trećih strana.
          </p>
          <p className="text-sm text-muted-foreground">
            Kolačići takođe mogu biti privremeni ili trajni. Privremeni kolačići
            ili kolačići sesije uklanjaju se sa Vašeg uređaja u trenutku zatvaranja
            internet pretraživača koji ste koristili za pregled Sajta. Uz pomoć
            ovih kolačića, prikupljaju se privremeni podaci. Trajni ili sačuvani
            kolačići ostaju na Vašem uređaju i nakon zatvaranja internet
            pretraživača. Uz pomoć ovih kolačića internet sajtovi prikupljaju
            podatke kako bi Vam se olakšalo korišćenje. Primera radi, internet
            sajtovi koje zahtevaju unos korisničkog imena i lozinke ‘pamtiće’ Vaš
            unos koji će se pojavljivati pri svakoj novoj poseti istom sajtu.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">
            Kako koristimo kolačiće na ovom sajtu
          </h2>
          <p className="text-sm text-muted-foreground">
            Neki kolačići koje koristimo neophodni su za pravilno funkcionisanje
            određenih usluga, a drugi se koriste za prikupljanje informacija o
            korišćenju Sajta (statistiku), kako bismo mogli da ga prilagodimo
            potrebama svojih korisnika.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Funkcionalni kolačići</strong> su
            neophodni za korišćenje Sajta odnosno njegovih funkcionalnosti u punom
            obimu, tj. neophodni su za kvalitetan i ispravan rad Sajta i korisniku
            omogućavaju pristup svim našim uslugama. U posebnu grupu funkcionalnih
            kolačića spadaju i bezbednosni tokeni koje koristimo npr. za token
            prilikom autentifikacije.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Preferencijalni kolačići</strong>{" "}
            koriste se za čuvanje nekih korisničkih podešavanja, kako bi se pre
            svega poboljšalo korisničko iskustvo. Brisanjem ovih kolačića može
            učiniti rad sajta nefunkcionalnim, ali ne bi trebalo da potpuno
            onemoguće njegovo korišćenje.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Kolačići efikasnosti</strong>{" "}
            koriste se za unapređenje radnih osobina internet stranice, za
            poboljšanje doživljaja korisnika, itd.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">
            Upotreba Google Analytics-a
          </h2>
          <p className="text-sm text-muted-foreground">
            Naš Sajt koristi Google Analytics, analitičku uslugu kompanije Google
            Inc. (‘Google’). Google Analytics može koristiti kolačiće, koji
            analiziraju Vaše korišćenje Sajta. Informacije iz kolačića obično se
            prenose na Google server u SAD i tamo se čuvaju. U slučaju
            skraćivanja IP adrese u anonimnu na ovom sajtu, cela IP adresa će
            biti skraćena unutar zemalja-članica Evropske unije ili druge države
            u ovom Sporazumu o Evropskom ekonomskom prostoru. Puna IP adresa
            biće preneta na Google server u SAD i skraćena samo u izuzetnim
            slučajevima. Po nalogu administratora sajta, Google će koristiti ove
            informacije za procenu Vašeg korišćenja Sajta, pripremu izveštaja o
            aktivnostima na sajtu i pružanje usluga vezanih za Sajt i internet
            administratoru Sajta. Vaša IP adresa neće biti povezana sa ostalim
            Google podacima. Možete sprečiti prikupljanje podataka iz kolačića o
            Vašem korišćenju Sajta (uključujući Vašu IP adresu) i obradu ovih
            podataka od strane Google-a tako što ćete preuzeti i instalirati
            ‘Opt-out’ dodatak za pretraživač, na sledećem linku:{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              Google Analytics Opt-out Browser Add-on
            </a>
            . Za više informacija posetite{" "}
            <a
              href="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              Google Analytics Cookie Usage on Websites
            </a>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">
            Korišćenje društvenih mreža
          </h2>
          <p className="text-sm text-muted-foreground">
            U naš Sajt uključili smo tzv. plug-in za društvene mreže: facebook.com
            (u daljem tekstu ‘Društvene mreže’), X itd. Kada posetite sajt, koji ima
            takav plug-in, pretraživač koji koristite preuzima vizuelni prikaz
            plug-in sa Facebooka, X, itd. servera. Na taj način ti serveri bivaju
            obavešteni da ste upravo posetili Sajt. Ako ste se prijavili na
            Facebook, platforma će preko plug-in prepoznati koju internet stranicu
            našeg Sajta posećujete i povezati je sa Vašim ličnim nalogom na
            Facebooku. Ako kliknete ‘like’ (‘Sviđa mi se’) ili slično dugme na
            platformama društvenih medija ili date komentar, plug-in će poslati ove
            podatke na Vaš lični nalog npr. na Facebooku i sačuvati ih tamo. Pored
            toga, informacija da ste posetili naš Sajt prenosi se na platformu
            društvenih mreža, bez obzira da li ste pritisnuli neki plug-in ili ne.
            Kako biste sprečili prenos i čuvanje podataka o Vama i Vašem
            surfovanju na Facebooku i drugim mrežama, odjavite se iz društvenih
            mreža pre posete našem sajtu. Za više informacija o prikupljanju i
            korišćenju podataka, pogledajte politike privatnosti kod Facebooka, X
            itd.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">
            Vaše opcije u vezi sa korišćenjem kolačića
          </h2>
          <p className="text-sm text-muted-foreground">
            Kolačiće se mogu kontrolisati i konfigurisati u internet pretraživaču
            koji koristite. Ukoliko se odlučite da onemogućite korišćenje
            kolačića ili da obrišete ranije instalirane kolačiće, neki delovi Sajta
            možda neće pravilno funkcionisati ili bi od Vas moglo da bude zatraženo
            da ponovo unesete neke lične podatke, kako biste dobili pristup
            ograničenim delovima Sajta.
          </p>
          <p className="text-sm text-muted-foreground">
            Više o kolačićima i o tome kako ih obrisati i njima upravljati, možete
            da saznate na sledećim linkovima:
          </p>
          <ul className="list-disc list-inside text-sm text-primary space-y-1 ml-2">
            <li>
              <a
                href="https://support.google.com/chrome/answer/95647"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Google Chrome
              </a>
            </li>
            <li>
              <a
                href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Microsoft Edge
              </a>
            </li>
            <li>
              <a
                href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Firefox
              </a>
            </li>
          </ul>
          <p className="text-sm text-muted-foreground">
            O upravljanju kolačićima u ostalim internet pretraživačima, možete se
            informisati klikom na ‘Pomoć’ u meniju odabranog internet
            pretraživača.
          </p>
          <div className="pt-2">
            <Button onClick={openPreferences}>
              Otvori podešavanja kolačića
            </Button>
          </div>
        </section>

        <div className="pt-6">
          <Link to="/" className="text-sm text-primary underline">
            ← Nazad na početnu
          </Link>
        </div>
      </main>
    </div>
  );
};

export default CookiePolicy;
