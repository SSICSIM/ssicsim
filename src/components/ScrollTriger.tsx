'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollScrub({ children }: { children: React.ReactNode }) {
  const el = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.current,
        { y: '100px', opacity: 0.5 },
        {
          y: '0px',
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: el.current,
            start: 'top bottom', // Start when the element is 80% visible in
            // the viewport
            end: 'top top', // End when the element is 20% visible in the viewport
            scrub: true,
          }
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={el} className="relative">
      {children}
    </div>
  );
}
