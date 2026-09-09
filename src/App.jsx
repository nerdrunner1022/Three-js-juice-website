import { useCallback, useRef, useState } from 'react';
import Nav from './components/Nav';
import StoryScene from './components/StoryScene';
import Footer from './components/Footer';
import ShopModal from './components/ShopModal';
import { useScrollStory } from './hooks/useScrollStory';

export default function App() {
  const wrapperRef = useRef();
  const footerRef = useRef();
  const [shopOpen, setShopOpen] = useState(false);
  const { progressRef, stage, localProgress } = useScrollStory(wrapperRef);
  const openShop = useCallback(() => setShopOpen(true), []);
  const closeShop = useCallback(() => setShopOpen(false), []);

  return (
    <div style={{ width: '100%' }}>
      <Nav stage={stage} wrapperRef={wrapperRef} footerRef={footerRef} />
      <StoryScene
        wrapperRef={wrapperRef}
        progressRef={progressRef}
        stage={stage}
        localProgress={localProgress}
        onShop={openShop}
      />
      <div ref={footerRef}>
        <Footer onShop={openShop} />
      </div>
      <ShopModal open={shopOpen} onClose={closeShop} />
    </div>
  );
}