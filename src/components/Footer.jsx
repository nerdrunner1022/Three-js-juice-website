export default function Footer({ onShop }) {
  return (
    <footer style={{ padding: 'clamp(3rem, 10vw, 5rem) clamp(1.25rem, 5vw, 3.5rem)', background: 'var(--dusk)', color: 'var(--mist)', textAlign: 'center' }}>
      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(1.4rem, 4vw, 2rem)', margin: '0 0 1.5rem' }}>
        Ready to taste the difference?
      </h3>
      <button
        onClick={onShop}
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
      <p style={{ opacity: 0.4, fontSize: '0.8rem', marginTop: '3rem' }}>"Orange" (https://skfb.ly/oyUII) by 1str.co is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</p>
      <p style={{ opacity: 0.4, fontSize: '0.8rem', marginTop: '3rem' }}>"Sclice Orange Good" (https://skfb.ly/ozLFF) by mevitasyam is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</p>
    </footer>
  );
}