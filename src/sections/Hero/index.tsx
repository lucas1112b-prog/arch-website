'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import styles from './Hero.module.css';
import logo from '../../assets/logo.svg';
import heroBottomLeft from '../../assets/icons/hero-bottom-left.svg';

// Big Images
import heroBig1 from '../../assets/images/images-big-hero/image-hero-01-big.png';
import heroBig2 from '../../assets/images/images-big-hero/image-hero-02-big.png';
import heroBig3 from '../../assets/images/images-big-hero/image-hero-03-big.png';
import heroBig4 from '../../assets/images/images-big-hero/image-hero-04-big.png';

// Small Images
import heroSmall1 from '../../assets/images/images-small-hero/image-hero-01-small.png';
import heroSmall2 from '../../assets/images/images-small-hero/image-hero-02-small.png';
import heroSmall3 from '../../assets/images/images-small-hero/image-hero-03-small.png';
import heroSmall4 from '../../assets/images/images-small-hero/image-herooo-04-small.png';

const bigImages = [heroBig1, heroBig2, heroBig3, heroBig4];
const smallImages = [heroSmall1, heroSmall2, heroSmall3, heroSmall4];

export default function Hero() {
  const backgroundContainerRef = useRef<HTMLDivElement>(null);
  const bigWrappersRef = useRef<(HTMLDivElement | null)[]>([]);
  const smallWrappersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Initial Setup
    gsap.set(bigWrappersRef.current, { clipPath: 'inset(50% 0% 50% 0%)', zIndex: 0 });
    gsap.set(bigWrappersRef.current[0], { clipPath: 'inset(0% 0% 0% 0%)', zIndex: 1 });

    gsap.set(smallWrappersRef.current, { clipPath: 'inset(0% 0% 0% 0%)', zIndex: 0 });
    gsap.set(smallWrappersRef.current[0], { zIndex: 1 });

    let current = 0;
    const total = bigImages.length;
    const slideDuration = 3.5;
    const transitionDuration = 1.2;

    const runTimeline = () => {
      const next = (current + 1) % total;

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(bigWrappersRef.current[current], { clipPath: 'inset(50% 0% 50% 0%)', zIndex: 0 });
          gsap.set(smallWrappersRef.current[current], { clipPath: 'inset(0% 0% 0% 0%)', zIndex: 0 });
          current = next;
          runTimeline();
        }
      });

      gsap.set(bigWrappersRef.current[next], { clipPath: 'inset(0% 0% 0% 0%)', zIndex: 0 });
      gsap.set(bigWrappersRef.current[current], { zIndex: 1 });

      gsap.set(smallWrappersRef.current[next], { clipPath: 'inset(0% 0% 0% 0%)', zIndex: 0 });
      gsap.set(smallWrappersRef.current[current], { zIndex: 1 });

      tl.to(smallWrappersRef.current[current], {
        clipPath: 'inset(0% 100% 0% 0%)',
        duration: slideDuration,
        ease: 'none',
      }, 0);

      tl.to(bigWrappersRef.current[current], {
        clipPath: 'inset(50% 0% 50% 0%)',
        duration: transitionDuration,
        ease: 'power3.inOut'
      }, slideDuration - transitionDuration);
    };

    const ctx = gsap.context(() => {
      runTimeline();
    });

    const handleScroll = () => {
      if (backgroundContainerRef.current) {
        const yPos = window.scrollY * 0.4;
        backgroundContainerRef.current.style.transform = `translateY(${yPos}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      ctx.revert();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className={styles.hero}>
      {/* Background Section */}
      <div className={styles.backgroundContainer} ref={backgroundContainerRef}>
        {bigImages.map((img, idx) => (
          <div
            key={`big-${idx}`}
            className={styles.bgWrapper}
            ref={(el) => { bigWrappersRef.current[idx] = el; }}
          >
            <Image
              src={img}
              alt={`Hero Background ${idx + 1}`}
              className={styles.bgImage}
              priority={idx === 0}
              quality={100}
              fill
              sizes="100vw"
            />
          </div>
        ))}
        <div className={styles.overlay} />
      </div>

      {/* Bottom Left Corner Icon */}
      <div className={styles.bottomLeftIcon}>
        <Image src={heroBottomLeft} alt="" width={50} height={50} />
      </div>

      {/* Top Header */}
      <header className={styles.header}>
        <h2 className={styles.leftHeader}>
          building dreams.
        </h2>
      </header>

      {/* Main Title / Logo */}
      <div className={styles.centerContent}>
        <img src={logo.src} alt="ARK.7 Logo" className={styles.heroLogo} />
      </div>

      {/* Footer / Controls */}
      <footer className={styles.footer}>
        <div className={styles.scroleBtn}>
          Scrolle
        </div>

        <div className={styles.miniVisualizer}>
          {smallImages.map((img, idx) => (
            <div
              key={`small-${idx}`}
              className={styles.smallBgWrapper}
              ref={(el) => { smallWrappersRef.current[idx] = el; }}
            >
              <Image
                src={img}
                alt={`Small Preview ${idx + 1}`}
                className={styles.smallBgImage}
                priority={idx === 0}
                fill
                sizes="240px"
              />
            </div>
          ))}
        </div>
      </footer>
    </section>
  );
}
