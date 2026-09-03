import React from 'react';

const features = [
  { title: 'Cold-pressed', text: 'Crushed and pressed, never heated — so nothing is lost.' },
  { title: 'Nothing added', text: 'Just fruit. No concentrate, no preservatives.' },
  { title: 'Harvested to order', text: 'Pressed within hours of picking, bottled the same day.' },
];

export default function Features() {
  return (
    <section style={{ padding: '6rem 3.5rem', background: 'var(--paper)' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        {features.map((f, i) => (
          <div
            key={f.title}
            style={{
              padding: '0 2rem',
              borderLeft: i === 0 ? 'none' : '1px solid var(--leaf)',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                fontSize: '1.4rem',
                color: 'var(--ink)',
                margin: '0 0 0.75rem',
              }}
            >
              {f.title}
            </h3>
            <p style={{ color: 'var(--ink)', opacity: 0.7, fontSize: '0.9rem', lineHeight: 1.6 }}>
              {f.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}