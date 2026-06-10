import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { restoreConsent } from "./lib/consent";

// Restore stored consent ASAP so GTM/GA4 fire with the right state
restoreConsent();

createRoot(document.getElementById("root")!).render(<App />);
