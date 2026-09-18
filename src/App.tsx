import { useEffect, useState } from 'react'
import './App.css'

type IconName = 'arrow' | 'menu' | 'close' | 'instagram' | 'linkedin' | 'pin' | 'external'

type Officer = {
  name: string
  role: string
  image: string
  bio?: string
  featured?: boolean
}

const alumniUrl = 'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=IX3zmVwL6kORA-FvAvWuz3b-U0qCSDdJm7ptEq2Wx_hUNlZaWUJYVTlRRjlJTDA4T1dMRlA2M1hPRi4u'
const applicationUrl = 'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=IX3zmVwL6kORA-FvAvWuz3b-U0qCSDdJm7ptEq2Wx_hUQTFPMlhSTEo3RFpQTFNITUZURTFGSjRDUi4u'
const assetBase = `${import.meta.env.BASE_URL}assets/`

const officers: Officer[] = [
  {
    name: 'Dr. Marc Ortegren',
    role: 'Faculty Advisor',
    image: `${assetBase}ortegren.webp`,
    bio: 'Faculty advisor and lifetime BAP member focused on student professional development.',
    featured: true,
  },
  {
    name: 'Jack Nolle',
    role: 'President',
    image: `${assetBase}jack-nolle.webp`,
    bio: 'Junior accounting student, Spring 2027. Focused on member engagement, professional networking, and chapter culture.',
    featured: true,
  },
  {
    name: 'Emily Spann',
    role: 'Vice President of Service',
    image: `${assetBase}emily-spann.webp`,
    bio: 'Senior accounting student pursuing the CPA and an SIUE Master of Accountancy after three audit internships.',
  },
  {
    name: 'Mason Parrett',
    role: 'Vice President of Events & Planning',
    image: `${assetBase}mason-parrett.webp`,
  },
  {
    name: 'Curris Martin',
    role: 'Treasurer',
    image: `${assetBase}curris-martin.webp`,
    bio: 'Junior accounting student and financial services clerk at the SIUE Foundation.',
  },
  {
    name: 'Gg Butel',
    role: 'Vice President of Membership',
    image: `${assetBase}gg-butel.webp`,
    bio: 'Junior accounting student graduating May 2027 and incoming RSM tax intern.',
  },
  {
    name: 'Grace Towal',
    role: 'Vice President of Social Media',
    image: `${assetBase}grace-towal.webp`,
  },
]

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Partners', href: '#partners' },
  { label: 'Officers', href: '#officers' },
]

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }
  if (name === 'arrow') return <svg {...common}><path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
  if (name === 'menu') return <svg {...common}><path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
  if (name === 'close') return <svg {...common}><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
  if (name === 'instagram') return <svg {...common}><rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.7" /><circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.7" /><circle cx="17.3" cy="6.8" r=".8" fill="currentColor" /></svg>
  if (name === 'linkedin') return <svg {...common}><path d="M6 8.5V18M6 6.2v.1M10.5 18v-5.1a2.8 2.8 0 0 1 5.6 0V18M10.5 10.8V18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /><rect x="4" y="4" width="16" height="16" rx="2.8" stroke="currentColor" strokeWidth="1.7" /></svg>
  if (name === 'pin') return <svg {...common}><path d="M19 10.3c0 5.1-7 10.2-7 10.2S5 15.4 5 10.3a7 7 0 1 1 14 0Z" stroke="currentColor" strokeWidth="1.7" /><circle cx="12" cy="10" r="2.3" stroke="currentColor" strokeWidth="1.7" /></svg>
  if (name === 'external') return <svg {...common}><path d="M14 5h5v5M19 5l-8 8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /><path d="M19 14v3a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
  return null
}

function Logo({ light = false }: { light?: boolean }) {
  return <a className={`logo ${light ? 'logo--light' : ''}`} href="#top" aria-label="Beta Alpha Psi SIUE home">
    <span className="logo-mark" aria-hidden="true">ΒΑΨ</span>
    <span className="logo-copy"><strong>BETA ALPHA PSI</strong><small>SIUE · KAPPA LAMBDA</small></span>
  </a>
}

function Header() {
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    return () => document.body.classList.remove('menu-open')
  }, [open])

  useEffect(() => {
    const sections = navItems
      .map(({ href }) => document.querySelector<HTMLElement>(href))
      .filter((section): section is HTMLElement => section !== null)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActiveSection(visible.target.id)
      },
      { rootMargin: '-30% 0px -55%', threshold: [0.05, 0.35, 0.7] },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const navigateToSection = (href: string) => {
    const target = document.querySelector<HTMLElement>(href)
    if (!target) return
    target.scrollIntoView({ behavior: 'auto', block: 'start' })
    setActiveSection(href.slice(1))
    setOpen(false)
  }

  return <>
    <a className="skip-link" href="#main-content">Skip to main content</a>
    <header className="site-header">
      <div className="header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => <a key={item.href} href={item.href} aria-current={activeSection === item.href.slice(1) ? 'location' : undefined} onClick={(event) => { event.preventDefault(); navigateToSection(item.href) }}>{item.label}</a>)}
          <a href={alumniUrl} target="_blank" rel="noreferrer">Alumni network <Icon name="external" size={14} /></a>
        </nav>
        <a className="button button--small header-apply" href="#apply" onClick={(event) => { event.preventDefault(); navigateToSection('#apply') }}>Apply <Icon name="arrow" size={15} /></a>
        <button className="menu-toggle" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}><Icon name={open ? 'close' : 'menu'} /></button>
      </div>
      <nav id="mobile-navigation" className={`mobile-nav ${open ? 'mobile-nav--open' : ''}`} aria-label="Mobile navigation" aria-hidden={!open}>
        {navItems.map((item) => <a key={item.href} href={item.href} aria-current={activeSection === item.href.slice(1) ? 'location' : undefined} onClick={(event) => { event.preventDefault(); navigateToSection(item.href) }}>{item.label}</a>)}
        <a href={alumniUrl} target="_blank" rel="noreferrer">Alumni network <Icon name="external" size={15} /></a>
        <a className="button" href="#apply" onClick={(event) => { event.preventDefault(); navigateToSection('#apply') }}>Apply <Icon name="arrow" size={15} /></a>
      </nav>
    </header>
  </>
}

function Footer() {
  return <footer className="site-footer">
    <div className="footer-top"><Logo light /><p>Scholarship · Professionalism · Service</p></div>
    <div className="footer-bottom"><span>© 2026 Beta Alpha Psi · SIUE Kappa Lambda</span><div className="social-links"><a href="https://www.instagram.com/siuebap/" target="_blank" rel="noreferrer" aria-label="Instagram"><Icon name="instagram" /></a><a href="https://www.linkedin.com/in/beta-alpha-psi-siue-1a345690/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" /></a></div><span>Edwardsville, Illinois <Icon name="pin" size={14} /></span></div>
  </footer>
}


function Home() {

  return <><Header /><main id="main-content">
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero-image"><img src={`${assetBase}founders-hall.webp`} alt="" fetchPriority="high" decoding="async" /><div className="hero-grain" /></div>
      <div className="hero-glyphs" aria-hidden="true"><span>Β</span><span>Α</span><span>Ψ</span></div>
      <div className="hero-content"><p className="eyebrow eyebrow--light"><i />Kappa Lambda Chapter · SIUE</p><h1 id="hero-title">Where ambition<br /><span className="accent-word">meets integrity.</span></h1><p className="hero-lede">Accounting, finance, and information systems students at SIUE. Built around scholarship, service, and professional growth.</p><div className="hero-actions"><a className="button button--cream" href="#about">Explore the chapter <Icon name="arrow" size={16} /></a><a className="text-link text-link--light" href="#apply">Apply for membership <Icon name="arrow" size={15} /></a></div></div>
      <div className="hero-note"><span>Southern Illinois University Edwardsville</span><span>38°47′ N · 89°59′ W</span></div><div className="hero-scroll" aria-hidden="true"><span>Scroll to explore</span><span className="scroll-line" /></div>
    </section>

    <div className="identity-strip" aria-label="Beta Alpha Psi values"><div className="identity-track"><span>ΒΑΨ</span><b>Scholarship</b><span>ΒΑΨ</span><b>Professionalism</b><span>ΒΑΨ</span><b>Service</b><span>ΒΑΨ</span><b>Integrity</b><span>ΒΑΨ</span><b>Scholarship</b><span>ΒΑΨ</span><b>Professionalism</b></div></div>

    <section id="about" className="statement section-pad" aria-labelledby="about-title"><div className="section-kicker">01 / The chapter</div><div className="statement-grid" data-reveal><h2 id="about-title">A place to<br /><span className="accent-word">belong.</span></h2><div className="statement-copy"><p className="large-copy">Beta Alpha Psi recognizes high-achieving students in accounting, finance, and information systems.</p><p>Kappa Lambda connects SIUE students with professional development, service, and a strong peer network.</p><a className="text-link" href="#officers">Meet the chapter <Icon name="arrow" size={15} /></a></div></div></section>

    <section className="numbers" aria-labelledby="standards-title"><div className="numbers-intro" data-reveal><span className="eyebrow eyebrow--light"><i />What we practice</span><p id="standards-title">Standards that show up in the work.</p></div><div className="number-grid" data-reveal><div><strong>01</strong><span>Academic<br />excellence</span></div><div><strong>02</strong><span>Professional<br />development</span></div><div><strong>03</strong><span>Community<br />service</span></div></div></section>

    <section className="feature section-pad" aria-labelledby="chapter-title"><div className="section-kicker">02 / The experience</div><div className="feature-grid"><div className="feature-copy" data-reveal><h2 id="chapter-title">Build skills.<br /><span className="accent-word">Meet people.</span><br />Serve locally.</h2><p>Members learn directly from professionals, organize chapter events, and contribute through service.</p><a className="button" href="#apply">Join the chapter <Icon name="arrow" size={16} /></a></div><div className="feature-art" data-reveal aria-label="Beta Alpha Psi Kappa Lambda chapter graphic"><div className="art-orbit art-orbit--one" /><div className="art-orbit art-orbit--two" /><div className="art-card"><span className="art-index">ΒΑΨ / ΚΛ</span><strong>Make<br />your mark.</strong><span className="art-year">2026 / 27</span></div><div className="art-caption">Scholarship.<br />Service. Growth.</div></div></div></section>

    <section id="partners" className="partner-section section-pad" aria-labelledby="partners-title"><div className="section-kicker">03 / Professional partners</div><div className="partner-feature" data-reveal><div className="partner-monogram" aria-hidden="true">ΒΑΨ</div><div className="partner-meta"><span className="eyebrow"><i />For firms and professionals</span><h2 id="partners-title">Meet the next<br /><span className="accent-word">generation.</span></h2><p>Support the chapter through speakers, recruiting conversations, firm visits, sponsorship, and service.</p><a className="text-link" href="mailto:bapsiue.president@gmail.com">Contact the chapter <Icon name="arrow" size={15} /></a></div><div className="partner-number">03</div></div></section>

    <section id="officers" className="officers-section section-pad" aria-labelledby="officers-title"><div className="section-kicker">04 / 2026–27 leadership</div><div className="section-lead" data-reveal><h2 id="officers-title">Chapter<br /><span className="accent-word">leadership.</span></h2><p>The students and advisor responsible for chapter programs, membership, reporting, and service.</p></div><div className="officer-grid">{officers.map((officer, index) => <article className={`officer-card ${officer.featured ? 'officer-card--featured' : ''}`} key={officer.name + officer.role} data-reveal><div className="officer-image"><img src={officer.image} alt={officer.name} decoding="async" /><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span></div><div className="officer-info"><span className="role">{officer.role}</span><h3>{officer.name}</h3>{officer.bio && <p>{officer.bio}</p>}</div></article>)}</div></section>

    <section id="apply" className="apply-section section-pad" aria-labelledby="apply-title"><div className="section-kicker">05 / Membership</div><div className="apply-layout" data-reveal><div className="apply-card"><div className="apply-card-top"><span className="eyebrow eyebrow--light"><i />Kappa Lambda / SIUE</span><span className="apply-symbol" aria-hidden="true">ΒΑΨ</span></div><h2 id="apply-title">Ready to<br /><span className="accent-word">join?</span></h2><p>Open the membership application to begin.</p><a className="button button--cream" href={applicationUrl} target="_blank" rel="noreferrer">Open application <Icon name="external" size={16} /></a><span className="apply-card-foot">Applications open year-round</span></div><div className="apply-contact"><span className="eyebrow"><i />Contact</span><h3>Questions?</h3><p>Contact the faculty advisor or chapter president.</p><a href="mailto:mortegr@siue.edu">mortegr@siue.edu <Icon name="arrow" size={15} /></a><a href="mailto:bapsiue.president@gmail.com">bapsiue.president@gmail.com <Icon name="arrow" size={15} /></a></div></div></section>
  </main><Footer /></>
}



export default Home
