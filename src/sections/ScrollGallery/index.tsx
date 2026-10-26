'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ScrollGallery.module.css';
import { WHATSAPP_URL } from '../../constants/contact';
import TextReveal from '../../components/TextReveal';

import imageOne from '../../assets/images/images-big-hero/image-hero-04-big.png';
import imageTwo from '../../assets/images/images-big-hero/image-hero-02-big.png';
import imageThree from '../../assets/images/projects-section/costa-azul.png';
import imageFour from '../../assets/images/projects-section/meridiem.png';
import imageFive from '../../assets/images/images-big-hero/image-hero-03-big.png';
import imageSix from '../../assets/images/projects-section/reserva-da-pedra.png';
import imageSeven from '../../assets/images/projects-section/viva-palmas.png';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const topFadeRef = useRef<HTMLDivElement>(null);
  const bottomFadeRef = useRef<HTMLDivElement>(null);

  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);
  const col4Ref = useRef<HTMLDivElement>(null);
  const col5Ref = useRef<HTMLDivElement>(null);
  const col6Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 0px)', () => {
      const endDistance = () => `+=${2.2 * window.innerHeight}`;

      // Pin container exactly like About
      const pinTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: endDistance,
        pin: containerRef.current,
        anticipatePin: 1,
      });

      // Background color and both top/bottom fade gradients transition smoothly from #121212 to #000000
      const fadeState = { val: 18 };
      const bgTween = gsap.to(fadeState, {
        val: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: endDistance,
          scrub: 1,
        },
        onUpdate: () => {
          const v = Math.round(fadeState.val);
          const colorHex = `#${v.toString(16).padStart(2, '0')}${v.toString(16).padStart(2, '0')}${v.toString(16).padStart(2, '0')}`;
          if (sectionRef.current) {
            sectionRef.current.style.backgroundColor = colorHex;
          }
          if (containerRef.current) {
            containerRef.current.style.backgroundColor = colorHex;
          }
          if (topFadeRef.current) {
            topFadeRef.current.style.background = `linear-gradient(to bottom, rgb(${v}, ${v}, ${v}) 0%, rgba(${v}, ${v}, ${v}, 0.85) 35%, rgba(${v}, ${v}, ${v}, 0.4) 70%, transparent 100%)`;
          }
          if (bottomFadeRef.current) {
            bottomFadeRef.current.style.background = `linear-gradient(to top, rgb(${v}, ${v}, ${v}) 0%, rgba(${v}, ${v}, ${v}, 0.85) 35%, rgba(${v}, ${v}, ${v}, 0.4) 70%, transparent 100%)`;
          }
        },
      });

      // Exactly 1 image per column across all tracks with distinct scrub speeds and heights
      const columns = [
        { ref: col1Ref.current, startY: '110vh', endY: '-135vh', scrub: 0.6 },
        { ref: col2Ref.current, startY: '145vh', endY: '-110vh', scrub: 1.5 },
        { ref: col3Ref.current, startY: '180vh', endY: '-85vh', scrub: 2.0 },
        { ref: col4Ref.current, startY: '155vh', endY: '-115vh', scrub: 1.1 },
        { ref: col5Ref.current, startY: '125vh', endY: '-145vh', scrub: 0.9 },
        { ref: col6Ref.current, startY: '170vh', endY: '-90vh', scrub: 2.6 },
      ];

      const columnTweens: gsap.core.Tween[] = [];

      columns.forEach(({ ref, startY, endY, scrub }) => {
        if (!ref) return;
        const tween = gsap.fromTo(
          ref,
          { y: startY },
          {
            y: endY,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: endDistance,
              scrub,
            },
          }
        );
        columnTweens.push(tween);
      });

      return () => {
        pinTrigger.kill();
        bgTween.scrollTrigger?.kill();
        bgTween.kill();
        columnTweens.forEach((tween) => {
          tween.scrollTrigger?.kill();
          tween.kill();
        });
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.scrollGallerySection}>
      <div ref={containerRef} className={styles.container}>
        {/* Soft top gradient fade: smoothly transitions from #121212 to #000 */}
        <div ref={topFadeRef} className={styles.topFade} aria-hidden="true" />

        {/* Soft bottom gradient fade: smoothly transitions from #121212 to #000 */}
        <div ref={bottomFadeRef} className={styles.bottomFade} aria-hidden="true" />

        {/* Full-height vertical dividing lines */}
        <div className={styles.gridLines} aria-hidden="true">
          <div className={styles.gridCol} />
          <div className={styles.gridCol} />
          <div className={styles.gridCol} />
          <div className={styles.gridCol} />
          <div className={styles.gridCol} />
          <div className={styles.gridCol} />
        </div>

        {/* Columns of rising images - 1 image per column across tracks */}
        <div className={styles.columnsContainer}>
          {/* Column 1 (Track 1) */}
          <div className={`${styles.column} ${styles.col1}`} ref={col1Ref}>
            <div className={styles.card}>
              <Image src={imageOne} alt="ARCH.9 Projeto 01" fill sizes="(max-width: 768px) 33vw, 16vw" />
            </div>
          </div>

          {/* Column 2 (Track 2) */}
          <div className={`${styles.column} ${styles.col2}`} ref={col2Ref}>
            <div className={styles.card}>
              <Image src={imageTwo} alt="ARCH.9 Projeto 02" fill sizes="16vw" />
            </div>
          </div>

          {/* Column 3 (Track 3) */}
          <div className={`${styles.column} ${styles.col3}`} ref={col3Ref}>
            <div className={styles.card}>
              <Image src={imageThree} alt="ARCH.9 Projeto 03" fill sizes="16vw" />
            </div>
          </div>

          {/* Column 4 (Track 4) */}
          <div className={`${styles.column} ${styles.col4}`} ref={col4Ref}>
            <div className={`${styles.card} ${styles.cardWide}`}>
              <Image src={imageFour} alt="ARCH.9 Projeto 04" fill sizes="16vw" />
            </div>
          </div>

          {/* Column 5 (Track 5) */}
          <div className={`${styles.column} ${styles.col5}`} ref={col5Ref}>
            <div className={styles.card}>
              <Image src={imageFive} alt="ARCH.9 Projeto 05" fill sizes="(max-width: 768px) 33vw, 16vw" />
            </div>
          </div>

          {/* Column 6 (Track 6) */}
          <div className={`${styles.column} ${styles.col6}`} ref={col6Ref}>
            <div className={styles.card}>
              <Image src={imageSeven} alt="ARCH.9 Projeto 06" fill sizes="(max-width: 768px) 33vw, 16vw" />
            </div>
          </div>
        </div>

        {/* Center Typography & Badge */}
        <div className={styles.centerContent}>
          <TextReveal as="span" className={styles.eyebrow} wordsOnly>
            PRÓXIMO CAPÍTULO
          </TextReveal>
          <div className={styles.titleWrapper}>
            <TextReveal as="h2" className={styles.title} wordsOnly>
              Vamos fazer<br />acontecer.
            </TextReveal>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cta}
            >
              <span className={styles.ctaLabelMask}>
                <span className={styles.ctaLabelTrack}>
                  <span className={styles.ctaLabel}>FAZER ACONTECER</span>
                  <span className={styles.ctaLabel} aria-hidden="true">FAZER ACONTECER</span>
                </span>
              </span>
              <span className={styles.ctaArrowBox} aria-hidden="true">
                <svg
                  className={styles.ctaArrowIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19M19 12L13 6M19 12L13 18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}