'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Projects.module.css';

// Project Images
import imgReserva from '../../assets/images/projects-section/reserva-da-pedra.png';
import imgViva from '../../assets/images/projects-section/viva-palmas.png';
import imgCosta from '../../assets/images/projects-section/costa-azul.png';
import imgMeridiem from '../../assets/images/projects-section/meridiem.png';
import imgMobem from '../../assets/images/projects-section/mobem.png';
import cornerIcon from '../../assets/icons/corner-triangle.svg';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: 'Club Reserva da Pedra', image: imgReserva },
  { title: 'Vivá Palmas do Arvoredo', image: imgViva },
  { title: 'Costa Azul Clube', image: imgCosta },
  { title: 'Meridiem', image: imgMeridiem },
  { title: 'Mobem Alves de Brito', image: imgMobem },
];

export default function Projects() {
  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add("(max-width: 768px)", () => {
      const items = document.querySelectorAll(`.${styles.projectItem}`);
      items.forEach((item) => {
        const imgWrapper = item.querySelector(`.${styles.imagePreviewWrapper}`);
        if (!imgWrapper) return;

        gsap.fromTo(imgWrapper, 
          { autoAlpha: 0, scale: 0.8 },
          { 
            autoAlpha: 1, 
            scale: 1,
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            }
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section className={styles.projectsSection}>
      <div className={styles.cornerIcon}>
        <Image src={cornerIcon} alt="" width={50} height={50} />
      </div>
      <header className={styles.header}>
        <div className={styles.label}>Nossos Projetos</div>
        <button className={styles.viewAllBtn}>Ver Todos</button>
      </header>

      <div className={styles.projectsList}>
        {projects.map((project, idx) => (
          <div key={idx} className={styles.projectItem}>
            <h3 className={styles.projectTitle}>{project.title}</h3>
            <div className={styles.imagePreviewWrapper}>
              <Image
                src={project.image}
                alt={project.title}
                className={styles.imagePreview}
                priority={idx === 0}
                quality={90}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
