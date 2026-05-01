import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { TIMELINE_STEPS } from '../data/electionData';

export default function TimelinePage() {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="page anim-in">
      <div className="page-header">
        <h1 className="page-title">Election <span className="g-text">Timeline</span></h1>
        <p className="page-desc">The complete journey from announcement to inauguration — click any step to expand.</p>
      </div>

      {/* Progress steps */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 28, overflowX: 'auto', paddingBottom: 4 }}>
        {TIMELINE_STEPS.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: openId === s.id ? 'var(--primary)' : 'rgba(255,255,255,0.06)',
              border: `2px solid ${openId === s.id ? 'var(--primary)' : 'var(--border)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.7rem', fontWeight: 800, cursor: 'pointer',
              color: openId === s.id ? '#fff' : 'var(--text-3)',
              transition: 'all 0.2s ease',
              boxShadow: openId === s.id ? '0 0 12px rgba(99,102,241,0.5)' : 'none',
            }} onClick={() => setOpenId(openId === s.id ? null : s.id)}>
              {s.id}
            </div>
            {i < TIMELINE_STEPS.length - 1 && (
              <div style={{ width: 24, height: 2, background: 'var(--border)', flexShrink: 0 }} />
            )}
          </div>
        ))}
      </div>

      {/* Timeline items */}
      <div className="tl-wrap">
        <div className="tl-line" />
        <div className="tl-items">
          {TIMELINE_STEPS.map((step, idx) => (
            <div
              key={step.id}
              className={`tl-item ${openId === step.id ? 'open' : ''}`}
              onClick={() => setOpenId(openId === step.id ? null : step.id)}
            >
              <div className="tl-node">
                <div className="tl-dot" />
                <span className="tl-step">Step {step.id}</span>
              </div>
              <div className="tl-card" style={{ animationDelay: `${idx * 0.06}s` }}>
                <div className="tl-card-head">
                  <div className="tl-card-title">
                    <div className="tl-card-icon" style={{ background: step.color }}>{step.emoji}</div>
                    {step.title}
                  </div>
                  <div className="tl-card-right">
                    <span className={`badge ${step.badge}`}>{step.phase}</span>
                    {openId === step.id
                      ? <ChevronUp size={15} color="var(--primary)" />
                      : <ChevronDown size={15} color="var(--text-3)" />}
                  </div>
                </div>
                <p className="tl-card-desc">{step.desc}</p>
                <div className={`tl-expand ${openId === step.id ? 'open' : ''}`}>
                  <div className="tl-expand-body">
                    <ul className="tl-list">
                      {step.details.map((d, i) => <li key={i}>{d}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
