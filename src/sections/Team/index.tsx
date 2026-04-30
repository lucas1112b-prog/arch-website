import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Team.module.css';
import teamImg from '../../assets/images/team (2).png';
import arrowIcon from '../../assets/icons/arrow-team.svg';

gsap.registerPlugin(ScrollTrigger);

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    let mm = gsap.matchMedia();

    // Mobile logic
    mm.add("(max-width: 768px)", () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        pin: true,
        pinSpacing: false,
      });

      gsap.to(sectionRef.current, {
        filter: "blur(15px)",
        scale: 0.95,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%",
          scrub: true,
        }
      });
    });

    // Desktop logic
    mm.add("(min-width: 769px)", () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "bottom bottom",
        pin: true,
        pinSpacing: false,
      });

      gsap.to(sectionRef.current, {
        filter: "blur(15px)",
        scale: 0.95,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom bottom",
          end: "+=100%",
          scrub: true,
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section className={styles.teamSection} ref={sectionRef}>
      <div className={styles.topRow}>
        <p className={styles.description}>
          Rejeitamos o óbvio. Nossa essência está na colaboração e na busca pela máxima eficiência. Cultivamos um ambiente onde a precisão técnica e a liberdade criativa convergem para superar desafios complexos com inteligência.
        </p>
        <h2 className={styles.title}>NOSSA CULTURA.</h2>
      </div>

      <div className={styles.imageContainer}>
        <Image
          src={teamImg}
          alt="ARK7 Team"
          className={styles.teamImage}
          placeholder="blur"
        />
        <Image src={arrowIcon} alt="arrow" className={styles.arrowIcon} />
      </div>
    </section>
  );
}

