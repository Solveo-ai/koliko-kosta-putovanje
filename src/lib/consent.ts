// Cookie consent helper with Google Consent Mode v2 integration

export type ConsentPrefs = {
  analytics: boolean;
  marketing: boolean;
};

export type StoredConsent = ConsentPrefs & {
  version: number;
  timestamp: number;
};

const STORAGE_KEY = "pm_cookie_consent_v1";
const CONSENT_VERSION = 1;

export const CONSENT_UPDATED_EVENT = "pm:consent-updated";
export const OPEN_PREFERENCES_EVENT = "pm:open-cookie-preferences";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

export function getConsent(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function hasConsented(): boolean {
  return getConsent() !== null;
}

export function setConsent(prefs: ConsentPrefs) {
  if (typeof window === "undefined") return;
  const stored: StoredConsent = {
    ...prefs,
    version: CONSENT_VERSION,
    timestamp: Date.now(),
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    /* ignore */
  }

  gtag("consent", "update", {
    ad_storage: prefs.marketing ? "granted" : "denied",
    ad_user_data: prefs.marketing ? "granted" : "denied",
    ad_personalization: prefs.marketing ? "granted" : "denied",
    analytics_storage: prefs.analytics ? "granted" : "denied",
  });

  window.dispatchEvent(new CustomEvent(CONSENT_UPDATED_EVENT, { detail: stored }));
}

export function openPreferences() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_PREFERENCES_EVENT));
}
