import { useState, useEffect } from 'react';
import { useProgress } from '@react-three/drei';

export default function PageLoader() {
  const { progress, active } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [fadedOut, setFadedOut] = useState(false);

  useEffect(() => {
    // Smooth progress interpolation
    const target = active ? Math.max(progress, 15) : 100;
    const interval = setInterval(() => {
      setDisplayProgress((prev) => {
        if (prev < target) {
          const step = Math.max((target - prev) * 0.15, 1);
          return Math.min(prev + step, target);
        }
        return prev;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [progress, active]);

  useEffect(() => {
    // When progress reaches 100%, trigger fade out
    if (displayProgress >= 99 && !active) {
      const fadeTimer = setTimeout(() => {
        setFadedOut(true);
      }, 400);

      const hideTimer = setTimeout(() => {
        setHidden(true);
      }, 1000); // 400ms delay + 600ms fade duration

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [displayProgress, active]);

  if (hidden) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'var(--dusk)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        opacity: fadedOut ? 0 : 1,
        visibility: fadedOut ? 'hidden' : 'visible',
        transition: 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), visibility 0.6s ease',
        pointerEvents: fadedOut ? 'none' : 'all',
        userSelect: 'none',
      }}
    >
      {/* Glow aura */}
      <div
        style={{
          position: 'absolute',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(193, 66, 28, 0.22) 0%, rgba(23, 19, 15, 0) 70%)',
          pointerEvents: 'none',
          animation: 'loader-pulse 3s infinite ease-in-out',
        }}
      />

      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
            fontWeight: 400,
            color: 'var(--mist)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}
        >
          PureSqueeze
        </span>

        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--pulp)',
            opacity: 0.9,
          }}
        >
          Cold-pressed experience
        </span>

        {/* Progress Bar Container */}
        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: 'min(280px, 70vw)',
              height: '4px',
              borderRadius: '999px',
              background: 'rgba(245, 239, 225, 0.12)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${Math.round(displayProgress)}%`,
                background: 'linear-gradient(90deg, var(--rind), var(--pulp))',
                borderRadius: '999px',
                transition: 'width 0.25s ease-out',
                boxShadow: '0 0 12px rgba(193, 66, 28, 0.6)',
              }}
            />
          </div>

          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              fontWeight: 500,
              color: 'var(--mist)',
              opacity: 0.6,
              letterSpacing: '0.05em',
            }}
          >
            {Math.round(displayProgress)}%
          </span>
        </div>
      </div>
    </div>
  );
}
