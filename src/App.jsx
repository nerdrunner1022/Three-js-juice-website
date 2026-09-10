import { useCallback, useRef, useState } from 'react';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Nav from './components/Nav';
import StoryScene from './components/StoryScene';
import Footer from './components/Footer';
import ShopModal from './components/ShopModal';
import PageLoader from './components/PageLoader';
import { toast, Toaster } from './utils/toast';
import { useScrollStory } from './hooks/useScrollStory';

export default function App() {
  const wrapperRef = useRef();
  const footerRef = useRef();
  const [shopOpen, setShopOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const { progressRef, stage, localProgress } = useScrollStory(wrapperRef);
  const openShop = useCallback(() => setShopOpen(true), []);
  const closeShop = useCallback(() => setShopOpen(false), []);

  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product]);
    toast.custom(
      (t) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            padding: '0.9rem 1.4rem',
            borderRadius: '1rem',
            background: 'rgba(23, 19, 15, 0.94)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(232, 163, 61, 0.3)',
            color: 'var(--mist)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(193, 66, 28, 0.2)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            opacity: t.visible ? 1 : 0,
            transform: t.visible ? 'translateY(0) scale(1)' : 'translateY(-16px) scale(0.95)',
            transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <FontAwesomeIcon icon={faShoppingBag} style={{ fontSize: '1.1rem', color: 'var(--pulp)' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <strong style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '0.95rem', color: 'var(--mist)' }}>
              Juice Added!
            </strong>
            <span style={{ fontSize: '0.82rem', opacity: 0.8, color: 'var(--paper)' }}>
              Added 1× {product.name} Bottle ({product.volume}) for {product.price}
            </span>
          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            type="button"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--mist)',
              opacity: 0.6,
              cursor: 'pointer',
              fontSize: '1.1rem',
              padding: '0 0 0 0.5rem',
              lineHeight: 1,
            }}
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      ),
      { duration: 3500 }
    );
  };

  return (
    <div style={{ width: '100%' }}>
      <PageLoader />
      <Toaster />
      <Nav
        stage={stage}
        wrapperRef={wrapperRef}
        footerRef={footerRef}
        cartCount={cart.length}
        onShop={openShop}
      />
      <StoryScene
        wrapperRef={wrapperRef}
        progressRef={progressRef}
        stage={stage}
        localProgress={localProgress}
        onShop={openShop}
      />
      <div ref={footerRef}>
        <Footer wrapperRef={wrapperRef} onShop={openShop} />
      </div>
      <ShopModal open={shopOpen} onClose={closeShop} onAddToCart={handleAddToCart} />
    </div>
  );
}