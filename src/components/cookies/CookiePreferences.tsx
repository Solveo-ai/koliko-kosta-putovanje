import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getConsent, setConsent, type ConsentPrefs } from "@/lib/consent";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved?: () => void;
};

const CookiePreferences = ({ open, onOpenChange, onSaved }: Props) => {
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (open) {
      const existing = getConsent();
      setAnalytics(existing?.analytics ?? false);
      setMarketing(existing?.marketing ?? false);
    }
  }, [open]);

  const save = (prefs: ConsentPrefs) => {
    setConsent(prefs);
    onSaved?.();
    onOpenChange(false);
    if (prefs.analytics || prefs.marketing) {
      window.location.reload();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Podešavanja kolačića</DialogTitle>
          <DialogDescription>
            Izaberi koje kategorije kolačića dozvoljavaš. Više informacija pročitaj u{" "}
            <Link to="/cookie-policy" className="text-primary underline" onClick={() => onOpenChange(false)}>
              politici kolačića
            </Link>
            .
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="flex items-start justify-between gap-4 rounded-lg border border-border p-3">
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Neophodni</p>
              <p className="text-xs text-muted-foreground">
                Potrebni za osnovne funkcije sajta. Ne mogu se isključiti.
              </p>
            </div>
            <Switch checked disabled />
          </div>

          <div className="flex items-start justify-between gap-4 rounded-lg border border-border p-3">
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Analitika</p>
              <p className="text-xs text-muted-foreground">
                Pomažu nam da razumemo kako koristiš sajt (Google Analytics).
              </p>
            </div>
            <Switch checked={analytics} onCheckedChange={setAnalytics} />
          </div>

          <div className="flex items-start justify-between gap-4 rounded-lg border border-border p-3">
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Marketing</p>
              <p className="text-xs text-muted-foreground">
                Koriste se za personalizovane oglase i merenje kampanja.
              </p>
            </div>
            <Switch checked={marketing} onCheckedChange={setMarketing} />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button variant="outline" onClick={() => save({ analytics: false, marketing: false })}>
            Odbij sve
          </Button>
          <Button variant="outline" onClick={() => save({ analytics, marketing })}>
            Sačuvaj izbor
          </Button>
          <Button onClick={() => save({ analytics: true, marketing: true })}>Prihvati sve</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CookiePreferences;
