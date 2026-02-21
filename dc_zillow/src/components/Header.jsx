import { Zap, LogOut, Building2, Search, TrendingUp, User } from 'lucide-react';

const ROLE_CONFIG = {
  supply: { label: 'Operator', icon: Building2, color: '#10b981' },
  demand: { label: 'Buyer', icon: Search, color: '#3b82f6' },
  capital: { label: 'Investor', icon: TrendingUp, color: '#f59e0b' },
  guest: { label: 'Guest', icon: User, color: '#64748b' },
};

export default function Header({ role, onLogout }) {
  const cfg = ROLE_CONFIG[role] || ROLE_CONFIG.guest;
  const RoleIcon = cfg.icon;

  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <Zap size={22} strokeWidth={2.5} />
          <span className="logo-text">DC<span className="logo-accent">Zillow</span></span>
        </div>
        <div className="header-right">
          <div className="header-role" style={{ borderColor: cfg.color }}>
            <RoleIcon size={14} style={{ color: cfg.color }} />
            <span style={{ color: cfg.color }}>{cfg.label}</span>
          </div>
          <button className="header-logout" onClick={onLogout} title="Switch role">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
