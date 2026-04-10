import React, { useState, useEffect, useRef } from 'react';

const HERO_IMAGE = '/9E991FD8-A37F-4031-BE0266F54F12C0E4.webp';
const LOCAL_IMAGE = '/3733264845.jpg';
const WEB3FORMS_KEY = 'b5311297-814b-4d45-9a90-a3a8531d0b40';
const WHATSAPP_NUMBER = '34697383652';

const NAV_LINKS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#proceso', label: 'Proceso' },
  { href: '#ventajas', label: 'Ventajas' },
  { href: '#contacto', label: 'Vender mi local' },
];

const STATS = [
  { value: 30, suffix: '+', label: 'Locales comprados' },
  { value: 98, suffix: '%', label: 'Clientes satisfechos' },
  { value: 8, suffix: '', label: 'Años en Granada' },
  { value: 48, suffix: 'h', label: 'Respuesta media' },
];

const Icons = {
  clipboard: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <line x1="8" y1="10" x2="16" y2="10" />
      <line x1="8" y1="14" x2="13" y2="14" />
    </svg>
  ),
  search: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  checkCircle: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  dollar: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  bolt: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  badgeCheck: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  home: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  mapPin: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  shield: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
};

const STEPS = [
  {
    icon: Icons.clipboard,
    title: 'Cuéntanos sobre tu local',
    desc: 'Rellena el formulario con los datos básicos: medidas, zona y cualquier detalle que consideres importante.',
  },
  {
    icon: Icons.search,
    title: 'Valoración sin compromiso',
    desc: 'Nuestro equipo estudia tu local y te contacta en menos de 48 horas con una valoración gratuita.',
  },
  {
    icon: Icons.checkCircle,
    title: 'Te hacemos una oferta',
    desc: 'Si te interesa, te presentamos una oferta justa. Sin intermediarios, sin comisiones, trato directo.',
  },
];

const ADVANTAGES = [
  { icon: Icons.dollar, title: 'Sin comisiones', desc: 'No cobramos nada. Compramos directamente tu local sin intermediarios.' },
  { icon: Icons.bolt, title: 'Pago rápido', desc: 'Una vez aceptada la oferta, gestionamos todo para que cobres lo antes posible.' },
  { icon: Icons.badgeCheck, title: 'Valoración gratuita', desc: 'Estudiamos tu local y te damos una valoración sin ningún compromiso.' },
  { icon: Icons.home, title: 'Cualquier estado', desc: 'Compramos locales en cualquier condición: reformados, por reformar, vacíos u ocupados.' },
  { icon: Icons.mapPin, title: 'Toda Granada', desc: 'Operamos en todos los barrios: Centro, Zaidín, Albaicín, Chana, Beiro, Realejo y más.' },
  { icon: Icons.shield, title: 'Confidencialidad', desc: 'Tu información es privada. No publicamos tu local en ningún portal.' },
];

const FAQS = [
  {
    q: '¿Me cobráis algo por valorar mi local?',
    a: 'No, la valoración es totalmente gratuita y sin compromiso. Nos pondremos en contacto contigo con una estimación tras estudiar los datos que nos envíes.',
  },
  {
    q: '¿Qué tipo de locales compráis?',
    a: 'Compramos todo tipo de locales comerciales: tiendas, oficinas, naves, bajos comerciales, restaurantes... En cualquier estado y zona de Granada.',
  },
  {
    q: '¿Cuánto tarda el proceso completo?',
    a: 'Desde el primer contacto hasta el cierre, el proceso suele tardar entre 2 y 6 semanas, dependiendo de la documentación y las condiciones del local.',
  },
  {
    q: '¿Necesito preparar documentación?',
    a: 'Para empezar solo necesitamos los datos básicos que nos envíes en el formulario. Cuando avancemos, te indicaremos qué documentación necesitamos y te ayudaremos a gestionarla.',
  },
  {
    q: '¿Puedo vender un local con inquilino?',
    a: 'Sí, compramos locales con o sin inquilino. Estudiamos cada caso de forma individual para hacerte la mejor oferta posible.',
  },
];

function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return ref;
}

function Reveal({ children, className = '', as: Tag = 'section', ...props }) {
  const ref = useScrollReveal();
  return (
    <Tag ref={ref} className={`reveal ${className}`} {...props}>
      {children}
    </Tag>
  );
}

function AnimatedCounter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1600;
          const step = Math.ceil(target / (duration / 16));
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            setCount(current);
          }, 16);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="stat-value">
      {count}{suffix}
    </span>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <button className="faq-question" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <span className="faq-icon">{open ? '−' : '+'}</span>
      </button>
      <div className="faq-answer">
        <p>{a}</p>
      </div>
    </div>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;
  return (
    <button
      className="scroll-top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Volver arriba"
    >
      ↑
    </button>
  );
}

function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola, me gustaría información sobre vender mi local en Granada.')}`}
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
    >
      <svg viewBox="0 0 32 32" width="28" height="28" fill="#fff">
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958a15.89 15.89 0 0 0 8.832 2.672C24.826 32 32 24.826 32 16.004S24.826 0 16.004 0zm9.35 22.616c-.394 1.112-2.316 2.126-3.19 2.21-.874.084-1.684.394-5.674-1.18-4.812-1.898-7.874-6.882-8.112-7.204-.236-.32-1.944-2.584-1.944-4.93 0-2.346 1.23-3.5 1.666-3.978.436-.478.952-.598 1.268-.598.316 0 .632.002.908.016.29.014.682-.112 1.066.814.394.952 1.344 3.278 1.462 3.516.118.236.196.514.04.832-.158.318-.236.516-.472.794-.236.28-.498.624-.71.836-.236.236-.482.492-.208.966.274.472 1.218 2.01 2.616 3.258 1.796 1.602 3.312 2.098 3.784 2.336.472.236.748.198 1.024-.118.274-.318 1.18-1.376 1.494-1.852.316-.478.632-.394 1.066-.236.434.158 2.758 1.302 3.23 1.538.472.236.788.356.906.554.118.196.118 1.14-.276 2.252z" />
      </svg>
    </a>
  );
}

function App() {
  const [form, setForm] = useState({
    nombre: '',
    telefono: '',
    zona: '',
    medidas: '',
    mensaje: '',
  });
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setError('');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Quiero vender mi local — ${form.nombre}`,
          from_name: 'TuLocalGranada',
          nombre: form.nombre,
          telefono: form.telefono,
          zona: form.zona,
          medidas_m2: form.medidas,
          mensaje: form.mensaje,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setEnviado(true);
      setForm({ nombre: '', telefono: '', zona: '', medidas: '', mensaje: '' });
    } catch {
      setError('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.');
    }
    setEnviando(false);
  };

  return (
    <div className="page">
      <header className="header">
        <div className="header-inner">
          <a href="#inicio" className="logo">TuLocal<span>Granada</span></a>
          <button
            className={`menu-toggle ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <span /><span /><span />
          </button>
          <nav className={`nav ${menuOpen ? 'open' : ''}`}>
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
            ))}
          </nav>
        </div>
      </header>

      <section id="inicio" className="hero">
        <img src={HERO_IMAGE} alt="" className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="hero-badge hero-anim hero-anim-1">Compramos locales en Granada</span>
          <h1 className="hero-anim hero-anim-2">
            ¿Quieres vender tu local?<br />
            <span className="gradient-text">Nosotros te lo compramos</span>
          </h1>
          <p className="hero-anim hero-anim-3">
            Somos compradores directos de locales comerciales en Granada.
            Sin intermediarios, sin comisiones, sin complicaciones.
            Contacta con nosotros y recibe una valoración gratuita en menos de 48 horas.
          </p>
          <div className="hero-actions hero-anim hero-anim-4">
            <a href="#contacto" className="button button-pulse">Quiero vender mi local</a>
            <a href="#proceso" className="button button-outline">Ver cómo funciona</a>
          </div>
        </div>
      </section>

      <main className="main">
        <section className="stats-bar">
          {STATS.map((s) => (
            <div key={s.label} className="stat">
              <AnimatedCounter target={s.value} suffix={s.suffix} />
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </section>

        <div className="trust-bar">
          <span>Compradores directos desde 2018</span>
          <span className="trust-dot" />
          <span>+85 operaciones cerradas</span>
          <span className="trust-dot" />
          <span>Trato personal y confidencial</span>
        </div>

        <Reveal id="nosotros" className="card card-about">
          <div className="about-grid">
            <div className="about-text">
              <h2>Compramos tu local en Granada</h2>
              <p>
                En <b>TuLocalGranada</b> llevamos más de 8 años comprando locales comerciales en toda la ciudad.
                Si estás pensando en vender tu local, somos tu mejor opción: te hacemos una oferta justa,
                rápida y sin ningún tipo de comisión. Nos encargamos de todo el proceso para que tú
                no tengas que preocuparte de nada.
              </p>
              <p>
                No importa el estado del local, la zona o si tiene inquilino. Estudiamos cada caso
                de forma individual y te damos una respuesta clara en menos de 48 horas.
              </p>
            </div>
            <div className="about-image">
              <img src={LOCAL_IMAGE} alt="Local comercial en Granada" />
            </div>
          </div>
        </Reveal>

        <Reveal id="proceso" className="card card-steps">
          <h2>Proceso de venta</h2>
          <p className="section-subtitle">Vender tu local es fácil. Solo tienes que seguir estos tres pasos.</p>
          <div className="steps-grid">
            {STEPS.map((s, i) => (
              <div key={i} className="step">
                <div className="step-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal id="ventajas" className="card">
          <h2>¿Por qué vendernos tu local?</h2>
          <p className="section-subtitle">Estas son las razones por las que propietarios de toda Granada confían en nosotros.</p>
          <div className="advantages-grid">
            {ADVANTAGES.map((a) => (
              <div key={a.title} className="advantage">
                <div className="advantage-icon">{a.icon}</div>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="card images-card">
          <h2>Operaciones recientes</h2>
          <p className="section-subtitle">Locales que hemos comprado recientemente en Granada.</p>
          <div className="images-grid">
            <figure className="image-item">
              <img src={HERO_IMAGE} alt="Local adquirido en el centro de Granada" />
              <div className="image-overlay">
                <span>Centro · 180 m² · Vendido</span>
              </div>
            </figure>
            <figure className="image-item">
              <img src={LOCAL_IMAGE} alt="Local adquirido en el Zaidín" />
              <div className="image-overlay">
                <span>Zaidín · 95 m² · Vendido</span>
              </div>
            </figure>
          </div>
        </Reveal>

        <Reveal className="card card-faq">
          <h2>Preguntas frecuentes</h2>
          <div className="faq-list">
            {FAQS.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </Reveal>

        <Reveal className="cta-banner">
          <h2>¿Tienes un local en Granada?</h2>
          <p>Cuéntanos los detalles y te hacemos una oferta sin compromiso en menos de 48 horas.</p>
          <a href="#contacto" className="button button-pulse">Solicitar valoración gratuita</a>
        </Reveal>

        <Reveal id="contacto" className="card card-contact">
          <div className="contact-header">
            <h2>Vende tu local</h2>
            <p>Rellena el formulario con los datos de tu local y nos pondremos en contacto contigo para hacerte una valoración gratuita y sin compromiso.</p>
          </div>

          {enviado ? (
            <div className="alert success">
              <strong>¡Solicitud enviada!</strong> Hemos recibido los datos de tu local. Te contactaremos en menos de 48 horas con una valoración.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="form">
              <div className="form-row">
                <div className="field">
                  <label htmlFor="nombre">Nombre completo</label>
                  <input
                    id="nombre"
                    type="text"
                    name="nombre"
                    placeholder="Tu nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="telefono">Teléfono de contacto</label>
                  <input
                    id="telefono"
                    type="tel"
                    name="telefono"
                    placeholder="612 345 678"
                    value={form.telefono}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="field">
                  <label htmlFor="zona">Zona / Barrio del local</label>
                  <input
                    id="zona"
                    type="text"
                    name="zona"
                    placeholder="Ej: Centro, Zaidín, Albaicín..."
                    value={form.zona}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="medidas">Superficie aproximada (m²)</label>
                  <input
                    id="medidas"
                    type="number"
                    name="medidas"
                    placeholder="Ej: 120"
                    value={form.medidas}
                    onChange={handleChange}
                    required
                    min="1"
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="mensaje">Cuéntanos más sobre tu local</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  placeholder="Estado del local, si tiene inquilino, precio orientativo, cualquier detalle que nos ayude a valorarlo..."
                  value={form.mensaje}
                  onChange={handleChange}
                  required
                  rows={5}
                />
              </div>

              <button type="submit" disabled={enviando} className="button">
                {enviando ? 'Enviando...' : 'Solicitar valoración gratuita'}
              </button>

              {error && <div className="alert error">{error}</div>}
            </form>
          )}
        </Reveal>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <strong>TuLocal<span>Granada</span></strong>
            <p>Compramos locales comerciales en Granada. Valoración gratuita y sin compromiso.</p>
          </div>
          <div className="footer-links">
            <h4>Navegación</h4>
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </div>
          <div className="footer-links">
            <h4>Contacto</h4>
            <p>alejandroizquierdowork@gmail.com</p>
            <p>Granada, España</p>
          </div>
        </div>
        <div className="footer-bottom">
          <small>© {new Date().getFullYear()} TuLocalGranada · Todos los derechos reservados</small>
        </div>
      </footer>

      <WhatsAppButton />
      <ScrollToTop />
    </div>
  );
}

export default App;
