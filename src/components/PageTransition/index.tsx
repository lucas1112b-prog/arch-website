'use client';

import { useEffect, useRef, useState, createContext, useContext } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import gsap from 'gsap';
import styles from './PageTransition.module.css';

const TransitionContext = createContext({
  navigate: (href: string) => { },
});

export const useTransition = () => useContext(TransitionContext);

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isInitialMount = useRef(true);

  const navigate = (href: string) => {
    if (href === pathname || isTransitioning) return;
    setIsTransitioning(true);

    const bars = barsRef.current;

    // Animation IN: Bars expand from left to right
    gsap.set(bars, { transformOrigin: 'left' });
    gsap.to(bars, {
      scaleX: 1,
      stagger: 0.04,
      duration: 0.7,
      ease: 'power4.inOut',
      onComplete: () => {
        router.push(href);
      }
    });
  };

  useEffect(() => {
    const bars = barsRef.current;

    if (isInitialMount.current) {
      isInitialMount.current = false;
      // Initial state: scaled to 0
      gsap.set(bars, { scaleX: 0 });
      return;
    }

    // Animation OUT: Bars shrink from left to right (using origin right)
    gsap.set(bars, { transformOrigin: 'right' });
    gsap.to(bars, {
      scaleX: 0,
      stagger: 0.04,
      duration: 0.7,
      ease: 'power4.inOut',
      onComplete: () => {
        setIsTransitioning(false);
      }
    });
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      <div className={styles.transitionContainer}>
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            ref={(el) => { barsRef.current[i] = el; }}
            className={styles.bar}
          />
        ))}
      </div>
      {children}
    </TransitionContext.Provider>
  );
}

// Custom Link Component
export function TransitionLink({ href, children, className, onClick }: { href: string, children: React.ReactNode, className?: string, onClick?: () => void }) {
  const { navigate } = useTransition();

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) onClick();
    if (href.startsWith('#') || href === '') return;
    e.preventDefault();
    navigate(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
