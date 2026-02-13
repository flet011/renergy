import { useMemo } from 'react';
import { facilities } from '../data/facilities';
import { Tip } from './Tooltip';

function availClass(mw) {
  if (mw >= 10) return 'avail-high';
  if (mw >= 3) return 'avail-mid';
  return 'avail-low';
}

export default function FacilityList({ filters, onSelect }) {
  const filtered = useMemo(() => {
    return facilities.filter(f => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const match = [f.operator, f.code, f.city, f.metro, f.desc, f.type]
          .join(' ').toLowerCase().includes(q);
        if (!match) return false;
      }
      if (filters.metro && f.metro !== filters.metro) return false;
      if (filters.type && f.type !== filters.type) return false;
      if (filters.liquidCooling && !f.liquidCooling) return false;
      if (filters.dgxReady && !f.dgxReady) return false;
      if (filters.minMW > 0 && f.availMW < filters.minMW) return false;
      return true;
    }).sort((a, b) => b.availMW - a.availMW);
  }, [filters]);

  return (
    <div>
      <div className="facility-section-title">
        Facilities <span className="facility-count">({filtered.length})</span>
      </div>
      <div className="facility-list">
        {filtered.map(f => (
          <div key={f.id} className="facility-card" onClick={() => onSelect(f)}>
            <div className="fc-header">
              <div>
                <div className="fc-operator">{f.operator}</div>
                <div className="fc-name">{f.code} &mdash; {f.desc}</div>
                <div className="fc-location">{f.city}, {f.state} &bull; {f.metro}</div>
              </div>
              <div className={`fc-avail-badge ${availClass(f.availMW)}`}>
                <Tip k="availMW">{f.availMW} MW</Tip>
              </div>
            </div>
            <div className="fc-specs">
              <span className="fc-spec"><Tip k="totalMW"><strong>{f.totalMW}</strong> MW total</Tip></span>
              <span className="fc-spec"><Tip k="PUE">PUE <strong>{f.pue}</strong></Tip></span>
              <span className="fc-spec"><Tip k="renewable"><strong>{f.renewable}%</strong> green</Tip></span>
              <span className="fc-spec"><Tip k="bandwidth"><strong>{f.bandwidth}</strong> Gbps</Tip></span>
              <span className="fc-spec"><Tip k="racks"><strong>{f.racks.toLocaleString()}</strong> racks</Tip></span>
            </div>
            <div className="fc-tags">
              {f.liquidCooling && <span className="fc-tag tag-liquid"><Tip k="liquidCooling">Liquid Cooling</Tip></span>}
              {f.dgxReady && <span className="fc-tag tag-dgx"><Tip k="dgxReady">DGX-Ready</Tip></span>}
              {f.clouds.slice(0, 3).map(c => (
                <span key={c} className="fc-tag tag-cloud">{c}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
