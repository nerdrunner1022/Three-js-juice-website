import React from 'react';

export default function Ingredients() {
  return (
    <section
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '60vh',
        background: 'var(--paper)',
      }}
    >
      <div style={{ background: 'var(--pulp)', minHeight: '300px' }} />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem' }}>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: '2rem',
            color: 'var(--ink)',
            margin: 0,
          }}
        >
          What's inside
        </h2>
        <div style={{ width: '48px', height: '3px', background: 'var(--rind)', margin: '1rem 0 1.5rem' }} />
        <p style={{ color: 'var(--ink)', opacity: 0.75, lineHeight: 1.7, maxWidth: '380px', fontSize: '0.95rem' }}>
          Just oranges, cold-pressed within hours of harvest. No concentrate,
          no additives, no shortcuts.
        </p>
      </div>
    </section>
  );
}