'use client';

import { createElement, useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import SplitType from 'split-type';

gsap.registerPlugin(CustomEase);

type TextRevealProps = {
  as?: 'p' | 'span' | 'h2' | 'h3';
  className?: string;
  children: ReactNode;
  wordsOnly?: boolean;
};

export default function TextReveal({
  as = 'span',
  className,
  children,
  wordsOnly = false,
}: TextRevealProps) {
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    CustomEase.create('osmo-ease', '0.22, 1, 0.36, 1');

    if (!textRef.current) return;

    let split: SplitType | null = null;
    let hasAnimated = false;
    let isMounted = true;

    const animate = () => {
      if (!split) return;

      gsap.to(split.words, {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.45,
        stagger: 0.03,
        ease: 'power2.out',
      });
    };

    document.fonts.ready.then(() => {
      if (!isMounted || !textRef.current) return;

      split = new SplitType(textRef.current, { types: wordsOnly ? 'words' : 'lines,words' });
      gsap.set(split.words, { y: 20, opacity: 0, filter: 'blur(10px)' });

      if (hasAnimated) animate();
    });

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const threshold = isMobile ? 0.15 : 0.4;
    const rootMargin = isMobile ? '0px 0px -30px 0px' : '0px';

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        animate();
      }
    }, { threshold, rootMargin });

    observer.observe(textRef.current);

    return () => {
      isMounted = false;
      observer.disconnect();
      if (split) {
        gsap.killTweensOf(split.words);
        split.revert();
      }
    };
  }, [wordsOnly]);

  const setTextRef = (element: HTMLElement | null) => {
    textRef.current = element;
  };

  // The dynamic element receives a callback ref; it is only read inside the effect above.
  // eslint-disable-next-line react-hooks/refs
  return createElement(as, { ref: setTextRef, className }, children);
}