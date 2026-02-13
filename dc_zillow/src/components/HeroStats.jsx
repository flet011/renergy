import { facilities } from '../data/facilities';
import { markets } from '../data/markets';
import { TipLabel } from './Tooltip';

export default function HeroStats() {
  const totalMW = markets.reduce((s, m) => s + m.totalMW, 0);
  const totalAvail = markets.reduce((s, m) => s + m.availMW, 0);
  const facilityCount = facilities.length;
  const metroCount = [...new Set(facilities.map(f => f.metro))].length;

  const stats = [
    { label: 'Total Capacity', tipKey: 'GW', value: `${(totalMW / 1000).toFixed(1)} GW`, sub: `${markets.length} markets` },
    { label: 'Available Now', tipKey: 'availMW', value: `${totalAvail.toLocaleString()} MW`, sub: `${(totalAvail / totalMW * 100).toFixed(1)}% vacancy` },
    { label: 'Facilities', tipKey: 'racks', value: facilityCount, sub: `${metroCount} metros` },
    { label: 'Avg Rent', tipKey: 'avgRent', value: '$184', sub: '/kW/mo (NoVA)' },
  ];

  return (
    <section className="hero-stats">
      {stats.map((s, i) => (
        <div key={i} className="stat-card">
          <div className="stat-value">{s.value}</div>
          <div className="stat-label"><TipLabel k={s.tipKey}>{s.label}</TipLabel></div>
          <div className="stat-sub">{s.sub}</div>
        </div>
      ))}
    </section>
  );
}
