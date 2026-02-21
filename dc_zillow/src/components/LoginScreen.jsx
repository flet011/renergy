import { useState } from 'react';
import { Building2, Search, TrendingUp, Zap, ArrowRight, ArrowLeft, Database, Globe, Shield, Lock, Mail, Eye, EyeOff } from 'lucide-react';

// Modern data center building exterior
const BG_IMG = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80';

const ROLES = [
  {
    id: 'supply',
    title: 'Operator',
    subtitle: 'Supply Side',
    icon: Building2,
    color: '#10b981',
    description: 'Maximize revenue, optimize pricing, outmaneuver competitors.',
    features: [
      'Portfolio performance intelligence',
      'Market pricing power analysis',
      'Competitive benchmarking',
      'Expansion opportunity scoring',
      'Tenant demand signals',
    ],
    stat: '43 Facilities',
    statSub: 'tracked across 15 metros',
  },
  {
    id: 'demand',
    title: 'Buyer',
    subtitle: 'Demand Side',
    icon: Search,
    color: '#3b82f6',
    description: 'Find capacity, reduce costs, deploy faster.',
    features: [
      'Smart capacity recommendations',
      'Cost optimization across markets',
      'GPU performance/value advisor',
      'Build vs Buy analysis',
      'Negotiation leverage intelligence',
    ],
    stat: '2,087 MW',
    statSub: 'available across markets',
  },
  {
    id: 'capital',
    title: 'Investor',
    subtitle: 'Capital',
    icon: TrendingUp,
    color: '#f59e0b',
    description: 'Discover deal flow, assess risk, capture alpha.',
    features: [
      'Investment thesis dashboard',
      'Market attractiveness scoring',
      'Operator valuation scorecard',
      'Pipeline ROI analysis',
      'ESG & sustainability alpha',
    ],
    stat: '$405B',
    statSub: 'hyperscaler CapEx committed',
  },
];

const DEMO_ACCOUNTS = {
  supply: { email: 'operator@dczillow.io', password: 'supply2026', name: 'Sarah Chen', company: 'CoreWeave Operations' },
  demand: { email: 'buyer@dczillow.io', password: 'demand2026', name: 'Marcus Rivera', company: 'OpenAI Infrastructure' },
  capital: { email: 'investor@dczillow.io', password: 'capital2026', name: 'Priya Patel', company: 'Blackstone Digital' },
};

const TRUST_POINTS = [
  { icon: Database, label: '17 OSINT Databases' },
  { icon: Globe, label: '18 Global Markets' },
  { icon: Shield, label: 'Real-Time Intelligence' },
];

function RoleSelect({ onSelect }) {
  return (
    <>
      <div className="login-hero">
        <h1 className="login-title">
          Intelligence for the<br />
          <span className="login-title-accent">$500B AI Infrastructure Market</span>
        </h1>
        <p className="login-subtitle">
          Not a directory. Not a dashboard. A decision engine backed by 17 OSINT databases,
          real-time market intelligence, and actionable insights that tell you exactly what to do.
        </p>
      </div>

      <div className="login-roles">
        {ROLES.map(role => {
          const Icon = role.icon;
          return (
            <button
              key={role.id}
              className="role-card"
              onClick={() => onSelect(role.id)}
              style={{ '--role-color': role.color }}
            >
              <div className="role-card-top">
                <div className="role-icon-wrap">
                  <Icon size={24} />
                </div>
                <div className="role-subtitle">{role.subtitle}</div>
                <h2 className="role-title">{role.title}</h2>
                <p className="role-desc">{role.description}</p>
              </div>

              <div className="role-stat">
                <div className="role-stat-value">{role.stat}</div>
                <div className="role-stat-label">{role.statSub}</div>
              </div>

              <ul className="role-features">
                {role.features.map((f, i) => (
                  <li key={i} className="role-feature">
                    <span className="role-check">+</span>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="role-cta">
                Enter as {role.title} <ArrowRight size={16} />
              </div>
            </button>
          );
        })}
      </div>

      <div className="login-trust">
        {TRUST_POINTS.map((tp, i) => {
          const TpIcon = tp.icon;
          return (
            <div key={i} className="trust-point">
              <TpIcon size={16} />
              <span>{tp.label}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}

function LoginForm({ roleId, onBack, onLogin }) {
  const role = ROLES.find(r => r.id === roleId);
  const demo = DEMO_ACCOUNTS[roleId];
  const Icon = role.icon;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);

    // Simulate auth delay
    setTimeout(() => {
      if (email === demo.email && password === demo.password) {
        onLogin(roleId);
      } else {
        setError('Invalid credentials. Use the demo account shown below.');
        setLoading(false);
      }
    }, 800);
  };

  const fillDemo = () => {
    setEmail(demo.email);
    setPassword(demo.password);
    setError('');
  };

  return (
    <div className="login-form-container">
      <button className="login-back" onClick={onBack}>
        <ArrowLeft size={16} /> Back to roles
      </button>

      <div className="login-form-card" style={{ '--role-color': role.color }}>
        <div className="login-form-header">
          <div className="login-form-icon">
            <Icon size={28} />
          </div>
          <div className="login-form-role-tag">{role.subtitle}</div>
          <h2 className="login-form-title">Sign in as {role.title}</h2>
          <p className="login-form-desc">{role.description}</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label className="login-label">
              <Mail size={14} /> Email
            </label>
            <input
              type="email"
              className="login-input"
              placeholder="you@company.com"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(''); }}
              autoFocus
            />
          </div>

          <div className="login-field">
            <label className="login-label">
              <Lock size={14} /> Password
            </label>
            <div className="login-pw-wrap">
              <input
                type={showPw ? 'text' : 'password'}
                className="login-input"
                placeholder="Enter password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
              />
              <button
                type="button"
                className="login-pw-toggle"
                onClick={() => setShowPw(s => !s)}
                tabIndex={-1}
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && <div className="login-error">{error}</div>}

          <button
            type="submit"
            className="login-submit"
            disabled={loading}
            style={{ background: role.color }}
          >
            {loading ? (
              <span className="login-spinner" />
            ) : (
              <>Sign In <ArrowRight size={16} /></>
            )}
          </button>
        </form>

        <div className="login-demo-box">
          <div className="login-demo-label">Demo Account</div>
          <div className="login-demo-creds">
            <div><span className="login-demo-key">Email:</span> {demo.email}</div>
            <div><span className="login-demo-key">Password:</span> {demo.password}</div>
            <div><span className="login-demo-key">User:</span> {demo.name}, {demo.company}</div>
          </div>
          <button type="button" className="login-demo-fill" onClick={fillDemo}>
            Auto-fill demo credentials
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LoginScreen({ onSelectRole }) {
  const [selectedRole, setSelectedRole] = useState(null);

  return (
    <div className="login-screen">
      <div className="login-bg" style={{ backgroundImage: `url(${BG_IMG})` }} />

      <header className="login-header">
        <div className="login-logo">
          <Zap size={28} strokeWidth={2.5} />
          <span className="login-logo-text">DC<span className="login-logo-accent">Zillow</span></span>
        </div>
      </header>

      {!selectedRole ? (
        <RoleSelect onSelect={setSelectedRole} />
      ) : (
        <LoginForm
          roleId={selectedRole}
          onBack={() => setSelectedRole(null)}
          onLogin={onSelectRole}
        />
      )}

      <footer className="login-footer">
        <p>Powered by PKP (Portable Knowledge Protocol) &bull; OSINT Data &bull; February 2026</p>
      </footer>
    </div>
  );
}
