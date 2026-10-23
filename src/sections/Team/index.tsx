import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Team.module.css';
import teamImg from '../../assets/images/team (2).png';
import arrowIcon from '../../assets/icons/arrow-team.svg';
import TextReveal from '../../components/TextReveal';

gsap.registerPlugin(ScrollTrigger);

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRevealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const revealColumns = imageRevealRef.current
      ? Array.from(imageRevealRef.current.querySelectorAll<HTMLElement>(`.${styles.imageRevealColumn}`))
      : [];
    let revealTween: gsap.core.Tween | null = null;

    if (revealColumns.length > 0) {
      gsap.set(revealColumns, {
        scaleY: 1,
        transformOrigin: 'bottom center',
      });

      revealTween = gsap.to(revealColumns, {
        scaleY: 0,
        duration: 0.9,
        stagger: 0.06,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: imageRevealRef.current,
          start: 'top 78%',
          once: true,
        },
      });
    }

    return () => {
      revealTween?.scrollTrigger?.kill();
      revealTween?.kill();
    };
  }, []);

  return (
    <section className={styles.teamSection} ref={sectionRef}>
      <div className={styles.topRow}>
        <TextReveal as="p" className={styles.description} wordsOnly>
          Rejeitamos o óbvio. Nossa essência está na colaboração e na busca pela máxima eficiência. Cultivamos um ambiente onde a precisão técnica e a liberdade criativa convergem para superar desafios complexos com inteligência.
        </TextReveal>
        <TextReveal as="h2" className={styles.title} wordsOnly>NOSSA CULTURA.</TextReveal>
      </div>

      <div className={styles.imageContainer}>
        <Image
          src={teamImg}
          alt="ARCH.9 Team"
          className={styles.teamImage}
          placeholder="blur"
        />
        <div className={styles.imageReveal} ref={imageRevealRef} aria-hidden="true">
          {Array.from({ length: 12 }, (_, index) => (
            <span className={styles.imageRevealColumn} key={index} />
          ))}
        </div>
        <Image src={arrowIcon} alt="arrow" className={styles.arrowIcon} />
      </div>
    </section>
  );
}

