'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import styles from './HomePreloader.module.css';

import logo from '../../assets/logo.svg';
import bg1 from '../../assets/images/preloader-logo-bg/preloader-bg-01.png';
import bg2 from '../../assets/images/preloader-logo-bg/preloader-bg-02.png';
import bg3 from '../../assets/images/preloader-logo-bg/preloader-bg-03.png';
import bg4 from '../../assets/images/preloader-logo-bg/preloader-bg-04.png';

const images = [bg1, bg2, bg3, bg4];

export default function HomePreloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const whiteBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial setup for GSAP
    const tl = gsap.timeline();

    // Fast strobe effect between background images
    const totalLoops = 4;
    for (let loop = 0; loop < totalLoops; loop++) {
      for (let i = 0; i < images.length; i++) {
        tl.set(imagesRef.current, { opacity: 0 });
        tl.set(imagesRef.current[i], { opacity: 1 });
        tl.to({}, { duration: 0.1 });
      }
    }

    // After loops, change to white background
    tl.set(imagesRef.current, { opacity: 0 });
    tl.set(whiteBgRef.current, { opacity: 1 });

    // Calculate left offset to move the logo to the left edge of the screen
    const calculateLeftOffset = () => {
      if (typeof window !== 'undefined') {
        const maskWidth = maskRef.current?.offsetWidth || 511;
        return -(window.innerWidth / 2) + (maskWidth / 2) + 40; // 40px padding from left edge
      }
      return -500;
    };

    tl.to(maskRef.current, {
      x: calculateLeftOffset,
      duration: 1,
      ease: 'power3.inOut'
    });

    // Make the preloader container background transparent to reveal the home page
    tl.to(containerRef.current, {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => {
        if (containerRef.current) {
          containerRef.current.style.display = 'none';
        }
      }
    });

    // Handle window resize dynamically if needed (optional since the preloader is short-lived)
    const handleResize = () => {
      if (maskRef.current) {
        gsap.set(maskRef.current, { x: calculateLeftOffset() });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, []);

  return (
    <div className={styles.preloader} ref={containerRef}>
      <div
        className={styles.logoMask}
        ref={maskRef}
        style={{
          maskImage: `url(${logo.src})`,
          WebkitMaskImage: `url(${logo.src})`,
        }}
      >
        <div className={styles.bgImagesContainer}>
          {images.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt={`Preloader background ${i + 1}`}
              className={styles.bgImage}
              ref={(el) => { imagesRef.current[i] = el; }}
              priority
            />
          ))}
          <div className={styles.whiteBg} ref={whiteBgRef} />
        </div>
      </div>
    </div>
  );
}
