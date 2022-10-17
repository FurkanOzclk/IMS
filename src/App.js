// routes
import { ReactNotifications } from 'react-notifications-component'
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <ReactNotifications />
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router />
    </ThemeProvider>
  );
}
