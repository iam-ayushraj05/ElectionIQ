import PropTypes from 'prop-types';
import { LEARN_MODULES } from '../data/faqData';
import { Clock, ArrowRight } from 'lucide-react';

/**
 * Learn Page
 * Displays educational modules and tracks the user's progress.
 *
 * @param {Object} props
 * @param {Function} props.navigate - Function to change the current view
 * @param {number[]} props.learningProgress - Array representing completed modules
 * @param {Function} props.setLearningProgress - State setter to update progress
 */
export default function Learn({ navigate, learningProgress, setLearningProgress }) {
  const completedCount = learningProgress ? learningProgress.filter(p => p === 1).length : 0;
  
  const handleStartLearning = (index, title) => {
    const newProgress = [...(learningProgress || [0,0,0,0,0,0])];
    newProgress[index] = 1;
    setLearningProgress(newProgress);
    navigate('chat', `Teach me about: "${title}" in Indian elections. Give me a detailed step-by-step explanation as if I'm a beginner.`);
  };
  return (
    <div className="page anim-in">
      <div className="page-header">
        <h1 className="page-title"><span className="g-text">Learn</span> Elections</h1>
        <p className="page-desc">6 bite-sized modules covering the complete Indian election process — start from any stage.</p>
      </div>

      {/* Progress Banner */}
      <div className="card" style={{ padding: '18px 22px', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(34,211,238,0.08))', borderColor: 'rgba(99,102,241,0.25)' }}>
        <div style={{ fontSize: '1.5rem' }}>🎓</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, marginBottom: 3 }}>Your Learning Journey</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-2)' }}>
            {completedCount} of 6 modules completed · ~32 minutes total
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {LEARN_MODULES.map((_, i) => (
            <div key={i} style={{ width: 28, height: 6, borderRadius: 3, background: learningProgress && learningProgress[i] ? 'var(--primary)' : 'rgba(255,255,255,0.08)' }} />
          ))}
        </div>
      </div>

      {/* Module Cards */}
      <div className="learn-grid">
        {LEARN_MODULES.map((mod, i) => (
          <div
            className="card learn-card"
            key={i}
            style={{ animationDelay: `${i * 0.07}s`, borderColor: i === 0 ? 'rgba(99,102,241,0.35)' : undefined }}
          >
            <div className="learn-card-header">
              <div className="learn-card-num" style={{ background: mod.color, color: mod.colorText }}>
                Step {mod.id}
              </div>
              {learningProgress && learningProgress[i] === 1 ? (
                <span className="badge badge-green">Completed ✓</span>
              ) : (
                <span className={`badge ${mod.badge}`}>{mod.time}</span>
              )}
            </div>

            <div style={{ fontSize: '2.2rem' }}>{mod.emoji}</div>
            <div className="learn-card-title">{mod.title}</div>
            <p className="learn-card-desc">{mod.desc}</p>

            {/* Key concepts */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {mod.concepts.map((c, j) => (
                <span key={j} style={{ fontSize: '0.7rem', background: mod.color, color: mod.colorText, padding: '2px 9px', borderRadius: 999, fontWeight: 600 }}>
                  {c}
                </span>
              ))}
            </div>

            <div className="learn-card-footer">
              <div className="learn-card-time">
                <Clock size={11} /> {mod.time} read
              </div>
              <div style={{ display: 'flex', gap: 3 }}>
                {[...Array(3)].map((_, k) => (
                  <div key={k} className={`learn-dot ${k < mod.dots ? 'filled' : ''}`} style={k < mod.dots ? { background: mod.colorText } : {}} />
                ))}
              </div>
            </div>

            <button
              className="btn btn-ghost"
              style={{ width: '100%', justifyContent: 'center', marginTop: 4, background: learningProgress && learningProgress[i] ? 'rgba(16,185,129,0.1)' : '' }}
              onClick={() => handleStartLearning(i, mod.title)}
            >
              {learningProgress && learningProgress[i] ? 'Review Again' : 'Start Learning'} <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="card" style={{ padding: 24, textAlign: 'center', marginTop: 12, background: 'linear-gradient(135deg, rgba(74,222,128,0.1), rgba(34,211,238,0.07))', borderColor: 'rgba(74,222,128,0.25)' }}>
        <div style={{ fontSize: '1.8rem', marginBottom: 8 }}>🤖</div>
        <div style={{ fontWeight: 700, marginBottom: 4 }}>Want to go deeper?</div>
        <p style={{ color: 'var(--text-2)', fontSize: '0.85rem' }}>Ask ElectionIQ AI any specific question from any module!</p>
      </div>
    </div>
  );
}

Learn.propTypes = {
  /** Navigation function to switch between pages */
  navigate: PropTypes.func.isRequired,
  /** Array tracking module completion (1 = done, 0 = pending) */
  learningProgress: PropTypes.arrayOf(PropTypes.number).isRequired,
  /** Setter to update learningProgress state */
  setLearningProgress: PropTypes.func.isRequired,
};
