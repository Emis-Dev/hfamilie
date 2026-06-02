import { useState, useRef, useEffect } from 'react';
import mockData from './data/mockData.json';
import childrenImg from './assets/happy_school_children.png';
import schoolLogo from './assets/school_logo.png';

function App() {
  const [lang, setLang] = useState('nl');
  const [activeTeacher, setActiveTeacher] = useState(0);
  
  // Modal states
  const [showTourModal, setShowTourModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showSubpageModal, setShowSubpageModal] = useState(false);
  const [showEnrollmentWizard, setShowEnrollmentWizard] = useState(false);
  const [subpageContent, setSubpageContent] = useState({ title: '', text: '' });
  
  // Navigation Dropdown states
  const [schoolDropdownOpen, setSchoolDropdownOpen] = useState(false);
  const [practicalDropdownOpen, setPracticalDropdownOpen] = useState(false);
  
  // Form submission success states
  const [tourSubmitted, setTourSubmitted] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Enrollment Wizard States (Futuristic 2030s Dashboard)
  const [enrollmentStep, setEnrollmentStep] = useState(1);
  const [childBirthDate, setChildBirthDate] = useState('2024-03-15');
  const [hasSiblingPriority, setHasSiblingPriority] = useState(false);
  const [childFirstName, setChildFirstName] = useState('');
  const [childLastName, setChildLastName] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [passId, setPassId] = useState('');
  const [passAddedToWallet, setPassAddedToWallet] = useState(false);

  // Interactive Calendar States (Futuristic Schedule Dashboard)
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [calendarFilter, setCalendarFilter] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState(5); // June 2026 (0-indexed, so 5 is June)
  const [selectedDayStr, setSelectedDayStr] = useState(null);
  const [syncState, setSyncState] = useState('idle'); // idle, syncing, synced

  // Modal DOM references
  const tourDialogRef = useRef(null);
  const contactDialogRef = useRef(null);
  const videoDialogRef = useRef(null);
  const subpageDialogRef = useRef(null);
  const enrollmentDialogRef = useRef(null);
  const calendarDialogRef = useRef(null);

  // Mock school calendar events data
  const calendarEvents = [
    { id: 1, date: '2026-06-01', title: 'Pinkstermaandag', desc: 'Facultatieve verlofdag (vrij)', category: 'vacation', time: 'Hele dag' },
    { id: 2, date: '2026-06-06', title: 'Groot Schoolfeest', desc: 'Optredens & BBQ op school', category: 'activity', time: '16:00 - 21:00' },
    { id: 3, date: '2026-06-16', title: 'Facultatieve verlofdag', desc: 'School gesloten', category: 'vacation', time: 'Hele dag' },
    { id: 4, date: '2026-06-24', title: 'Pedagogische studiedag', desc: 'Kinderen vrij', category: 'study', time: 'Hele dag' },
    { id: 5, date: '2026-06-30', title: 'Laatste Schooldag', desc: 'Einde schooljaar (halve dag)', category: 'activity', time: '08:35 - 12:10' },
    { id: 6, date: '2026-07-01', title: 'Start Zomervakantie ☀️', desc: 'Fijne vakantie allemaal!', category: 'vacation', time: '2 maanden' },
    { id: 7, date: '2026-05-01', title: 'Dag van de Arbeid', desc: 'Wettelijke feestdag (vrij)', category: 'vacation', time: 'Hele dag' },
    { id: 8, date: '2026-05-14', title: 'O.L.H. Hemelvaart', desc: 'Verlofdag (vrij)', category: 'vacation', time: 'Hele dag' },
    { id: 9, date: '2026-05-15', title: 'Brugdag Hemelvaart', desc: 'Geen les', category: 'vacation', time: 'Hele dag' },
    { id: 10, date: '2026-05-27', title: 'Zorg- & Evaluatiemoment', desc: 'Klasbesprekingen leerkrachten', category: 'study', time: 'Hele dag' }
  ];

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

  useEffect(() => {
    if (showEnrollmentWizard) {
      enrollmentDialogRef.current?.showModal();
    } else {
      enrollmentDialogRef.current?.close();
      setEnrollmentStep(1);
      setPassAddedToWallet(false);
    }
  }, [showEnrollmentWizard]);

  useEffect(() => {
    if (showCalendarModal) {
      calendarDialogRef.current?.showModal();
    } else {
      calendarDialogRef.current?.close();
      setSyncState('idle');
      setSelectedDayStr(null);
      setCalendarFilter('all');
    }
  }, [showCalendarModal]);

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

  // Flemish school entry dates (Instapdata) calculator
  const getInstapDetails = (birthDateString) => {
    if (!birthDateString) return null;
    const birthDate = new Date(birthDateString);
    if (isNaN(birthDate.getTime())) return null;

    // Calculate when they turn 2.5 years (30 months)
    const turn25Date = new Date(birthDate);
    turn25Date.setMonth(turn25Date.getMonth() + 30);

    // Calculate when they turn 3 years (36 months)
    const turn3Date = new Date(birthDate);
    turn3Date.setMonth(turn3Date.getMonth() + 36);

    const birthYear = birthDate.getFullYear();
    const entrySchoolYear = birthYear + 2; // e.g. born in 2024 -> starts school in 2026/2027
    
    const yearA = entrySchoolYear;
    const yearB = entrySchoolYear + 1;
    
    // Flemish instapdata approximations for schoolyear [entrySchoolYear]-[entrySchoolYear+1]
    const instapDates = [
      { name: '1 September ' + yearA, date: new Date(yearA, 8, 1) }, 
      { name: 'Schooldag na Herfstvakantie (ca. 9 November ' + yearA + ')', date: new Date(yearA, 10, 9) }, 
      { name: 'Schooldag na Kerstvakantie (ca. 4 Januari ' + yearB + ')', date: new Date(yearB, 0, 4) }, 
      { name: '1 Februari ' + yearB, date: new Date(yearB, 1, 1) }, 
      { name: 'Schooldag na Krokusvakantie (ca. 22 Februari ' + yearB + ')', date: new Date(yearB, 1, 22) },
      { name: 'Schooldag na Paasvakantie (ca. 19 April ' + yearB + ')', date: new Date(yearB, 3, 19) }, 
      { name: 'Schooldag na Hemelvaart (ca. 24 Mei ' + yearB + ')', date: new Date(yearB, 4, 24) } 
    ];

    // Find the first instapdate on or after the 2.5-year birthday
    let firstInstap = null;
    for (const instap of instapDates) {
      if (instap.date >= turn25Date) {
        firstInstap = instap;
        break;
      }
    }

    if (!firstInstap) {
      firstInstap = {
        name: '3e verjaardag (direct instappen): ' + turn3Date.toLocaleDateString('nl-BE', { day: 'numeric', month: 'long', year: 'numeric' }),
        date: turn3Date
      };
    }

    // Determine the school year
    let schoolYearLabel = `${yearA}-${yearB}`;
    if (turn25Date > instapDates[6].date) {
      schoolYearLabel = `${yearB}-${yearB + 1}`;
    }

    // Flag if they are born in Oct/Nov/Dec 2024
    const isLate2024 = birthYear === 2024 && birthDate.getMonth() >= 9; // October, November, December

    return {
      turn25Formatted: turn25Date.toLocaleDateString('nl-BE', { day: 'numeric', month: 'long', year: 'numeric' }),
      instapFormatted: firstInstap.name,
      schoolYear: schoolYearLabel,
      isLate2024,
      birthYear
    };
  };

  // 3D Tilt mouse move events for Apple Wallet Pass Card
  const handlePassMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${px}%`);
    card.style.setProperty('--mouse-y', `${py}%`);
    
    // Max 10 degrees tilt rotation
    const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * 10;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 10;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handlePassMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    card.style.setProperty('--mouse-x', '50%');
    card.style.setProperty('--mouse-y', '50%');
  };

  const handleGeneratePass = (e) => {
    e.preventDefault();
    // Generate a random 5 digit serial number
    const randomSerial = Math.floor(10000 + Math.random() * 90000);
    setPassId(`HF-2026-${randomSerial}`);
    setEnrollmentStep(4);
  };

  // Generate dynamic days array for calendar grid
  const getDaysForMonth = (monthIndex) => {
    const year = 2026;
    // get first day of month (0 = Sunday, 1 = Monday...)
    const firstDay = new Date(year, monthIndex, 1).getDay();
    // Adjust for Monday-start (Belgian standard: Monday = 0, Tuesday = 1... Sunday = 6)
    const offset = firstDay === 0 ? 6 : firstDay - 1;
    
    const days = [];
    
    // Previous month padding
    const prevMonthIndex = monthIndex - 1;
    const daysInPrevMonth = new Date(year, monthIndex, 0).getDate();
    for (let i = offset - 1; i >= 0; i--) {
      const dayNum = daysInPrevMonth - i;
      const dateStr = `${year}-${String(prevMonthIndex + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
      days.push({ day: dayNum, isCurrentMonth: false, dateString: dateStr });
    }
    
    // Current month days
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      days.push({ day: i, isCurrentMonth: true, dateString: dateStr });
    }
    
    // Next month padding (total cells: 35 or 42)
    const totalCells = days.length > 35 ? 42 : 35;
    const nextMonthIndex = monthIndex + 1;
    let nextDay = 1;
    while (days.length < totalCells) {
      const dateStr = `${year}-${String(nextMonthIndex + 1).padStart(2, '0')}-${String(nextDay).padStart(2, '0')}`;
      days.push({ day: nextDay, isCurrentMonth: false, dateString: dateStr });
      nextDay++;
    }
    
    return days;
  };

  // Trigger mockup sync to device calendar
  const handleStartCalendarSync = () => {
    setSyncState('syncing');
    setTimeout(() => {
      setSyncState('synced');
    }, 2000); // 2 second sync loading animation
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* 1. Header Navigation Wrapper */}
      <header className="header-wrapper glass-header">
        <div className="header-inner">
          <a href="#" className="header-logo">
            {/* Real school mascot logo */}
            <img src={schoolLogo} alt="Mascotte Heilige Familie" style={{ width: '48px', height: 'auto', objectFit: 'contain' }} />
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
                    <a href="#inschrijvingen" className="dropdown-item" onClick={(e) => { e.preventDefault(); setPracticalDropdownOpen(false); setShowEnrollmentWizard(true); }}>Inschrijvingen</a>
                  </div>
                )}
              </li>
              
              <li className="nav-item">
                <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); setShowCalendarModal(true); }}>{t.header.nav.calendar}</a>
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
              <button 
                onClick={() => setShowTourModal(true)} 
                className="btn btn-secondary" 
                style={{ 
                  fontSize: '0.8rem', 
                  padding: '0.45rem 1.15rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  textAlign: 'left', 
                  lineHeight: 1.15,
                  borderRadius: '100px'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span style={{ whiteSpace: 'pre-line', fontWeight: 700 }}>
                  {t.header.ctaTour}
                </span>
              </button>
              <button 
                onClick={() => setShowContactModal(true)} 
                className="btn btn-outline" 
                style={{ 
                  fontSize: '0.8rem', 
                  padding: '0.45rem 1.15rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  textAlign: 'left', 
                  lineHeight: 1.15,
                  borderRadius: '100px',
                  borderWidth: '1px'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span style={{ whiteSpace: 'pre-line', fontWeight: 700 }}>
                  {t.header.ctaContact}
                </span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Website Content Container */}
      <main className="container" style={{ flexGrow: 1 }}>

        {/* 2. Hero Section (Restructured exact mockup hero) */}
        <section className="hero-wrapper">
          {/* Hand silhouette watermark behind text matching mockup exactly */}
          <svg className="hero-hand-watermark" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* Outline hand with spread fingers pointing top-right */}
            <path d="M20 90 Q30 45 40 40 Q44 38 48 44 Q50 50 44 60 Q55 35 62 33 Q66 31 68 38 Q68 46 56 58 Q72 32 78 32 Q83 32 83 40 Q80 50 68 64 Q82 38 88 42 Q92 46 82 62 C96 52 100 58 88 74 L75 92 L40 100 Z" />
          </svg>

          {/* Plant leaf-stem illustration bottom-left */}
          <svg className="hero-leaf-branch" viewBox="0 0 100 150" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
            <path d="M50 140 Q55 70 30 20" />
            <path d="M48 110 Q25 90 28 102 Z" fill="currentColor" />
            <path d="M52 100 Q75 80 72 92 Z" fill="currentColor" />
            <path d="M45 75 Q20 60 25 70 Z" fill="currentColor" />
            <path d="M51 65 Q70 50 67 60 Z" fill="currentColor" />
            <path d="M41 40 Q25 30 28 36 Z" fill="currentColor" />
            <path d="M44 32 Q60 22 57 28 Z" fill="currentColor" />
          </svg>
          
          <div className="hero-content">
            {/* Yellow Sun-Heart outline badge top-left of header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', color: '#eab308', marginBottom: '-0.5rem' }}>
              <svg width="60" height="60" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round">
                {/* Heart outline */}
                <path d="M50 78 C30 58 20 42 20 30 C20 18 30 10 40 10 C46 10 50 14 50 14 C50 14 54 10 60 10 C70 10 80 18 80 30 C80 42 70 58 50 78 Z" strokeLinejoin="round" />
                {/* Sunbeams around heart */}
                <line x1="12" y1="18" x2="22" y2="24" />
                <line x1="10" y1="36" x2="22" y2="36" />
                <line x1="15" y1="55" x2="26" y2="50" />
                <line x1="26" y1="70" x2="34" y2="62" />
                <line x1="28" y1="10" x2="34" y2="18" />
              </svg>
            </div>

            <h1 style={{ whiteSpace: 'pre-line' }}>
              {lang === 'nl' ? "Samen groeien,\nelke dag een beetje meer." : "Growing together,\na little more every day."}
            </h1>
            <p>{t.hero.text}</p>
            
            <div className="hero-actions">
              <button onClick={() => setShowTourModal(true)} className="btn btn-welcome">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {t.hero.ctaWelcome}
              </button>
              <button onClick={() => setShowVideoModal(true)} className="btn btn-video">
                <span className="btn-video-play-icon">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="6,4 20,12 6,20" />
                  </svg>
                </span>
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
            
            {/* Custom schoolhouse badge overlay top-right */}
            <div className="hero-badge-schoolhouse">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>

            {/* Custom sun badge overlay bottom-right */}
            <div className="hero-badge-sun">
              <svg viewBox="0 0 100 100" width="52" height="52" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round">
                <circle cx="50" cy="50" r="20" />
                <line x1="50" y1="10" x2="50" y2="20" />
                <line x1="50" y1="80" x2="50" y2="90" />
                <line x1="10" y1="50" x2="20" y2="50" />
                <line x1="80" y1="50" x2="90" y2="50" />
                <line x1="22" y1="22" x2="30" y2="30" />
                <line x1="70" y1="70" x2="78" y2="78" />
                <line x1="70" y1="30" x2="78" y2="22" />
                <line x1="22" y1="78" x2="30" y2="70" />
              </svg>
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

            <a href="https://maps.google.com/?q=Laaglandlei+20,+2900+Schoten" target="_blank" rel="noopener noreferrer" className="bento-link">
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

            <a href="#" onClick={(e) => { e.preventDefault(); setShowCalendarModal(true); }} className="bento-link">
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
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--color-primary)' }}>HF Heilige Familie</span>
            <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>© {new Date().getFullYear()} Basisschool Heilige Familie Schoten. Alle rechten voorbehouden.</p>
          </div>
          <div style={{ display: 'flex', gap: '2rem', fontSize: '0.85rem', marginLeft: 'auto' }}>
            <div>
              <strong>Adres:</strong>
              <p style={{ fontSize: '0.85rem', marginTop: '0.2rem' }}>Laaglandlei 20, 2900 Schoten</p>
            </div>
            <div>
              <strong>Contact:</strong>
              <p style={{ fontSize: '0.85rem', marginTop: '0.2rem' }}>Tel: +32 (0)3 658 51 95<br/>Email: basisschool@hfamilie.be</p>
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
            src="https://www.youtube.com/embed/e1mH00FszC4?autoplay=1" 
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

      {/* 2030s Next-Decade Enrollment Wizard Modal */}
      <dialog 
        ref={enrollmentDialogRef} 
        onClick={(e) => handleBackdropClick(e, setShowEnrollmentWizard)}
        className="wizard-dialog"
      >
        <div className="wizard-container">
          <div className="wizard-modal-header">
            <div className="wizard-title-group">
              <span className="wizard-icon-glow">✨</span>
              <h2>{lang === 'nl' ? 'Inschrijvingswizard 2030+' : 'Enrollment Wizard 2030+'}</h2>
            </div>
            <div className="wizard-steps-indicator">
              <div className={`step-dot ${enrollmentStep >= 1 ? (enrollmentStep > 1 ? 'completed' : 'active') : ''}`}>1</div>
              <div className={`step-line ${enrollmentStep >= 2 ? 'active' : ''}`}></div>
              <div className={`step-dot ${enrollmentStep >= 2 ? (enrollmentStep > 2 ? 'completed' : 'active') : ''}`}>2</div>
              <div className={`step-line ${enrollmentStep >= 3 ? 'active' : ''}`}></div>
              <div className={`step-dot ${enrollmentStep >= 3 ? (enrollmentStep > 3 ? 'completed' : 'active') : ''}`}>3</div>
              <div className={`step-line ${enrollmentStep >= 4 ? 'active' : ''}`}></div>
              <div className={`step-dot ${enrollmentStep >= 4 ? 'active' : ''}`}>4</div>
            </div>
            <button onClick={() => setShowEnrollmentWizard(false)} className="modal-close-btn">&times;</button>
          </div>

          <div className="wizard-body">
            {/* Step 1: Flemish Entry Calculator */}
            {enrollmentStep === 1 && (
              <div className="wizard-grid-layout">
                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', fontFamily: 'var(--font-display)' }}>
                    {lang === 'nl' ? 'Stap 1: Bereken de startdatum' : 'Step 1: Calculate Start Date'}
                  </h3>
                  <p style={{ fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                    {lang === 'nl' 
                      ? 'In Vlaanderen mogen kleuters vanaf 2,5 jaar op vaste instapdata starten. Bereken hier direct wanneer uw kind mag starten.'
                      : 'In Flanders, toddlers can start school on fixed entry dates starting from 2.5 years of age. Calculate your child\'s entry date here.'}
                  </p>
                  
                  <div className="form-group">
                    <label htmlFor="child-birthdate">{lang === 'nl' ? 'Geboortedatum van uw kind' : 'Birthdate of your child'}</label>
                    <input 
                      type="date" 
                      id="child-birthdate" 
                      className="form-control" 
                      value={childBirthDate} 
                      onChange={(e) => setChildBirthDate(e.target.value)} 
                    />
                  </div>

                  <div className="form-group" style={{ marginTop: '1.25rem' }}>
                    <div 
                      className="toggle-switch-wrapper" 
                      onClick={() => setHasSiblingPriority(!hasSiblingPriority)}
                    >
                      <div className="toggle-switch-info">
                        <span className="toggle-switch-label">{lang === 'nl' ? 'Voorrangsstatus' : 'Priority Status'}</span>
                        <span className="toggle-switch-description">
                          {lang === 'nl' ? 'Is er al een broer of zus ingeschreven?' : 'Is a sibling already enrolled?'}
                        </span>
                      </div>
                      <div className={`switch-input ${hasSiblingPriority ? 'checked' : ''}`}></div>
                    </div>
                  </div>
                </div>

                <div>
                  {/* Live Calculation Output Widget */}
                  {(() => {
                    const details = getInstapDetails(childBirthDate);
                    if (!details) return null;
                    return (
                      <div className="sidebar-preview-panel">
                        <div>
                          <div className="calculator-title">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <circle cx="12" cy="12" r="10"></circle>
                              <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            <span>{lang === 'nl' ? 'Instap-Berekening' : 'Flemish Start Dates'}</span>
                          </div>

                          <div className="calculator-stats" style={{ margin: '1rem 0' }}>
                            <div className="stat-row">
                              <span className="stat-label">{lang === 'nl' ? 'Wordt 2,5 jaar op' : 'Turns 2.5 on'}</span>
                              <span className="stat-value">{details.turn25Formatted}</span>
                            </div>
                            <div className="stat-row">
                              <span className="stat-label">{lang === 'nl' ? 'Eerste instapdatum' : 'First possible entry'}</span>
                              <span className="stat-value" style={{ color: 'var(--color-primary)' }}>{details.instapFormatted}</span>
                            </div>
                            <div className="stat-row">
                              <span className="stat-label">{lang === 'nl' ? 'Doel-schooljaar' : 'School Year'}</span>
                              <span className="stat-value">{details.schoolYear}</span>
                            </div>
                            <div className="stat-row">
                              <span className="stat-label">{lang === 'nl' ? 'Voorrangsregeling' : 'Priority status'}</span>
                              <span className="stat-value" style={{ color: hasSiblingPriority ? 'green' : 'var(--color-text-muted)' }}>
                                {hasSiblingPriority 
                                  ? (lang === 'nl' ? 'Ja (Broer/Zus)' : 'Yes (Sibling)')
                                  : (lang === 'nl' ? 'Nee (Standaard)' : 'No (Standard)')}
                              </span>
                            </div>
                          </div>
                        </div>

                        {details.isLate2024 && (
                          <div className="wizard-alert">
                            <span className="wizard-alert-icon">⚠️</span>
                            <div>
                              <strong>{lang === 'nl' ? 'Belangrijke opmerking:' : 'Important notice:'}</strong><br/>
                              {lang === 'nl'
                                ? 'Uw kind is geboren in het najaar van 2024. Hoewel de instap pas in schooljaar 2027-2028 is, moet uw kind NU al worden aangemeld via het digitaal aanmeldsysteem!'
                                : 'Your child is born in late 2024. Although school starts in schoolyear 2027-2028, you MUST register them now during the current digital campaign!'}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}

            {/* Step 2: Contact Form */}
            {enrollmentStep === 2 && (
              <div className="wizard-grid-layout">
                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', fontFamily: 'var(--font-display)' }}>
                    {lang === 'nl' ? 'Stap 2: Contact- & Kindgegevens' : 'Step 2: Contact & Child Details'}
                  </h3>
                  <p style={{ fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                    {lang === 'nl'
                      ? 'Vul de gegevens in om de gepersonaliseerde digitale pas en tijdlijn te genereren.'
                      : 'Fill in the details to generate the personalized digital admission pass and registration timeline.'}
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div className="form-group">
                      <label htmlFor="child-firstname">{lang === 'nl' ? 'Voornaam kind' : "Child's First Name"}</label>
                      <input 
                        type="text" 
                        id="child-firstname" 
                        className="form-control" 
                        required 
                        value={childFirstName}
                        onChange={(e) => setChildFirstName(e.target.value)}
                        placeholder="bv. Lucca" 
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="child-lastname">{lang === 'nl' ? 'Achternaam kind' : "Child's Last Name"}</label>
                      <input 
                        type="text" 
                        id="child-lastname" 
                        className="form-control" 
                        required 
                        value={childLastName}
                        onChange={(e) => setChildLastName(e.target.value)}
                        placeholder="bv. Devos" 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="parent-name">{lang === 'nl' ? 'Volledige naam ouder / voogd' : 'Parent / Guardian Full Name'}</label>
                    <input 
                      type="text" 
                      id="parent-name" 
                      className="form-control" 
                      required 
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="bv. Marie Devos" 
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label htmlFor="parent-email">E-mailadres</label>
                      <input 
                        type="email" 
                        id="parent-email" 
                        className="form-control" 
                        required 
                        value={parentEmail}
                        onChange={(e) => setParentEmail(e.target.value)}
                        placeholder="bv. marie@email.be" 
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="parent-phone">{lang === 'nl' ? 'Telefoonnummer' : 'Phone Number'}</label>
                      <input 
                        type="tel" 
                        id="parent-phone" 
                        className="form-control" 
                        required 
                        value={parentPhone}
                        onChange={(e) => setParentPhone(e.target.value)}
                        placeholder="bv. +32 470 00 00 00" 
                      />
                    </div>
                  </div>
                </div>

                <div>
                  {/* Live preview banner */}
                  <div className="sidebar-preview-panel" style={{ justifyContent: 'center', gap: '1rem' }}>
                    <div className="preview-avatar-banner">
                      <div className="preview-avatar-circle">🏫</div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: '800', color: 'var(--color-primary)', fontSize: '0.95rem' }}>HF Heilige Familie</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Laaglandlei 20, Schoten</span>
                      </div>
                    </div>
                    <div className="preview-quote-box">
                      "Groeien doe je samen. Wij kijken er enorm naar uit om u en uw kind binnenkort te mogen verwelkomen op onze school!"
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                      📧 secretariaat@hfamilie.be<br/>
                      📞 +32 3 658 51 95
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Interactive Timeline & Registration Steps */}
            {enrollmentStep === 3 && (
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', fontFamily: 'var(--font-display)' }}>
                  {lang === 'nl' ? 'Stap 3: Uw Aanmeldingstijdlijn' : 'Step 3: Your Registration Timeline'}
                </h3>
                <p style={{ fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                  {lang === 'nl'
                    ? 'Op basis van uw antwoorden is hier uw officiële aanmeldings- en inschrijvingsschema voor Schoten:'
                    : 'Based on your selections, here is your official registration and enrollment timeline for Schoten:'}
                </p>

                <div className="interactive-timeline">
                  {/* Step 1 in Timeline */}
                  <div className="timeline-step active">
                    <div className="timeline-icon-box">1</div>
                    <div className="timeline-content-box">
                      <div className="timeline-step-header">
                        <span className="timeline-step-title">{lang === 'nl' ? 'Aanmelden (Digitaal Voorkeurregistratie)' : 'Apply (Digital Preference)'}</span>
                        <span className="timeline-step-badge">{lang === 'nl' ? 'Stap 1' : 'Step 1'}</span>
                      </div>
                      <p className="timeline-step-desc">
                        {lang === 'nl' 
                          ? 'Meld uw kind eerst digitaal aan via schoten.be/aanmelden om gelijke kansen te garanderen en wachtrijen te vermijden. Dit geldt voor iedereen.'
                          : 'First, apply digitally on schoten.be/aanmelden to ensure equal opportunities and avoid physical queues.'}
                      </p>
                      <div className="timeline-step-date">
                        <span>📅</span>
                        <span>
                          {hasSiblingPriority 
                            ? (lang === 'nl' ? '19 januari 2026 t.e.m. 30 januari 2026' : 'January 19, 2026 to January 30, 2026')
                            : (lang === 'nl' ? '24 februari 2026 t.e.m. 17 maart 2026' : 'February 24, 2026 to March 17, 2026')}
                        </span>
                      </div>
                      <a 
                        href="https://www.schoten.be/aanmelden" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-outline" 
                        style={{ fontSize: '0.78rem', padding: '0.35rem 0.85rem', marginTop: '0.75rem', display: 'inline-flex', borderRadius: '8px' }}
                      >
                        {lang === 'nl' ? 'Meld nu aan via schoten.be' : 'Register at schoten.be'} 
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: '0.25rem' }}>
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Step 2 in Timeline */}
                  <div className="timeline-step">
                    <div className="timeline-icon-box">2</div>
                    <div className="timeline-content-box">
                      <div className="timeline-step-header">
                        <span className="timeline-step-title">{lang === 'nl' ? 'Toewijzingsbericht (Resultaat)' : 'Allocation (Result)'}</span>
                        <span className="timeline-step-badge">{lang === 'nl' ? 'Stap 2' : 'Step 2'}</span>
                      </div>
                      <p className="timeline-step-desc">
                        {lang === 'nl'
                          ? 'U ontvangt een schriftelijke en digitale melding van de school die aan uw kind is toegewezen.'
                          : 'You will receive a written and digital notification of the school allocated to your child.'}
                      </p>
                      <div className="timeline-step-date">
                        <span>📅</span>
                        <span>{lang === 'nl' ? 'Eind april 2026 (digitaal & per post)' : 'Late April 2026 (email & mail)'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 in Timeline */}
                  <div className="timeline-step">
                    <div className="timeline-icon-box">3</div>
                    <div className="timeline-content-box">
                      <div className="timeline-step-header">
                        <span className="timeline-step-title">{lang === 'nl' ? 'Officiële Inschrijving (Definitief)' : 'Official Enrollment (Final)'}</span>
                        <span className="timeline-step-badge">{lang === 'nl' ? 'Stap 3' : 'Step 3'}</span>
                      </div>
                      <p className="timeline-step-desc">
                        {lang === 'nl'
                          ? 'Schrijf uw kind officieel in bij Basisschool Heilige Familie na ontvangst van uw uitnodiging. Na deze datum vervalt uw inschrijvingsrecht.'
                          : 'Officially enroll your child at Holy Family after receiving your invitation. After this deadline, your enrollment right expires.'}
                      </p>
                      <div className="timeline-step-date">
                        <span>📅</span>
                        <span>
                          {hasSiblingPriority 
                            ? (lang === 'nl' ? '9 februari 2026 t.e.m. 6 maart 2026' : 'February 9, 2026 to March 6, 2026')
                            : (lang === 'nl' ? '27 april 2026 t.e.m. 12 mei 2026' : 'April 27, 2026 to May 12, 2026')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Digital Wallet Pass Generator (Success) */}
            {enrollmentStep === 4 && (
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', fontFamily: 'var(--font-display)' }}>
                  {lang === 'nl' ? '🎉 Uw Inschrijvingspas is gereed!' : '🎉 Your Enrollment Pass is Ready!'}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
                  {lang === 'nl'
                    ? 'Beweeg uw muis over de pas voor een 3D parallax-effect.'
                    : 'Hover/move your mouse over the card to test the interactive 3D parallax.'}
                </p>

                {/* 3D Tilted Wallet Pass */}
                <div className="wallet-pass-perspective">
                  <div 
                    className="wallet-pass-card"
                    onMouseMove={handlePassMouseMove}
                    onMouseLeave={handlePassMouseLeave}
                  >
                    {/* Inner radial gradient shine */}
                    <div className="pass-card-glow-overlay"></div>
                    
                    {/* Real logo watermark backdrop */}
                    <svg className="pass-emblem-watermark" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 90 Q30 45 40 40 Q44 38 48 44 Q50 50 44 60 Q55 35 62 33 Q66 31 68 38 Q68 46 56 58 Q72 32 78 32 Q83 32 83 40 Q80 50 68 64 Q82 38 88 42 Q92 46 82 62 C96 52 100 58 88 74 L75 92 L40 100 Z" />
                    </svg>

                    <div className="pass-header">
                      <div className="pass-logo">
                        <img src={schoolLogo} alt="Logo" />
                        <div className="pass-logo-text">
                          <span>HEILIGE FAMILIE</span>
                          <span className="pass-logo-slogan">{lang === 'nl' ? 'Basisschool Schoten' : 'Schoten Primary School'}</span>
                        </div>
                      </div>
                      <div className="pass-type-badge">{lang === 'nl' ? 'Aanmeldpas' : 'Pass 2026'}</div>
                    </div>

                    <div className="pass-body">
                      <div className="pass-info-grid">
                        <div className="pass-field">
                          <span className="pass-label">{lang === 'nl' ? 'Kind' : 'Student'}</span>
                          <span className="pass-value" title={`${childFirstName} ${childLastName}`}>{childFirstName} {childLastName}</span>
                        </div>
                        <div className="pass-field">
                          <span className="pass-label">{lang === 'nl' ? 'Geboortedatum' : 'Birthdate'}</span>
                          <span className="pass-value">{new Date(childBirthDate).toLocaleDateString('nl-BE', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </div>
                      </div>

                      <div className="pass-info-grid">
                        <div className="pass-field">
                          <span className="pass-label">{lang === 'nl' ? 'Instapdatum' : 'First Start Date'}</span>
                          {(() => {
                            const details = getInstapDetails(childBirthDate);
                            return <span className="pass-value" style={{ color: 'var(--color-accent)' }}>{details ? details.instapFormatted.split(' (')[0] : ''}</span>;
                          })()}
                        </div>
                        <div className="pass-field">
                          <span className="pass-label">{lang === 'nl' ? 'Schooljaar' : 'School Year'}</span>
                          {(() => {
                            const details = getInstapDetails(childBirthDate);
                            return <span className="pass-value">{details ? details.schoolYear : ''}</span>;
                          })()}
                        </div>
                      </div>

                      <div className="pass-info-grid">
                        <div className="pass-field">
                          <span className="pass-label">{lang === 'nl' ? 'Voorrang' : 'Priority'}</span>
                          <span className={`pass-value ${hasSiblingPriority ? 'priority-active' : ''}`}>
                            {hasSiblingPriority 
                              ? (lang === 'nl' ? 'Met voorrang' : 'Priority (Yes)') 
                              : (lang === 'nl' ? 'Geen voorrang' : 'Standard')}
                          </span>
                        </div>
                        <div className="pass-field">
                          <span className="pass-label">{lang === 'nl' ? 'Ouder' : 'Guardian'}</span>
                          <span className="pass-value" title={parentName}>{parentName}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pass-barcode-section">
                      {/* Generates standard barcode vertical lines pattern */}
                      <svg className="pass-barcode-svg" viewBox="0 0 200 40" preserveAspectRatio="none">
                        <rect x="0" y="0" width="4" height="40" fill="currentColor" />
                        <rect x="8" y="0" width="2" height="40" fill="currentColor" />
                        <rect x="12" y="0" width="6" height="40" fill="currentColor" />
                        <rect x="20" y="0" width="1" height="40" fill="currentColor" />
                        <rect x="24" y="0" width="4" height="40" fill="currentColor" />
                        <rect x="30" y="0" width="2" height="40" fill="currentColor" />
                        <rect x="36" y="0" width="8" height="40" fill="currentColor" />
                        <rect x="48" y="0" width="1" height="40" fill="currentColor" />
                        <rect x="52" y="0" width="3" height="40" fill="currentColor" />
                        <rect x="60" y="0" width="6" height="40" fill="currentColor" />
                        <rect x="70" y="0" width="2" height="40" fill="currentColor" />
                        <rect x="74" y="0" width="4" height="40" fill="currentColor" />
                        <rect x="80" y="0" width="1" height="40" fill="currentColor" />
                        <rect x="86" y="0" width="8" height="40" fill="currentColor" />
                        <rect x="98" y="0" width="2" height="40" fill="currentColor" />
                        <rect x="104" y="0" width="4" height="40" fill="currentColor" />
                        <rect x="112" y="0" width="1" height="40" fill="currentColor" />
                        <rect x="116" y="0" width="6" height="40" fill="currentColor" />
                        <rect x="126" y="0" width="2" height="40" fill="currentColor" />
                        <rect x="130" y="0" width="4" height="40" fill="currentColor" />
                        <rect x="138" y="0" width="8" height="40" fill="currentColor" />
                        <rect x="150" y="0" width="1" height="40" fill="currentColor" />
                        <rect x="154" y="0" width="4" height="40" fill="currentColor" />
                        <rect x="160" y="0" width="2" height="40" fill="currentColor" />
                        <rect x="166" y="0" width="6" height="40" fill="currentColor" />
                        <rect x="176" y="0" width="1" height="40" fill="currentColor" />
                        <rect x="180" y="0" width="4" height="40" fill="currentColor" />
                        <rect x="188" y="0" width="2" height="40" fill="currentColor" />
                        <rect x="194" y="0" width="6" height="40" fill="currentColor" />
                      </svg>
                      <span className="pass-serial">{passId}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '1.25rem' }}>
                  <button 
                    onClick={() => {
                      setPassAddedToWallet(true);
                      alert(lang === 'nl' ? 'Toegevoegd aan Apple Wallet!' : 'Added to Apple Wallet!');
                    }} 
                    className="btn btn-primary"
                    style={{ fontSize: '0.82rem', padding: '0.5rem 1.25rem', backgroundColor: '#000000', color: '#ffffff' }}
                  >
                    <span>🍏</span> {passAddedToWallet ? (lang === 'nl' ? 'In Wallet!' : 'In Wallet!') : (lang === 'nl' ? 'Zet in Apple Wallet' : 'Add to Apple Wallet')}
                  </button>
                  <button 
                    onClick={() => window.print()} 
                    className="btn btn-outline"
                    style={{ fontSize: '0.82rem', padding: '0.5rem 1.25rem' }}
                  >
                    🖨️ {lang === 'nl' ? 'Print paspoort' : 'Print Pass'}
                  </button>
                </div>

                <div className="wizard-alert" style={{ backgroundColor: 'var(--color-primary-light)', borderColor: 'var(--color-primary-soft)', color: 'var(--color-primary)', marginTop: '1.5rem', textAlign: 'left' }}>
                  <span className="wizard-alert-icon">ℹ️</span>
                  <div style={{ fontSize: '0.78rem' }}>
                    <strong>{lang === 'nl' ? 'Let op:' : 'Please note:'}</strong><br/>
                    {lang === 'nl' 
                      ? 'Dit is een samenvatting van uw aanmeldingsvoorkeur. Dit is GEEN officiële inschrijving. U dient uw kind nog steeds verplicht online aan te melden via schoten.be/aanmelden!'
                      : 'This is a summary of your registration preference. This is NOT an official enrollment. You must still register your child online via schoten.be/aanmelden!'}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="wizard-footer">
            <div className="wizard-actions-row">
              {enrollmentStep > 1 && enrollmentStep < 4 ? (
                <button 
                  onClick={() => setEnrollmentStep(enrollmentStep - 1)} 
                  className="btn btn-outline"
                  style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
                >
                  ← {lang === 'nl' ? 'Vorige' : 'Back'}
                </button>
              ) : (
                <div></div>
              )}

              {enrollmentStep === 1 && (
                <button 
                  onClick={() => setEnrollmentStep(2)} 
                  className="btn btn-primary"
                  style={{ padding: '0.5rem 1.5rem', fontSize: '0.85rem', marginLeft: 'auto' }}
                >
                  {lang === 'nl' ? 'Volgende' : 'Next'} →
                </button>
              )}

              {enrollmentStep === 2 && (
                <button 
                  onClick={() => {
                    if (childFirstName.trim() && childLastName.trim() && parentName.trim() && parentEmail.trim() && parentPhone.trim()) {
                      setEnrollmentStep(3);
                    } else {
                      alert(lang === 'nl' ? 'Gelieve alle velden in te vullen.' : 'Please fill in all fields.');
                    }
                  }} 
                  className="btn btn-primary"
                  style={{ padding: '0.5rem 1.5rem', fontSize: '0.85rem', marginLeft: 'auto' }}
                >
                  {lang === 'nl' ? 'Bekijk Tijdlijn' : 'View Timeline'} →
                </button>
              )}

              {enrollmentStep === 3 && (
                <button 
                  onClick={handleGeneratePass} 
                  className="btn btn-secondary"
                  style={{ padding: '0.5rem 1.5rem', fontSize: '0.85rem', marginLeft: 'auto' }}
                >
                  ✨ {lang === 'nl' ? 'Genereer Digitale Pas' : 'Generate Digital Pass'}
                </button>
              )}

              {enrollmentStep === 4 && (
                <button 
                  onClick={() => {
                    setEnrollmentStep(1);
                    setChildFirstName('');
                    setChildLastName('');
                    setParentName('');
                    setParentEmail('');
                    setParentPhone('');
                    setPassAddedToWallet(false);
                  }} 
                  className="btn btn-outline"
                  style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem', marginLeft: 'auto' }}
                >
                  🔄 {lang === 'nl' ? 'Nieuwe berekening' : 'New calculation'}
                </button>
              )}
            </div>

            {/* Partner school board and links */}
            <div className="partner-chips-container">
              <a href="https://www.kovabov.be" target="_blank" rel="noopener noreferrer" className="partner-chip">Schoolbestuur KOBA Voorkempen</a>
              <a href="#" className="partner-chip">Scholengemeenschap KBS</a>
              <a href="https://www.leersteuncentrum-expant.be" target="_blank" rel="noopener noreferrer" className="partner-chip">Leersteuncentrum Expant</a>
              <a href="https://www.vclb-koepel.be" target="_blank" rel="noopener noreferrer" className="partner-chip">CLB</a>
              <a href="https://www.schoten.be" target="_blank" rel="noopener noreferrer" className="partner-chip">Gemeente Schoten</a>
            </div>

            <div className="policy-links">
              <a href="#" onClick={(e) => { e.preventDefault(); alert("Privacyverklaring (Mockup)"); }} className="policy-link">Privacyverklaring</a>
              <span style={{ color: 'var(--color-border)' }}>|</span>
              <a href="#" onClick={(e) => { e.preventDefault(); alert("Cookieverklaring (Mockup)"); }} className="policy-link">Cookieverklaring</a>
            </div>
          </div>
        </div>
      </dialog>

      {/* 2030s Next-Decade School Calendar Modal */}
      <dialog 
        ref={calendarDialogRef} 
        onClick={(e) => handleBackdropClick(e, setShowCalendarModal)}
        className="calendar-dialog"
      >
        <div className="wizard-container">
          <div className="wizard-modal-header">
            <div className="wizard-title-group">
              <span className="wizard-icon-glow">📅</span>
              <h2>{lang === 'nl' ? 'Interactieve Kalender' : 'Interactive Calendar'}</h2>
            </div>
            <button onClick={() => setShowCalendarModal(false)} className="modal-close-btn">&times;</button>
          </div>

          <div className="wizard-body">
            {/* Month Switcher & Filters */}
            <div className="calendar-header-panel">
              <div className="month-switcher">
                <button 
                  onClick={() => {
                    if (selectedMonth > 4) {
                      setSelectedMonth(selectedMonth - 1);
                      setSelectedDayStr(null);
                    }
                  }} 
                  className="month-switcher-btn"
                  disabled={selectedMonth === 4}
                  style={{ opacity: selectedMonth === 4 ? 0.3 : 1 }}
                >
                  ←
                </button>
                <span className="current-month-label">
                  {selectedMonth === 4 && (lang === 'nl' ? 'Mei 2026' : 'May 2026')}
                  {selectedMonth === 5 && (lang === 'nl' ? 'Juni 2026' : 'June 2026')}
                  {selectedMonth === 6 && (lang === 'nl' ? 'Juli 2026' : 'July 2026')}
                </span>
                <button 
                  onClick={() => {
                    if (selectedMonth < 6) {
                      setSelectedMonth(selectedMonth + 1);
                      setSelectedDayStr(null);
                    }
                  }} 
                  className="month-switcher-btn"
                  disabled={selectedMonth === 6}
                  style={{ opacity: selectedMonth === 6 ? 0.3 : 1 }}
                >
                  →
                </button>
              </div>

              <div className="filter-chips">
                <button 
                  onClick={() => setCalendarFilter('all')} 
                  className={`filter-chip ${calendarFilter === 'all' ? 'active' : ''}`}
                >
                  {lang === 'nl' ? 'Alles' : 'All'}
                </button>
                <button 
                  onClick={() => setCalendarFilter('vacation')} 
                  className={`filter-chip ${calendarFilter === 'vacation' ? 'active' : ''}`}
                >
                  <span className="dot-indicator bg-vacation"></span>
                  {lang === 'nl' ? 'Vakantie / Vrij' : 'Holidays'}
                </button>
                <button 
                  onClick={() => setCalendarFilter('study')} 
                  className={`filter-chip ${calendarFilter === 'study' ? 'active' : ''}`}
                >
                  <span className="dot-indicator bg-study"></span>
                  {lang === 'nl' ? 'Studiedagen' : 'Studiedagen'}
                </button>
                <button 
                  onClick={() => setCalendarFilter('activity')} 
                  className={`filter-chip ${calendarFilter === 'activity' ? 'active' : ''}`}
                >
                  <span className="dot-indicator bg-activity"></span>
                  {lang === 'nl' ? 'Activiteiten' : 'Events'}
                </button>
              </div>
            </div>

            <div className="calendar-layout-container">
              {/* Calendar Grid */}
              <div className="calendar-grid-card">
                <div className="calendar-weekdays-row">
                  <span>{lang === 'nl' ? 'Ma' : 'Mo'}</span>
                  <span>{lang === 'nl' ? 'Di' : 'Tu'}</span>
                  <span>{lang === 'nl' ? 'Wo' : 'We'}</span>
                  <span>{lang === 'nl' ? 'Do' : 'Th'}</span>
                  <span>{lang === 'nl' ? 'Vr' : 'Fr'}</span>
                  <span>{lang === 'nl' ? 'Za' : 'Sa'}</span>
                  <span>{lang === 'nl' ? 'Zo' : 'Su'}</span>
                </div>

                <div className="calendar-dates-grid">
                  {getDaysForMonth(selectedMonth).map((cell, idx) => {
                    const dayEvents = calendarEvents.filter(ev => ev.date === cell.dateString);
                    const isSelected = selectedDayStr === cell.dateString;
                    const isToday = cell.dateString === '2026-06-02';
                    
                    return (
                      <div 
                        key={idx}
                        onClick={() => {
                          if (cell.isCurrentMonth) {
                            setSelectedDayStr(isSelected ? null : cell.dateString);
                          }
                        }}
                        className={`calendar-grid-cell ${!cell.isCurrentMonth ? 'outside-month' : ''} ${isToday ? 'cell-today' : ''}`}
                        style={{
                          borderColor: isSelected ? 'var(--color-primary)' : '',
                          backgroundColor: isSelected ? 'var(--color-primary-light)' : '',
                          boxShadow: isSelected ? '0 0 8px hsla(var(--primary-h) var(--primary-s) var(--primary-l) / 0.15)' : ''
                        }}
                      >
                        <span style={{ fontSize: '0.82rem' }}>{cell.day}</span>
                        {dayEvents.length > 0 && (
                          <div className="cell-events-dots">
                            {dayEvents.map(ev => (
                              <span 
                                key={ev.id} 
                                className={`cell-dot bg-${ev.category}`}
                                title={ev.title}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sidebar Agenda */}
              <div className="calendar-agenda-panel">
                <div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', fontFamily: 'var(--font-display)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{lang === 'nl' ? 'Agenda & Info' : 'Agenda'}</span>
                    {selectedDayStr && (
                      <button 
                        onClick={() => setSelectedDayStr(null)} 
                        style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '0.72rem', fontWeight: 'bold', cursor: 'pointer' }}
                      >
                        {lang === 'nl' ? 'Reset filter' : 'Reset filter'}
                      </button>
                    )}
                  </h4>
                  
                  <div className="agenda-items-wrapper">
                    {(() => {
                      let filtered = calendarEvents;
                      if (calendarFilter !== 'all') {
                        filtered = filtered.filter(ev => ev.category === calendarFilter);
                      }
                      if (selectedDayStr) {
                        filtered = filtered.filter(ev => ev.date === selectedDayStr);
                      } else {
                        filtered = filtered.filter(ev => {
                          const evDate = new Date(ev.date);
                          return evDate.getMonth() === selectedMonth;
                        });
                      }

                      if (filtered.length === 0) {
                        return (
                          <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                            {lang === 'nl' ? 'Geen evenementen gevonden voor deze selectie.' : 'No events scheduled for this selection.'}
                          </div>
                        );
                      }

                      return filtered.map(ev => (
                        <div key={ev.id} className="calendar-agenda-item">
                          <span className={`agenda-category-bar bg-${ev.category}`} />
                          <div className="agenda-item-details">
                            <span className="agenda-item-title">{ev.title}</span>
                            <span className="agenda-item-desc">{ev.desc}</span>
                          </div>
                          <span className="agenda-item-time">{ev.time}</span>
                        </div>
                      ));
                    })()}
                  </div>
                </div>

                {/* Smart Sync Box */}
                <div className="calendar-sync-box">
                  <div className="sync-glow-effect"></div>
                  <div className="sync-header">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
                    </svg>
                    <span>{lang === 'nl' ? 'Directe Smart-Sync' : 'Direct Smart-Sync'}</span>
                  </div>
                  <p className="sync-description">
                    {lang === 'nl'
                      ? 'Koppel de schoolkalender direct met uw persoonlijke agenda (Google, Apple, Outlook) voor automatische realtime updates.'
                      : 'Sync school schedules directly to your personal calendar (Google, Apple, Outlook) for automated real-time updates.'}
                  </p>
                  
                  <div className="sync-button-container">
                    {syncState === 'idle' && (
                      <button onClick={handleStartCalendarSync} className="btn-sync">
                        <span>📲</span> {lang === 'nl' ? 'Koppel met telefoon' : 'Sync with phone'}
                      </button>
                    )}
                    {syncState === 'syncing' && (
                      <button className="btn-sync syncing" disabled>
                        <svg className="sync-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.2)"></circle>
                          <path d="M12 2a10 10 0 0 1 10 10" stroke="#ffffff"></path>
                        </svg>
                        <span>{lang === 'nl' ? 'Koppelen...' : 'Syncing...'}</span>
                      </button>
                    )}
                    {syncState === 'synced' && (
                      <button className="btn-sync synced" disabled>
                        <span>✅</span> {lang === 'nl' ? 'Gekoppeld!' : 'Synced!'}
                      </button>
                    )}
                    {syncState === 'synced' && (
                      <span className="sync-status-text">
                        {lang === 'nl' ? 'Live updates actief' : 'Live updates active'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="wizard-footer" style={{ padding: '1rem 2rem', backgroundColor: 'var(--color-bg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--color-text-muted)', width: '100%' }}>
              <span>Basisschool Heilige Familie Schoten • Kalender-versie 2026.3</span>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <a href="#" onClick={(e) => { e.preventDefault(); alert("Help & Integratiehandleiding (Mockup)"); }} className="policy-link">Integratie-Help</a>
                <span>•</span>
                <a href="#" onClick={(e) => { e.preventDefault(); setShowCalendarModal(false); }} className="policy-link">{lang === 'nl' ? 'Sluiten' : 'Close'}</a>
              </div>
            </div>
          </div>
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
