import { useEffect, useState } from 'react'
import './App.css'

type IconName = 'arrow' | 'menu' | 'close' | 'instagram' | 'linkedin' | 'pin' | 'external' | 'spark'

type Officer = {
  name: string
  role: string
  image: string
  bio: string
  featured?: boolean
}

const alumniUrl = 'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=IX3zmVwL6kORA-FvAvWuz3b-U0qCSDdJm7ptEq2Wx_hUNlZaWUJYVTlRRjlJTDA4T1dMRlA2M1hPRi4u'
const applicationUrl = 'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=IX3zmVwL6kORA-FvAvWuz3b-U0qCSDdJm7ptEq2Wx_hUQTFPMlhSTEo3RFpQTFNITUZURTFGSjRDUi4u'

const officers: Officer[] = [
  {
    name: 'Dr. Marc Ortegren',
    role: 'Faculty Advisor',
    image: '/assets/ortegren.webp',
    bio: 'As a lifetime BAP member myself, I really enjoy having the opportunity to interact with candidates, members, officers, and recruiters. What I enjoy most about being the BAP faculty advisor is getting the opportunity to help foster students’ personal and professional development during their time at SIUE.',
    featured: true,
  },
  {
    name: 'Jack Nolle',
    role: 'President',
    image: '/assets/jack-nolle.webp',
    bio: 'Jack is a junior accounting student graduating in Spring 2027. He is focused on strengthening member engagement, expanding professional networking opportunities, and continuing to build a strong, supportive chapter culture.',
    featured: true,
  },
  {
    name: 'Emily Spann',
    role: 'Vice President of Service',
    image: '/assets/emily-spann.webp',
    bio: 'Emily is a senior accounting student continuing her education with SIUE while sitting for the CPA. Since joining Beta Alpha Psi, she has completed three audit internships and loves connecting with people who share similar goals.',
  },
  { name: 'Mason Parrett', role: 'Vice President of Events & Planning', image: '/assets/mason-parrett.webp', bio: 'Bio text goes here.' },
  {
    name: 'Curris Martin',
    role: 'Treasurer',
    image: '/assets/curris-martin.webp',
    bio: 'Curris is a junior accounting student and financial services clerk at the SIUE Foundation. BAP gives him the opportunity to connect with professionals while helping steward the organization with prudent, professional work.',
  },
  {
    name: 'Gg Butel',
    role: 'Vice President of Membership',
    image: '/assets/gg-butel.webp',
    bio: 'Gg is a junior in accounting graduating in May 2027. Her goal is to encourage accounting students to build professional skills and confidence in a fun, welcoming environment.',
  },
  { name: 'Grace Towal', role: 'Vice President of Social Media', image: '/assets/grace-towal.webp', bio: 'Bio text goes here.' },
]

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Partners', href: '#partners' },
  { label: 'Officers', href: '#officers' },
  { label: 'Updates', href: '#updates' },
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
  return <svg {...common}><path d="m12 3 1.4 5.6L19 10l-5.6 1.4L12 17l-1.4-5.6L5 10l5.6-1.4L12 3Z" stroke="currentColor" strokeWidth="1.4" /><path d="m19 16 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z" fill="currentColor" /></svg>
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
    <div className="footer-top"><Logo light /><p>Building the next generation of<br />ethical business leaders.</p></div>
    <div className="footer-bottom"><span>© 2026 Beta Alpha Psi · SIUE Kappa Lambda</span><div className="social-links"><a href="https://www.instagram.com/siuebap/" target="_blank" rel="noreferrer" aria-label="Instagram"><Icon name="instagram" /></a><a href="https://www.linkedin.com/in/beta-alpha-psi-siue-1a345690/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" /></a></div><span>Edwardsville, Illinois <Icon name="pin" size={14} /></span></div>
  </footer>
}


function Home() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      }),
      { rootMargin: '0px 0px -12%', threshold: 0.12 },
    )
    items.forEach((item) => observer.observe(item))
    const anchorTimer = window.setTimeout(() => {
      if (window.location.hash) document.querySelector(window.location.hash)?.scrollIntoView()
    }, 120)
    return () => {
      window.clearTimeout(anchorTimer)
      observer.disconnect()
    }
  }, [])

  return <><Header /><main id="main-content">
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero-image"><img src="/assets/founders-hall.webp" alt="" fetchPriority="high" decoding="async" /><div className="hero-grain" /></div>
      <div className="hero-glyphs" aria-hidden="true"><span>Β</span><span>Α</span><span>Ψ</span></div>
      <div className="hero-content"><p className="eyebrow eyebrow--light"><i />Kappa Lambda Chapter · SIUE</p><h1 id="hero-title">Where ambition<br /><span className="accent-word">meets integrity.</span></h1><p className="hero-lede">Accounting, finance, and information systems students building professional momentum, lasting relationships, and a more responsible future for business.</p><div className="hero-actions"><a className="button button--cream" href="#about">Discover the chapter <Icon name="arrow" size={16} /></a><a className="text-link text-link--light" href="#apply">Become a member <Icon name="arrow" size={15} /></a></div></div>
      <div className="hero-note"><span>Southern Illinois University Edwardsville</span><span>38°47′ N · 89°59′ W</span></div><div className="hero-scroll" aria-hidden="true"><span>Scroll to explore</span><span className="scroll-line" /></div>
    </section>

    <div className="identity-strip" aria-label="Beta Alpha Psi values"><div className="identity-track"><span>ΒΑΨ</span><b>Scholarship</b><span>ΒΑΨ</span><b>Professionalism</b><span>ΒΑΨ</span><b>Service</b><span>ΒΑΨ</span><b>Integrity</b><span>ΒΑΨ</span><b>Scholarship</b><span>ΒΑΨ</span><b>Professionalism</b></div></div>

    <section id="about" className="statement section-pad" aria-labelledby="about-title"><div className="section-kicker">01 / The chapter</div><div className="statement-grid" data-reveal><h2 id="about-title">A place to<br /><span className="accent-word">belong.</span></h2><div className="statement-copy"><p className="large-copy">Beta Alpha Psi is more than an honor society. We are people who ask better questions, show up prepared, and take the long view.</p><p>Through scholarship, professional engagement, and community leadership, Kappa Lambda helps students turn potential into practice.</p><a className="text-link" href="#partners">See the community <Icon name="arrow" size={15} /></a></div></div></section>

    <section className="numbers" aria-labelledby="standards-title"><div className="numbers-intro" data-reveal><span className="eyebrow eyebrow--light"><i />The BAP standard</span><p id="standards-title">Curiosity in the classroom. Character in the room.</p></div><div className="number-grid" data-reveal><div><strong>01</strong><span>Academic<br />excellence</span></div><div><strong>02</strong><span>Professional<br />connection</span></div><div><strong>03</strong><span>Community<br />impact</span></div></div></section>

    <section className="feature section-pad" aria-labelledby="chapter-title"><div className="section-kicker">02 / Your next chapter</div><div className="feature-grid"><div className="feature-copy" data-reveal><h2 id="chapter-title">Come for the<br /><span className="accent-word">credential.</span><br />Stay for the people.</h2><p>Speaker series, employer conversations, and service projects create room to grow your network, your confidence, and your sense of purpose.</p><a className="button" href="#apply">Find your place <Icon name="arrow" size={16} /></a></div><div className="feature-art" data-reveal aria-label="Beta Alpha Psi Kappa Lambda chapter graphic"><div className="art-orbit art-orbit--one" /><div className="art-orbit art-orbit--two" /><div className="art-card"><span className="art-index">ΒΑΨ / ΚΛ</span><strong>Make<br />your mark.</strong><span className="art-year">2026 / 27</span></div><div className="art-caption">A shared standard.<br />A personal direction.</div></div></div></section>

    <section className="about-manifesto one-page-section" aria-labelledby="manifesto-title"><div data-reveal><div className="manifesto-label">Our north star</div><blockquote id="manifesto-title">The best professional advantage is knowing who you are, what you value, and who you can build with.</blockquote><span className="quote-rule" /></div></section>

    <section id="partners" className="partner-section section-pad" aria-labelledby="partners-title"><div className="section-kicker">03 / Professional partners</div><div className="partner-feature" data-reveal><div className="partner-monogram" aria-hidden="true">EF</div><div className="partner-meta"><span className="eyebrow"><i />Gold sponsor</span><h2 id="partners-title">Good work is<br /><span className="accent-word">shared work.</span></h2><p>Professional partners open doors, ask hard questions, and help students see what a career can become. Example Firm LLC supports tax, audit, and forward-looking advisory work.</p><a className="text-link" href="mailto:bapsiue.president@gmail.com">Partner with our chapter <Icon name="arrow" size={15} /></a></div><div className="partner-number">01</div></div></section>

    <section id="officers" className="officers-section section-pad" aria-labelledby="officers-title"><div className="section-kicker">04 / 2026–27 leadership</div><div className="section-lead" data-reveal><h2 id="officers-title">The people<br /><span className="accent-word">in the room.</span></h2><p>Students and mentors turning a shared professional standard into a living chapter culture.</p></div><div className="officer-grid">{officers.map((officer, index) => <article className={`officer-card ${officer.featured ? 'officer-card--featured' : ''}`} key={officer.name + officer.role} data-reveal><div className="officer-image"><img src={officer.image} alt={officer.name} loading="lazy" decoding="async" /><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span></div><div className="officer-info"><span className="role">{officer.role}</span><h3>{officer.name}</h3><p>{officer.bio}</p></div></article>)}</div></section>

    <section id="updates" className="updates-section section-pad" aria-labelledby="updates-title"><div className="section-kicker">05 / Chapter updates</div><div className="section-lead" data-reveal><h2 id="updates-title">Stay curious.<br /><span className="accent-word">Stay close.</span></h2><p>Professional conversations, service in motion, and the moments between.</p></div><div className="updates-list" data-reveal><article className="update-card update-card--primary"><div className="update-date"><span>01</span><small>Coming<br />soon</small></div><div><span className="eyebrow eyebrow--light"><i />Upcoming event</span><h3>Professional<br /><span className="accent-word">speaker series.</span></h3><p>Upcoming conversations with working professionals and community service initiatives.</p><a className="text-link text-link--light" href="mailto:bapsiue.president@gmail.com">Get chapter updates <Icon name="arrow" size={15} /></a></div><div className="update-mark" aria-hidden="true"><Icon name="spark" size={50} /></div></article><article className="update-row"><span className="update-row-number">02</span><div><span className="role">Community / Service</span><h3>Making an impact beyond campus.</h3></div><span className="update-status">More soon</span></article><article className="update-row"><span className="update-row-number">03</span><div><span className="role">Chapter / People</span><h3>Meet the leaders shaping 2026 / 27.</h3></div><a className="circle-arrow" href="#officers" aria-label="Meet the officers"><Icon name="arrow" size={18} /></a></article></div></section>

    <section id="apply" className="apply-section section-pad" aria-labelledby="apply-title"><div className="section-kicker">06 / Membership application</div><div className="apply-layout" data-reveal><div className="apply-card"><div className="apply-card-top"><span className="eyebrow eyebrow--light"><i />Kappa Lambda / SIUE</span><span className="apply-symbol" aria-hidden="true">ΒΑΨ</span></div><h2 id="apply-title">Your next move<br /><span className="accent-word">starts here.</span></h2><p>Membership is an invitation to sharpen your craft, widen your circle, and build a career with more intention.</p><a className="button button--cream" href={applicationUrl} target="_blank" rel="noreferrer">Open application <Icon name="external" size={16} /></a><span className="apply-card-foot">Applications open year-round</span></div><div className="apply-contact"><span className="eyebrow"><i />Questions?</span><h3>We’re happy<br />to help.</h3><p>Having trouble with the application? Reach out and we’ll get you pointed in the right direction.</p><a href="mailto:mortegr@siue.edu">mortegr@siue.edu <Icon name="arrow" size={15} /></a><a href="mailto:bapsiue.president@gmail.com">bapsiue.president@gmail.com <Icon name="arrow" size={15} /></a></div></div></section>

    <section className="home-cta" aria-labelledby="cta-title"><div data-reveal><span className="eyebrow eyebrow--light"><i />Ready when you are</span><h2 id="cta-title">Let’s build<br /><span className="accent-word">what’s next.</span></h2></div><a className="button button--cream" href="#apply">Start your application <Icon name="arrow" size={16} /></a></section>
  </main><Footer /></>
}



export default Home
