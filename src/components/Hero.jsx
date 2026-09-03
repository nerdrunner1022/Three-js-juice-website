import React from 'react';
import Scene from './Scene';

export default function Hero() {
  return (
    <section style={{ width: '100%', height: '100vh', position: 'relative', background: 'var(--dusk)' }}>
      <Scene />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          padding: '3.5rem',
          color: 'var(--mist)',
          pointerEvents: 'none',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: '3.2rem',
            lineHeight: 1.05,
            maxWidth: '480px',
            margin: 0,
          }}
        >
          Pressed, not processed.
        </h1>
        <p style={{ maxWidth: '340px', opacity: 0.75, marginTop: '1.2rem', lineHeight: 1.6, fontSize: '0.95rem' }}>
          Every bottle is cold-pressed within hours of harvest. No concentrate, no additives — just fruit.
        </p>
        <button
          style={{
            marginTop: '2rem',
            padding: '0.85rem 2rem',
            background: 'var(--rind)',
            color: 'var(--mist)',
            border: 'none',
            borderRadius: '999px',
            fontWeight: 500,
            fontSize: '0.95rem',
            cursor: 'pointer',
            pointerEvents: 'auto',
          }}
        >
          Shop the range
        </button>
      </div>
    </section>
  );
}