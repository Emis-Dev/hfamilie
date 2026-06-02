import { useState, useRef, useEffect } from 'react';
import mockData from './data/mockData.json';
import childrenImg from './assets/happy_school_children.png';

function App() {
  const [lang, setLang] = useState('nl');
  const [activeTeacher, setActiveTeacher] = useState(0);
  
  // Modal states
  const [showTourModal, setShowTourModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showSubpageModal, setShowSubpageModal] = useState(false);
  const [subpageContent, setSubpageContent] = useState({ title: '', text: '' });
  
  // Navigation Dropdown states
  const [schoolDropdownOpen, setSchoolDropdownOpen] = useState(false);
  const [practicalDropdownOpen, setPracticalDropdownOpen] = useState(false);
  
  // Form submission success states
  const [tourSubmitted, setTourSubmitted] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Modal DOM references
  const tourDialogRef = useRef(null);
  const contactDialogRef = useRef(null);
  const videoDialogRef = useRef(null);
  const subpageDialogRef = useRef(null);

  // Content helpers
  const t = mockData[lang];

  // Open/Close Modals using native HTML5 dialog APIs (impeccable api portal compliance)
  useEffect(() => {
    if (showTourModal) {
      tourDialogRef.current?.showModal();
    } else {
      tourDialogRef.current?.close();
      setTourSubmitted(false);
    }
  }, [showTourModal]);

  useEffect(() => {
    if (showContactModal) {
      contactDialogRef.current?.showModal();
    } else {
      contactDialogRef.current?.close();
      setContactSubmitted(false);
    }
  }, [showContactModal]);

  useEffect(() => {
    if (showVideoModal) {
      videoDialogRef.current?.showModal();
    } else {
      videoDialogRef.current?.close();
    }
  }, [showVideoModal]);

  useEffect(() => {
    if (showSubpageModal) {
      subpageDialogRef.current?.showModal();
    } else {
      subpageDialogRef.current?.close();
    }
  }, [showSubpageModal]);

  const openSubpage = (titleKey, textKey) => {
    setSubpageContent({
      title: t.subpages[titleKey],
      text: t.subpages[textKey]
    });
    setShowSubpageModal(true);
  };

  // Handle outside click to close modals
  const handleBackdropClick = (e, setModalState) => {
    const dialogDimensions = e.target.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      setModalState(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* 1. Header Navigation Wrapper */}
      <header className="header-wrapper glass-header">
        <div className="header-inner">
          <a href="#" className="header-logo">
            {/* Custom school mascot bird logo SVG */}
            <svg viewBox="0 0 100 100" width="40" height="40" fill="currentColor">
              <path d="M50 15 C30 15 20 30 20 45 C20 52 23 58 27 63 L22 80 C21 83 24 85 27 83 L40 73 C43 74 46 75 50 75 C70 75 80 60 80 45 C80 30 70 15 50 15 Z" fill="#eff6ff" stroke="currentColor" strokeWidth="4" />
              <circle cx="42" cy="40" r="6" fill="currentColor" />
              <path d="M42 38 Q45 35 48 38" stroke="white" strokeWidth="2" fill="none" />
              <path d="M58 40 Q65 48 55 52" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M18 45 L32 40" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              {/* Shield banner HF */}
              <rect x="68" y="55" width="22" height="26" rx="4" fill="currentColor" />
              <text x="73" y="73" fill="white" fontSize="13" fontWeight="bold" fontFamily="var(--font-display)">HF</text>
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
              <span style={{ fontSize: '1.05rem', fontWeight: 800 }}>{t.header.schoolName}</span>
              <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                {t.header.slogan} 
                <span style={{ color: 'red' }}>❤️</span>
              </span>
            </div>
          </a>

          <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <ul className="nav-links">
              <li className="nav-item">
                <a href="#" className="nav-link active">{t.header.nav.home}</a>
              </li>
              
              {/* Dropdown 1: Onze School */}
              <li 
                className="nav-item" 
                onMouseEnter={() => setSchoolDropdownOpen(true)}
                onMouseLeave={() => setSchoolDropdownOpen(false)}
              >
                <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); setSchoolDropdownOpen(!schoolDropdownOpen); }}>
                  {t.header.nav.school}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </a>
                {schoolDropdownOpen && (
                  <div style={dropdownStyles}>
                    <a href="#visie" className="dropdown-item" onClick={(e) => { e.preventDefault(); setSchoolDropdownOpen(false); openSubpage('visieTitle', 'visieText'); }}>Visie & Missie</a>
                    <a href="#geschiedenis" className="dropdown-item" onClick={(e) => { e.preventDefault(); setSchoolDropdownOpen(false); openSubpage('historyTitle', 'historyText'); }}>Historiek</a>
                    <a href="#pedagogisch" className="dropdown-item" onClick={(e) => { e.preventDefault(); setSchoolDropdownOpen(false); openSubpage('pedagoTitle', 'pedagoText'); }}>Pedagogisch Project</a>
                  </div>
                )}
              </li>

              {/* Dropdown 2: Praktisch */}
              <li 
                className="nav-item"
                onMouseEnter={() => setPracticalDropdownOpen(true)}
                onMouseLeave={() => setPracticalDropdownOpen(false)}
              >
                <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); setPracticalDropdownOpen(!practicalDropdownOpen); }}>
                  {t.header.nav.practical}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </a>
                {practicalDropdownOpen && (
                  <div style={dropdownStyles}>
                    <a href="#hours" className="dropdown-item" onClick={() => setPracticalDropdownOpen(false)}>Schooluren</a>
                    <a href="#hours" className="dropdown-item" onClick={() => setPracticalDropdownOpen(false)}>Buitenschoolse Opvang</a>
                    <a href="#reglement" className="dropdown-item" onClick={(e) => { e.preventDefault(); setPracticalDropdownOpen(false); openSubpage('reglementTitle', 'reglementText'); }}>Schoolreglement</a>
                    <a href="#inschrijvingen" className="dropdown-item" onClick={(e) => { e.preventDefault(); setPracticalDropdownOpen(false); openSubpage('inschrijfTitle', 'inschrijfText'); }}>Inschrijvingen</a>
                  </div>
                )}
              </li>
              
              <li className="nav-item">
                <a href="#agenda" className="nav-link">{t.header.nav.calendar}</a>
              </li>
              <li className="nav-item">
                <a href="#team" className="nav-link">{t.header.nav.team}</a>
              </li>
              <li className="nav-item">
                <a href="#contact" className="nav-link">{t.header.nav.contact}</a>
              </li>
            </ul>

            {/* Language Switcher Scaffold */}
            <div style={{ display: 'flex', gap: '0.4rem', borderLeft: '1px solid var(--color-border)', paddingLeft: '1.25rem' }}>
              <button 
                onClick={() => setLang('nl')} 
                style={{ ...langBtnStyles, fontWeight: lang === 'nl' ? '800' : '400', opacity: lang === 'nl' ? 1 : 0.5 }}
                title="Nederlands"
              >
                NL
              </button>
              <button 
                onClick={() => setLang('en')} 
                style={{ ...langBtnStyles, fontWeight: lang === 'en' ? '800' : '400', opacity: lang === 'en' ? 1 : 0.5 }}
                title="English"
              >
                EN
              </button>
            </div>

            {/* Action buttons matching mockup header */}
            <div style={{ display: 'flex', gap: '0.75rem', marginLeft: '0.5rem' }}>
              <button onClick={() => setShowTourModal(true)} className="btn btn-secondary" style={{ fontSize: '0.85rem', padding: '0.6rem 1.15rem' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                {t.header.ctaTour}
              </button>
              <button onClick={() => setShowContactModal(true)} className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '0.6rem 1.15rem', borderWidth: '1px' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                {t.header.ctaContact}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Website Content Container */}
      <main className="container" style={{ flexGrow: 1 }}>

        {/* 2. Hero Section (Restructured exact mockup hero) */}
        <section className="hero-wrapper">
          {/* Wave/hand outline silhouette watermarks matching the screenshot mockup */}
          <svg className="hero-hand-watermark" viewBox="0 0 100 100" fill="currentColor">
            <path d="M10 80 Q20 30 30 25 Q35 22 40 30 Q45 40 40 50 Q55 20 62 20 Q68 20 68 30 Q68 45 55 58 Q75 25 80 30 Q85 35 78 52 Q90 38 95 44 Q98 50 85 68 L70 85 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <svg className="hero-shapes" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          
          <div className="hero-content">
            {/* Hand-drawn heart outline badge top-left of header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', color: '#eab308' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                <circle cx="12" cy="11" r="2" fill="currentColor" />
              </svg>
            </div>

            <h1>{t.hero.title}</h1>
            <p>{t.hero.text}</p>
            
            <div className="hero-actions">
              <button onClick={() => setShowTourModal(true)} className="btn btn-primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {t.hero.ctaWelcome}
              </button>
              <button onClick={() => setShowVideoModal(true)} className="btn btn-outline" style={{ background: '#ffffff' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
                {t.hero.ctaVideo}
              </button>
            </div>
          </div>

          <div className="hero-image-wrapper">
            <div className="hero-image-mask">
              <img 
                src={childrenImg} 
                alt="Blij spelende kinderen basisschool Heilige Familie" 
              />
            </div>
          </div>
        </section>

        {/* 3. Bento Grid Section */}
        <section className="grid-bento">
          
          {/* Card 1: Praktische Info */}
          <div className="card-bento" id="hours">
            <div className="bento-info-header">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <h3>{t.practical.title}</h3>
            </div>
            
            <div className="bento-info-grid">
              
              <div className="info-item">
                <div className="info-icon-wrapper">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div className="info-content">
                  <span className="info-label">{t.practical.hoursTitle}</span>
                  <span className="info-value">{t.practical.hoursValue}</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-wrapper">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </div>
                <div className="info-content">
                  <span className="info-label">{t.practical.careTitle}</span>
                  <span className="info-value">{t.practical.careValue}</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-wrapper">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div className="info-content">
                  <span className="info-label">{t.practical.addressTitle}</span>
                  <span className="info-value">{t.practical.addressValue}</span>
                </div>
              </div>

            </div>

            <a href="https://maps.google.com/?q=Kloosterstraat+6,+9250+Waasmunster" target="_blank" rel="noopener noreferrer" className="bento-link">
              {t.practical.moreInfo}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>

          {/* Card 2: Agenda */}
          <div className="card-bento" id="agenda">
            <div className="bento-info-header">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <h3>{t.agenda.title}</h3>
            </div>

            <div className="agenda-list">
              {t.agenda.events.map((event) => (
                <div key={event.id} className="agenda-item">
                  <div className="agenda-date-badge">
                    <span className="agenda-day">{event.day}</span>
                    <span className="agenda-month">{event.month}</span>
                  </div>
                  <div className="agenda-details">
                    <span className="agenda-event-title">{event.title}</span>
                    <span className="agenda-event-desc">{event.subtitle}</span>
                  </div>
                  <span className="agenda-time">{event.time}</span>
                </div>
              ))}
            </div>

            <a href="#" onClick={(e) => { e.preventDefault(); alert("Kalender module komt binnenkort online!"); }} className="bento-link">
              {t.agenda.allEvents}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>

          {/* Card 3: Ons Team */}
          <div className="card-bento" id="team">
            <div className="bento-info-header">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <h3>{t.team.title}</h3>
            </div>

            {/* Avatars of selected teachers */}
            <div className="team-avatars">
              {t.team.members.map((member, idx) => (
                <div 
                  key={member.name}
                  onClick={() => setActiveTeacher(idx)}
                  className={`avatar-wrapper ${activeTeacher === idx ? 'active' : ''}`}
                >
                  <div className="team-avatar">
                    {/* Generates beautiful colored vector faces dynamically */}
                    <svg viewBox="0 0 100 100" width="100%" height="100%">
                      <rect width="100" height="100" fill={avatarBgs[idx]} />
                      {/* Avatar design hair */}
                      <circle cx="50" cy="50" r="28" fill="#e2e8f0" />
                      {idx === 0 && <path d="M30 35 Q50 15 70 35 L70 50 L30 50 Z" fill="#b45309" />} {/* Sofie brown hair */}
                      {idx === 1 && <path d="M25 40 Q50 20 75 40 L70 48 L30 48 Z" fill="#1e293b" />} {/* Tom black hair */}
                      {idx === 2 && <path d="M25 35 Q50 10 75 35 Q85 60 75 70" stroke="#f59e0b" strokeWidth="8" fill="none" />} {/* Lien long blonde hair */}
                      {idx === 3 && <path d="M30 35 Q50 20 70 35 L70 50 L30 50 Z" fill="#78716c" />} {/* Anke short gray hair */}
                      {/* Skin */}
                      <circle cx="50" cy="53" r="20" fill="#fed7aa" />
                      {/* Eyes */}
                      <circle cx="44" cy="50" r="2" fill="#0f172a" />
                      <circle cx="56" cy="50" r="2" fill="#0f172a" />
                      {/* Smile */}
                      <path d="M44 58 Q50 63 56 58" stroke="#e11d48" strokeWidth="2" fill="none" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span className="avatar-tooltip">{member.name.split(' ')[1]}</span>
                </div>
              ))}
            </div>

            {/* Dynamic quote box changing on click */}
            <div className="team-quote-bubble">
              <p>
                <strong>{t.team.members[activeTeacher].name} ({t.team.members[activeTeacher].role}):</strong><br/>
                "{t.team.members[activeTeacher].quote}"
              </p>
            </div>

            <a href="#" onClick={(e) => { e.preventDefault(); alert("Volledige teamlijst is in aanbouw!"); }} className="bento-link">
              {t.team.allTeam}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>

        </section>

        {/* 4. Highlight Pillars Footer Bar */}
        <section className="pillars-wrapper">
          {t.pillars.map((pillar, idx) => (
            <div key={pillar.title} className="pillar-item">
              <div className="pillar-icon-wrapper">
                {/* Dynamic SVG shapes for each pillar representing warmth, growth, community, respect */}
                {idx === 0 && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                )}
                {idx === 1 && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                )}
                {idx === 2 && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                )}
                {idx === 3 && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                  </svg>
                )}
              </div>
              <div className="pillar-content">
                <span className="pillar-title">{pillar.title}</span>
                <span className="pillar-desc">{pillar.description}</span>
              </div>
            </div>
          ))}
        </section>

      </main>

      {/* Footer Info Bottom */}
      <footer style={{ borderTop: '1px solid var(--color-border)', padding: '2rem 0', backgroundColor: '#ffffff', color: 'var(--color-text-muted)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'between', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--color-primary)' }}>HF Heilige Familie</span>
            <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>© {new Date().getFullYear()} Basisschool Heilige Familie Waasmunster. Alle rechten voorbehouden.</p>
          </div>
          <div style={{ display: 'flex', gap: '2rem', fontSize: '0.85rem', marginLeft: 'auto' }}>
            <div>
              <strong>Adres:</strong>
              <p style={{ fontSize: '0.85rem', marginTop: '0.2rem' }}>Kloosterstraat 6, 9250 Waasmunster</p>
            </div>
            <div>
              <strong>Contact:</strong>
              <p style={{ fontSize: '0.85rem', marginTop: '0.2rem' }}>Tel: +32 (0)9 348 12 34<br/>Email: info@hfamilie.be</p>
            </div>
          </div>
        </div>
      </footer>

      {/* ======================================================== */}
      {/* 5. Interactive Dialog Popups (impeccable clean UI portals) */}
      
      {/* Tour Request Modal */}
      <dialog 
        ref={tourDialogRef} 
        onClick={(e) => handleBackdropClick(e, setShowTourModal)}
      >
        <div className="modal-header">
          <span className="modal-title">{t.header.ctaTour}</span>
          <button onClick={() => setShowTourModal(false)} className="modal-close-btn">&times;</button>
        </div>
        {!tourSubmitted ? (
          <form onSubmit={(e) => { e.preventDefault(); setTourSubmitted(true); }}>
            <div className="form-group">
              <label htmlFor="tour-name">{lang === 'nl' ? 'Naam ouder(s)' : 'Parent Name(s)'}</label>
              <input type="text" id="tour-name" required className="form-control" placeholder="bv. Jan Peeters" />
            </div>
            <div className="form-group">
              <label htmlFor="tour-email">E-mailadres</label>
              <input type="email" id="tour-email" required className="form-control" placeholder="bv. jan@email.com" />
            </div>
            <div className="form-group">
              <label htmlFor="tour-child-age">{lang === 'nl' ? 'Leeftijd kind' : "Child's Age"}</label>
              <select id="tour-child-age" className="form-control">
                <option>2,5 - 3 jaar</option>
                <option>4 - 6 jaar</option>
                <option>7 - 9 jaar</option>
                <option>10 - 12 jaar</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="tour-date">{lang === 'nl' ? 'Voorkeur datum rondleiding' : 'Preferred Tour Date'}</label>
              <input type="date" id="tour-date" required className="form-control" />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              {lang === 'nl' ? 'Aanvraag versturen' : 'Submit Request'}
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="green" strokeWidth="2.5" style={{ margin: '0 auto 1rem' }}>
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <h4 style={{ color: 'var(--color-primary)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
              {lang === 'nl' ? 'Aanvraag ontvangen!' : 'Request Received!'}
            </h4>
            <p style={{ fontSize: '0.9rem', margin: '0 auto' }}>
              {lang === 'nl' 
                ? 'We nemen zo snel mogelijk contact met u op om de rondleiding te bevestigen. Tot snel!' 
                : 'We will contact you as soon as possible to confirm your tour. See you soon!'}
            </p>
          </div>
        )}
      </dialog>

      {/* Contact Form Modal */}
      <dialog 
        ref={contactDialogRef} 
        onClick={(e) => handleBackdropClick(e, setShowContactModal)}
      >
        <div className="modal-header">
          <span className="modal-title">{t.header.ctaContact}</span>
          <button onClick={() => setShowContactModal(false)} className="modal-close-btn">&times;</button>
        </div>
        {!contactSubmitted ? (
          <form onSubmit={(e) => { e.preventDefault(); setContactSubmitted(true); }}>
            <div className="form-group">
              <label htmlFor="contact-name">Naam</label>
              <input type="text" id="contact-name" required className="form-control" placeholder="bv. Marie Devos" />
            </div>
            <div className="form-group">
              <label htmlFor="contact-email">E-mailadres</label>
              <input type="email" id="contact-email" required className="form-control" placeholder="bv. marie@email.com" />
            </div>
            <div className="form-group">
              <label htmlFor="contact-message">Bericht</label>
              <textarea id="contact-message" required className="form-control" placeholder="Schrijf hier uw vraag..."></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              {lang === 'nl' ? 'Bericht verzenden' : 'Send Message'}
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="green" strokeWidth="2.5" style={{ margin: '0 auto 1rem' }}>
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <h4 style={{ color: 'var(--color-primary)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
              {lang === 'nl' ? 'Bericht verzonden!' : 'Message Sent!'}
            </h4>
            <p style={{ fontSize: '0.9rem', margin: '0 auto' }}>
              {lang === 'nl' 
                ? 'Bedankt voor uw bericht. Ons schoolsecretariaat beantwoordt uw vraag binnen 24 uur.' 
                : 'Thank you for your message. Our school office will answer your inquiry within 24 hours.'}
            </p>
          </div>
        )}
      </dialog>

      {/* Video Modal */}
      <dialog 
        ref={videoDialogRef} 
        onClick={(e) => handleBackdropClick(e, setShowVideoModal)}
        style={{ maxWidth: '800px', padding: '1.5rem', backgroundColor: '#0f172a' }}
      >
        <div className="modal-header" style={{ marginBottom: '1rem' }}>
          <span className="modal-title" style={{ color: '#ffffff' }}>{t.hero.ctaVideo}</span>
          <button onClick={() => setShowVideoModal(false)} className="modal-close-btn" style={{ color: '#ffffff' }}>&times;</button>
        </div>
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '12px', background: '#000' }}>
          <iframe 
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
            title="School Welcome Video" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      </dialog>

      {/* Subpage Info Modal */}
      <dialog 
        ref={subpageDialogRef} 
        onClick={(e) => handleBackdropClick(e, setShowSubpageModal)}
        style={{ maxWidth: '650px' }}
      >
        <div className="modal-header">
          <span className="modal-title">{subpageContent.title}</span>
          <button onClick={() => setShowSubpageModal(false)} className="modal-close-btn">&times;</button>
        </div>
        <div style={{ whiteSpace: 'pre-line', color: 'var(--color-text-muted)', lineHeight: '1.6', fontSize: '0.98rem' }}>
          {subpageContent.text}
        </div>
      </dialog>

    </div>
  );
}

// Inline styles for elements
const langBtnStyles = {
  background: 'none',
  border: 'none',
  fontSize: '0.85rem',
  color: 'var(--color-text-muted)',
  cursor: 'pointer',
  padding: '0.2rem 0.4rem',
  fontFamily: 'var(--font-sans)',
  transition: 'all 0.2s ease',
};

const dropdownStyles = {
  position: 'absolute',
  top: '100%',
  left: 0,
  backgroundColor: '#ffffff',
  border: '1px solid var(--color-border)',
  borderRadius: '12px',
  padding: '0.5rem 0',
  minWidth: '200px',
  boxShadow: 'var(--shadow-md)',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 100,
  animation: 'modal-in 0.2s ease-out',
};

// Teacher Avatar backgrounds color array
const avatarBgs = [
  '#dbeafe',
  '#fef3c7',
  '#fee2e2',
  '#dcfce7'
];

export default App;
