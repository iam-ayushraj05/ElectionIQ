import { useState } from 'react';
import { Search, BookOpen } from 'lucide-react';
import { GLOSSARY_TERMS } from '../data/electionData';

export default function Glossary() {
  const [query, setQuery] = useState('');

  const filtered = GLOSSARY_TERMS.filter(
    t =>
      t.term.toLowerCase().includes(query.toLowerCase()) ||
      t.def.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <div className="glossary-search">
        <Search size={16} className="glossary-search-icon" />
        <input
          type="text"
          placeholder="Search terms… e.g. Electoral College, Delegate"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
          <BookOpen size={32} style={{ marginBottom: 12, opacity: 0.4 }} />
          <p>No terms match "{query}"</p>
        </div>
      ) : (
        <div className="glossary-grid">
          {filtered.map((item, i) => (
            <div key={i} className="glossary-card animate-fade-in">
              <div className="glossary-term">
                <span>📖</span>
                {item.term}
              </div>
              <p className="glossary-def">{item.def}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
