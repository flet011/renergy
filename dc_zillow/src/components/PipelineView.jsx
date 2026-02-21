import { constructionPipeline, hyperscalers } from '../data/markets';
import { ExternalLink } from 'lucide-react';
import { TipLabel } from './Tooltip';

function statusClass(status) {
  if (status === 'Under Construction') return 'status-construction';
  if (status === 'Announced') return 'status-announced';
  return 'status-planned';
}

export default function PipelineView() {
  const totalInvestment = constructionPipeline.reduce((s, p) => s + p.investment, 0);
  const totalMW = constructionPipeline.reduce((s, p) => s + p.capacityMW, 0);
  const projects = constructionPipeline.length;

  return (
    <div>
      <div className="pipeline-header">
        <h2>Construction Pipeline</h2>
        <p>Major data center projects tracked globally</p>
      </div>

      <div className="pipeline-total">
        <div>
          <div className="pt-value color-accent"><TipLabel k="investment">${totalInvestment.toFixed(0)}B</TipLabel></div>
          <div className="pt-label">Total Investment</div>
        </div>
        <div>
          <div className="pt-value color-green">{(totalMW / 1000).toFixed(1)} GW</div>
          <div className="pt-label"><TipLabel k="underConstruction">New Capacity</TipLabel></div>
        </div>
        <div>
          <div className="pt-value">{projects}</div>
          <div className="pt-label">Projects</div>
        </div>
      </div>

      <div className="pipeline-list">
        {constructionPipeline
          .sort((a, b) => b.investment - a.investment)
          .map((p, i) => (
            <div key={i} className="pipe-card">
              <div className="pipe-header">
                <div>
                  <div className="pipe-name">{p.name}</div>
                  <div className="pipe-dev">{p.developer} &bull; {p.location}</div>
                </div>
                <span className={`pipe-status ${statusClass(p.status)}`}>{p.status}</span>
              </div>
              <div className="pipe-stats">
                <div>
                  <div className="pipe-stat-label"><TipLabel k="investment">Investment</TipLabel></div>
                  <div className="pipe-stat-value color-accent">${p.investment}B</div>
                </div>
                <div>
                  <div className="pipe-stat-label"><TipLabel k="totalMW">Capacity</TipLabel></div>
                  <div className="pipe-stat-value">{p.capacityMW.toLocaleString()} MW</div>
                </div>
                <div>
                  <div className="pipe-stat-label"><TipLabel k="completion">Timeline</TipLabel></div>
                  <div className="pipe-stat-value" style={{ fontSize: '0.8rem' }}>
                    {p.start} &rarr; {p.completion}
                  </div>
                </div>
              </div>
              <div className="pipe-card-footer">
                <span className="pipe-tenant">Anchor: {p.tenant}</span>
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(p.name + ' data center project news')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="deep-link deep-link-sm"
                >
                  <ExternalLink size={11} /> Project News
                </a>
              </div>
            </div>
          ))}
      </div>

      <div className="hyper-section">
        <div className="hyper-title">Hyperscaler <TipLabel k="capex">CapEx</TipLabel> (2025 Announced)</div>
        <div className="hyper-grid">
          {hyperscalers.map((h, i) => (
            <div key={i} className="hyper-card">
              <div className="hyper-name">{h.name}</div>
              <div className="hyper-spend" style={{ color: h.color }}>${h.spend}B</div>
              <div className="hyper-label">Annual DC Spend</div>
              <div className="hyper-capex">${h.capex}B CapEx</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 4 }}>
                {(h.capacityMW / 1000).toFixed(1)} GW &bull; {h.owned + h.building} sites
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
