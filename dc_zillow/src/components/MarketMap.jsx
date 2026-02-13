import { markets } from '../data/markets';
import { facilities } from '../data/facilities';

function vacancyClass(v) {
  if (v < 5) return 'vacancy-critical';
  if (v < 15) return 'vacancy-tight';
  return 'vacancy-healthy';
}

export default function MarketMap({ onSelectFacility }) {
  const sorted = [...markets].sort((a, b) => a.vacancy - b.vacancy);

  return (
    <div className="market-map">
      <div className="map-title">Markets by Vacancy Rate</div>
      <div className="map-grid">
        {sorted.map(m => {
          const facilCount = facilities.filter(f => f.metro === m.name).length;
          return (
            <button
              key={m.id}
              className="map-dot"
              onClick={() => {
                const first = facilities.find(f => f.metro === m.name);
                if (first) onSelectFacility(first);
              }}
            >
              <div className="map-dot-name">{m.name}</div>
              <div className="map-dot-sub">
                {m.totalMW.toLocaleString()} MW &bull; {facilCount} facilities
              </div>
              <div className={`map-dot-vacancy ${vacancyClass(m.vacancy)}`}>
                {m.vacancy}% vacancy
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
