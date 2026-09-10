import { useEffect, useState } from 'react';
import Scene from './Scene';
import { STORY_STAGES } from '../hooks/useScrollStory';

const benefits = [
  { title: 'Cold-pressed', text: 'Crushed and pressed, never heated.' },
  { title: 'Nothing added', text: 'Just fruit — no sugar, no concentrate.' },
  { title: 'Harvested to order', text: 'Pressed within hours of picking.' },
];

const testimonials = [
  { name: 'Alex', text: 'Tastes like the fruit itself, not a sugary imitation.' },
  { name: 'Priya', text: "My morning routine isn't complete without it." },
  { name: 'Sam', text: 'You can actually taste the difference cold-pressed makes.' },
  { name: 'Maya', text: 'Bright, fresh, and never too sweet.' },
  { name: 'Jordan', text: 'It tastes like someone just handed me an orange from the orchard.' },
  { name: 'Lee', text: 'The kind of juice that makes breakfast feel special.' },
  { name: 'Nora', text: 'Clean, lively flavor from the first sip to the last.' },
  { name: 'Chris', text: 'I finally found a juice worth slowing down for.' },
];

export default function StoryScene({ wrapperRef, progressRef, stage, localProgress, onShop }) {
  const heroOpacity = stage === 0 ? Math.max(1 - localProgress * 2, 0) : 0;
  const testimonialOpacity = stage === 3 ? Math.min((1 - localProgress) / 0.05, 1) : 0;
  const [centerTestimonialIndex, setCenterTestimonialIndex] = useState(0);

  useEffect(() => {
    if (stage !== 3) return undefined;

    const carouselTimer = setInterval(() => {
      setCenterTestimonialIndex((currentIndex) => (currentIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(carouselTimer);
  }, [stage]);

  const visibleTestimonials = [-1, 0, 1].map((offset) => {
    const index = (centerTestimonialIndex + offset + testimonials.length) % testimonials.length;
    return { ...testimonials[index], offset };
  });

  return (
    <div ref={wrapperRef} style={{ height: `${(STORY_STAGES + 1) * 100}vh`, position: 'relative' }}>      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          zIndex: 0,
          background: stage === 0 || stage === 3 ? 'var(--dusk)' : 'var(--paper)',
        }}
      >
        <Scene progressRef={progressRef} stage={stage} />

        {/* Hero text — stage 0 only */}
        <div
          className="story-hero"
        style={{
          position: 'absolute', top: '50%', left: 0,
          zIndex: 2,
          padding: 'clamp(1rem, 5vw, 3.5rem)',
          transform: 'translateY(-50%)', pointerEvents: 'none',
          opacity: heroOpacity,
          display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
        }}
      >
        <div
          className="story-hero-card"
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
          <p style={{ opacity: 0.75, marginTop: '1rem', lineHeight: 1.6, fontSize: 'clamp(1rem, 2.5vw, 1.1rem)', color: 'var(--mist)' }}>
            From every juicy orange that hangs low, we squeeze out the purest, most vibrant juice — no heat, no additives, just fruit in its most natural form.
          </p>
        </div>

        <button
          onClick={onShop}
          style={{
            marginTop: '1.5rem', marginLeft: 0, padding: 'clamp(0.7rem, 2vw, 0.85rem) clamp(1.5rem, 4vw, 2rem)',
            background: 'var(--rind)', color: 'var(--mist)', border: 'none',
            borderRadius: '999px', fontWeight: 500, fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
            cursor: 'pointer', pointerEvents: 'auto',
          }}
        >
          Shop the range
        </button>
  </div>

        {/* Benefits — stage 1, revealed one at a time */}
        <div className="story-benefits" style={{ position: 'absolute', top: '50%', right: 'clamp(1rem, 8vw, 10rem)', transform: 'translateY(-50%)', width: 'min(calc(100vw - 2rem), 320px)', maxWidth: 'calc(100vw - 2rem)' }}>
          {benefits.map((b, i) => {
            const visible = stage === 1 && localProgress > i * 0.3;
            return (
              <div
                key={b.title}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(12px)',
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                  marginBottom: '1.5rem', color: 'var(--ink)',
                }}
              >
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(1.3rem, 4vw, 2rem)', margin: '0 0 0.5rem' }}>{b.title}</h3>
                <p style={{ opacity: 0.7, fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', lineHeight: 1.5 }}>{b.text}</p>
              </div>
            );
          })}
        </div>

        {/* Ingredients — stage 2 */}
        <div
          className="story-ingredients"
          style={{
            position: 'absolute', top: '50%', left: 'clamp(1rem, 8vw, 10rem)', transform: 'translateY(-50%)',
            width: 'min(calc(100vw - 2rem), 320px)', maxWidth: 'calc(100vw - 2rem)', color: 'var(--ink)',
            opacity: stage === 2 ? 1 : 0, transition: 'opacity 0.4s ease',
          }}
        >
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(1.6rem, 5vw, 3rem)', margin: '0 0 1rem' }}>What's inside</h2>
          <div style={{ width: '48px', height: '3px', background: 'var(--rind)', marginBottom: '1.5rem' }} />
          <ul style={{ listStyle: 'none', padding: 0, lineHeight: 2, opacity: 0.8 , fontSize: 'clamp(1rem, 3vw, 1.5rem)'}}>
            <li>Cold-pressed oranges</li>
            <li>Honey</li>
            <li>Salt</li>
            <li>Water</li>
            <li>That's it!</li>
          </ul>
        </div>

        {/* Testimonials — stage 3, centered carousel with faded neighbors */}
        <div
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: `12vh clamp(1rem, 5vw, 3.5rem)`,
            opacity: testimonialOpacity,
            transition: 'opacity 0.4s ease',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '1573px',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              alignItems: 'stretch',
              perspective: '1200px',
            }}
          >
            <div style={{ color: 'var(--pulp)', textAlign: 'center', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              From the people who drink it
              <div style={{ width: '48px', height: '2px', margin: '0.75rem auto 0', background: 'var(--rind)' }} />
            </div>
            <div className="story-testimonial-track" style={{ display: 'flex', alignItems: 'stretch', gap: '1.5rem', width: '100%', transformStyle: 'preserve-3d' }}>
              {visibleTestimonials.map((q) => {
                const isCenter = q.offset === 0;
                const cardScale = isCenter ? 1.04 : 0.88;
                const cardOpacity = isCenter ? 1 : 0.28;
                const cardX = `${q.offset * 8}%`;
                const cardDepth = isCenter ? '0px' : '-140px';
                const cardRotation = `${q.offset * -12}deg`;

              return (
                <blockquote
                  key={q.name}
                  className="story-testimonial-card"
                  style={{
                    '--card-opacity': cardOpacity,
                    '--card-scale': cardScale,
                    '--card-x': cardX,
                    '--card-depth': cardDepth,
                    '--card-rotation': cardRotation,
                    flex: '1 1 0',
                    alignSelf: 'stretch',
                    margin: 0,
                    minWidth: 0,
                    minHeight: 'fit-content',
                    aspectRatio: '1.55 / 1',
                    boxSizing: 'border-box',
                    overflow: 'visible',
                    padding: 'clamp(1rem, 2vw, 1.75rem) clamp(1rem, 2vw, 2rem)',
                    borderRadius: '1.25rem',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 18px 40px rgba(18, 16, 32, 0.12)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 'var(--card-opacity)',
                    transform: 'translate3d(var(--card-x), 0, var(--card-depth)) rotateY(var(--card-rotation)) scale(var(--card-scale))',
                    transformStyle: 'preserve-3d',
                    transition: 'opacity 1.4s ease, transform 1.4s cubic-bezier(0.22, 1, 0.36, 1)',
                    textAlign: 'center',
                    fontFamily: 'var(--font-display)',
                    fontStyle: 'italic',
                    fontSize: 'clamp(1.15rem, 1.8vw, 1.65rem)',
                    color: 'var(--mist)',
                    lineHeight: 1.35,
                  }}
                >
                  "{q.text}"
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontStyle: 'normal',
                      fontSize: 'clamp(0.85rem, 1.1vw, 1rem)',
                      marginTop: '0.75rem',
                      opacity: 0.7,
                    }}
                  >
                    — {q.name}
                  </span>
                </blockquote>
              );
              })}
            </div>

            {/* Testimonial Position Indicator */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1.25rem',
                marginTop: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                {testimonials.map((_, idx) => {
                  const isActive = idx === centerTestimonialIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      aria-label={`Go to testimonial ${idx + 1} of ${testimonials.length}`}
                      onClick={() => setCenterTestimonialIndex(idx)}
                      style={{
                        padding: 0,
                        border: 'none',
                        height: '6px',
                        width: isActive ? '1.6rem' : '6px',
                        borderRadius: isActive ? '999px' : '50%',
                        background: isActive ? 'var(--rind)' : 'var(--mist)',
                        opacity: isActive ? 1 : 0.35,
                        cursor: 'pointer',
                        transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
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
                  letterSpacing: '0.05em',
                  color: 'var(--mist)',
                  opacity: 0.8,
                }}
              >
                <strong style={{ color: 'var(--pulp)', fontWeight: 600 }}>{centerTestimonialIndex + 1}</strong> / {testimonials.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}