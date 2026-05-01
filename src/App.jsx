import { useState, useEffect, lazy, Suspense } from 'react';
import './index.css';
import './App.css';
import {
  LayoutDashboard, BookOpen, ListOrdered, BarChart2,
  MessageCircle, HelpCircle, Menu, X, Zap, Search,
  Sun, Moon, Bell, Settings, Globe
} from 'lucide-react';
import ErrorBoundary from './components/ErrorBoundary';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Learn = lazy(() => import('./pages/Learn'));
const TimelinePage = lazy(() => import('./components/Timeline'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Charts = lazy(() => import('./pages/Charts'));
const Chat = lazy(() => import('./components/Chat'));

const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} />, emoji: '🏠' },
  { id: 'learn', label: 'Learn', icon: <BookOpen size={16} />, emoji: '📚' },
  { id: 'timeline', label: 'Timeline', icon: <ListOrdered size={16} />, emoji: '📅' },
  { id: 'faq', label: 'FAQ', icon: <HelpCircle size={16} />, emoji: '❓' },
  { id: 'charts', label: 'Visual Charts', icon: <BarChart2 size={16} />, emoji: '📊' },
  { id: 'chat', label: 'AI Assistant', icon: <MessageCircle size={16} />, emoji: '🤖' },
];

/**
 * Main Application Component
 * Handles layout, routing via Suspense, theme toggling, and global state.
 */
export default function App() {
  const [page, setPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [chatInitPrompt, setChatInitPrompt] = useState(null);

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'English');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [learningProgress, setLearningProgress] = useState(
    JSON.parse(localStorage.getItem('learningProgress')) || [0,0,0,0,0,0]
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('learningProgress', JSON.stringify(learningProgress));
  }, [learningProgress]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const toggleLanguage = () => setLanguage(language === 'English' ? 'Hindi' : 'English');
  const resetProgress = () => { setLearningProgress([0,0,0,0,0,0]); setShowSettings(false); };

  const navigate = (pageId, prompt = null) => {
    setPage(pageId);
    if (prompt) setChatInitPrompt(prompt);
    setSidebarOpen(false);
  };


  return (
    <div className="layout">
      {/* Sidebar overlay (mobile) */}
      <div className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`} onClick={() => setSidebarOpen(false)} />

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-logo" onClick={() => navigate('dashboard')} style={{ cursor: 'pointer' }}>
          <div className="sidebar-logo-icon">🗳️</div>
          <div>
            <div className="sidebar-logo-text g-text">ElectionIQ</div>
            <div className="sidebar-logo-sub">Guide Assistant</div>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          <div className="sidebar-nav-section">Main Menu</div>
          {NAV.slice(0, 4).map(n => (
            <button
              key={n.id}
              className={`nav-item ${page === n.id ? 'active' : ''}`}
              onClick={() => navigate(n.id)}
              aria-label={n.label}
              aria-current={page === n.id ? 'page' : undefined}
            >
              <div className="nav-item-icon">{n.emoji}</div>
              {n.label}
            </button>
          ))}

          <div className="sidebar-nav-section" style={{ marginTop: 8 }}>Data &amp; AI</div>
          {NAV.slice(4).map(n => (
            <button
              key={n.id}
              className={`nav-item ${page === n.id ? 'active' : ''}`}
              onClick={() => navigate(n.id)}
              aria-label={n.label}
              aria-current={page === n.id ? 'page' : undefined}
            >
              <div className="nav-item-icon">{n.emoji}</div>
              {n.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-cta">
          <div className="sidebar-cta-icon">🗳️</div>
          <div className="sidebar-cta-title">Register to Vote</div>
          <div className="sidebar-cta-desc">Get on the Electoral Roll before the deadline!</div>
          <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
            <Zap size={12} /> Register Now
          </a>
        </div>
      </aside>

      {/* Main content */}
      <div className="main">
        {/* Top bar */}
        <header className="topbar">
          <button aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"} className="topbar-hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <div className="topbar-search">
            <Search size={14} className="topbar-search-icon" />
            <input
              type="text"
              aria-label="Search"
              placeholder="Search lessons, topics, FAQs…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="topbar-right" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ position: 'relative' }}>
              <button aria-label={`Change language, current is ${language}`} className="btn btn-ghost btn-sm" onClick={toggleLanguage} style={{ padding: '6px 10px' }}>
                <Globe size={14} /> {language}
              </button>
            </div>

            <button aria-label="Toggle Theme" className="btn btn-ghost btn-sm" style={{ padding: 6 }} onClick={toggleTheme}>
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <div style={{ position: 'relative' }}>
              <button aria-label="Notifications" className="btn btn-ghost btn-sm" style={{ padding: 6 }} onClick={() => { setShowNotifications(!showNotifications); setShowSettings(false); }}>
                <Bell size={16} />
                <div style={{ position: 'absolute', top: -2, right: -2, width: 8, height: 8, background: 'var(--primary)', borderRadius: '50%' }}></div>
              </button>
              {showNotifications && (
                <div className="card" style={{ position: 'absolute', top: 40, right: 0, width: 280, padding: 16, zIndex: 300 }}>
                  <h4 style={{ marginBottom: 12, fontSize: '0.9rem' }}>Notifications</h4>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-2)', paddingBottom: 8, borderBottom: '1px solid var(--border)' }}>
                    🟢 New learning module available!
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-2)', paddingTop: 8 }}>
                    🗳️ Register to vote before deadline.
                  </div>
                </div>
              )}
            </div>

            <div style={{ position: 'relative' }}>
              <button aria-label="Settings" className="btn btn-ghost btn-sm" style={{ padding: 6 }} onClick={() => { setShowSettings(!showSettings); setShowNotifications(false); }}>
                <Settings size={16} />
              </button>
              {showSettings && (
                <div className="card" style={{ position: 'absolute', top: 40, right: 0, width: 220, padding: 16, zIndex: 300 }}>
                  <h4 style={{ marginBottom: 12, fontSize: '0.9rem' }}>Settings</h4>
                  <button className="btn btn-ghost btn-sm" style={{ width: '100%', marginBottom: 8, justifyContent: 'center' }} onClick={toggleLanguage}>
                    Change Language ({language === 'English' ? 'HI' : 'EN'})
                  </button>
                  <button className="btn btn-ghost btn-sm" style={{ width: '100%', color: '#ef4444', borderColor: '#ef4444', justifyContent: 'center' }} onClick={resetProgress}>
                    Reset Learning Progress
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main key={page} className="anim-in" style={{ flex: 1 }} role="main">
          <ErrorBoundary>
            <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading content...</div>}>
              {page === 'dashboard' && <Dashboard navigate={navigate} learningProgress={learningProgress} />}
              {page === 'learn' && <Learn navigate={navigate} learningProgress={learningProgress} setLearningProgress={setLearningProgress} />}
              {page === 'timeline' && <TimelinePage />}
              {page === 'faq' && <FAQ />}
              {page === 'charts' && <Charts />}
              {page === 'chat' && <Chat initPrompt={chatInitPrompt} clearInitPrompt={() => setChatInitPrompt(null)} />}
            </Suspense>
          </ErrorBoundary>
        </main>

        <footer className="footer">
          Built for <strong>PromptWars 2026</strong> · Powered by{' '}
          <a href="https://deepmind.google/technologies/gemini/" target="_blank" rel="noopener noreferrer">Google Gemini</a>
          {' '}· Data from{' '}
          <a href="https://eci.gov.in" target="_blank" rel="noopener noreferrer">ECI</a>
          {' '}· <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer">Register to Vote</a>
        </footer>
      </div>
    </div>
  );
}
