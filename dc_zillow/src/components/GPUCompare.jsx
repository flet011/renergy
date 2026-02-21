import { gpus } from '../data/markets';
import { ExternalLink } from 'lucide-react';
import { TipLabel } from './Tooltip';

function availColor(avail) {
  switch (avail) {
    case 'Abundant': return { bg: 'var(--green-dim)', color: 'var(--green)' };
    case 'Good': return { bg: 'var(--green-dim)', color: 'var(--green)' };
    case 'Moderate': return { bg: 'var(--amber-dim)', color: 'var(--amber)' };
    case 'Limited': return { bg: 'var(--amber-dim)', color: 'var(--amber)' };
    default: return { bg: 'var(--red-dim)', color: 'var(--red)' };
  }
}

export default function GPUCompare() {
  const maxPrice = Math.max(...gpus.map(g => g.cloudHigh));

  return (
    <div>
      <div className="gpu-header">
        <h2>GPU Cloud Pricing</h2>
        <p>{gpus.length} GPU models compared across cloud providers</p>
      </div>

      <div className="gpu-list">
        {gpus.map(g => {
          const ac = availColor(g.avail);
          return (
            <div key={g.id} className="gpu-card">
              <div className="gpu-card-header">
                <div>
                  <div className="gpu-name">{g.name}</div>
                  <div className="gpu-arch">{g.arch} &bull; {g.gen}</div>
                </div>
                <span className="gpu-avail" style={{ background: ac.bg, color: ac.color }}>
                  {g.avail}
                </span>
              </div>

              <div className="gpu-specs">
                <div>
                  <div className="gpu-spec-label"><TipLabel k="TFLOPS">FP16 TFLOPS</TipLabel></div>
                  <div className="gpu-spec-value">{g.fp16.toLocaleString()}</div>
                </div>
                <div>
                  <div className="gpu-spec-label"><TipLabel k="memory">Memory</TipLabel></div>
                  <div className="gpu-spec-value">{g.memory} GB</div>
                </div>
                <div>
                  <div className="gpu-spec-label"><TipLabel k="memType">Mem Type</TipLabel></div>
                  <div className="gpu-spec-value" style={{ fontSize: '0.8rem' }}>{g.memType}</div>
                </div>
                <div>
                  <div className="gpu-spec-label"><TipLabel k="TDP">TDP</TipLabel></div>
                  <div className="gpu-spec-value">{g.tdp}W</div>
                </div>
                <div>
                  <div className="gpu-spec-label"><TipLabel k="MSRP">MSRP</TipLabel></div>
                  <div className="gpu-spec-value">${(g.msrp / 1000).toFixed(0)}K</div>
                </div>
                <div>
                  <div className="gpu-spec-label"><TipLabel k="leadWeeks">Lead Time</TipLabel></div>
                  <div className="gpu-spec-value">{g.leadWeeks}wk</div>
                </div>
              </div>

              <div className="gpu-price-bar">
                <div className="gpu-price-label"><TipLabel k="cloudPricing">Cloud $/hr</TipLabel></div>
                <div className="gpu-price-track">
                  <div
                    className="gpu-price-range"
                    style={{
                      left: `${(g.cloudLow / maxPrice) * 100}%`,
                      width: `${((g.cloudHigh - g.cloudLow) / maxPrice) * 100}%`,
                      background: `linear-gradient(90deg, var(--green), var(--amber))`,
                    }}
                  />
                </div>
                <div className="gpu-price-text">
                  ${g.cloudLow.toFixed(2)} - ${g.cloudHigh.toFixed(2)}
                </div>
              </div>

              <div className="gpu-card-footer">
                <span className="gpu-usecase">{g.useCase}</span>
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(g.name + ' GPU benchmark review ' + new Date().getFullYear())}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="deep-link deep-link-sm"
                >
                  <ExternalLink size={11} /> Specs & Reviews
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
