'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './About.module.css';
import demoImg from '../../assets/images/images-big-hero/image-hero-01-big.png';
import bgIcon from '../../assets/icons/bg-icon-about.svg';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !rightContentRef.current) return;

    let mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const pinTrigger = ScrollTrigger.create({
        trigger: rightContentRef.current,
        start: 'top 30%',
        endTrigger: containerRef.current,
        end: 'bottom bottom',
        pin: true,
        pinSpacing: false,
      });

      // Parallax for background icon
      if (iconRef.current) {
        gsap.to(iconRef.current, {
          y: 150,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section className={styles.aboutSection}>
      <div className={styles.bgIcon} ref={iconRef}>
        <Image src={bgIcon} alt="" fill style={{ objectFit: 'contain' }} />
      </div>
      <div className={styles.container} ref={containerRef}>
        <div className={styles.leftContent}>
          <div className={styles.imageWrapper}>
            <Image
              src={demoImg}
              alt="About Us Video Placeholder"
              fill
              className={styles.image}
            />
            <button className={styles.playBtn}>
              <span className={styles.playIcon}></span>
            </button>
          </div>
        </div>

        <div className={styles.rightContent} ref={rightContentRef}>
          <p className={styles.description}>
            Não acreditamos em soluções genéricas. Nosso sucesso nasce de entender os desafios únicos de cada cliente, identificando a melhor abordagem para entregar projetos técnicos e personalizados sob medida.
          </p>
          <div className={styles.linkBox}>
            <div className={styles.divider}></div>
            <a href="#" className={styles.link}>NOSSO TRABALHO</a>
          </div>
        </div>
      </div>
    </section>
  );
}
