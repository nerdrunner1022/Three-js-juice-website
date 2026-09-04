import React, { useRef } from 'react';
import Scene from './Scene';
import { useScrollStory, STORY_STAGES } from '../hooks/useScrollStory';

const benefits = [
  { title: 'Cold-pressed', text: 'Crushed and pressed, never heated.' },
  { title: 'Nothing added', text: 'Just fruit — no sugar, no concentrate.' },
  { title: 'Harvested to order', text: 'Pressed within hours of picking.' },
];

const testimonials = [
  { name: 'Alex', text: 'Tastes like the fruit itself, not a sugary imitation.' },
  { name: 'Priya', text: "My morning routine isn't complete without it." },
  { name: 'Sam', text: 'You can actually taste the difference cold-pressed makes.' },
];

export default function StoryScene({ wrapperRef, progressRef, stage, localProgress }) {
  const heroOpacity = stage === 0 ? Math.max(1 - localProgress * 2, 0) : 0;

  return (
    <div ref={wrapperRef} style={{ height: `${(STORY_STAGES + 1) * 100}vh`, position: 'relative' }}>      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: stage === 3 ? 'visible' : 'hidden',
          background: stage === 0 || stage === 3 ? 'var(--dusk)' : 'var(--paper)',
        }}
      >
        <Scene progressRef={progressRef} />

        {/* Hero text — stage 0 only */}
        <div
          style={{
            position: 'absolute', top: '50%', left: 0, padding: 'clamp(1.25rem, 5vw, 3.5rem)',
            color: 'var(--mist)', transform: 'translateY(-50%)', pointerEvents: 'none',
            opacity: stage === 0 ? Math.max(1 - localProgress * 2, 0) : 0,
          }}
        >
         <div
        style={{
          position: 'absolute', top: '50%', left: 0,
          padding: 'clamp(1.25rem, 5vw, 3.5rem)',
          transform: 'translateY(-50%)', pointerEvents: 'none',
          opacity: heroOpacity,
        }}
      >
        <div
          style={{
            display: 'inline-block',
            background: 'rgba(23, 19, 15, 0.6)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)', // Safari needs the prefix
            borderRadius: '16px',
            padding: 'clamp(1rem, 4vw, 1.75rem) clamp(1.25rem, 4vw, 2rem)',
            maxWidth: 'min(80vw, 440px)',
          }}
        >
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(2rem, 7vw, 4rem)', lineHeight: 1.05, color: 'var(--mist)', margin: 0 }}>
            Pressed, not processed.
          </h1>
          <p style={{ opacity: 0.75, marginTop: '1rem', lineHeight: 1.6, fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)', color: 'var(--mist)' }}>
            From every juicy orange that hangs low, we squeeze out the purest, most vibrant juice — no heat, no additives, just fruit in its most natural form.
          </p>
        </div>

        <button
          style={{
            marginTop: '1.5rem', marginLeft: 'clamp(1rem, 4vw, 2rem)', padding: 'clamp(0.7rem, 2vw, 0.85rem) clamp(1.5rem, 4vw, 2rem)',
            background: 'var(--rind)', color: 'var(--mist)', border: 'none',
            borderRadius: '999px', fontWeight: 500, fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)',
            cursor: 'pointer', pointerEvents: 'auto',
          }}
        >
          Shop the range
        </button>
</div>
        </div>

        {/* Benefits — stage 1, revealed one at a time */}
        <div style={{ position: 'absolute', top: '50%', right: 'clamp(1rem, 5vw, 3.5rem)', transform: 'translateY(-50%)', maxWidth: 'min(50vw, 360px)' }}>
          {benefits.map((b, i) => {
            const visible = stage === 1 && localProgress > i * 0.3;
            return (
              <div
                key={b.title}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(12px)',
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                  marginBottom: '2rem', color: 'var(--ink)',
                }}
              >
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(1.3rem, 4vw, 2rem)', margin: '0 0 0.5rem' }}>{b.title}</h3>
                <p style={{ opacity: 0.7, fontSize: 'clamp(0.9rem, 2.5vw, 1.4rem)', lineHeight: 1.5 }}>{b.text}</p>
              </div>
            );
          })}
        </div>

        {/* Ingredients — stage 2 */}
        <div
          style={{
            position: 'absolute', top: '50%', left: 'clamp(0.9rem, 2.5vw, 1.4rem)', transform: 'translateY(-50%)', marginLeft: 'clamp(1rem, 6vw, 2rem)',
            maxWidth: 'min(58vw, 360px)', color: 'var(--ink)',
            opacity: stage === 2 ? 1 : 0, transition: 'opacity 0.4s ease',
          }}
        >
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(1.6rem, 5vw, 3rem)', margin: '0 0 1rem' }}>What's inside</h2>
          <div style={{ width: '48px', height: '3px', background: 'var(--rind)', marginBottom: '1.5rem' }} />
          <ul style={{ listStyle: 'none', padding: 0, lineHeight: 2, opacity: 0.8 , fontSize: 'clamp(0.95rem, 3vw, 1.5rem)'}}>
            <li>Cold-pressed oranges</li>
            <li>Honey</li>
            <li>Salt</li>
            <li>Water</li>
            <li>That's it!</li>
          </ul>
        </div>

        {/* Testimonials — stage 3, all cards fade in one after another in a stack */}
        <div
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
            padding: `18vh clamp(1rem, 5vw, 3.5rem) clamp(1rem, 5vw, 3.5rem)`,
            opacity: stage === 3 ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '560px',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              alignItems: 'stretch',
            }}
          >
            {testimonials.map((q, i) => {
              const revealStart = i / testimonials.length;
              const progression = stage === 3 ? Math.min(Math.max(localProgress - revealStart, 0) / 0.22, 1) : 0;
              const visible = stage === 3 && localProgress >= revealStart;

              return (
                <blockquote
                  key={q.name}
                  style={{
                    margin: 0,
                    padding: '1.5rem 1.25rem',
                    borderRadius: '1rem',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 18px 40px rgba(18, 16, 32, 0.12)',
                    opacity: visible ? Math.max(0.2, progression) : 0,
                    transform: visible ? `translateY(${(1 - progression) * 14}px)` : 'translateY(14px)',
                    transition: 'opacity 0.5s ease, transform 0.5s ease',
                    textAlign: 'center',
                    fontFamily: 'var(--font-display)',
                    fontStyle: 'italic',
                    fontSize: `18vh clamp(1rem, 5vw, 3.5rem) clamp(1rem, 5vw, 3.5rem)`,
                    color: 'var(--mist)',
                    lineHeight: 1.5,
                  }}
                >
                  "{q.text}"
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontStyle: 'normal',
                      fontSize: '0.9rem',
                      marginTop: '1rem',
                      opacity: 0.7,
                    }}
                  >
                    — {q.name}
                  </span>
                </blockquote>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}