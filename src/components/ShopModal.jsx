import { useEffect, useRef, useState } from 'react';
import ProductBottlePreview from './ProductBottlePreview';

const products = [
  { id: 'small', name: 'Small', volume: '250 ml', price: '$4.50', note: 'A bright little pick-me-up.', modelScale: 0.88 },
  { id: 'medium', name: 'Medium', volume: '500 ml', price: '$7.50', note: 'Just right for your morning.', modelScale: 1.2 },
  { id: 'large', name: 'Large', volume: '1 litre', price: '$12.00', note: 'Made to share, or not.', modelScale: 1.52 },
];

export default function ShopModal({ open, onClose, onAddToCart }) {
  const [selectedId, setSelectedId] = useState('medium');
  const [added, setAdded] = useState(false);
  const closeButtonRef = useRef();

  useEffect(() => {
    if (!open) {
      setAdded(false);
      return undefined;
    }

    closeButtonRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleAdd = () => {
    const product = products.find((p) => p.id === selectedId);
    setAdded(true);

    if (onAddToCart) {
      onAddToCart(product);
    }

    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 550);
  };

  return (
    <div
      className="shop-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section className="shop-modal" role="dialog" aria-modal="true" aria-labelledby="shop-modal-title">
        <button
          ref={closeButtonRef}
          className="shop-modal-close"
          type="button"
          aria-label="Close shop"
          onClick={onClose}
        >
          <span aria-hidden="true">&times;</span>
        </button>

        <p className="shop-modal-eyebrow">Freshly pressed, your way</p>
        <h2 id="shop-modal-title">Choose your bottle.</h2>
        <p className="shop-modal-intro">Every size is cold-pressed, never heated, and delivered with its bright citrus finish intact.</p>

        <div className="shop-products" role="list">
          {products.map((product) => {
            const selected = selectedId === product.id;
            return (
              <button
                key={product.id}
                className={`shop-product${selected ? ' is-selected' : ''}`}
                type="button"
                role="listitem"
                aria-pressed={selected}
                onClick={() => setSelectedId(product.id)}
              >
                <ProductBottlePreview size={product.modelScale} />
                <span className="shop-product-copy">
                  <strong>{product.name}</strong>
                  <span>{product.volume}</span>
                  <small>{product.note}</small>
                </span>
                <span className="shop-product-price">{product.price}</span>
              </button>
            );
          })}
        </div>

        <button
          className="shop-modal-cta"
          type="button"
          onClick={handleAdd}
          style={{
            background: added ? 'var(--leaf)' : 'var(--rind)',
            transition: 'background 0.3s ease, transform 0.2s ease',
            transform: added ? 'scale(1.03)' : 'scale(1)',
          }}
        >
          {added ? '✓ Added to bag!' : `Add ${products.find((product) => product.id === selectedId)?.name.toLowerCase()} bottle`}
        </button>
      </section>
    </div>
  );
}
