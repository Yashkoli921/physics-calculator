import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import { AuthProvider } from "@/hooks/use-auth";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import ProfilePage from "@/pages/profile-page";
import PhysicsCalculatorPage from "@/pages/physics-calculator-page";
import ScientificCalculatorPage from "@/pages/scientific-calculator-page";
import GraphCalculatorPage from "@/pages/graph-calculator-page";
import FinancialCalculatorPage from "@/pages/financial-calculator-page";
import { ProtectedRoute } from "@/lib/protected-route";
import { ThemeProvider } from "@/hooks/use-theme";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/physics" component={PhysicsCalculatorPage} />
      <Route path="/scientific" component={ScientificCalculatorPage} />
      <Route path="/graph" component={GraphCalculatorPage} />
      <Route path="/financial" component={FinancialCalculatorPage} />
      <ProtectedRoute path="/profile" component={ProfilePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <Router />
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
