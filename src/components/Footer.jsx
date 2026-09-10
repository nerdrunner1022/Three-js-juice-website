import { useState, useEffect } from 'react';
import { scrollToStage } from '../hooks/useScrollStory';

const links = [
  { label: 'Home', stage: 0 },
  { label: 'Benefits', stage: 1 },
  { label: 'Ingredients', stage: 2 },
  { label: 'Experiences', stage: 3 },
];

const modalTexts = {
  privacy: {
    title: 'Privacy Policy',
    sections: [
      {
        heading: 'Information We Collect',
        content: 'When you subscribe to our newsletter or place an order, we collect personal information such as your name, email address, and shipping details strictly for order fulfillment and communication.',
      },
      {
        heading: 'How We Use Your Data',
        content: 'Your data is strictly used to process purchases, deliver order updates, and send cold-pressed juice news if you opted in. We never sell, rent, or trade your personal information with third parties.',
      },
      {
        heading: 'Cookies & Storage',
        content: 'We use essential local session cookies to save your cart selections and maintain visual preferences across browsing sessions.',
      },
      {
        heading: 'Your Rights & Unsubscribing',
        content: 'You can opt out of newsletter communications at any time by clicking the unsubscribe link in any email or by contacting privacy@puresqueeze.com.',
      },
    ],
  },
  terms: {
    title: 'Terms of Service',
    sections: [
      {
        heading: 'Acceptance of Terms',
        content: 'By accessing or purchasing from PureSqueeze, you agree to be bound by these terms. Our cold-pressed juices are unpasteurized, raw products intended for immediate consumption.',
      },
      {
        heading: 'Ordering & Delivery',
        content: 'Because our products are freshly pressed without preservatives, orders are non-refundable once dispatched. Please ensure someone is available to receive refrigerated packages.',
      },
      {
        heading: 'Intellectual Property',
        content: 'All brand graphics, typography, 3D interactive models, and promotional content belong to PureSqueeze and may not be copied without explicit authorization.',
      },
      {
        heading: 'Limitation of Liability',
        content: 'PureSqueeze is not liable for delayed deliveries due to courier disruptions or improper storage after delivery.',
      },
    ],
  },
};

export default function Footer({ wrapperRef, onShop }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'privacy' | 'terms' | null

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveModal(null);
    };
    if (activeModal) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <footer style={{ background: 'var(--dusk)', color: 'var(--mist)', position: 'relative' }}>
      {/* CTA banner */}
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
            <p style={{ opacity: 0.85, fontSize: '0.9rem', color: 'var(--pulp)' }}>
              ✓ You're on the list — thanks!
            </p>
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
          fontSize: '0.8rem', opacity: 0.7,
        }}
      >
        <span>© 2026 PureSqueeze</span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <button
            type="button"
            onClick={() => setActiveModal('privacy')}
            style={{
              background: 'none', border: 'none', padding: 0, color: 'inherit',
              cursor: 'pointer', font: 'inherit', textDecoration: 'underline',
              opacity: 0.85,
            }}
          >
            Privacy Policy
          </button>
          <button
            type="button"
            onClick={() => setActiveModal('terms')}
            style={{
              background: 'none', border: 'none', padding: 0, color: 'inherit',
              cursor: 'pointer', font: 'inherit', textDecoration: 'underline',
              opacity: 0.85,
            }}
          >
            Terms of Service
          </button>
        </div>
      </div>

      {/* Attribution */}
      <div style={{ textAlign: 'center', opacity: 0.35, fontSize: '0.75rem', padding: '0 1.5rem 2rem', lineHeight: 1.8 }}>
        <p>"Orange" (https://skfb.ly/oyUll) by 1str.co is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</p>
        <p>"Sclice Orange Good" (https://skfb.ly/ozLFF) by mevitasyam is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</p>
      </div>

      {/* Privacy / Terms Modal */}
      {activeModal && (
        <div
          className="shop-modal-backdrop"
          onClick={() => setActiveModal(null)}
          style={{ zIndex: 300 }}
        >
          <div
            className="shop-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '680px',
              padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            }}
          >
            <button
              className="shop-modal-close"
              onClick={() => setActiveModal(null)}
              aria-label="Close dialog"
            >
              ×
            </button>

            <div className="shop-modal-eyebrow">Legal Information</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '1.5rem' }}>
              {modalTexts[activeModal].title}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', lineHeight: 1.6, opacity: 0.9 }}>
              {modalTexts[activeModal].sections.map((sec, idx) => (
                <div key={idx}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '1.1rem', color: 'var(--rind)', marginBottom: '0.35rem' }}>
                    {sec.heading}
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--ink)', opacity: 0.8 }}>
                    {sec.content}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveModal(null)}
              style={{
                marginTop: '2rem',
                padding: '0.75rem 1.75rem',
                background: 'var(--rind)',
                color: 'var(--mist)',
                border: 'none',
                borderRadius: '999px',
                fontWeight: 500,
                fontSize: '0.9rem',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}