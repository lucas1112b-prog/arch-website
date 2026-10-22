'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { TransitionLink } from '../../components/PageTransition';
import TextReveal from '../../components/TextReveal';
import styles from './Manifesto.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const split = new SplitType(element, { types: 'words,chars' });
    const chars = (split.chars ?? []).filter((char) => !char.closest(`.${styles.introHighlight}`));

    const tween = gsap.fromTo(
      chars,
      { color: 'rgba(255, 255, 255, 0.18)' },
      {
        color: 'rgba(255, 255, 255, 0.82)',
        stagger: 0.035,
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom center',
          scrub: 1,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      split.revert();
    };
  }, []);

  return (
    <section className={styles.manifestoSection}>
      <div className={styles.container}>
        {/* Left column: Eyebrow label */}
        <div className={styles.eyebrowCol}>
          <TextReveal as="span" className={styles.eyebrow}>
            SOBRE
          </TextReveal>
        </div>

        {/* Right column: Main content (headline, divider, bottom row) */}
        <div className={styles.mainContentCol}>
          <div className={styles.headlineWrapper}>
            <p ref={textRef} className={styles.text}>
              Desde <span className={styles.introHighlight}>2024</span>, moldamos visões arrojadas em arquiteturas de alta{' '}
              <span className={styles.wordHighlight}>performance</span>. Criamos espaços vivos e{' '}
              <span className={styles.wordHighlight}>precisos</span>, capazes de{' '}
              <span className={styles.wordHighlight}>transformar</span> realidades.
            </p>
          </div>

          <div className={styles.dividerRow}>
            <div className={styles.dividerLine}>
              <div className={styles.crosshairTrack}>
                <span className={styles.crosshair} aria-hidden="true">+</span>
              </div>
            </div>
          </div>

          <div className={styles.bottomRow}>
            <div className={styles.bottomLeftCol}>
              <p className={styles.supportingText}>
                PROJETAMOS PARA A LONGEVIDADE<br />
                CLAREZA PRIMEIRO, EXECUÇÃO SEMPRE,<br />
                ESCALÁVEL.
              </p>
            </div>

            <div className={styles.bottomRightCol}>
              <p className={styles.missionText}>
                Entre a matéria e o tempo, criamos espaços que permanecem — vivos, precisos e feitos para durar.
              </p>
              <TransitionLink href="/contato" className={styles.cta}>
                <span className={styles.ctaLabelMask}>
                  <span className={styles.ctaLabelTrack}>
                    <span className={styles.ctaLabel}>Fale com a ARK7</span>
                    <span className={styles.ctaLabel} aria-hidden="true">Fale com a ARK7</span>
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
              </TransitionLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
