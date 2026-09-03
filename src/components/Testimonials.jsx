import React from 'react';

const quotes = [
  { name: 'Alex', text: 'Tastes like the fruit itself, not a sugary imitation.' },
  { name: 'Priya', text: 'My morning routine isn\'t complete without it.' },
  { name: 'Sam', text: 'You can actually taste the difference cold-pressed makes.' },
];

export default function Testimonials() {
  return (
    <section style={{ padding: '6rem 3.5rem', background: 'var(--paper)' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        {quotes.map((q, i) => (
          <div
            key={q.name}
            style={{
              padding: '0 2rem',
              borderLeft: i === 0 ? 'none' : '1px solid var(--leaf)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: '1.15rem',
                color: 'var(--ink)',
                lineHeight: 1.5,
                margin: '0 0 1rem',
              }}
            >
              "{q.text}"
            </p>
            <p style={{ color: 'var(--leaf)', fontSize: '0.85rem', fontWeight: 500 }}>{q.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}