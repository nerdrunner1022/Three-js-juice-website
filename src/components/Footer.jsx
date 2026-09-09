import { useState } from 'react';
import { scrollToStage } from '../hooks/useScrollStory';

const links = [
  { label: 'Home', stage: 0 },
  { label: 'Benefits', stage: 1 },
  { label: 'Ingredients', stage: 2 },
  { label: 'Experiences', stage: 3 },
];

export default function Footer({ wrapperRef, onShop }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Placeholder — wire this to EmailJS or a real mailing-list API later
    setSubscribed(true);
  };

  return (
    <footer style={{ background: 'var(--dusk)', color: 'var(--mist)' }}>
      {/* CTA banner — unchanged */}
      <div style={{ textAlign: 'center', padding: 'clamp(3rem, 8vw, 5rem) 1.5rem' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(1.4rem, 4vw, 2rem)', margin: '0 0 1.5rem' }}>
          Ready to taste the difference?
        </h3>
        <button
          onClick={() => {
            scrollToStage(wrapperRef?.current, 0);
            if (onShop) onShop();
          }}
          style={{
            padding: '0.85rem 2rem', background: 'var(--rind)', color: 'var(--mist)',
            border: 'none', borderRadius: '999px', fontWeight: 500,
            fontSize: '0.95rem', cursor: 'pointer',
          }}
        >
          Shop the range
        </button>
      </div>

      <div style={{ height: '1px', background: 'rgba(245,239,225,0.12)', maxWidth: '1100px', margin: '0 auto' }} />

      {/* Three-column detail section */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2.5rem',
          maxWidth: '1100px',
          margin: '0 auto',
          padding: 'clamp(2.5rem, 6vw, 4rem) clamp(1.5rem, 5vw, 3.5rem)',
        }}
      >
        {/* Brand */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '1.3rem', margin: '0 0 0.75rem' }}>
            PureSqueeze
          </h4>
          <p style={{ opacity: 0.65, fontSize: '0.85rem', lineHeight: 1.6, maxWidth: '220px' }}>
            Cold-pressed within hours of harvest. No heat, no additives — just fruit.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h5 style={{ fontSize: '0.75rem', letterSpacing: '0.05em', opacity: 0.5, margin: '0 0 1rem', textTransform: 'uppercase' }}>
            Explore
          </h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {links.map((link) => (
              <a
                key={link.label}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToStage(wrapperRef?.current, link.stage);
                }}
                style={{ opacity: 0.75, color: 'inherit', textDecoration: 'none', fontSize: '0.9rem' }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h5 style={{ fontSize: '0.75rem', letterSpacing: '0.05em', opacity: 0.5, margin: '0 0 1rem', textTransform: 'uppercase' }}>
            Stay in the loop
          </h5>
          {subscribed ? (
            <p style={{ opacity: 0.75, fontSize: '0.9rem' }}>You're on the list — thanks!</p>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                style={{
                  flex: 1, minWidth: 0, padding: '0.6rem 0.8rem', borderRadius: '8px',
                  border: '1px solid rgba(245,239,225,0.2)', background: 'rgba(245,239,225,0.06)',
                  color: 'var(--mist)', fontSize: '0.85rem', fontFamily: 'var(--font-body)',
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '0.6rem 1rem', background: 'var(--rind)', color: 'var(--mist)',
                  border: 'none', borderRadius: '8px', fontSize: '0.85rem',
                  fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap',
                }}
              >
                Join
              </button>
            </form>
          )}
        </div>
      </div>

      <div style={{ height: '1px', background: 'rgba(245,239,225,0.12)', maxWidth: '1100px', margin: '0 auto' }} />

      {/* Legal row */}
      <div
        style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '1rem',
          maxWidth: '1100px', margin: '0 auto', padding: '1.5rem clamp(1.5rem, 5vw, 3.5rem)',
          fontSize: '0.8rem', opacity: 0.5,
        }}
      >
        <span>© 2026 PureSqueeze</span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms</a>
        </div>
      </div>

      {/* Attribution — kept as-is, just tucked below everything else */}
      <div style={{ textAlign: 'center', opacity: 0.35, fontSize: '0.75rem', padding: '0 1.5rem 2rem', lineHeight: 1.8 }}>
        <p>"Orange" (https://skfb.ly/oyUll) by 1str.co is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</p>
        <p>"Sclice Orange Good" (https://skfb.ly/ozLFF) by mevitasyam is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</p>
      </div>
    </footer>
  );
}