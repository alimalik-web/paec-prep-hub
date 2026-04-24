import { useState, useEffect } from 'react';
import './index.css';
import {
  EXAM_DATE, ELECTRICAL_INTERVIEW, CIVIL_INTERVIEW, CHECKLIST_ITEMS
} from './data';

/* ─── Countdown Hook ─── */
function useCountdown(target) {
  const calc = () => {
    const diff = target - Date.now();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => { const id = setInterval(() => setT(calc()), 1000); return () => clearInterval(id); }, []);
  return t;
}

/* ─── Header ─── */
function AppHeader({ discipline, lang, setLang }) {
  const { d, h, m, s } = useCountdown(EXAM_DATE);
  const fmt = n => String(n).padStart(2, '0');
  return (
    <header className="app-header">
      <div className="header-top">
        <div className="header-brand">
          <div className="header-logo">⚛️</div>
          <div>
            <div className="header-title">PAEC Technician-I (SPS-04) Prep Hub</div>
            <div className="header-sub">{discipline === 'electrical' ? '⚡ Electrical Engineering (DAE)' : '🏗️ Civil Engineering (DAE)'}</div>
          </div>
        </div>
        <div className="header-controls">
          <div className="lang-toggle">
            <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
            <button className={`lang-btn ${lang === 'bi' ? 'active' : ''}`} onClick={() => setLang('bi')}>EN + اردو</button>
          </div>
          <div className="header-countdown">
            <div className="countdown-label">Exam Countdown · 30 Apr 2026 · 08:30 AM</div>
            <div className="countdown-timer">
              <span className="countdown-unit">{fmt(d)}d</span>
              <span className="countdown-unit">{fmt(h)}h</span>
              <span className="countdown-unit">{fmt(m)}m</span>
              <span className="countdown-unit">{fmt(s)}s</span>
            </div>
          </div>
        </div>
      </div>
      <div className="header-logistics">
        <span className="logistics-item">📍 PAEC Inter Science College, D.G. Khan</span>
        <span className="logistics-item">🪪 CNIC / شناختی کارڈ</span>
        <span className="logistics-item">📄 Call Letter / کال لیٹر</span>
        <span className="logistics-item">📋 Clipboard / کلپ بورڈ</span>
        <span className="logistics-item">✒️ Ball-pen / بال پین</span>
      </div>
    </header>
  );
}

/* ─── Study Mode ─── */
function StudyMode({ questions, isGreen, lang }) {
  const [openTopic, setOpenTopic] = useState(null);
  const [openQ, setOpenQ] = useState(null);
  const [filter, setFilter] = useState('All');

  const topics = ['All', ...new Set(questions.map(q => q.topic))];
  const filtered = filter === 'All' ? questions : questions.filter(q => q.topic === filter);
  const byTopic = filtered.reduce((acc, q) => { (acc[q.topic] = acc[q.topic] || []).push(q); return acc; }, {});
  const labels = ['A', 'B', 'C', 'D'];

  return (
    <div>
      <div className="section-header">
        <div className="section-title">📖 Question Bank (Bank of 1000+ Questions)</div>
        <div className="section-sub">Detailed study material sorted by topic (English + Urdu)</div>
      </div>
      <div className="topic-filter mb-2">
        {topics.map(t => (
          <button key={t} className={`tf-btn ${isGreen ? 'green' : ''} ${filter === t ? 'active' : ''}`} onClick={() => setFilter(t)}>{t}</button>
        ))}
      </div>
      {Object.entries(byTopic).map(([topic, qs]) => (
        <div key={topic} className="topic-section">
          <div className={`topic-title ${isGreen ? 'green' : ''}`} onClick={() => setOpenTopic(openTopic === topic ? null : topic)}>
            <span>📌 {topic} <span className="text-xs text-muted">({qs.length} sample qs shown)</span></span>
            <span className="chevron">{openTopic === topic ? '▲' : '▼'}</span>
          </div>
          {openTopic === topic && qs.map(q => (
            <div key={q.id} className="qa-item">
              <div className="qa-question" onClick={() => setOpenQ(openQ === q.id ? null : q.id)}>
                <div className="bilingual-pair">
                  <span>{q.questionEn}</span>
                  {lang === 'bi' && <span className="urdu-text text-muted">{q.questionUr}</span>}
                </div>
                <span className={`chevron ${openQ === q.id ? 'open' : ''}`}>▼</span>
              </div>
              {openQ === q.id && (
                <div className="qa-answer">
                  <div className="correct-tag">✅ Correct: {labels[q.correct]}</div>
                  <div className="bilingual-pair explanation">
                    <span>💡 {q.explanationEn}</span>
                    {lang === 'bi' && <span className="urdu-text">💡 {q.explanationUr}</span>}
                  </div>
                  <div className="mt-1" style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap' }}>
                    {q.optionsEn.map((opt, i) => (
                      <span key={i} style={{ fontSize: '.76rem', padding: '.2rem .5rem', borderRadius: '4px', background: i === q.correct ? 'var(--green-light)' : 'var(--surface)', border: '1px solid var(--border)', color: i === q.correct ? 'var(--green-dark)' : 'var(--text3)' }}>
                        <strong>{labels[i]}.</strong> {opt} {lang === 'bi' && <span className="urdu-text" style={{margin:'0 5px'}}>({q.optionsUr[i]})</span>}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ─── 6-Day Prep Quiz ─── */
function SixDayPrep({ allQuestions, isGreen, lang }) {
  const [activeQuiz, setActiveQuiz] = useState(null); // stores the array of questions for the quiz
  const [dayTitle, setDayTitle] = useState("");

  const days = [
    { day: 1, title: 'Day 1: Basics', desc: 'Easy level questions (20 Qs)', qCount: 20, levels: ['easy'] },
    { day: 2, title: 'Day 2: Fundamentals', desc: 'Easy to Medium questions (30 Qs)', qCount: 30, levels: ['easy', 'medium'] },
    { day: 3, title: 'Day 3: Core Concepts', desc: 'Medium level questions (40 Qs)', qCount: 40, levels: ['medium'] },
    { day: 4, title: 'Day 4: Applied Logic', desc: 'Medium to Hard questions (40 Qs)', qCount: 40, levels: ['medium', 'hard'] },
    { day: 5, title: 'Day 5: Mock Test 1', desc: 'Hard questions + Troubleshooting (50 Qs)', qCount: 50, levels: ['hard'] },
    { day: 6, title: 'Day 6: Final Grand Mock', desc: 'All Topics Mixed + PAEC Logic (100 Qs)', qCount: 100, levels: ['easy', 'medium', 'hard'] }
  ];

  const startDay = (dayObj) => {
    // Filter questions by required difficulty levels
    const pool = allQuestions.filter(q => dayObj.levels.includes(q.difficulty));
    // Shuffle and pick qCount (or as many as available)
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, dayObj.qCount);
    // If pool is small due to our current sample size, just repeat or use all
    const finalQs = shuffled.length < dayObj.qCount ? [...shuffled, ...allQuestions].slice(0, dayObj.qCount) : shuffled;
    
    setDayTitle(dayObj.title);
    setActiveQuiz(finalQs);
  };

  if (activeQuiz) {
    return (
      <div>
        <button className="btn btn-outline mb-2" onClick={() => setActiveQuiz(null)}>← Back to 6-Day Plan</button>
        <QuizMode questions={activeQuiz} isGreen={isGreen} lang={lang} title={dayTitle} />
      </div>
    );
  }

  return (
    <div>
      <div className="section-header">
        <div className="section-title">📅 6-Day Intensive Exam Prep</div>
        <div className="section-sub">Progressive difficulty quizzes leading up to the final exam. Over 1000 questions simulated.</div>
      </div>
      <div className="prep-grid">
        {days.map((d, i) => (
          <div key={i} className={`prep-card ${isGreen ? 'green' : ''}`} onClick={() => startDay(d)}>
            <div className={`prep-day-badge ${isGreen ? 'green' : ''}`}>Day {d.day}</div>
            <div className="prep-title">{d.title}</div>
            <div className="prep-desc">{d.desc}</div>
            <div className="prep-meta">
              <span>{d.qCount} Questions</span>
              <span style={{ color: isGreen ? 'var(--green)' : 'var(--blue)' }}>Start Quiz →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Standard Quiz Engine ─── */
function QuizMode({ questions, isGreen, lang, title = "Standard Quiz" }) {
  const [started, setStarted] = useState(false);
  const [shuffled, setShuffled] = useState([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [finished, setFinished] = useState(false);
  const [negMark, setNegMark] = useState(0.25);
  const labels = ['A', 'B', 'C', 'D'];

  const start = () => {
    const s = [...questions].sort(() => Math.random() - 0.5);
    setShuffled(s); setIdx(0); setSelected(null); setAnswered(false);
    setScore(0); setCorrect(0); setWrong(0); setFinished(false); setStarted(true);
  };

  const choose = (i) => {
    if (answered) return;
    setSelected(i); setAnswered(true);
    const q = shuffled[idx];
    if (i === q.correct) { setScore(p => p + 1); setCorrect(p => p + 1); }
    else { setScore(p => Math.round((p - negMark) * 100) / 100); setWrong(p => p + 1); }
  };

  const next = () => {
    if (idx + 1 >= shuffled.length) { setFinished(true); return; }
    setIdx(p => p + 1); setSelected(null); setAnswered(false);
  };

  const accentClass = isGreen ? 'green' : '';

  if (!started) return (
    <div>
      <div className="section-header">
        <div className="section-title">🎯 {title}</div>
        <div className="section-sub">Simulated test with PAEC negative marking. Bilingual supported.</div>
      </div>
      <div className="card">
        <div className="card-body" style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '.5rem' }}>📝</div>
          <div style={{ fontFamily: 'Outfit', fontSize: '1.3rem', fontWeight: 700, marginBottom: '.5rem' }}>{questions.length} Questions Ready</div>
          <div className="text-muted text-sm mb-2">Questions will be randomized each session</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {[0.25, 0.5, 1.0].map(v => (
              <label key={v} style={{ display: 'flex', alignItems: 'center', gap: '.35rem', cursor: 'pointer', fontSize: '.85rem', fontWeight: negMark === v ? 700 : 400, color: negMark === v ? (isGreen ? 'var(--green)' : 'var(--blue)') : 'var(--text2)' }}>
                <input type="radio" value={v} checked={negMark === v} onChange={() => setNegMark(v)} /> −{v} per wrong
              </label>
            ))}
          </div>
          <button className={`btn btn-primary ${accentClass}`} onClick={start}>Start {title} →</button>
        </div>
      </div>
    </div>
  );

  if (finished) {
    const pct = Math.round((score / shuffled.length) * 100);
    const grade = pct >= 70 ? '🏆 Excellent!' : pct >= 50 ? '✅ Good Pass' : '📚 Keep Studying';
    const gradeColor = pct >= 70 ? 'var(--green)' : pct >= 50 ? 'var(--blue)' : 'var(--red)';
    return (
      <div>
        <div className="section-header"><div className="section-title">📊 {title} Results</div></div>
        <div className="card">
          <div className="quiz-result">
            <div style={{ fontSize: '2.5rem', marginBottom: '.25rem' }}>{grade}</div>
            <div className="result-score-big" style={{ color: gradeColor }}>{score > 0 ? score.toFixed(2) : score}<span style={{ fontSize: '1.2rem', color: 'var(--text3)' }}>/{shuffled.length}</span></div>
            <div className="result-label">Final Score ({pct}%)</div>
            <div className="result-breakdown">
              <div className="result-stat"><div className="result-stat-val text-green">{correct}</div><div className="result-stat-lbl">Correct (+{correct})</div></div>
              <div className="result-stat"><div className="result-stat-val text-red">{wrong}</div><div className="result-stat-lbl">Wrong (−{(wrong * negMark).toFixed(2)})</div></div>
              <div className="result-stat"><div className="result-stat-val text-muted">{shuffled.length - correct - wrong}</div><div className="result-stat-lbl">Skipped</div></div>
            </div>
            <div style={{ display: 'flex', gap: '.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className={`btn btn-primary ${accentClass}`} onClick={start}>🔄 Retry</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const q = shuffled[idx];
  const prog = ((idx) / shuffled.length) * 100;

  return (
    <div>
      <div className="quiz-meta">
        <span className={`quiz-badge ${accentClass}`}>Q {idx + 1} / {shuffled.length} | Level: {q.difficulty || 'mixed'}</span>
        <div className="score-display">
          <span className="score-correct">✅ {correct}</span>
          <span className="score-wrong">❌ {wrong}</span>
          <span className="score-total">Score: {score}</span>
        </div>
      </div>
      <div className="progress-bar"><div className={`progress-fill ${accentClass}`} style={{ width: `${prog}%` }} /></div>

      <div className="question-card">
        <div className="question-number">📌 {q.topic}</div>
        <div className="question-text">
          <div className="bilingual-pair" style={{fontSize: '1.05rem', fontWeight: 600}}>
            <span>{q.questionEn}</span>
            {lang === 'bi' && <span className="urdu-text text-muted">{q.questionUr}</span>}
          </div>
        </div>
        <div className="options-grid">
          {q.optionsEn.map((opt, i) => {
            let cls = 'option-btn';
            if (answered) {
              if (i === q.correct) cls += ' correct';
              else if (i === selected && i !== q.correct) cls += ' wrong';
            }
            return (
              <button key={i} className={cls} onClick={() => choose(i)} disabled={answered}>
                <span className="option-label">{labels[i]}</span> 
                <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', flexGrow: 1}}>
                  <span>{opt}</span>
                  {lang === 'bi' && <span className="urdu-text text-muted" style={{fontSize: '0.9rem'}}>{q.optionsUr[i]}</span>}
                </div>
              </button>
            );
          })}
        </div>
        {answered && (
          <div className={`feedback-box ${selected === q.correct ? 'correct' : 'wrong'}`} style={{ marginTop: '.75rem' }}>
            {selected === q.correct ? '✅ Correct! ' : `❌ Wrong. Correct: ${labels[q.correct]}. `}
            <div className="bilingual-pair" style={{marginTop: '0.5rem'}}>
              <span>💡 {q.explanationEn}</span>
              {lang === 'bi' && <span className="urdu-text">💡 {q.explanationUr}</span>}
            </div>
          </div>
        )}
      </div>

      <div className="quiz-controls">
        <button className="btn btn-outline" onClick={() => { setFinished(true); }}>End Quiz</button>
        <div style={{ display: 'flex', gap: '.5rem' }}>
          {!answered && <button className="btn btn-outline" onClick={() => { setAnswered(true); setSelected(null); }}>Skip (0 marks)</button>}
          {answered && <button className={`btn btn-primary ${accentClass}`} onClick={next}>{idx + 1 >= shuffled.length ? 'See Results →' : 'Next Question →'}</button>}
        </div>
      </div>
    </div>
  );
}

/* ─── Interview Prep ─── */
function InterviewPrep({ questions, isGreen, lang }) {
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState(null);
  const cats = ['All', 'Technical', 'Behavioral', 'Situational'];
  const filtered = filter === 'All' ? questions : questions.filter(q => q.category === filter);

  return (
    <div>
      <div className="section-header">
        <div className="section-title">🎤 Interview Prep (STAR Method)</div>
        <div className="section-sub">Prepare for technical and behavioral questions in both languages.</div>
      </div>
      <div className="interview-filter mb-2">
        {cats.map(c => (
          <button key={c} className={`filter-btn ${isGreen ? 'green ' : ''}${filter === c ? 'active' : ''}`} onClick={() => setFilter(c)}>{c}</button>
        ))}
      </div>
      {filtered.map(q => (
        <div key={q.id} className="interview-card">
          <span className={`interview-badge badge-${q.category}`}>{q.category}</span>
          <div className="interview-q" onClick={() => setOpen(open === q.id ? null : q.id)}>
            <div className="bilingual-pair">
              <span>{q.questionEn}</span>
              {lang === 'bi' && <span className="urdu-text text-muted">{q.questionUr}</span>}
            </div>
          </div>
          {open === q.id && (
            <div style={{marginTop: '0.75rem'}}>
              <div className="star-label">⭐ STAR Method Answer:</div>
              <div className={`star-answer ${isGreen ? 'green' : ''}`}>
                <div className="bilingual-pair">
                  <span>{q.starEn}</span>
                  {lang === 'bi' && <span className="urdu-text" style={{marginTop: '0.5rem'}}>{q.starUr}</span>}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Checklist ─── */
function Checklist({ discipline, lang }) {
  const [checked, setChecked] = useState({});
  const toggle = id => setChecked(p => ({ ...p, [id]: !p[id] }));
  const sections = [
    { key: 'general', label: '🌐 General', items: CHECKLIST_ITEMS.general },
    ...(discipline === 'electrical'
      ? [{ key: 'electrical', label: '⚡ Electrical Focus', items: CHECKLIST_ITEMS.electrical }]
      : [{ key: 'civil', label: '🏗️ Civil Focus', items: CHECKLIST_ITEMS.civil }]),
  ];
  const allItems = sections.flatMap(s => s.items);
  const doneCount = allItems.filter(i => checked[i.id]).length;
  const pct = Math.round((doneCount / allItems.length) * 100);

  return (
    <div>
      <div className="section-header">
        <div className="section-title">✅ Final Week Checklist</div>
      </div>
      <div className="checklist-progress">
        <div className="cp-text">{doneCount}/{allItems.length} done</div>
        <div className="cp-bar"><div className="cp-fill" style={{ width: `${pct}%` }} /></div>
        <div style={{ fontSize: '.8rem', fontWeight: 700, color: pct === 100 ? 'var(--green)' : 'var(--text2)' }}>{pct}%</div>
      </div>
      {sections.map(sec => (
        <div key={sec.key} className="card mb-2">
          <div className="card-header"><span style={{ fontWeight: 700 }}>{sec.label}</span></div>
          <div className="card-body">
            {sec.items.map(item => (
              <div key={item.id} className={`checklist-item ${checked[item.id] ? 'checked' : ''}`} onClick={() => toggle(item.id)}>
                <div className="check-box">{checked[item.id] ? '✓' : ''}</div>
                <div className="check-text bilingual-pair">
                  <span>{item.textEn}</span>
                  {lang === 'bi' && <span className="urdu-text" style={{fontSize: '0.9rem'}}>{item.textUr}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Root App ─── */
export default function App() {
  const [discipline, setDiscipline] = useState('electrical');
  const [tab, setTab] = useState('study');
  const [lang, setLang] = useState('bi');
  const [data, setData] = useState({ general: [], technical: [], loading: true });
  
  const isGreen = discipline === 'civil';

  useEffect(() => {
    setData(prev => ({ ...prev, loading: true }));
    
    const loadData = async () => {
      try {
        const genModule = await import('./data_general');
        const techModule = discipline === 'electrical' 
          ? await import('./data_electrical') 
          : await import('./data_civil');
        
        setData({
          general: genModule.GENERAL_QUESTIONS,
          technical: discipline === 'electrical' ? techModule.ELECTRICAL_QUESTIONS : techModule.CIVIL_QUESTIONS,
          loading: false
        });
      } catch (err) {
        console.error("Failed to load question bank:", err);
      }
    };

    loadData();
  }, [discipline]);

  const interviewQuestions = discipline === 'electrical' ? ELECTRICAL_INTERVIEW : CIVIL_INTERVIEW;
  const allQuestions = [...data.general, ...data.technical];

  const tabs = [
    { id: 'study', label: '📖 Study Bank' },
    { id: '6day', label: '📅 6-Day Prep' },
    { id: 'quiz', label: '🎯 Custom Quiz' },
    { id: 'interview', label: '🎤 Interview' },
    { id: 'checklist', label: '✅ Checklist' },
  ];

  return (
    <div className="app-container">
      <AppHeader discipline={discipline} lang={lang} setLang={setLang} />

      {/* Discipline Toggle */}
      <div className="toggle-bar">
        <div className="toggle-wrap">
          <button
            className={`toggle-btn ${discipline === 'electrical' ? 'active-elec' : ''}`}
            onClick={() => { setDiscipline('electrical'); setTab('study'); }}
          >⚡ Electrical (DAE)</button>
          <button
            className={`toggle-btn ${discipline === 'civil' ? 'active-civil' : ''}`}
            onClick={() => { setDiscipline('civil'); setTab('study'); }}
          >🏗️ Civil (DAE)</button>
        </div>
      </div>

      {/* Nav Tabs */}
      <nav className="nav-tabs">
        {tabs.map(t => (
          <button
            key={t.id}
            className={`nav-tab ${tab === t.id ? (isGreen ? 'active active-green' : 'active') : ''}`}
            onClick={() => setTab(t.id)}
          >{t.label}</button>
        ))}
      </nav>

      <main className="main">
        {data.loading ? (
          <div className="loading-state card">
            <div className="loader"></div>
            <p>Loading Preparation Hub...</p>
            <p style={{fontSize: '0.8rem', opacity: 0.7}}>Preparing bilingual question bank (1,000+ entries)</p>
          </div>
        ) : (
          <>
            {tab === 'study' && <StudyMode questions={allQuestions} isGreen={isGreen} lang={lang} />}
            {tab === '6day' && <SixDayPrep allQuestions={allQuestions} isGreen={isGreen} lang={lang} />}
            {tab === 'quiz' && <QuizMode questions={allQuestions} isGreen={isGreen} lang={lang} title="Custom Full Quiz" />}
            {tab === 'interview' && <InterviewPrep questions={interviewQuestions} isGreen={isGreen} lang={lang} />}
            {tab === 'checklist' && <Checklist discipline={discipline} lang={lang} />}
          </>
        )}
      </main>
    </div>
  );
}
