import { useSimulation } from './hooks/useSimulation';
import { SCREENS } from './config/constants';
import Header from './components/layout/Header';
import ScreenStepper from './components/layout/ScreenStepper';
import Footer from './components/layout/Footer';
import SetupScreen from './screens/SetupScreen';
import MapScreen from './screens/MapScreen';
import AgentLogsScreen from './screens/AgentLogsScreen';
import ApprovalScreen from './screens/ApprovalScreen';
import SummaryScreen from './screens/SummaryScreen';
import ErrorBoundary from './components/ErrorBoundary';

function ScreenRouter() {
  const { state } = useSimulation();

  switch (state.currentScreen) {
    case SCREENS.SETUP:
      return <SetupScreen />;
    case SCREENS.MAP:
      return <MapScreen />;
    case SCREENS.AGENTS:
      return <AgentLogsScreen />;
    case SCREENS.APPROVAL:
      return <ApprovalScreen />;
    case SCREENS.SUMMARY:
      return <SummaryScreen />;
    default:
      return <SetupScreen />;
  }
}

export default function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <ScreenStepper />
      <main className="flex-1 overflow-y-auto">
        <ErrorBoundary>
          <ScreenRouter />
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}
