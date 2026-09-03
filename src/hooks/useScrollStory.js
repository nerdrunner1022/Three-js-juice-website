import { useRef, useEffect, useState } from 'react';

// The whole "story" spans 4 full viewport-heights of scroll:
// 0 = Hero, 1 = Features, 2 = Ingredients, 3 = Testimonials
export const STORY_STAGES = 4;

export function useScrollStory(wrapperRef) {
  // Continuous, precise value — read every 3D frame, never triggers a re-render
  const progressRef = useRef(0);

  // Coarser values — DO trigger re-renders, but only when they actually change,
  // since HTML text doesn't need 60fps precision the way the 3D lerp does
  const [stage, setStage] = useState(0);
  const [localProgress, setLocalProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      // getBoundingClientRect().top goes negative as we scroll past the wrapper's start
      const rect = wrapper.getBoundingClientRect();
      const scrolled = -rect.top / window.innerHeight;
      const clamped = Math.min(Math.max(scrolled, 0), STORY_STAGES - 0.001);

      progressRef.current = clamped;

      const stageIndex = Math.floor(clamped);
      // Round to limit how often we re-render HTML text
      const local = Math.round((clamped - stageIndex) * 50) / 50;

      setStage((prev) => (prev !== stageIndex ? stageIndex : prev));
      setLocalProgress(local);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [wrapperRef]);

  return { progressRef, stage, localProgress };
}