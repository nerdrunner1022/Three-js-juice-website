import { useState } from 'react';
import { faBars, faXmark, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getStoryStageHeight } from '../hooks/useScrollStory';

const links = [
  { label: 'Home', stage: 0 },
  { label: 'Benefits', stage: 1 },
  { label: 'Ingredients', stage: 2 },
  { label: 'Experiences', stage: 3 },
];

export default function Nav({ stage, wrapperRef, footerRef, cartCount = 0, onShop }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Paper sections (1, 2) are light — nav flips dark to stay legible against them.
  // Dusk sections (0, 3) are already dark — nav flips light to stand out instead of blending in.
  const overLight = stage === 1 || stage === 2;

  const scrollToStage = (index) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const revealOffset = index === 1 || index === 3 ? 0.7 : index === 2 ? 0.05 : 0;
    const stageHeight = getStoryStageHeight(wrapper);
    const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
    const target = wrapperTop + (index + revealOffset) * stageHeight;
    window.scrollTo({ top: target, behavior: 'auto' });
  };

  const scrollToContact = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`site-nav${menuOpen ? ' is-open' : ''}`}
      style={{
        position: 'fixed', top: '1.5rem', left: '50%', transform: 'translateX(-50%) scale(0.95)',
        zIndex: 100,
        background: overLight ? 'var(--dusk)' : 'rgba(245, 239, 225, 0.9)',
        color: overLight ? 'var(--mist)' : 'var(--ink)',
        padding: 'clamp(0.55rem, 1.5vw, 0.8rem) clamp(0.9rem, 2.5vw, 1.2rem)',
        borderRadius: '50px',
        display: 'flex', alignItems: 'center', gap: 'clamp(0.75rem, 2.5vw, 1.5rem)',
        fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
        transition: 'background 0.4s ease, color 0.4s ease',
      }}
    >
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(1.25rem, 4vw, 1.5rem)', marginRight: 'clamp(0.75rem, 3vw, 2.5rem)' }}>PureSqueeze</span>

      <button
        className="site-nav-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <FontAwesomeIcon
          className="hamburger-icon"
          icon={menuOpen ? faXmark : faBars}
          aria-hidden="true"
        />
      </button>

      <div className="site-nav-links">
        {links.map((link) => (
          <a
            key={link.label}
            className={stage === link.stage ? 'is-active' : undefined}
            aria-current={stage === link.stage ? 'page' : undefined}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToStage(link.stage);
              setMenuOpen(false);
            }}
            style={{ opacity: 0.75, color: 'inherit', textDecoration: 'none' }}
          >
            {link.label}
          </a>
        ))}

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            scrollToContact();
            setMenuOpen(false);
          }}
          style={{ opacity: 0.75, color: 'inherit', textDecoration: 'none' }}
        >
          Contact
        </a>

        {cartCount > 0 && (
          <button
            type="button"
            onClick={() => {
              if (onShop) onShop();
              setMenuOpen(false);
            }}
            style={{
              padding: '0.35rem 0.8rem',
              borderRadius: '999px',
              background: 'var(--rind)',
              color: 'var(--mist)',
              border: 'none',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'transform 0.2s ease',
            }}
          >
            <FontAwesomeIcon icon={faShoppingBag} style={{ fontSize: '0.85rem' }} />
            <span>Bag</span>
            <span
              style={{
                background: 'rgba(255,255,255,0.25)',
                padding: '0.05rem 0.45rem',
                borderRadius: '999px',
                fontSize: '0.75rem',
              }}
            >
              {cartCount}
            </span>
          </button>
        )}
      </div>
    </nav>
  );
}