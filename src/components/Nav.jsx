import React from 'react';

const links = [
  { label: 'Home', stage: 0 },
  { label: 'Benefits', stage: 1 },
  { label: 'Ingredients', stage: 2 },
  { label: 'Experiences', stage: 3 },
];

export default function Nav({ stage, wrapperRef, footerRef }) {
  // Paper sections (1, 2) are light — nav flips dark to stay legible against them.
  // Dusk sections (0, 3) are already dark — nav flips light to stand out instead of blending in.
  const overLight = stage === 1 || stage === 2;

  const scrollToStage = (index) => {
    if (!wrapperRef.current) return;
    const target = wrapperRef.current.offsetTop + index * window.innerHeight;
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  const scrollToContact = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      style={{
        position: 'fixed', top: '1.5rem', left: '50%', transform: 'translateX(-50%)',
        zIndex: 50,
        background: overLight ? 'var(--dusk)' : 'rgba(245, 239, 225, 0.9)',
        color: overLight ? 'var(--mist)' : 'var(--ink)',
        padding: 'clamp(0.6rem, 2vw, 1rem) clamp(1rem, 4vw, 1.4rem)',
        borderRadius: '50px',
        display: 'flex', alignItems: 'center', gap: 'clamp(1rem, 4vw, 2rem)',
        fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
        transition: 'background 0.4s ease, color 0.4s ease',
      }}
    >
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(1.25rem, 4vw, 1.5rem)', marginRight: 'clamp(0.75rem, 3vw, 2.5rem)' }}>PureSqueeze</span>

      {links.map((link) => (
        <span
          key={link.label}
          onClick={() => scrollToStage(link.stage)}
          style={{ opacity: 0.75, cursor: 'pointer' }}
        >
          {link.label}
        </span>
      ))}

      <span onClick={scrollToContact} style={{ opacity: 0.75, cursor: 'pointer' }}>
        Contact
      </span>
    </nav>
  );
}