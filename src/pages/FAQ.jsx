import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/faqData';
import { Search } from 'lucide-react';

const CATS = ["All", "Registration", "Voting", "Process", "General"];

export default function FAQ() {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('All');
  const [openIdx, setOpenIdx] = useState(null);

  const filtered = FAQ_ITEMS.filter(f => {
    const matchCat = cat === 'All' || f.cat === cat;
    const matchQ = !query || f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <div className="page anim-in">
      <div className="page-header">
        <h1 className="page-title">Frequently Asked <span className="g-text">Questions</span></h1>
        <p className="page-desc">Everything you need to know about Indian elections, answered clearly.</p>
      </div>

      {/* Search */}
      <div className="faq-search">
        <Search size={15} className="faq-search-icon" />
        <input
          className="input"
          style={{ paddingLeft: 40 }}
          placeholder="Search FAQs… e.g. 'voter ID', 'EVM', 'counting'"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      {/* Category pills */}
      <div className="faq-categories">
        {CATS.map(c => (
          <button key={c} className={`faq-cat-btn ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>
            {c}
          </button>
        ))}
      </div>

      {/* Result count */}
      <div style={{ fontSize: '0.78rem', color: 'var(--text-3)', marginBottom: 16 }}>
        Showing {filtered.length} of {FAQ_ITEMS.length} questions
      </div>

      {/* FAQ list */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 48, color: 'var(--text-3)' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🔍</div>
          <p>No FAQs match your search. Try different keywords.</p>
        </div>
      ) : (
        filtered.map((item, i) => (
          <div key={i} className="faq-item">
            <button className="faq-question" onClick={() => setOpenIdx(openIdx === i ? null : i)}>
              <span className="faq-q-icon">{item.icon}</span>
              <span style={{ flex: 1 }}>{item.q}</span>
              <ChevronDown size={16} className={`faq-chevron ${openIdx === i ? 'open' : ''}`} />
            </button>
            <div className={`faq-answer ${openIdx === i ? 'open' : ''}`}>
              <div className="faq-answer-body">
                {item.a.split('\n').map((line, j) => (
                  <p key={j} style={{ marginBottom: line.startsWith('-') ? 2 : 8, paddingLeft: line.startsWith('-') ? 12 : 0 }}>
                    {line.startsWith('-') ? `• ${line.slice(1).trim()}` : line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))
      )}

      {/* CTA */}
      <div className="card" style={{ padding: 24, textAlign: 'center', marginTop: 24, background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(167,139,250,0.08))', borderColor: 'rgba(99,102,241,0.25)' }}>
        <div style={{ fontSize: '1.8rem', marginBottom: 10 }}>💬</div>
        <div style={{ fontWeight: 700, marginBottom: 6 }}>Didn't find your answer?</div>
        <p style={{ color: 'var(--text-2)', fontSize: '0.85rem', marginBottom: 14 }}>Ask our AI assistant — it can answer any election question!</p>
        <span className="badge badge-cyan" style={{ fontSize: '0.75rem' }}>Powered by Gemini AI</span>
      </div>
    </div>
  );
}
