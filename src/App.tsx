import { useEffect, useState } from 'react'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Clock3,
  Instagram,
  MapPin,
  Menu,
  Sparkles,
  X,
} from 'lucide-react'

const BOOKING_URL = 'https://glowbyodeta.glossgenius.com/'
const PACKAGES_URL = 'https://glowbyodeta.glossgenius.com/shop/packages'
const INSTAGRAM_URL = 'https://www.instagram.com/glowbyodeta/'
const CONTACT_URL = 'https://glowbyodeta.glossgenius.com/contact'

const photos = {
  hydro: 'https://static.glossgenius.com/public/service/bbf702217ed5213b4f5a73efec1624335be8a947/image/6dd8ae5d777117b4f956a646dcf4f193.jpg',
  newClient: 'https://static.glossgenius.com/public/service/52af3ccd4f3bcc206a69dcf62a2ff92747333795/image/6c0061cc890798c24f3c71f8b342db88.jpg',
  custom60: 'https://static.glossgenius.com/public/service/826e238fcc44b929b11178258490ab2bc927c0ba/image/e8fedebb76521339f51896f6859b8345.jpg',
  custom90: 'https://static.glossgenius.com/public/service/3691ed35a7fdfbf7f8567e0c675fa4cd92bbdcaa/image/a3730146ca5735b07fc0447f96c031bb.jpg',
  teen: 'https://static.glossgenius.com/public/service/6936bc841bff35c4a433f371f7eb0367b43f6103/image/f92bef27466cd708cd3877f53378b7f8.jpg',
  back: 'https://static.glossgenius.com/public/service/503a2f56282f2b0b7a9f7ac6eb4e7af7fb41a3b7/image/53d5094357793fdebccfff1062e0f310.jpg',
}

const navigation = [
  ['About Odeta', '#about'],
  ['Treatments', '#treatments'],
  ['Our Approach', '#approach'],
  ['Portfolio', '#portfolio'],
  ['Packages', '#packages'],
  ['Contact', '#contact'],
] as const

const services = [
  {
    name: 'Hydro Glow Promo',
    note: 'A first visit',
    duration: '45 min',
    price: '$99',
    description: 'A customized introduction to Glow by Odeta, created for new clients and tailored to your skin.',
  },
  {
    name: 'New Client Special',
    note: 'First-time clients',
    duration: '60 min',
    price: '$165',
    description: 'A fully customized facial guided by professional skin analysis and your individual goals.',
  },
  {
    name: 'Customized Facial',
    note: 'Personalized care',
    duration: '60 min',
    price: '$195',
    description: 'A results-focused treatment tailored to your skin on the day of your appointment.',
  },
  {
    name: 'Customized Facial',
    note: 'More time, more detail',
    duration: '90 min',
    price: '$250',
    description: 'An extended facial with additional focus on lifting, sculpting and age-management.',
  },
  {
    name: 'Teen Facial',
    note: 'Ages teen',
    duration: '60 min',
    price: '$145',
    description: 'Customized support for teenage skin, congestion and healthy skincare habits.',
  },
  {
    name: 'Clarifying Back Facial',
    note: 'Targeted care',
    duration: '60 min',
    price: '$145',
    description: 'A deep-cleansing back treatment with exfoliation and a customized mask.',
  },
]

const packages = [
  { name: 'Glow Trio', price: '$525', value: 'Save $60', detail: 'Three customized facials for consistent, personalized care.' },
  { name: 'Teen Glow Trio', price: '$399', value: 'Save $36', detail: 'Three customized teen facials to support healthier skin over time.' },
  { name: 'Deluxe Glow Trio', price: '$675', value: 'Save $75', detail: 'Three 90-minute customized facials, with time for a more considered treatment.' },
]

const hours = [
  ['Monday', 'Closed'],
  ['Tuesday', 'Closed'],
  ['Wednesday', '9:30 AM – 8:00 PM'],
  ['Thursday', '9:30 AM – 8:00 PM'],
  ['Friday', 'Closed'],
  ['Saturday', '9:30 AM – 7:00 PM'],
  ['Sunday', '9:30 AM – 7:00 PM'],
] as const

function BrandImage({ src, alt, className, priority = false }: { src: string; alt: string; className: string; priority?: boolean }) {
  const [unavailable, setUnavailable] = useState(false)

  if (unavailable) {
    return (
      <div className={`image-placeholder ${className}`} role="img" aria-label={`${alt}. Brand photo placeholder`}>
        <Sparkles aria-hidden="true" size={20} strokeWidth={1.2} />
        <span>Glow by Odeta<br />photo placeholder</span>
      </div>
    )
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      onError={() => setUnavailable(true)}
    />
  )
}

function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <a className={`wordmark ${light ? 'wordmark-light' : ''}`} href="#home" aria-label="Glow by Odeta home">
      <span className="wordmark-main">Glow</span>
      <span className="wordmark-by">by Odeta</span>
    </a>
  )
}

function BookButton({ children = 'Book your facial', className = '' }: { children?: string; className?: string }) {
  return (
    <a className={`button button-dark ${className}`} href={BOOKING_URL} target="_blank" rel="noreferrer">
      <span>{children}</span>
      <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.7} />
    </a>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="announcement">
        <span>Personalized skincare in the heart of Beverly Hills</span>
        <span className="announcement-mark" aria-hidden="true">✳</span>
      </div>

      <header className="site-header">
        <div className="header-inner page-width">
          <Wordmark />
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          </nav>
          <BookButton className="header-book">Book your facial</BookButton>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
          </button>
        </div>
        <nav id="mobile-navigation" className={`mobile-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Mobile navigation" aria-hidden={!menuOpen}>
          {navigation.map(([label, href], index) => (
            <a key={href} href={href} onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
              <span className="mobile-link-number">0{index + 1}</span>{label}<ArrowUpRight size={16} aria-hidden="true" />
            </a>
          ))}
          <BookButton className="mobile-book" />
        </nav>
      </header>

      <main id="main">
        <section className="hero page-width" id="home" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> Private skincare studio <span className="eyebrow-divider">/</span> Beverly Hills</div>
            <h1 id="hero-title">Facials that <em>actually</em> work.</h1>
            <p className="hero-lede">Personalized skincare. Thoughtful treatments. Beautifully real results.</p>
            <p className="hero-description">Every facial is shaped around your skin, your goals and your natural beauty—guided by professional expertise and advanced skincare techniques.</p>
            <div className="hero-actions">
              <BookButton />
              <a className="text-link" href="#treatments">Explore treatments <ArrowDownRight size={16} aria-hidden="true" /></a>
            </div>
            <p className="hero-trust">Licensed Esthetician <span>·</span> 15+ Years <span>·</span> Beverly Hills</p>
          </div>
          <div className="hero-visual">
            <div className="hero-photo-wrap">
              <BrandImage src={photos.hydro} alt="Hydro Glow facial imagery from Glow by Odeta's official booking page" className="hero-photo" priority />
              <div className="photo-index"><span>01</span><span>Personalized care</span></div>
            </div>
            <div className="hero-note"><span className="note-rule" />A facial experience<br />designed around you</div>
            <div className="hero-stamp" aria-label="Over 15 years of skincare experience"><span>15+</span><small>years of<br />experience</small></div>
          </div>
          <div className="hero-bottomline"><span>Good skin takes good care.</span><span>Scroll to discover <ArrowDownRight size={15} aria-hidden="true" /></span></div>
        </section>

        <section className="credentials" aria-label="Glow by Odeta credentials">
          <div className="credentials-inner page-width">
            <div><strong>15<span>+</span></strong><span>Years of experience</span></div>
            <div><strong>Licensed</strong><span>Professional Esthetician</span></div>
            <div><strong>European</strong><span>Inspired philosophy</span></div>
            <div><strong>Beverly Hills</strong><span>Private skincare studio</span></div>
          </div>
        </section>

        <section className="about section-pad" id="about" aria-labelledby="about-title">
          <div className="about-grid page-width">
            <div className="about-visual">
              <div className="about-image-frame">
                <BrandImage src={photos.newClient} alt="New client facial imagery from Glow by Odeta's official booking page" className="about-photo" />
              </div>
              <div className="image-caption"><span>Personal care, at every step</span><span>Glow by Odeta · Beverly Hills</span></div>
              <div className="about-index">A considered<br />approach to skin</div>
            </div>
            <div className="about-copy">
              <p className="eyebrow"><span className="eyebrow-dot" /> The person behind your glow</p>
              <h2 id="about-title">Meet <em>Odeta.</em></h2>
              <p className="section-intro">Professional skincare, with a personal touch.</p>
              <p>I’m Odeta, a licensed esthetician with over 15 years of experience in professional skincare. Born and raised in Europe, I bring a European-inspired approach that is thoughtful, intentional and focused on long-term skin health.</p>
              <p>My approach combines relaxation with results. Each facial is tailored to your skin, your concerns and your goals—so you can feel cared for, calm and confident in your skincare journey.</p>
              <blockquote>“Thoughtful, personalized care—and facials that not only feel incredible, but truly work.”<cite>— Odeta</cite></blockquote>
              <a className="text-link" href="https://glowbyodeta.glossgenius.com/about" target="_blank" rel="noreferrer">Get to know Odeta <ArrowUpRight size={16} aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        <section className="treatments section-pad" id="treatments" aria-labelledby="treatments-title">
          <div className="page-width">
            <div className="section-heading treatment-heading">
              <div>
                <p className="eyebrow"><span className="eyebrow-dot" /> The treatment menu</p>
                <h2 id="treatments-title">Find your signature <em>glow.</em></h2>
              </div>
              <div className="heading-aside">
                <p>Every treatment begins with understanding your skin. Choose a starting point; the details are personalized to you.</p>
                <a className="text-link" href="https://glowbyodeta.glossgenius.com/services" target="_blank" rel="noreferrer">View all treatments <ArrowUpRight size={16} aria-hidden="true" /></a>
              </div>
            </div>
            <div className="service-list">
              {services.map((service, index) => (
                <article className="service-row" key={`${service.name}-${service.duration}`}>
                  <span className="service-index">0{index + 1}</span>
                  <div className="service-main">
                    <div className="service-title-line"><h3>{service.name}</h3><span className="service-note">{service.note}</span></div>
                    <p>{service.description}</p>
                  </div>
                  <span className="service-duration">{service.duration}</span>
                  <strong className="service-price">{service.price}</strong>
                  <a className="service-book" href={BOOKING_URL} target="_blank" rel="noreferrer" aria-label={`Book ${service.name}, ${service.duration}, ${service.price}`}><ArrowUpRight size={18} aria-hidden="true" /></a>
                </article>
              ))}
            </div>
            <div className="treatment-footnote"><Sparkles size={15} strokeWidth={1.4} aria-hidden="true" /><span>Techniques are selected after a professional skin analysis and may vary by treatment.</span><BookButton className="button-small">Book a facial</BookButton></div>
          </div>
        </section>

        <section className="approach" id="approach" aria-labelledby="approach-title">
          <div className="approach-inner page-width">
            <div className="approach-topline"><span>One skin, one plan</span><span>02 / Our approach</span></div>
            <div className="approach-main">
              <div>
                <p className="eyebrow eyebrow-light"><span className="eyebrow-dot" /> Personalized by design</p>
                <h2 id="approach-title">Your skin is unique.<br /><em>Your facial should be, too.</em></h2>
              </div>
              <div className="approach-copy">
                <p>No one-size-fits-all facials. Just thoughtful treatments shaped by what your skin needs and what you hope to achieve.</p>
                <a className="button button-light" href={BOOKING_URL} target="_blank" rel="noreferrer"><span>Begin your skin journey</span><ArrowUpRight size={16} aria-hidden="true" /></a>
              </div>
            </div>
            <div className="approach-steps">
              <div><span>01</span><h3>Understand</h3><p>Start with a professional look at your skin and your concerns.</p></div>
              <div><span>02</span><h3>Personalize</h3><p>Choose the techniques and care suited to your individual needs.</p></div>
              <div><span>03</span><h3>Stay consistent</h3><p>Build a thoughtful routine that supports your skin over time.</p></div>
            </div>
          </div>
        </section>

        <section className="techniques section-pad" aria-labelledby="techniques-title">
          <div className="techniques-grid page-width">
            <div className="techniques-copy">
              <p className="eyebrow"><span className="eyebrow-dot" /> Professional care, thoughtfully chosen</p>
              <h2 id="techniques-title">Where skincare expertise meets <em>advanced techniques.</em></h2>
              <p>After your skin analysis, Odeta selects the methods that make sense for your treatment goals. Every technique has a purpose; not every facial needs the same approach.</p>
              <div className="technique-tags" aria-label="Available skincare techniques">
                {['Hydrodermabrasion', 'Microdermabrasion', 'Microcurrent', 'LED light therapy', 'Deep cleansing', 'Extractions', 'Cooling therapy', 'Customized masks', 'Dermaplaning, where appropriate'].map((item) => <span key={item}>{item}</span>)}
              </div>
              <BookButton className="button-outline">Explore a facial</BookButton>
            </div>
            <div className="techniques-visual">
              <BrandImage src={photos.custom60} alt="Customized 60-minute facial imagery from Glow by Odeta's official booking page" className="techniques-photo" />
              <div className="techniques-caption"><span>Skincare, guided by expertise</span><span>03 — The details</span></div>
            </div>
          </div>
        </section>

        <section className="studio section-pad" aria-labelledby="studio-title">
          <div className="studio-inner page-width">
            <div className="studio-heading">
              <div>
                <p className="eyebrow"><span className="eyebrow-dot" /> A private studio in Beverly Hills</p>
                <h2 id="studio-title">A private space <em>to reset.</em></h2>
              </div>
              <p>Step into a calm, private skincare studio where personalized care and relaxation come together.</p>
            </div>
            <div className="studio-image-wrap">
              <BrandImage src={photos.custom90} alt="Customized 90-minute facial imagery from Glow by Odeta's official booking page" className="studio-photo" />
              <div className="studio-image-overlay"><span>Glow by Odeta</span><span>8685 Wilshire Blvd · Suite 15</span></div>
            </div>
          </div>
        </section>

        <section className="portfolio section-pad" id="portfolio" aria-labelledby="portfolio-title">
          <div className="page-width">
            <div className="section-heading portfolio-heading">
              <div>
                <p className="eyebrow"><span className="eyebrow-dot" /> In the treatment room</p>
                <h2 id="portfolio-title">A closer look at the <em>care.</em></h2>
              </div>
              <div className="heading-aside">
                <p>Real treatment imagery from Glow by Odeta’s service portfolio. Follow along for more skincare and studio moments.</p>
                <a className="text-link" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">@glowbyodeta <ArrowUpRight size={16} aria-hidden="true" /></a>
              </div>
            </div>
            <div className="portfolio-grid">
              <a className="portfolio-item portfolio-item-tall" href="https://glowbyodeta.glossgenius.com/portfolio" target="_blank" rel="noreferrer" aria-label="View Glow by Odeta's treatment portfolio">
                <BrandImage src={photos.teen} alt="Teen Facial imagery from Glow by Odeta's official booking page" className="portfolio-photo" />
                <span className="portfolio-label">01 <span>Personalized facial care</span><ArrowUpRight size={16} aria-hidden="true" /></span>
              </a>
              <div className="portfolio-note"><span className="portfolio-note-mark">G.</span><p>Every treatment is personal.<br /><em>Every detail, considered.</em></p><span>Glow by Odeta · Beverly Hills</span></div>
              <a className="portfolio-item portfolio-item-wide" href="https://glowbyodeta.glossgenius.com/portfolio" target="_blank" rel="noreferrer" aria-label="View Glow by Odeta's treatment portfolio">
                <BrandImage src={photos.back} alt="Clarifying Back Facial imagery from Glow by Odeta's official booking page" className="portfolio-photo" />
                <span className="portfolio-label">02 <span>Thoughtful treatments, tailored to you</span><ArrowUpRight size={16} aria-hidden="true" /></span>
              </a>
            </div>
            <div className="portfolio-bottom"><span>More treatment moments and skincare notes</span><a className="text-link" href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><Instagram size={15} aria-hidden="true" /> Follow on Instagram <ArrowUpRight size={15} aria-hidden="true" /></a></div>
          </div>
        </section>

        <section className="packages section-pad" id="packages" aria-labelledby="packages-title">
          <div className="page-width">
            <div className="section-heading packages-heading">
              <div>
                <p className="eyebrow"><span className="eyebrow-dot" /> A little more consistency</p>
                <h2 id="packages-title">Healthy skin is a <em>journey.</em></h2>
              </div>
              <div className="heading-aside"><p>Keep your care personal over time with a series of customized treatments.</p></div>
            </div>
            <div className="package-grid">
              {packages.map((item, index) => (
                <article className={`package-card ${index === 1 ? 'package-card-featured' : ''}`} key={item.name}>
                  <span className="package-number">0{index + 1} <span>Three-treatment package</span></span>
                  <h3>{item.name}</h3>
                  <p className="package-detail">{item.detail}</p>
                  <div className="package-price"><strong>{item.price}</strong><span>{item.value}</span></div>
                  <a className="package-link" href={PACKAGES_URL} target="_blank" rel="noreferrer">Explore package <ArrowUpRight size={16} aria-hidden="true" /></a>
                </article>
              ))}
            </div>
            <p className="package-note">Packages are available through Glow by Odeta’s booking site. View current details before purchase.</p>
          </div>
        </section>

        <section className="instagram-strip" id="instagram" aria-labelledby="instagram-title">
          <div className="instagram-inner page-width">
            <div className="instagram-mark" aria-hidden="true"><Instagram size={26} strokeWidth={1.2} /></div>
            <div className="instagram-copy">
              <p className="eyebrow"><span className="eyebrow-dot" /> A closer look at the glow</p>
              <h2 id="instagram-title">Follow the <em>glow.</em></h2>
              <p>Discover skincare tips, treatment moments and a closer look inside Glow by Odeta.</p>
            </div>
            <a className="button button-outline instagram-button" href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><span>Follow on Instagram</span><ArrowUpRight size={16} aria-hidden="true" /></a>
            <span className="instagram-handle">@glowbyodeta</span>
          </div>
        </section>

        <section className="booking-cta" aria-labelledby="booking-title">
          <div className="booking-cta-inner page-width">
            <div className="cta-orbit" aria-hidden="true"><span>G</span><i /></div>
            <p className="eyebrow eyebrow-light"><span className="eyebrow-dot" /> Your personalized skincare experience</p>
            <h2 id="booking-title">Your journey to<br /><em>better skin</em> starts here.</h2>
            <p>Discover personalized skincare and experience a facial designed around you.</p>
            <div className="cta-actions"><BookButton className="button-light">Book your facial</BookButton><a className="cta-contact" href={CONTACT_URL} target="_blank" rel="noreferrer">Get in touch <ArrowUpRight size={15} aria-hidden="true" /></a></div>
          </div>
        </section>
      </main>

      <footer className="footer" id="contact">
        <div className="footer-main page-width">
          <div className="footer-brand"><Wordmark light /><p>Personalized skincare.<br />Advanced techniques.<br />A more thoughtful approach to beauty.</p><a className="footer-instagram" href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><Instagram size={16} aria-hidden="true" /> @glowbyodeta <ArrowUpRight size={14} aria-hidden="true" /></a></div>
          <div className="footer-column"><h2>Explore</h2><a href="#about">About Odeta</a><a href="#treatments">Treatments</a><a href="#approach">Our approach</a><a href="#portfolio">Portfolio</a><a href="#packages">Packages</a></div>
          <div className="footer-column footer-location"><h2>Visit the studio</h2><p><MapPin size={15} aria-hidden="true" />8685 Wilshire Blvd, Suite 15<br /><span>Beverly Hills, CA 90211</span></p><a href="https://maps.google.com/?q=8685+Wilshire+Blvd+Suite+15+Beverly+Hills+CA+90211" target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={14} aria-hidden="true" /></a></div>
          <div className="footer-column footer-hours"><h2><Clock3 size={15} aria-hidden="true" /> Studio hours</h2>{hours.map(([day, time]) => <div className="hours-row" key={day}><span>{day}</span><span>{time}</span></div>)}</div>
        </div>
        <div className="footer-bottom page-width"><span>© {new Date().getFullYear()} Glow by Odeta</span><span>Facials that actually work.</span><div className="footer-socials"><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a><a href="https://www.facebook.com/glowbyodeta/" target="_blank" rel="noreferrer">Facebook</a><a href="https://www.yelp.com/biz/glow-by-odeta-beverly-hills" target="_blank" rel="noreferrer">Yelp</a></div></div>
      </footer>

      <a className="mobile-sticky-book" href={BOOKING_URL} target="_blank" rel="noreferrer"><span>Book your facial</span><ArrowUpRight size={17} aria-hidden="true" /></a>
    </>
  )
}

export default App
