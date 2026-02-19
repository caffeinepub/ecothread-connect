import HeroSection from './components/HeroSection';
import MaterialGradeDashboard from './components/MaterialGradeDashboard';
import GreenCreditWallet from './components/GreenCreditWallet';
import ScrapMap from './components/ScrapMap';
import Footer from './components/Footer';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <div id="material-guide">
        <MaterialGradeDashboard />
      </div>
      <div id="green-credits">
        <GreenCreditWallet />
      </div>
      <ScrapMap />
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
