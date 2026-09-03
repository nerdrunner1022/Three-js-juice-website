import React from 'react';

export default function Nav() {
  return (
    <nav
      style={{
        position: 'fixed', top: '1.5rem', left: '50%', transform: 'translateX(-50%)',
        zIndex: 50, background: 'var(--dusk)', color: 'var(--mist)',
        padding: '1rem 1.4rem', borderRadius: '10px',
        display: 'flex', gap: '1.5rem', fontSize: '1rem', opacity: 0.92,
      }}
    >
      <span style={{ fontFamily: 'var(--font-display)' }}>PureSqueeze</span>
      <span style={{ opacity: 0.6 }}>Shop</span>
      <span style={{ opacity: 0.6 }}>About</span>
    </nav>
  );
}