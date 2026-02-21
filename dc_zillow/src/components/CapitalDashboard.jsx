import { useState, useMemo } from 'react';
import { getCapitalInsights, getCapitalKPIs } from '../data/insights';
import { markets } from '../data/markets';
import { operators, facilities } from '../data/facilities';
import { AlertTriangle, TrendingUp, ChevronDown, ChevronUp, Target, Trophy, Briefcase, ExternalLink } from 'lucide-react';
import { TipLabel } from './Tooltip';
import PipelineView from './PipelineView';
import MarketIntel from './MarketIntel';

const TABS = [
  { id: 'intel', label: 'Investment Thesis' },
  { id: 'markets', label: 'Market Scoring' },
  { id: 'operators', label: 'Operator Scorecard' },
  { id: 'pipeline', label: 'Deal Flow' },
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
            href={`https://www.google.com/search?q=${encodeURIComponent(insight.title + ' data center investment')}`}
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

function MarketScoring() {
  const scored = useMemo(() => {
    const maxGrowth = Math.max(...markets.map(m => m.yoyGrowth));
    const maxMW = Math.max(...markets.map(m => m.totalMW));
    const minPower = Math.min(...markets.map(m => m.powerCost));

    return markets.map(m => {
      const growthScore = (m.yoyGrowth / maxGrowth) * 30;
      const supplyTightness = ((100 - m.vacancy) / 100) * 25;
      const powerAdvantage = (minPower / m.powerCost) * 20;
      const scaleScore = (m.totalMW / maxMW) * 15;
      const sustainScore = (m.renewable / 100) * 10;
      const total = growthScore + supplyTightness + powerAdvantage + scaleScore + sustainScore;
      return {
        ...m,
        growthScore: growthScore.toFixed(1),
        supplyTightness: supplyTightness.toFixed(1),
        powerAdvantage: powerAdvantage.toFixed(1),
        scaleScore: scaleScore.toFixed(1),
        sustainScore: sustainScore.toFixed(1),
        totalScore: total.toFixed(1),
      };
    }).sort((a, b) => b.totalScore - a.totalScore);
  }, []);

  return (
    <div>
      <div className="scoring-header">
        <h2><TipLabel k="investmentScore">Market Investment Attractiveness</TipLabel></h2>
        <p>Composite scoring: Growth (30%) + Supply Tightness (25%) + Power Cost (20%) + Scale (15%) + Sustainability (10%)</p>
      </div>
      <div className="scoring-list">
        {scored.map((m, i) => (
          <div key={m.id} className="scoring-card">
            <div className="scoring-rank-wrap">
              <div className={`scoring-rank ${i < 3 ? 'scoring-rank-top' : ''}`}>
                {i < 3 ? <Trophy size={14} /> : null}
                #{i + 1}
              </div>
            </div>
            <div className="scoring-main">
              <div className="scoring-name-row">
                <div>
                  <div className="scoring-name">{m.name}</div>
                  <div className="scoring-country">{m.country} &bull; <TipLabel k="tier">Tier {m.tier}</TipLabel></div>
                </div>
                <div className="scoring-total">
                  <span className="scoring-total-value">{m.totalScore}</span>
                  <span className="scoring-total-label">/ 100</span>
                </div>
              </div>
              <div className="scoring-bars">
                <div className="scoring-bar-item">
                  <span className="scoring-bar-label"><TipLabel k="yoyGrowth">Growth ({m.growthScore})</TipLabel></span>
                  <div className="scoring-bar-track"><div className="scoring-bar-fill" style={{ width: `${m.growthScore / 30 * 100}%`, background: 'var(--green)' }} /></div>
                  <span className="scoring-bar-val">+{m.yoyGrowth}% YoY</span>
                </div>
                <div className="scoring-bar-item">
                  <span className="scoring-bar-label"><TipLabel k="vacancy">Supply ({m.supplyTightness})</TipLabel></span>
                  <div className="scoring-bar-track"><div className="scoring-bar-fill" style={{ width: `${m.supplyTightness / 25 * 100}%`, background: m.vacancy < 10 ? 'var(--red)' : 'var(--amber)' }} /></div>
                  <span className="scoring-bar-val">{m.vacancy}% vacant</span>
                </div>
                <div className="scoring-bar-item">
                  <span className="scoring-bar-label"><TipLabel k="powerCost">Power ({m.powerAdvantage})</TipLabel></span>
                  <div className="scoring-bar-track"><div className="scoring-bar-fill" style={{ width: `${m.powerAdvantage / 20 * 100}%`, background: 'var(--cyan)' }} /></div>
                  <span className="scoring-bar-val">${m.powerCost}/kWh</span>
                </div>
                <div className="scoring-bar-item">
                  <span className="scoring-bar-label"><TipLabel k="totalMW">Scale ({m.scaleScore})</TipLabel></span>
                  <div className="scoring-bar-track"><div className="scoring-bar-fill" style={{ width: `${m.scaleScore / 15 * 100}%`, background: 'var(--accent)' }} /></div>
                  <span className="scoring-bar-val">{(m.totalMW / 1000).toFixed(1)} GW</span>
                </div>
                <div className="scoring-bar-item">
                  <span className="scoring-bar-label"><TipLabel k="renewable">ESG ({m.sustainScore})</TipLabel></span>
                  <div className="scoring-bar-track"><div className="scoring-bar-fill" style={{ width: `${m.sustainScore / 10 * 100}%`, background: 'var(--green)' }} /></div>
                  <span className="scoring-bar-val">{m.renewable}% green</span>
                </div>
              </div>
              <div className="scoring-summary">
                <span><TipLabel k="avgRent">Rent: ${m.avgRent}/kW</TipLabel></span>
                <span><TipLabel k="underConstruction">Pipeline: {m.underConstruction.toLocaleString()} MW</TipLabel></span>
                <span><TipLabel k="powerQueue">Queue: {m.powerQueue}mo</TipLabel></span>
                <span>Drivers: {m.drivers}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OperatorScorecard() {
  const scored = useMemo(() => {
    return operators.map(o => {
      const facs = facilities.filter(f => f.operator === o.name);
      const avgPue = facs.length > 0 ? facs.reduce((s, f) => s + f.pue, 0) / facs.length : 1.5;
      const trackedMW = facs.reduce((s, f) => s + f.totalMW, 0);
      const metros = [...new Set(facs.map(f => f.metro))];
      const revenuePerMW = o.totalMW > 0 ? (o.revenue * 1e3 / o.totalMW).toFixed(1) : 0;
      const efficiencyScore = (1 / avgPue) * 40;
      const growthScore = (o.totalMW / 5000) * 25;
      const sustainScore = (o.renewable / 100) * 20;
      const diversificationScore = (metros.length / 10) * 15;
      const total = efficiencyScore + growthScore + sustainScore + diversificationScore;
      return {
        ...o,
        avgPue,
        trackedMW,
        metros,
        revenuePerMW,
        efficiencyScore: efficiencyScore.toFixed(1),
        growthScore: growthScore.toFixed(1),
        sustainScore: sustainScore.toFixed(1),
        diversificationScore: diversificationScore.toFixed(1),
        totalScore: total.toFixed(1),
        investmentSignal: total > 70 ? 'Strong Buy' : total > 55 ? 'Buy' : total > 40 ? 'Hold' : 'Watch',
        signalColor: total > 70 ? 'var(--green)' : total > 55 ? 'var(--accent)' : total > 40 ? 'var(--amber)' : 'var(--text-muted)',
      };
    }).sort((a, b) => b.totalScore - a.totalScore);
  }, []);

  return (
    <div>
      <div className="scorecard-header">
        <h2><TipLabel k="operatorScore">Operator Investment Scorecard</TipLabel></h2>
        <p>Efficiency (40%) + Scale (25%) + Sustainability (20%) + Diversification (15%)</p>
      </div>
      <div className="scorecard-list">
        {scored.map((o, i) => (
          <div key={o.id} className="scorecard-card">
            <div className="scorecard-top">
              <div className="scorecard-left">
                <div className="scorecard-rank">#{i + 1}</div>
                <div>
                  <div className="scorecard-name">{o.name}</div>
                  <div className="scorecard-type">
                    {o.type}
                    {o.ticker && <span className="comp-ticker">{o.ticker} &bull; ${o.stockPrice}</span>}
                  </div>
                </div>
              </div>
              <div className="scorecard-right">
                <div className="scorecard-score">{o.totalScore}</div>
                <div className="scorecard-signal" style={{ color: o.signalColor }}>{o.investmentSignal}</div>
              </div>
            </div>
            <div className="scorecard-metrics">
              <div className="scorecard-metric">
                <span className="scorecard-metric-label"><TipLabel k="revenue">Revenue</TipLabel></span>
                <span className="scorecard-metric-value">${o.revenue}B</span>
              </div>
              <div className="scorecard-metric">
                <span className="scorecard-metric-label"><TipLabel k="marketCap">Mkt Cap</TipLabel></span>
                <span className="scorecard-metric-value">${o.marketCap}B</span>
              </div>
              <div className="scorecard-metric">
                <span className="scorecard-metric-label"><TipLabel k="totalMW">Capacity</TipLabel></span>
                <span className="scorecard-metric-value">{o.totalMW.toLocaleString()} MW</span>
              </div>
              <div className="scorecard-metric">
                <span className="scorecard-metric-label"><TipLabel k="PUE">PUE</TipLabel></span>
                <span className="scorecard-metric-value" style={{ color: o.avgPue < 1.3 ? 'var(--green)' : o.avgPue > 1.4 ? 'var(--amber)' : 'var(--text)' }}>
                  {o.avgPue.toFixed(2)}
                </span>
              </div>
              <div className="scorecard-metric">
                <span className="scorecard-metric-label"><TipLabel k="renewable">Renewable</TipLabel></span>
                <span className="scorecard-metric-value" style={{ color: o.renewable >= 90 ? 'var(--green)' : 'var(--amber)' }}>
                  {o.renewable}%
                </span>
              </div>
              <div className="scorecard-metric">
                <span className="scorecard-metric-label"><TipLabel k="revenuePerMW">Rev/MW</TipLabel></span>
                <span className="scorecard-metric-value">${o.revenuePerMW}K</span>
              </div>
            </div>
            <div className="scorecard-bottom">
              <span>{o.facilities} facilities</span>
              <span>{o.metros.length} metros ({o.metros.join(', ')})</span>
              <span>{o.liquidCooling ? 'Liquid Cooling' : 'Air Only'}</span>
              <span>{o.dgxReady ? 'DGX-Ready' : '—'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CapitalDashboard() {
  const [tab, setTab] = useState('intel');
  const insights = useMemo(() => getCapitalInsights(), []);
  const kpis = useMemo(() => getCapitalKPIs(), []);

  const criticalCount = insights.filter(i => i.urgency === 'critical').length;
  const oppCount = insights.filter(i => i.type === 'opportunity').length;

  return (
    <div className="dashboard">
      <section className="dash-kpis">
        {kpis.map((k, i) => (
          <div key={i} className="dash-kpi">
            <div className="dash-kpi-value">{k.value}</div>
            <div className="dash-kpi-label">{k.label}</div>
            <div className="dash-kpi-sub">{k.sub}</div>
          </div>
        ))}
      </section>

      {tab === 'intel' && (
        <div className="alert-banner alert-opportunity">
          <Briefcase size={18} />
          <span>{oppCount} investment opportunit{oppCount !== 1 ? 'ies' : 'y'} identified across {markets.length} markets and {operators.length} operators</span>
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
            {t.id === 'intel' && criticalCount > 0 && <span className="nav-badge">{insights.length}</span>}
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
        {tab === 'markets' && <MarketScoring />}
        {tab === 'operators' && <OperatorScorecard />}
        {tab === 'pipeline' && <PipelineView />}
      </div>
    </div>
  );
}
