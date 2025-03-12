
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import EmailVerificationPage from "./pages/EmailVerification";
import SSOCallbackPage from "./pages/SSOCallback";
import TutorsList from "./pages/TutorsList";

const queryClient = new QueryClient();

// Rather than using an environment variable that doesn't exist, 
// we'll use a temporary dummy key for demo purposes
const CLERK_PUBLISHABLE_KEY = "pk_test_placeholder-key-for-demo-purposes";

const App = () => (
  <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/verify" element={<EmailVerificationPage />} />
            <Route path="/sso-callback" element={<SSOCallbackPage />} />
            <Route path="/tutors" element={<TutorsList />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ClerkProvider>
);

export default App;
