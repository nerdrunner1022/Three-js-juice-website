import React from 'react';

export default function Footer() {
  return (
    <footer style={{ padding: '5rem 3.5rem', background: 'var(--dusk)', color: 'var(--mist)', textAlign: 'center' }}>
      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: '2rem', margin: '0 0 1.5rem' }}>
        Ready to taste the difference?
      </h3>
      <button
        style={{
          padding: '0.85rem 2rem',
          background: 'var(--rind)',
          color: 'var(--mist)',
          border: 'none',
          borderRadius: '999px',
          fontWeight: 500,
          fontSize: '1rem',
          cursor: 'pointer',
        }}
      >
        Shop the range
      </button>
      <p style={{ opacity: 0.4, fontSize: '0.8rem', marginTop: '3rem' }}>© 2026 PureSqueeze</p>
    </footer>
  );
}