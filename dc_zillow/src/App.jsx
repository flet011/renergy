import { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import Header from './components/Header';
import HeroStats from './components/HeroStats';
import MarketMap from './components/MarketMap';
import FacilityList from './components/FacilityList';
import FacilityDetail from './components/FacilityDetail';
import MarketIntel from './components/MarketIntel';
import GPUCompare from './components/GPUCompare';
import PipelineView from './components/PipelineView';
import SearchFilters from './components/SearchFilters';
import SupplyDashboard from './components/SupplyDashboard';
import DemandDashboard from './components/DemandDashboard';
import CapitalDashboard from './components/CapitalDashboard';
import './App.css';

const GUEST_TABS = [
  { id: 'explore', label: 'Explore' },
  { id: 'markets', label: 'Markets' },
  { id: 'gpu', label: 'GPU Cloud' },
  { id: 'pipeline', label: 'Pipeline' },
];

export default function App() {
  const [role, setRole] = useState(null);
  const [activeTab, setActiveTab] = useState('explore');
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    metro: '',
    minMW: 0,
    maxPue: 2.0,
    liquidCooling: false,
    dgxReady: false,
    type: '',
  });

  if (!role) {
    return <LoginScreen onSelectRole={setRole} />;
  }

  if (role === 'supply') {
    return (
      <div className="app">
        <Header role={role} onLogout={() => setRole(null)} />
        <SupplyDashboard />
        <footer className="app-footer">
          <p>DCZillow &mdash; AI Infrastructure Intelligence</p>
          <p className="footer-sub">Powered by PKP &bull; OSINT Data &bull; February 2026</p>
        </footer>
      </div>
    );
  }

  if (role === 'demand') {
    return (
      <div className="app">
        <Header role={role} onLogout={() => setRole(null)} />
        <DemandDashboard />
        <footer className="app-footer">
          <p>DCZillow &mdash; AI Infrastructure Intelligence</p>
          <p className="footer-sub">Powered by PKP &bull; OSINT Data &bull; February 2026</p>
        </footer>
      </div>
    );
  }

  if (role === 'capital') {
    return (
      <div className="app">
        <Header role={role} onLogout={() => setRole(null)} />
        <CapitalDashboard />
        <footer className="app-footer">
          <p>DCZillow &mdash; AI Infrastructure Intelligence</p>
          <p className="footer-sub">Powered by PKP &bull; OSINT Data &bull; February 2026</p>
        </footer>
      </div>
    );
  }

  // Guest — original browsing experience
  return (
    <div className="app">
      <Header role={role} onLogout={() => setRole(null)} />
      <HeroStats />

      <nav className="tab-bar">
        {GUEST_TABS.map(t => (
          <button
            key={t.id}
            className={`tab-btn ${activeTab === t.id ? 'active' : ''}`}
            onClick={() => { setActiveTab(t.id); setSelectedFacility(null); }}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main className="main-content">
        {activeTab === 'explore' && !selectedFacility && (
          <>
            <SearchFilters filters={filters} setFilters={setFilters} />
            <MarketMap onSelectFacility={setSelectedFacility} />
            <FacilityList filters={filters} onSelect={setSelectedFacility} />
          </>
        )}
        {activeTab === 'explore' && selectedFacility && (
          <FacilityDetail facility={selectedFacility} onBack={() => setSelectedFacility(null)} />
        )}
        {activeTab === 'markets' && <MarketIntel />}
        {activeTab === 'gpu' && <GPUCompare />}
        {activeTab === 'pipeline' && <PipelineView />}
      </main>

      <footer className="app-footer">
        <p>DCZillow &mdash; AI Infrastructure Marketplace</p>
        <p className="footer-sub">Powered by PKP &bull; OSINT Data &bull; February 2026</p>
      </footer>
    </div>
  );
}
