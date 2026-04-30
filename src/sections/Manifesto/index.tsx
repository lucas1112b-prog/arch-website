'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import SplitType from 'split-type';
import styles from './Manifesto.module.css';

gsap.registerPlugin(CustomEase);

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    CustomEase.create("osmo-ease", "0.625, 0.05, 0, 1");

    if (!textRef.current) return;

    let split: SplitType | null = null;
    let hasAnimated = false;

    document.fonts.ready.then(() => {
      split = new SplitType(textRef.current!, { types: 'lines,words' });
      gsap.set(split.lines, { overflow: 'hidden' });
      gsap.set(split.words, { yPercent: 110 });

      // Trigger animation if already in view (in case observer fired early)
      if (hasAnimated && split) {
        gsap.to(split.words, { yPercent: 0, duration: 0.8, stagger: 0.02, ease: "osmo-ease" });
      }
    });

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimated) {
        hasAnimated = true;
        if (split) {
          gsap.to(split.words, {
            yPercent: 0,
            duration: 0.8,
            stagger: 0.02,
            ease: "osmo-ease"
          });
        }
      }
    }, { threshold: 0.4 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      if (split) split.revert();
    };
  }, []);

  return (
    <section className={styles.manifestoSection} ref={sectionRef}>
      <div className={styles.label}>
        Manifesto
      </div>
      <div className={styles.textContainer}>
        <p className={styles.text} ref={textRef}>
          Desde 2014, transformamos visões em espaços de alta performance e eficiência. Somos um time experiente e premiado de arquitetos, unidos pela precisão técnica do BIM e pela busca pelo novo. Sem um estilo rígido, entregamos soluções sob medida para cada escala. Sob a liderança de nossos cinco sócios, a ARK7 desafia o comum para projetar ambientes que unem inovação, propósito e rigor técnico.
        </p>
      </div>
    </section>
  );
}
