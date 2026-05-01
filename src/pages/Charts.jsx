import PropTypes from 'prop-types';

const TURNOUT_DATA = [
  { label: "Youth (18–25)", pct: 65, color: "#22d3ee" },
  { label: "Adults (26–50)", pct: 82, color: "#4ade80" },
  { label: "Seniors (50+)", pct: 74, color: "#a78bfa" },
  { label: "Women Voters", pct: 67, color: "#f472b6" },
];

const STATE_DATA = [
  { label: "Uttar Pradesh", seats: 80, color: "#6366f1" },
  { label: "Maharashtra", seats: 48, color: "#22d3ee" },
  { label: "West Bengal", seats: 42, color: "#4ade80" },
  { label: "Bihar", seats: 40, color: "#a78bfa" },
  { label: "Tamil Nadu", seats: 39, color: "#fb923c" },
  { label: "Madhya Pradesh", seats: 29, color: "#f472b6" },
];

const DONUT_DATA = [
  { label: "Urban Voters", pct: 35, color: "#6366f1" },
  { label: "Rural Voters", pct: 65, color: "#22d3ee" },
];

const PHASE_DATA = [
  { phase: "Phase 1", date: "Apr 19", states: 21, seats: 102, color: "#6366f1" },
  { phase: "Phase 2", date: "Apr 26", states: 13, seats: 89, color: "#22d3ee" },
  { phase: "Phase 3", date: "May 7", states: 11, seats: 94, color: "#4ade80" },
  { phase: "Phase 4", date: "May 13", states: 10, seats: 96, color: "#a78bfa" },
  { phase: "Phase 5", date: "May 20", states: 8, seats: 49, color: "#fb923c" },
  { phase: "Phase 6", date: "May 25", states: 7, seats: 58, color: "#f472b6" },
  { phase: "Phase 7", date: "Jun 1", states: 8, seats: 57, color: "#fbbf24" },
];

function BarRow({ label, pct, color }) {
  return (
    <div className="bar-row">
      <div className="bar-label">
        <span className="bar-label-name">{label}</span>
        <span className="bar-label-val">{pct}%</span>
      </div>
      <div className="progress-bar-wrap">
        <div
          className="progress-bar-fill"
          style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${color}cc)`, '--w': `${pct}%` }}
        />
      </div>
    </div>
  );
}

BarRow.propTypes = {
  label: PropTypes.string.isRequired,
  pct: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

function DonutChart({ data }) {
  const r = 52, cx = 70, cy = 70, stroke = 18;
  const circ = 2 * Math.PI * r;
  const segments = data.reduce((acc, d) => {
    const offset = acc.length > 0 ? acc[acc.length - 1]._nextOffset : 0;
    const len = (d.pct / 100) * circ;
    acc.push({ ...d, dashArray: `${len} ${circ - len}`, dashOffset: -offset, _nextOffset: offset + len });
    return acc;
  }, []);

  return (
    <div className="donut-wrapper">
      <svg width="140" height="140" className="donut-svg">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
        {segments.map((s, i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={s.color} strokeWidth={stroke}
            strokeDasharray={s.dashArray} strokeDashoffset={s.dashOffset}
            strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`} />
        ))}
        <text x={cx} y={cy - 4} textAnchor="middle" fill="white" fontSize="14" fontWeight="800" fontFamily="Inter">96.8Cr</text>
        <text x={cx} y={cy + 12} textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter">Voters</text>
      </svg>
      <div className="donut-legend">
        {data.map((d, i) => (
          <div key={i} className="donut-legend-item">
            <div className="donut-legend-dot" style={{ background: d.color }} />
            <span className="donut-legend-label">{d.label}</span>
            <span className="donut-legend-val">{d.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

DonutChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      pct: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default function Charts() {
  return (
    <div className="page anim-in">
      <div className="page-header">
        <h1 className="page-title">Visual <span className="g-text">Charts & Data</span></h1>
        <p className="page-desc">Understand Indian election statistics and demographics through visual data.</p>
      </div>

      <div className="charts-grid">
        {/* Voter Turnout */}
        <div className="card chart-card">
          <div className="chart-title">📈 Voter Turnout by Age Group</div>
          <div className="chart-subtitle">India 2024 General Election</div>
          {TURNOUT_DATA.map((d, i) => <BarRow key={i} {...d} />)}
          <p style={{ fontSize: '0.72rem', color: 'var(--text-3)', marginTop: 12 }}>* Data based on ECI reports and representative samples.</p>
        </div>

        {/* Voter Distribution Donut */}
        <div className="card chart-card">
          <div className="chart-title">👥 Voter Population Distribution</div>
          <div className="chart-subtitle">Urban vs Rural split, 2024</div>
          <DonutChart data={DONUT_DATA} />
          <div style={{ marginTop: 16, padding: '12px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: 6 }}>
              <span style={{ color: 'var(--text-2)' }}>Total Registered Voters</span>
              <span style={{ fontWeight: 700, color: 'var(--cyan)' }}>96.8 Crore</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
              <span style={{ color: 'var(--text-2)' }}>Voter Turnout (2024)</span>
              <span style={{ fontWeight: 700, color: 'var(--green)' }}>66.3%</span>
            </div>
          </div>
        </div>

        {/* Seats by State */}
        <div className="card chart-card">
          <div className="chart-title">🏛️ Top States by Lok Sabha Seats</div>
          <div className="chart-subtitle">Total 543 seats across all states/UTs</div>
          {STATE_DATA.map((d, i) => (
            <div key={i} className="bar-row">
              <div className="bar-label">
                <span className="bar-label-name">{d.label}</span>
                <span className="bar-label-val">{d.seats} seats</span>
              </div>
              <div className="progress-bar-wrap">
                <div className="progress-bar-fill"
                  style={{ width: `${(d.seats / 80) * 100}%`, background: d.color, '--w': `${(d.seats / 80) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* 7 Phases */}
        <div className="card chart-card">
          <div className="chart-title">📅 2024 Election — 7 Phases</div>
          <div className="chart-subtitle">April 19 – June 1, 2024</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {PHASE_DATA.map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: `${p.color}25`, border: `1px solid ${p.color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800, color: p.color, flexShrink: 0 }}>{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{p.phase} · {p.date}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-3)' }}>{p.seats} seats</span>
                  </div>
                  <div className="progress-bar-wrap" style={{ height: 5 }}>
                    <div className="progress-bar-fill" style={{ width: `${(p.seats / 102) * 100}%`, background: p.color, '--w': `${(p.seats / 102) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ color: 'var(--text-3)', fontSize: '0.75rem', textAlign: 'center', marginTop: 8 }}>
        📊 Data sourced from Election Commission of India (ECI) · eci.gov.in
      </div>
    </div>
  );
}
