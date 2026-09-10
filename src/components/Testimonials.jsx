import { useState } from 'react';

const quotes = [
  { name: 'Alex', text: 'Tastes like the fruit itself, not a sugary imitation.' },
  { name: 'Priya', text: "My morning routine isn't complete without it." },
  { name: 'Sam', text: 'You can actually taste the difference cold-pressed makes.' },
  { name: 'Maya', text: 'Bright, fresh, and never too sweet.' },
  { name: 'Jordan', text: 'It tastes like someone just handed me an orange from the orchard.' },
  { name: 'Lee', text: 'The kind of juice that makes breakfast feel special.' },
  { name: 'Nora', text: 'Clean, lively flavor from the first sip to the last.' },
  { name: 'Chris', text: 'I finally found a juice worth slowing down for.' },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section style={{ padding: '6rem 3.5rem', background: 'var(--paper)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2rem',
          }}
        >
          {quotes.slice(0, 3).map((q, i) => (
            <div
              key={q.name}
              style={{
                padding: '0 1rem',
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

        {/* Position Indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.25rem',
            marginTop: '3rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            {quotes.map((_, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Go to testimonial ${idx + 1} of ${quotes.length}`}
                  onClick={() => setActiveIndex(idx)}
                  style={{
                    padding: 0,
                    border: 'none',
                    height: '6px',
                    width: isActive ? '1.6rem' : '6px',
                    borderRadius: isActive ? '999px' : '50%',
                    background: isActive ? 'var(--rind)' : 'var(--ink)',
                    opacity: isActive ? 1 : 0.25,
                    cursor: 'pointer',
                    transition: 'all 0.35s ease',
                  }}
                />
              );
            })}
          </div>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              fontWeight: 500,
              color: 'var(--ink)',
              opacity: 0.75,
            }}
          >
            <strong style={{ color: 'var(--rind)', fontWeight: 600 }}>{activeIndex + 1}</strong> / {quotes.length}
          </span>
        </div>
      </div>
    </section>
  );
}