import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface EmailCaptureProps {
  destination: string;
}

export function EmailCapture({ destination }: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    try {
      const res = await fetch(
        `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/functions/v1/submit-travel-cost-email`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || 'Greška pri slanju');
      }

      toast.success('Plan poslat na tvoj email!', {
        description: `Poslali smo detaljan plan za ${destination} na ${email}`,
      });
      setEmail('');
    } catch (err: any) {
      toast.error('Nije uspelo slanje', {
        description: err?.message || 'Pokušaj ponovo kasnije.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          type="email"
          placeholder="tvoj@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 bg-secondary/50 text-foreground placeholder:text-muted-foreground"
        />
        <Button
          type="submit"
          variant="secondary"
          disabled={isSubmitting}
          className="whitespace-nowrap"
        >
          📧 Pošalji sebi plan
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Dobićeš detaljan pregled troškova na email. Bez spam-a.
      </p>
    </form>
  );
}
