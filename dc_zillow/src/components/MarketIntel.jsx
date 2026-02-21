import { useState } from 'react';
import { markets } from '../data/markets';
import { ExternalLink } from 'lucide-react';
import { TipLabel } from './Tooltip';

const SORTS = [
  { id: 'vacancy', label: 'Tightest', fn: (a, b) => a.vacancy - b.vacancy },
  { id: 'growth', label: 'Fastest Growing', fn: (a, b) => b.yoyGrowth - a.yoyGrowth },
  { id: 'cheapest', label: 'Cheapest', fn: (a, b) => a.avgRent - b.avgRent },
  { id: 'largest', label: 'Largest', fn: (a, b) => b.totalMW - a.totalMW },
  { id: 'power', label: 'Best Power', fn: (a, b) => a.powerCost - b.powerCost },
];

function barColor(vacancy) {
  if (vacancy < 5) return 'var(--red)';
  if (vacancy < 15) return 'var(--amber)';
  return 'var(--green)';
}

export default function MarketIntel() {
  const [sort, setSort] = useState('vacancy');
  const sortObj = SORTS.find(s => s.id === sort);
  const sorted = [...markets].sort(sortObj.fn);
  const maxMW = Math.max(...markets.map(m => m.totalMW));

  return (
    <div>
      <div className="mi-header">
        <h2>Market Intelligence</h2>
        <p>{markets.length} global markets tracked in real-time</p>
      </div>

      <div className="mi-sort-bar">
        {SORTS.map(s => (
          <button
            key={s.id}
            className={`mi-sort-btn ${sort === s.id ? 'active' : ''}`}
            onClick={() => setSort(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="mi-list">
        {sorted.map(m => (
          <div key={m.id} className="mi-card">
            <div className="mi-card-header">
              <div>
                <div className="mi-name">{m.name}</div>
                <div className="mi-country">{m.country}</div>
              </div>
              <span className="mi-tier"><TipLabel k="tier">Tier {m.tier}</TipLabel></span>
            </div>

            <div className="mi-stats">
              <div>
                <div className="mi-stat-label"><TipLabel k="totalMW">Capacity</TipLabel></div>
                <div className="mi-stat-value">{(m.totalMW / 1000).toFixed(1)} GW</div>
              </div>
              <div>
                <div className="mi-stat-label"><TipLabel k="vacancy">Vacancy</TipLabel></div>
                <div className="mi-stat-value" style={{ color: barColor(m.vacancy) }}>
                  {m.vacancy}%
                </div>
              </div>
              <div>
                <div className="mi-stat-label"><TipLabel k="avgRent">Avg Rent</TipLabel></div>
                <div className="mi-stat-value">${m.avgRent}</div>
              </div>
              <div>
                <div className="mi-stat-label"><TipLabel k="powerCost">Power</TipLabel></div>
                <div className="mi-stat-value">${m.powerCost}</div>
              </div>
              <div>
                <div className="mi-stat-label"><TipLabel k="yoyGrowth">YoY Growth</TipLabel></div>
                <div className="mi-stat-value color-green">+{m.yoyGrowth}%</div>
              </div>
              <div>
                <div className="mi-stat-label"><TipLabel k="powerQueue">Power Queue</TipLabel></div>
                <div className="mi-stat-value">{m.powerQueue}mo</div>
              </div>
            </div>

            <div className="mi-bar-row">
              <div className="mi-bar-label">
                <span><TipLabel k="utilization">Utilization</TipLabel></span>
                <span>{(100 - m.vacancy).toFixed(1)}%</span>
              </div>
              <div className="mi-bar">
                <div
                  className="mi-bar-fill"
                  style={{
                    width: `${100 - m.vacancy}%`,
                    background: barColor(m.vacancy),
                  }}
                />
              </div>
            </div>

            <div className="mi-bar-row">
              <div className="mi-bar-label">
                <span><TipLabel k="underConstruction">Construction Pipeline</TipLabel></span>
                <span>{m.underConstruction.toLocaleString()} MW</span>
              </div>
              <div className="mi-bar">
                <div
                  className="mi-bar-fill"
                  style={{
                    width: `${(m.underConstruction / maxMW) * 100}%`,
                    background: 'var(--accent)',
                  }}
                />
              </div>
            </div>

            <div className="mi-card-footer">
              <span className="mi-drivers">{m.drivers} &bull; {m.renewable}% renewable</span>
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(m.name + ' data center market news ' + new Date().getFullYear())}`}
                target="_blank"
                rel="noopener noreferrer"
                className="deep-link deep-link-sm"
              >
                <ExternalLink size={11} /> Dig Deeper
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
