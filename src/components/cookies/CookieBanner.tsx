import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CookiePreferences from "./CookiePreferences";
import { hasConsented, setConsent, OPEN_PREFERENCES_EVENT } from "@/lib/consent";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);

  useEffect(() => {
    setVisible(!hasConsented());
    const onOpen = () => setPrefsOpen(true);
    window.addEventListener(OPEN_PREFERENCES_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, onOpen);
  }, []);

  const acceptAll = () => {
    setConsent({ analytics: true, marketing: true });
    setVisible(false);
  };

  const rejectAll = () => {
    setConsent({ analytics: false, marketing: false });
    setVisible(false);
  };

  return (
    <>
      {visible && (
        <div
          role="dialog"
          aria-label="Obaveštenje o kolačićima"
          className="fixed bottom-4 inset-x-4 md:inset-x-auto md:right-4 md:max-w-md z-50 rounded-xl border border-border bg-card p-4 shadow-2xl"
        >
          <p className="text-sm font-semibold text-foreground mb-1">Koristimo kolačiće</p>
          <p className="text-xs text-muted-foreground mb-3">
            Koristimo kolačiće da bismo unapredili tvoje iskustvo, analizirali saobraćaj i prikazali relevantne oglase.
            Pogledaj{" "}
            <Link to="/cookie-policy" className="text-primary underline">
              politiku kolačića
            </Link>
            .
          </p>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" onClick={acceptAll} className="flex-1 min-w-[100px]">
              Prihvati sve
            </Button>
            <Button size="sm" variant="outline" onClick={rejectAll} className="flex-1 min-w-[100px]">
              Odbij sve
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setPrefsOpen(true)} className="flex-1 min-w-[100px]">
              Podesi
            </Button>
          </div>
        </div>
      )}

      <CookiePreferences
        open={prefsOpen}
        onOpenChange={setPrefsOpen}
        onSaved={() => setVisible(false)}
      />
    </>
  );
};

export default CookieBanner;
