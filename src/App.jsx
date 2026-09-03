import React from 'react';
import Nav from './components/Nav';
import StoryScene from './components/StoryScene';
import Footer from './components/Footer';

export default function App() {
  return (
    <div style={{ width: '100%' }}>
      <Nav />
      <StoryScene />
      <Footer />
    </div>
  );
}