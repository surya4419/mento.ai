import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TavusProvider, TavusErrorBoundary } from "./contexts/TavusContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import Navigation from "./components/Navigation";
import Landing from "./pages/Landing";
import Session from "./pages/Session";
import Dashboard from "./pages/Dashboard";
import Library from "./pages/Library";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      retryDelay: 1000,
    },
  },
});

const App = () => (
  <ErrorBoundary fallback={
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h2 className="text-xl font-semibold">Application Error</h2>
        <p className="text-muted-foreground">Something went wrong. Please refresh the page.</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-zeo-primary text-white rounded-lg hover:bg-zeo-primary/90"
        >
          Refresh Page
        </button>
      </div>
    </div>
  }>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <TavusProvider>
            <div className="min-h-screen">
              <Navigation />
              {/* Spacer to prevent content from being hidden behind fixed navbar */}
              <div className="h-16" />
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/session" element={
                  <ErrorBoundary fallback={
                    <div className="min-h-screen flex items-center justify-center p-4">
                      <div className="text-center space-y-4">
                        <h2 className="text-xl font-semibold">Session Error</h2>
                        <p className="text-muted-foreground">There was an issue with the session. Please try again.</p>
                        <button 
                          onClick={() => window.location.href = '/'}
                          className="px-4 py-2 bg-zeo-primary text-white rounded-lg hover:bg-zeo-primary/90"
                        >
                          Return Home
                        </button>
                      </div>
                    </div>
                  }>
                    <Session />
                  </ErrorBoundary>
                } />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/library" element={<Library />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </TavusProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
