import React from 'react';

export default function Nav() {
  return (
    <nav
      style={{
        position: 'fixed', top: '1.5rem', left: '50%', transform: 'translateX(-50%)',
        zIndex: 50, background: 'var(--dusk)', color: 'var(--mist)',
        padding: 'clamp(0.6rem, 2vw, 1rem) clamp(1rem, 4vw, 1.4rem)',
        display: 'flex', gap: 'clamp(0.75rem, 4vw, 1.5rem)', fontSize: 'clamp(0.8rem, 2.5vw, 1rem)', opacity: 0.92,
      }}
    >
      <span style={{ fontFamily: 'var(--font-display)' }}>PureSqueeze</span>
      <span style={{ opacity: 0.6 }}>Shop</span>
      <span style={{ opacity: 0.6 }}>About</span>
    </nav>
  );
}