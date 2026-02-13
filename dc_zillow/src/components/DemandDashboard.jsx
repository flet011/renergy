import { useState, useMemo } from 'react';
import { getDemandInsights, getDemandKPIs, getFacilityRecommendations } from '../data/insights';
import { markets } from '../data/markets';
import { AlertTriangle, TrendingUp, ChevronDown, ChevronUp, Target, Cpu, MapPin, DollarSign, Clock, ExternalLink } from 'lucide-react';
import { Tip, TipLabel } from './Tooltip';
import GPUCompare from './GPUCompare';
import MarketIntel from './MarketIntel';
import FacilityDetail from './FacilityDetail';

const TABS = [
  { id: 'intel', label: 'Intelligence' },
  { id: 'find', label: 'Find Capacity' },
  { id: 'gpu', label: 'GPU Advisor' },
  { id: 'markets', label: 'Markets' },
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

function NeedsConfigurator({ needs, setNeeds }) {
  return (
    <div className="needs-config">
      <div className="needs-title">Configure Your Needs</div>
      <div className="needs-grid">
        <div className="needs-field">
          <label><MapPin size={14} /> <TipLabel k="MW">Target Capacity</TipLabel></label>
          <div className="needs-slider-row">
            <input
              type="range"
              min="1"
              max="100"
              value={needs.targetMW}
              onChange={e => setNeeds(p => ({ ...p, targetMW: parseInt(e.target.value) }))}
            />
            <span className="needs-value">{needs.targetMW} MW</span>
          </div>
        </div>
        <div className="needs-field">
          <label><Cpu size={14} /> Infrastructure</label>
          <div className="needs-toggles">
            <button
              className={`toggle-btn ${needs.preferGPU ? 'on' : ''}`}
              onClick={() => setNeeds(p => ({ ...p, preferGPU: !p.preferGPU }))}
            >
              GPU Compute
            </button>
            <button
              className={`toggle-btn ${needs.preferLiquid ? 'on' : ''}`}
              onClick={() => setNeeds(p => ({ ...p, preferLiquid: !p.preferLiquid }))}
            >
              <Tip k="liquidCooling">Liquid Cooling</Tip>
            </button>
            <button
              className={`toggle-btn ${needs.preferDGX ? 'on' : ''}`}
              onClick={() => setNeeds(p => ({ ...p, preferDGX: !p.preferDGX }))}
            >
              <Tip k="dgxReady">DGX-Ready</Tip>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CapacityFinder({ needs }) {
  const [selectedFacility, setSelectedFacility] = useState(null);
  const recs = useMemo(() => getFacilityRecommendations(needs), [needs]);

  if (selectedFacility) {
    return <FacilityDetail facility={selectedFacility} onBack={() => setSelectedFacility(null)} />;
  }

  return (
    <div>
      <div className="finder-header">
        <h2>Smart Capacity Recommendations</h2>
        <p>Ranked by fit score based on your {needs.targetMW} MW requirement</p>
      </div>
      <div className="finder-list">
        {recs.map((f, i) => {
          const market = markets.find(m => m.name === f.metro);
          return (
            <div key={f.id} className="finder-card" onClick={() => setSelectedFacility(f)}>
              <div className="finder-rank">#{i + 1}</div>
              <div className="finder-main">
                <div className="finder-card-header">
                  <div>
                    <div className="finder-operator">{f.operator}</div>
                    <div className="finder-name">{f.code} &mdash; {f.desc}</div>
                    <div className="finder-loc">{f.city}, {f.state} &bull; {f.metro}</div>
                  </div>
                  <div className="finder-avail">
                    <span className="finder-avail-value"><Tip k="availMW">{f.availMW} MW</Tip></span>
                    <span className="finder-avail-label">available</span>
                  </div>
                </div>
                <div className="finder-metrics">
                  <div className="finder-metric">
                    <DollarSign size={12} />
                    <Tip k="kW/mo"><span>${market?.avgRent || '—'}/kW/mo</span></Tip>
                  </div>
                  <div className="finder-metric">
                    <Cpu size={12} />
                    <Tip k="PUE"><span>PUE {f.pue}</span></Tip>
                  </div>
                  <div className="finder-metric">
                    <Clock size={12} />
                    <Tip k="powerQueue"><span>{market?.powerQueue || '—'}mo power queue</span></Tip>
                  </div>
                  <div className="finder-metric">
                    <Target size={12} />
                    <Tip k="renewable"><span>{f.renewable}% renewable</span></Tip>
                  </div>
                </div>
                <div className="finder-tags">
                  {f.liquidCooling && <span className="fc-tag tag-liquid">Liquid Cooling</span>}
                  {f.dgxReady && <span className="fc-tag tag-dgx">DGX-Ready</span>}
                  {f.clouds.slice(0, 3).map(c => <span key={c} className="fc-tag tag-cloud">{c}</span>)}
                </div>
                {market && (
                  <div className="finder-market-note">
                    {market.vacancy < 5
                      ? `Warning: ${market.name} vacancy at ${market.vacancy}% — lock in immediately`
                      : market.vacancy > 20
                        ? `Advantage: ${market.vacancy}% vacancy gives you 15-20% negotiation leverage`
                        : `Market: ${market.vacancy}% vacancy, ${market.yoyGrowth}% YoY growth`
                    }
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TCOCalculator({ needs }) {
  const annualCost = (mw, rent) => mw * 1000 * rent * 12;
  const sorted = [...markets].filter(m => m.availMW >= needs.targetMW * 0.3).sort((a, b) => a.avgRent - b.avgRent);
  const cheapest = sorted[0];
  const mostExpensive = sorted[sorted.length - 1];

  return (
    <div className="tco-section">
      <h3 className="tco-title"><TipLabel k="TCO">TCO Comparison</TipLabel>: {needs.targetMW} MW Across Markets</h3>
      <div className="tco-grid">
        {sorted.slice(0, 8).map(m => {
          const annual = annualCost(needs.targetMW, m.avgRent);
          const maxAnnual = annualCost(needs.targetMW, mostExpensive?.avgRent || 450);
          const pctOfMax = (annual / maxAnnual) * 100;
          const savingsVsMax = maxAnnual - annual;
          return (
            <div key={m.id} className="tco-row">
              <div className="tco-market">
                <span className="tco-market-name">{m.name}</span>
                <span className="tco-market-vacancy" style={{ color: m.vacancy < 10 ? 'var(--red)' : m.vacancy < 20 ? 'var(--amber)' : 'var(--green)' }}>
                  <Tip k="vacancy">{m.vacancy}% vacancy</Tip>
                </span>
              </div>
              <div className="tco-bar-wrap">
                <div className="tco-bar" style={{ width: `${pctOfMax}%`, background: m === cheapest ? 'var(--green)' : 'var(--accent)' }} />
              </div>
              <div className="tco-values">
                <span className="tco-annual">${(annual / 1e6).toFixed(1)}M/yr</span>
                {savingsVsMax > 0 && (
                  <span className="tco-savings">Save ${(savingsVsMax / 1e6).toFixed(1)}M</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function DemandDashboard() {
  const [tab, setTab] = useState('intel');
  const [needs, setNeeds] = useState({ targetMW: 10, preferGPU: false, preferLiquid: true, preferDGX: false });

  const insights = useMemo(() => getDemandInsights(needs), [needs]);
  const kpis = useMemo(() => getDemandKPIs(), []);

  const criticalCount = insights.filter(i => i.urgency === 'critical').length;
  const savingsCount = insights.filter(i => i.type === 'savings').length;

  return (
    <div className="dashboard">
      <NeedsConfigurator needs={needs} setNeeds={setNeeds} />

      <section className="dash-kpis">
        {kpis.map((k, i) => (
          <div key={i} className="dash-kpi">
            <div className="dash-kpi-value">{k.value}</div>
            <div className="dash-kpi-label">{k.label}</div>
            <div className="dash-kpi-sub">{k.sub}</div>
          </div>
        ))}
      </section>

      {criticalCount > 0 && tab === 'intel' && (
        <div className="alert-banner alert-warning">
          <AlertTriangle size={18} />
          <span>{savingsCount} cost optimization{savingsCount > 1 ? 's' : ''} found — potential savings identified across markets and GPU options</span>
        </div>
      )}

      <nav className="dash-nav">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`dash-nav-btn ${tab === t.id ? 'active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
            {t.id === 'intel' && savingsCount > 0 && <span className="nav-badge nav-badge-green">{savingsCount}</span>}
          </button>
        ))}
      </nav>

      <div className="dash-content">
        {tab === 'intel' && (
          <>
            <div className="insights-grid">
              {insights.map(insight => (
                <InsightCard key={insight.id} insight={insight} />
              ))}
            </div>
            <TCOCalculator needs={needs} />
          </>
        )}

        {tab === 'find' && <CapacityFinder needs={needs} />}
        {tab === 'gpu' && <GPUCompare />}
        {tab === 'markets' && <MarketIntel />}
      </div>
    </div>
  );
}
