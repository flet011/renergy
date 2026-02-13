import { useState, useMemo } from 'react';
import { getSupplyInsights, getSupplyKPIs } from '../data/insights';
import { operators, facilities } from '../data/facilities';
import { AlertTriangle, TrendingUp, ChevronDown, ChevronUp, Target, Shield, ExternalLink } from 'lucide-react';
import { TipLabel } from './Tooltip';
import MarketIntel from './MarketIntel';
import FacilityList from './FacilityList';
import FacilityDetail from './FacilityDetail';
import SearchFilters from './SearchFilters';

const TABS = [
  { id: 'intel', label: 'Intelligence' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'markets', label: 'Markets' },
  { id: 'competitive', label: 'Competitive' },
];

function urgencyIcon(u) {
  if (u === 'critical') return <AlertTriangle size={16} />;
  if (u === 'high') return <TrendingUp size={16} />;
  return <Target size={16} />;
}

function InsightCard({ insight }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={`insight-card insight-${insight.type} urgency-${insight.urgency}`} onClick={() => setExpanded(!expanded)}>
      <div className="insight-header">
        <div className="insight-urgency-badge">
          {urgencyIcon(insight.urgency)}
          <span>{insight.urgency}</span>
        </div>
        <span className="insight-type-badge">{insight.type}</span>
      </div>
      <h3 className="insight-title">{insight.title}</h3>
      <div className="insight-metric-row">
        <span className="insight-metric">{insight.metric}</span>
        <span className="insight-metric-label">{insight.metricLabel}</span>
      </div>
      <p className="insight-desc">{insight.description}</p>
      {expanded && (
        <div className="insight-expanded">
          <div className="insight-action">
            <strong>Recommended Action:</strong>
            <p>{insight.action}</p>
          </div>
          {insight.impact && (
            <div className="insight-impact">
              <strong>Projected Impact:</strong>
              <p>{insight.impact}</p>
            </div>
          )}
          <a
            href={`https://www.google.com/search?q=${encodeURIComponent(insight.title + ' data center market')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="deep-link"
            onClick={e => e.stopPropagation()}
          >
            <ExternalLink size={13} /> Research This Insight
          </a>
        </div>
      )}
      <div className="insight-expand-hint">
        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        <span>{expanded ? 'Collapse' : 'View action & impact'}</span>
      </div>
    </div>
  );
}

function OperatorSelector({ value, onChange }) {
  return (
    <div className="operator-selector">
      <label className="operator-label">Select Your Operator</label>
      <select value={value} onChange={e => onChange(e.target.value)} className="operator-select">
        <option value="">All Operators (Market View)</option>
        {operators.map(o => (
          <option key={o.id} value={o.id}>{o.name} — {o.type}</option>
        ))}
      </select>
    </div>
  );
}

function CompetitiveView() {
  const opData = useMemo(() => {
    return operators.map(o => {
      const facs = facilities.filter(f => f.operator === o.name);
      const avgPue = facs.length > 0 ? facs.reduce((s, f) => s + f.pue, 0) / facs.length : null;
      const totalMW = facs.reduce((s, f) => s + f.totalMW, 0);
      const availMW = facs.reduce((s, f) => s + f.availMW, 0);
      const metros = [...new Set(facs.map(f => f.metro))];
      return { ...o, avgPue, trackedMW: totalMW, trackedAvail: availMW, trackedFacilities: facs.length, metros };
    }).sort((a, b) => (b.revenue || 0) - (a.revenue || 0));
  }, []);

  return (
    <div>
      <div className="comp-header">
        <h2>Operator Competitive Landscape</h2>
        <p>10 major operators benchmarked across key metrics</p>
      </div>
      <div className="comp-table-wrap">
        <table className="comp-table">
          <thead>
            <tr>
              <th>Operator</th>
              <th>Type</th>
              <th><TipLabel k="revenue">Revenue</TipLabel></th>
              <th><TipLabel k="marketCap">Mkt Cap</TipLabel></th>
              <th><TipLabel k="totalMW">Total MW</TipLabel></th>
              <th>Tracked MW</th>
              <th><TipLabel k="PUE">PUE</TipLabel></th>
              <th><TipLabel k="renewable">Renewable</TipLabel></th>
              <th><TipLabel k="liquidCooling">Liquid Cool</TipLabel></th>
              <th><TipLabel k="dgxReady">DGX-Ready</TipLabel></th>
            </tr>
          </thead>
          <tbody>
            {opData.map(o => (
              <tr key={o.id}>
                <td className="comp-name">
                  <strong>{o.name}</strong>
                  {o.ticker && <span className="comp-ticker">{o.ticker}</span>}
                </td>
                <td><span className="comp-type-badge">{o.type}</span></td>
                <td>${o.revenue}B</td>
                <td>${o.marketCap}B</td>
                <td>{o.totalMW.toLocaleString()}</td>
                <td>{o.trackedMW.toLocaleString()}</td>
                <td className={o.avgPue && o.avgPue < 1.3 ? 'color-green' : o.avgPue && o.avgPue > 1.4 ? 'color-amber' : ''}>
                  {o.avgPue ? o.avgPue.toFixed(2) : '—'}
                </td>
                <td className={o.renewable >= 90 ? 'color-green' : o.renewable < 70 ? 'color-amber' : ''}>
                  {o.renewable}%
                </td>
                <td>{o.liquidCooling ? <span className="comp-yes">Yes</span> : <span className="comp-no">No</span>}</td>
                <td>{o.dgxReady ? <span className="comp-yes">Yes</span> : <span className="comp-no">No</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="comp-insight-box">
        <Shield size={18} />
        <div>
          <strong>Key Competitive Insight:</strong> Switch leads on efficiency (PUE 1.18) and sustainability (100% renewable).
          Equinix leads on revenue ($8.52B) and interconnection. Digital Realty leads on raw capacity (4,100 MW).
          AI workloads increasingly favor operators with PUE &lt; 1.3 and liquid cooling — this is the new table stakes.
        </div>
      </div>
    </div>
  );
}

export default function SupplyDashboard() {
  const [tab, setTab] = useState('intel');
  const [operatorId, setOperatorId] = useState('');
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [filters, setFilters] = useState({ search: '', metro: '', minMW: 0, maxPue: 2.0, liquidCooling: false, dgxReady: false, type: '' });

  const insights = useMemo(() => getSupplyInsights(operatorId), [operatorId]);
  const kpis = useMemo(() => getSupplyKPIs(operatorId), [operatorId]);

  const criticalCount = insights.filter(i => i.urgency === 'critical').length;
  const highCount = insights.filter(i => i.urgency === 'high').length;

  return (
    <div className="dashboard">
      <OperatorSelector value={operatorId} onChange={setOperatorId} />

      <section className="dash-kpis">
        {kpis.map((k, i) => (
          <div key={i} className="dash-kpi">
            <div className="dash-kpi-value">{k.value}</div>
            <div className="dash-kpi-label">{k.label}</div>
            <div className="dash-kpi-sub">{k.sub}</div>
          </div>
        ))}
      </section>

      {tab === 'intel' && criticalCount > 0 && (
        <div className="alert-banner alert-critical">
          <AlertTriangle size={18} />
          <span>{criticalCount} critical insight{criticalCount > 1 ? 's' : ''} and {highCount} high-priority action{highCount > 1 ? 's' : ''} require your attention</span>
        </div>
      )}

      <nav className="dash-nav">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`dash-nav-btn ${tab === t.id ? 'active' : ''}`}
            onClick={() => { setTab(t.id); setSelectedFacility(null); }}
          >
            {t.label}
            {t.id === 'intel' && criticalCount > 0 && <span className="nav-badge">{criticalCount + highCount}</span>}
          </button>
        ))}
      </nav>

      <div className="dash-content">
        {tab === 'intel' && (
          <div className="insights-grid">
            {insights.map(insight => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        )}

        {tab === 'portfolio' && !selectedFacility && (
          <>
            <SearchFilters filters={filters} setFilters={setFilters} />
            <FacilityList
              filters={{ ...filters, search: filters.search || (operatorId ? operators.find(o => o.id === operatorId)?.name || '' : '') }}
              onSelect={setSelectedFacility}
            />
          </>
        )}
        {tab === 'portfolio' && selectedFacility && (
          <FacilityDetail facility={selectedFacility} onBack={() => setSelectedFacility(null)} />
        )}

        {tab === 'markets' && <MarketIntel />}
        {tab === 'competitive' && <CompetitiveView />}
      </div>
    </div>
  );
}
