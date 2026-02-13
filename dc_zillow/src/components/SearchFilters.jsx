import { Search } from 'lucide-react';
import { facilities } from '../data/facilities';

export default function SearchFilters({ filters, setFilters }) {
  const metros = [...new Set(facilities.map(f => f.metro))].sort();
  const types = [...new Set(facilities.map(f => f.type))].sort();

  const update = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));

  return (
    <div className="search-filters">
      <div className="search-row">
        <input
          type="text"
          placeholder="Search facilities, operators, cities..."
          value={filters.search}
          onChange={e => update('search', e.target.value)}
        />
      </div>
      <div className="filter-row">
        <select value={filters.metro} onChange={e => update('metro', e.target.value)}>
          <option value="">All Markets</option>
          {metros.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
        <select value={filters.type} onChange={e => update('type', e.target.value)}>
          <option value="">All Types</option>
          {types.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div className="filter-toggles">
        <button
          className={`toggle-btn ${filters.liquidCooling ? 'on' : ''}`}
          onClick={() => update('liquidCooling', !filters.liquidCooling)}
        >
          Liquid Cooling
        </button>
        <button
          className={`toggle-btn ${filters.dgxReady ? 'on' : ''}`}
          onClick={() => update('dgxReady', !filters.dgxReady)}
        >
          DGX-Ready
        </button>
        <button
          className={`toggle-btn ${filters.minMW > 0 ? 'on' : ''}`}
          onClick={() => update('minMW', filters.minMW > 0 ? 0 : 5)}
        >
          5+ MW Avail
        </button>
      </div>
    </div>
  );
}
