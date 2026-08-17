import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

import { Layout } from '@/components/Layout';
import HomePage from '@/pages/home';
import AboutPage from '@/pages/about';
import ProjectsPage from '@/pages/projects';
import NewsPage from '@/pages/news';
import ReportsPage from '@/pages/reports';
import DonatePage from '@/pages/donate';
import VolunteersPage from '@/pages/volunteers';
import PartnersPage from '@/pages/partners';
import FAQPage from '@/pages/faq';
import ContactsPage from '@/pages/contacts';
import PrivacyPage from '@/pages/privacy';
import ClubPage from '@/pages/club';

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <RoutedErrorBoundary>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/projects" component={ProjectsPage} />
          <Route path="/news" component={NewsPage} />
          <Route path="/reports" component={ReportsPage} />
          <Route path="/donate" component={DonatePage} />
          <Route path="/volunteers" component={VolunteersPage} />
          <Route path="/partners" component={PartnersPage} />
          <Route path="/faq" component={FAQPage} />
          <Route path="/contacts" component={ContactsPage} />
          <Route path="/privacy" component={PrivacyPage} />
          <Route path="/club" component={ClubPage} />
          <Route component={NotFound} />
        </Switch>
      </RoutedErrorBoundary>
    </Layout>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
