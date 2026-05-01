import { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Send, RefreshCw, Mic, MicOff, Radio } from 'lucide-react';
import { CHAT_SUGGESTIONS, QUICK_MENU } from '../data/electionData';
import DOMPurify from 'dompurify';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const MASTER_PROMPT = `You are ElectionIQ — an intelligent, friendly, and interactive Election Guide Assistant. Help users (especially students and first-time voters) understand elections.

Rules:
- Default to India unless user specifies another country.
- Use numbered steps and bullet points (using - for bullets).
- Use **bold** for key terms.
- Keep responses concise unless user asks for detail.
- Use emojis to make it friendly.
- NEVER promote any political party. Stay neutral.
- Adapt based on user's knowledge level.
- End with an encouraging message or follow-up question.

India knowledge: 6 stages (Registration→Announcement/MCC→Nomination→Campaign→Polling→Counting), EVM, VVPAT, NOTA, BLO, Electoral Roll, MCC, Constituency, 543 Lok Sabha seats, 272 majority, 18+ voting age, voters.eci.gov.in for registration, 12 valid IDs for voting.`;

const WELCOME = {
  id: 'welcome', role: 'assistant',
  text: `👋 **Hi! Welcome to ElectionIQ!**

I'm your AI guide to understanding elections — step by step, in plain language.

**What would you like to learn today?**

Use the Quick Menu on the left, or just type your question below! 🇮🇳`,
};

const LEVELS = [
  { id: 'basic', label: '🟢 Beginner' },
  { id: 'intermediate', label: '🟡 Intermediate' },
  { id: 'advanced', label: '🔴 Advanced' },
];

const COUNTRIES = [
  { id: 'india', flag: '🇮🇳', label: 'India' },
  { id: 'us', flag: '🇺🇸', label: 'USA' },
  { id: 'uk', flag: '🇬🇧', label: 'UK' },
];

function parseText(text) {
  const lines = text.split('\n');
  const result = [];
  let listBuf = [];

  const flush = () => {
    if (listBuf.length > 0) {
      result.push(<ul key={`ul${result.length}`} className="msg-bubble-list">{listBuf}</ul>);
      listBuf = [];
    }
  };

  lines.forEach((line, i) => {
    const t = line.trim();
    if (!t) { flush(); return; }
    const html = t.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/_(.*?)_/g, '<em>$1</em>');
    if (t.startsWith('- ') || t.startsWith('• ') || /^\d+\.\s/.test(t)) {
      const clean = html.replace(/^[-•\d+.]\s*/, '');
      listBuf.push(<li key={i} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(clean) }} />);
    } else {
      flush();
      result.push(<p key={i} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />);
    }
  });
  flush();
  return result;
}

async function callGemini(history, msg, level, country) {
  if (!API_KEY) {
    await new Promise(r => setTimeout(r, 700));
    return getMock(msg);
  }
  try {
    const contents = [
      ...history.filter(m => m.id !== 'welcome').map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.text }],
      })),
      { role: 'user', parts: [{ text: msg }] },
    ];
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: MASTER_PROMPT + `\n\nUser level: ${level}. Country: ${country}.` }] },
          contents,
          generationConfig: { temperature: 0.7, maxOutputTokens: 600 },
        }),
      }
    );
    const data = await res.json();
    if (data.error || !data.candidates) return getMock(msg);
    return data.candidates[0].content.parts[0].text;
  } catch {
    return getMock(msg);
  }
}

function getMock(q) {
  const l = q.toLowerCase();
  if (l.includes('register') || l.includes('enroll') || l.includes('voter id'))
    return `**🗳️ How to Register as a Voter in India**\n\n**Step 1:** Visit **voters.eci.gov.in** or download the Voter Helpline App.\n\n**Step 2:** Click "New Registration" → Fill **Form 6**.\n\n**Step 3:** Upload documents:\n- Proof of Age (Aadhaar/Birth Certificate)\n- Proof of Address (Aadhaar/Utility Bill)\n- Passport-size photo\n\n**Step 4:** A BLO (Booth Level Officer) verifies your details.\n\n**Step 5:** Your name appears on the Electoral Roll — you're ready to vote! ✅\n\n_Helpline: **1950** (ECI Voter Helpline)_`;
  if (l.includes('evm') || l.includes('polling') || l.includes('booth') || l.includes('vote'))
    return `**📊 How to Vote on Polling Day (India)**\n\n**Before you go:**\n- Check your name: electoralsearch.eci.gov.in\n- Find your booth address\n- Keep a valid ID ready\n\n**At the Booth:**\n1. Join the queue at your assigned polling booth\n2. Show your **Voter ID / Aadhaar / Passport**\n3. Officer marks your left index finger with **indelible ink**\n4. Proceed to the EVM — press the button next to your candidate\n5. **VVPAT slip** appears for **7 seconds** to confirm your vote ✅\n\n_Your vote is completely secret! 🗳️_`;
  if (l.includes('nota'))
    return `**❓ What is NOTA?**\n\n**NOTA** = "**None of the Above**"\n\n- Available on all EVMs since 2013 (Supreme Court order)\n- Press NOTA if you don't want to vote for any candidate\n- NOTA votes are **counted and published**\n- BUT: they don't affect the result — the highest-voted candidate still wins\n- It's a way to register your **protest vote** 📣\n\n_In 2024 elections, NOTA received over 65 lakh votes!_`;
  if (l.includes('mcc') || l.includes('model code') || l.includes('conduct'))
    return `**🏛️ Model Code of Conduct (MCC)**\n\nThe MCC is a set of guidelines issued by the **Election Commission of India** that kicks in the moment election dates are announced.\n\n**What it restricts:**\n- No new government schemes or freebies\n- No use of government vehicles/resources for campaigning\n- Key officials cannot be transferred without ECI approval\n- No hate speech or voter bribery allowed\n- No polling within 200 metres of a booth\n\n**Purpose:** Ensure a **level playing field** for all parties 🤝`;
  if (l.includes('count') || l.includes('result'))
    return `**📊 How Votes Are Counted in India**\n\n1. Counting starts at **8 AM** on counting day\n2. **Postal ballots** (armed forces, overseas) counted first\n3. EVMs are brought from strong rooms to counting centers\n4. Each **round** covers one EVM from one polling station\n5. Candidates/agents observe every round\n6. Candidate with **highest votes** wins (First-Past-The-Post)\n7. **Returning Officer** formally declares the winner\n8. Results published on **results.eci.gov.in** 📡`;
  if (l.includes('timeline') || l.includes('phase') || l.includes('schedule'))
    return `**📅 Indian Election Timeline**\n\n1. 📢 **Announcement** → MCC begins immediately\n2. 📝 **Nomination Filing** → Candidates submit papers\n3. 🔍 **Scrutiny** → ECI reviews nominations\n4. 🚪 **Withdrawal Deadline** → Last date to pull out\n5. 📣 **Campaign Period** → Rallies, ads, door-to-door\n6. 🔕 **Silence Period** → 48 hrs before voting, no campaigning\n7. 🗳️ **Polling Day** → You vote!\n8. 📊 **Counting** → Results declared\n\n_2024 GE spanned **44 days** across 7 phases! 🇮🇳_`;
  return `**🤖 AI Offline Mode Active**\n\nI couldn't reach the live AI server, but I can still answer questions about:\n\n- 🗳️ How to register as a voter\n- 📊 EVM voting on polling day\n- 📅 The election timeline\n- 🏛️ Model Code of Conduct\n- ❓ NOTA and other terms\n\n_Try asking me about one of these topics!_`;
}

export default function Chat({ initPrompt, clearInitPrompt }) {
  const [msgs, setMsgs] = useState([WELCOME]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState('basic');
  const [country, setCountry] = useState('india');
  const [isListening, setIsListening] = useState(false);
  const bottomRef = useRef(null);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput(prev => prev ? prev + ' ' + transcript : transcript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const send = useCallback(async (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed || loading) return;
    const userMsg = { id: Date.now(), role: 'user', text: trimmed };
    setMsgs(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const reply = await callGemini(msgs, trimmed, level, country);
      setMsgs(prev => [...prev, { id: Date.now() + 1, role: 'assistant', text: reply }]);
    } catch {
      setMsgs(prev => [...prev, { id: Date.now() + 1, role: 'assistant', text: "⚠️ Connection issue. Check your API key in `.env` or try again." }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, msgs, level, country]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, loading]);

  useEffect(() => {
    if (!initPrompt) return;
    const timeout = setTimeout(() => {
      send(initPrompt);
      clearInitPrompt?.();
    }, 0);
    return () => clearTimeout(timeout);
  }, [initPrompt, send, clearInitPrompt]);

  const handleKey = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } };
  const reset = () => setMsgs([WELCOME]);

  return (
    <div className="page anim-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title">AI <span className="g-text">Assistant</span></h1>
          <p className="page-desc">Ask anything about elections. Powered by Google Gemini · Defaults to 🇮🇳 India.</p>
        </div>
        <div className="badge badge-green" style={{ padding: '8px 12px', fontSize: '0.8rem' }}>
          <Radio size={14} style={{ animation: 'pulseRing 2s infinite' }} /> LIVE: India General Elections 2024
        </div>
      </div>

      <div className="chat-layout">
        {/* Sidebar */}
        <div className="chat-side">
          <div className="chat-side-section">⚡ Quick Menu</div>
          {QUICK_MENU.map(item => (
            <button key={item.id} className="chat-pill" onClick={() => send(item.prompt)}>{item.label}</button>
          ))}

          <div className="chat-side-divider" />
          <div className="chat-side-section">🌏 Country</div>
          {COUNTRIES.map(c => (
            <button key={c.id} className={`chat-pill ${country === c.id ? 'active-pill' : ''}`} onClick={() => setCountry(c.id)}>
              {c.flag} {c.label} {country === c.id ? '✓' : ''}
            </button>
          ))}

          <div className="chat-side-divider" />
          <div className="chat-side-section">🧠 My Level</div>
          {LEVELS.map(l => (
            <button key={l.id} className={`chat-pill ${level === l.id ? 'active-pill' : ''}`} onClick={() => setLevel(l.id)}>
              {l.label}
            </button>
          ))}

          <div className="chat-side-divider" />
          <div className="chat-side-section">💡 Ask About</div>
          {CHAT_SUGGESTIONS.map((s, i) => (
            <button key={i} className="chat-pill" onClick={() => send(s)}>{s}</button>
          ))}
        </div>

        {/* Chat box */}
        <div className="chat-box">
          <div className="chat-topbar">
            <div className="chat-avatar-icon">🗳️</div>
            <div>
              <div className="chat-info-name">ElectionIQ Assistant</div>
              <div className="chat-info-status">
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
                Online · {COUNTRIES.find(c => c.id === country)?.flag} {COUNTRIES.find(c => c.id === country)?.label} · {LEVELS.find(l => l.id === level)?.label}
              </div>
            </div>
            <div className="chat-topbar-actions">
              <button onClick={reset} className="btn btn-ghost btn-sm">
                <RefreshCw size={13} /> Reset
              </button>
            </div>
          </div>

          <div className="chat-messages">
            {msgs.map(m => (
              <div key={m.id} className={`msg ${m.role}`}>
                <div className="msg-av">{m.role === 'assistant' ? '🗳️' : '👤'}</div>
                <div className="msg-bubble">{parseText(m.text)}</div>
              </div>
            ))}
            {loading && (
              <div className="msg assistant">
                <div className="msg-av">🗳️</div>
                <div className="msg-bubble">
                  <div className="typing-dots">
                    <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="chat-input-row">
            <textarea
              className="chat-textarea"
              placeholder="Ask anything about elections… e.g. 'How do I register to vote?'"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              rows={1}
            />
            <button 
              className="chat-send" 
              style={{ background: isListening ? '#ef4444' : 'var(--bg-surface)', color: isListening ? '#fff' : 'var(--text)', border: '1px solid var(--border)' }} 
              onClick={isListening ? null : startListening} 
              disabled={loading}
              title="Voice Input"
            >
              {isListening ? <MicOff size={16} /> : <Mic size={16} />}
            </button>
            <button className="chat-send" onClick={() => send()} disabled={!input.trim() || loading} title="Send Message">
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Chat.propTypes = {
  /** Optional initial prompt to send automatically when opened */
  initPrompt: PropTypes.string,
  /** Callback to clear the initial prompt after it has been sent */
  clearInitPrompt: PropTypes.func,
};
