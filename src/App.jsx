import React, { useRef } from 'react';
import Nav from './components/Nav';
import StoryScene from './components/StoryScene';
import Footer from './components/Footer';
import { useScrollStory } from './hooks/useScrollStory';

export default function App() {
  const wrapperRef = useRef();
  const footerRef = useRef();
  const { progressRef, stage, localProgress } = useScrollStory(wrapperRef);

  return (
    <div style={{ width: '100%' }}>
      <Nav stage={stage} wrapperRef={wrapperRef} footerRef={footerRef} />
      <StoryScene
        wrapperRef={wrapperRef}
        progressRef={progressRef}
        stage={stage}
        localProgress={localProgress}
      />
      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
}