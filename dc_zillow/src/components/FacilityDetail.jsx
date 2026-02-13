import { useState } from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { TipLabel } from './Tooltip';
import ContactModal from './ContactModal';

const BG_IMG = 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80';

export default function FacilityDetail({ facility: f, onBack }) {
  const [modal, setModal] = useState(null);
  const utilColor = f.util > 90 ? 'color-red' : f.util > 80 ? 'color-amber' : 'color-green';

  return (
    <div>
      <button className="detail-back" onClick={onBack}>
        <ArrowLeft size={16} /> Back to listings
      </button>

      <div className="detail-card">
        <div className="detail-hero" style={{ backgroundImage: `linear-gradient(135deg, rgba(30,58,95,0.92), rgba(15,23,42,0.95)), url(${BG_IMG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="detail-operator">{f.operator}</div>
          <div className="detail-name">{f.code} &mdash; {f.desc}</div>
          <div className="detail-loc">{f.city}, {f.state} &bull; {f.metro}</div>
        </div>

        <div className="detail-body">
          <div className="detail-grid">
            <div className="detail-stat">
              <div className="ds-label"><TipLabel k="availMW">Available</TipLabel></div>
              <div className="ds-value color-green">{f.availMW} <span className="ds-unit">MW</span></div>
            </div>
            <div className="detail-stat">
              <div className="ds-label"><TipLabel k="totalMW">Total Capacity</TipLabel></div>
              <div className="ds-value">{f.totalMW} <span className="ds-unit">MW</span></div>
            </div>
            <div className="detail-stat">
              <div className="ds-label"><TipLabel k="utilization">Utilization</TipLabel></div>
              <div className={`ds-value ${utilColor}`}>{f.util}%</div>
            </div>
            <div className="detail-stat">
              <div className="ds-label"><TipLabel k="PUE">PUE Rating</TipLabel></div>
              <div className="ds-value">{f.pue}</div>
            </div>
            <div className="detail-stat">
              <div className="ds-label"><TipLabel k="renewable">Renewable</TipLabel></div>
              <div className="ds-value color-green">{f.renewable}%</div>
            </div>
            <div className="detail-stat">
              <div className="ds-label"><TipLabel k="bandwidth">Bandwidth</TipLabel></div>
              <div className="ds-value">{f.bandwidth} <span className="ds-unit">Gbps</span></div>
            </div>
            <div className="detail-stat">
              <div className="ds-label"><TipLabel k="sqft">Total SqFt</TipLabel></div>
              <div className="ds-value">{(f.sqft / 1000).toFixed(0)}K</div>
            </div>
            <div className="detail-stat">
              <div className="ds-label"><TipLabel k="racks">Est. Racks</TipLabel></div>
              <div className="ds-value">{f.racks.toLocaleString()}</div>
            </div>
            <div className="detail-stat">
              <div className="ds-label">Year Opened</div>
              <div className="ds-value">{f.year}</div>
            </div>
          </div>

          <div className="detail-section">
            <div className="detail-section-title">Capabilities</div>
            <div className="fc-tags">
              {f.liquidCooling && <span className="fc-tag tag-liquid">Liquid Cooling</span>}
              {f.dgxReady && <span className="fc-tag tag-dgx">DGX-Ready</span>}
              <span className="fc-tag tag-cloud">{f.type}</span>
            </div>
          </div>

          <div className="detail-section">
            <div className="detail-section-title">Cloud Onramps</div>
            <div className="cloud-pills">
              {f.clouds.map(c => (
                <span key={c} className="cloud-pill">{c}</span>
              ))}
            </div>
          </div>

          <div className="detail-section">
            <div className="detail-section-title">Location</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {f.lat.toFixed(4)}, {f.lng.toFixed(4)} &bull; {f.city}, {f.state}
            </p>
          </div>

          <div className="detail-section">
            <div className="detail-section-title">Learn More</div>
            <div className="deep-links">
              <a href={`https://www.google.com/search?q=${encodeURIComponent(f.operator + ' data center ' + f.city + ' ' + f.state)}`} target="_blank" rel="noopener noreferrer" className="deep-link">
                <ExternalLink size={13} /> {f.operator} in {f.city}
              </a>
              <a href={`https://www.datacentermap.com/search/?q=${encodeURIComponent(f.metro)}`} target="_blank" rel="noopener noreferrer" className="deep-link">
                <ExternalLink size={13} /> {f.metro} Market Data
              </a>
              <a href="https://www.datacenterknowledge.com/" target="_blank" rel="noopener noreferrer" className="deep-link">
                <ExternalLink size={13} /> DC Industry News
              </a>
            </div>
          </div>

          <div className="detail-cta">
            <button className="btn-primary" onClick={() => setModal('quote')}>Request Quote</button>
            <button className="btn-outline" onClick={() => setModal('tour')}>Schedule Tour</button>
            <button className="btn-outline" onClick={() => setModal('contact')}>Contact Operator</button>
          </div>
        </div>
      </div>

      {modal && (
        <ContactModal type={modal} facility={f} onClose={() => setModal(null)} />
      )}
    </div>
  );
}
