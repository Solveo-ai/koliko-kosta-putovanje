import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import KolikoKostaPutovanje from "./pages/KolikoKostaPutovanje";
import {
  GrckaPage,
  TurskaPage,
  EgipatPage,
  SpanijaPage,
  ItalijaPage,
  CrnaGoraPage,
} from "./pages/DestinationPages";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Redirect root to main calculator */}
          <Route path="/" element={<Navigate to="/koliko-kosta-putovanje" replace />} />
          
          {/* Main calculator page */}
          <Route path="/koliko-kosta-putovanje" element={<KolikoKostaPutovanje />} />
          
          {/* Destination-specific pages */}
          <Route path="/koliko-kosta-putovanje-u-grcku" element={<GrckaPage />} />
          <Route path="/koliko-kosta-putovanje-u-tursku" element={<TurskaPage />} />
          <Route path="/koliko-kosta-putovanje-u-egipat" element={<EgipatPage />} />
          <Route path="/koliko-kosta-putovanje-u-spaniju" element={<SpanijaPage />} />
          <Route path="/koliko-kosta-putovanje-u-italiju" element={<ItalijaPage />} />
          <Route path="/koliko-kosta-putovanje-u-crnu-goru" element={<CrnaGoraPage />} />
          
          {/* Catch-all 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
