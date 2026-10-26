'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { WHATSAPP_URL } from '../../constants/contact';
import TextReveal from '../../components/TextReveal';
import styles from './Manifesto.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const dividerLineRef = useRef<HTMLDivElement>(null);
  const crosshairRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = textRef.current;
    const divider = dividerLineRef.current;
    const crosshair = crosshairRef.current;

    let split: SplitType | null = null;
    let textTween: gsap.core.Tween | null = null;

    if (element) {
      split = new SplitType(element, { types: 'words,chars' });
      const chars = (split.chars ?? []).filter((char) => !char.closest(`.${styles.introHighlight}`));

      textTween = gsap.fromTo(
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
    }

    const dividerTween = divider
      ? gsap.fromTo(
          divider,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: divider,
              start: 'top 88%',
              end: 'top 52%',
              scrub: 1,
            },
          }
        )
      : null;

    const crosshairTween = crosshair
      ? gsap.fromTo(
          crosshair,
          { autoAlpha: 0, scale: 0.6 },
          {
            autoAlpha: 1,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: divider,
              start: 'top 72%',
              end: 'top 55%',
              scrub: 1,
            },
          }
        )
      : null;

    return () => {
      textTween?.scrollTrigger?.kill();
      textTween?.kill();
      dividerTween?.scrollTrigger?.kill();
      dividerTween?.kill();
      crosshairTween?.scrollTrigger?.kill();
      crosshairTween?.kill();
      split?.revert();
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
            <div className={styles.dividerTrack}>
              <div ref={dividerLineRef} className={styles.dividerLine} />
            </div>
            <div className={styles.crosshairTrack}>
              <span ref={crosshairRef} className={styles.crosshair} aria-hidden="true">+</span>
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
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cta}
              >
                <span className={styles.ctaLabelMask}>
                  <span className={styles.ctaLabelTrack}>
                    <span className={styles.ctaLabel}>Fale com a ARCH.9</span>
                    <span className={styles.ctaLabel} aria-hidden="true">Fale com a ARCH.9</span>
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
      </div>
    </section>
  );
}
