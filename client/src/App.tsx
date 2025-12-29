import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Matches from "./pages/Matches";
import MatchDetail from "./pages/MatchDetail";
import CreateTeam from "./pages/CreateTeam";
import MyTeams from "./pages/MyTeams";
import Contests from "./pages/Contests";
import ContestDetail from "./pages/ContestDetail";
import Leaderboard from "./pages/Leaderboard";
import LiveScores from "./pages/LiveScores";
import About from "./pages/About";
import HowToPlay from "./pages/HowToPlay";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import FairPlay from "./pages/FairPlay";
import ResponsibleGaming from "./pages/ResponsibleGaming";
import Login from "./pages/Login";
import Register from "./pages/Register";

function Router() {
  return (
    <Switch>
      {/* Public Pages */}
      <Route path="/" component={Home} />
      <Route path="/matches" component={Matches} />
      <Route path="/matches/:id" component={MatchDetail} />
      <Route path="/live-scores" component={LiveScores} />
      <Route path="/contests" component={Contests} />
      <Route path="/contests/:id" component={ContestDetail} />
      <Route path="/leaderboard/:contestId" component={Leaderboard} />
      
      {/* Protected Pages */}
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/create-team/:matchId" component={CreateTeam} />
      <Route path="/my-teams" component={MyTeams} />
      
      {/* Information Pages */}
      <Route path="/about" component={About} />
      <Route path="/how-to-play" component={HowToPlay} />
      <Route path="/faq" component={FAQ} />
      <Route path="/contact" component={Contact} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/fair-play" component={FairPlay} />
      <Route path="/responsible-gaming" component={ResponsibleGaming} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      
      {/* 404 */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
