import PropTypes from 'prop-types';
import { QUICK_FACTS, TIMELINE_STEPS } from '../data/electionData';

const ACTIONS = [
  { icon: "🗳️", title: "Register to Vote", desc: "Get on the Electoral Roll", color: "rgba(99,102,241,0.15)", border: "rgba(99,102,241,0.3)", page: "learn" },
  { icon: "📚", title: "Learn the Process", desc: "6 step-by-step modules", color: "rgba(34,211,238,0.15)", border: "rgba(34,211,238,0.3)", page: "learn" },
  { icon: "💬", title: "Ask AI Assistant", desc: "Get instant answers", color: "rgba(167,139,250,0.15)", border: "rgba(167,139,250,0.3)", page: "chat" },
  { icon: "❓", title: "Browse FAQs", desc: "14 common questions", color: "rgba(74,222,128,0.15)", border: "rgba(74,222,128,0.3)", page: "faq" },
];

const UPDATES = [
  { icon: "📢", text: "2024 General Election: 543 seats contested across 7 phases", time: "2024", color: "var(--primary-light)" },
  { icon: "🗳️", text: "96.8 crore voters registered — highest ever in Indian history", time: "2024", color: "var(--cyan)" },
  { icon: "✅", text: "NOTA option available on all EVMs since Supreme Court order", time: "2013", color: "var(--green)" },
  { icon: "📱", text: "Voter Helpline App launched for online registration & booth location", time: "2023", color: "var(--purple)" },
];

/**
 * Dashboard Page
 * Landing page containing quick facts, navigation cards, and learning progress summary.
 *
 * @param {Object} props
 * @param {Function} props.navigate - Function to change the current view
 * @param {number[]} props.learningProgress - Array representing completed modules
 */
export default function Dashboard({ navigate, learningProgress }) {
  const completedCount = learningProgress ? learningProgress.filter(p => p === 1).length : 0;
  return (
    <div className="page anim-in">
      <div className="page-header">
        <h1 className="page-title">Welcome to <span className="g-text">ElectionIQ</span> 🗳️</h1>
        <p className="page-desc">Your complete guide to understanding Indian elections — powered by AI.</p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {QUICK_FACTS.map((f, i) => {
          const colors = ["var(--primary)", "var(--cyan)", "var(--purple)", "var(--green)", "var(--orange)", "var(--pink)"];
          return (
            <div className="card stat-card" key={i} style={{ animationDelay: `${i * 0.06}s` }}>
              <div className="stat-card-glow" style={{ background: colors[i] }} />
              <div className="stat-card-icon">{f.icon}</div>
              <div className="stat-card-value" style={{ color: colors[i] }}>{f.value}</div>
              <div className="stat-card-label">{f.label}</div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="section-title">
        <div className="section-title-icon">⚡</div>
        Quick Actions
      </div>
      <div className="quick-actions">
        {ACTIONS.map((a, i) => (
          <div
            key={i}
            className="card quick-action-card"
            style={{ borderColor: a.border, cursor: 'pointer' }}
            onClick={() => navigate(a.page)}
            role="button"
            tabIndex={0}
            aria-label={`Navigate to ${a.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate(a.page);
              }
            }}
          >
            <div className="quick-action-icon" style={{ background: a.color }}>
              {a.icon}
            </div>
            <div className="quick-action-title">{a.title}</div>
            <div className="quick-action-desc">
              {a.page === 'learn' && completedCount > 0 ? `${completedCount}/6 Modules Completed` : a.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom grid */}
      <div className="content-grid">
        {/* Timeline preview */}
        <div className="card" style={{ padding: 22 }}>
          <div className="section-title">
            <div className="section-title-icon">📅</div>
            Election Stages
            <button
              className="btn btn-ghost btn-sm"
              style={{ marginLeft: 'auto' }}
              onClick={() => navigate('timeline')}
            >View All →</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {TIMELINE_STEPS.slice(0, 4).map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, border: '1px solid var(--border)' }}>
                <span style={{ fontSize: '1.1rem' }}>{s.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{s.title}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-3)' }}>{s.phase}</div>
                </div>
                <span className={`badge ${s.badge}`}>{`Step ${s.id}`}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Updates */}
        <div className="card" style={{ padding: 22 }}>
          <div className="section-title">
            <div className="section-title-icon">📰</div>
            Key Facts & Updates
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {UPDATES.map((u, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', paddingBottom: 12, borderBottom: i < UPDATES.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>
                  {u.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.83rem', lineHeight: 1.5, color: 'var(--text-2)' }}>{u.text}</div>
                  <div style={{ fontSize: '0.7rem', color: u.color, fontWeight: 700, marginTop: 3 }}>{u.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  /** Navigation function to switch between pages */
  navigate: PropTypes.func.isRequired,
  /** Array tracking completion status of each learning module (1 = done, 0 = pending) */
  learningProgress: PropTypes.arrayOf(PropTypes.number).isRequired,
};
