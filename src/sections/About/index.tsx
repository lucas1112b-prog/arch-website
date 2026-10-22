'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import styles from './About.module.css';
import TextReveal from '../../components/TextReveal';
import imgAboutOne from '../../assets/images/images-big-hero/image-hero-01-big.png';
import imgAboutTwo from '../../assets/images/images-big-hero/image-hero-02-big.png';
import imgAboutThree from '../../assets/images/images-big-hero/image-hero-03-big.png';

gsap.registerPlugin(ScrollTrigger);

const aboutSlides = [
  {
    title: 'Abordagem Singular',
    image: imgAboutOne,
    alt: 'Arquitetura integrada à paisagem',
    text: 'Não acreditamos em soluções genéricas. Nosso sucesso nasce de entender os desafios únicos de cada cliente, identificando a melhor abordagem para entregar projetos técnicos e personalizados sob medida.',
  },
  {
    title: 'Sensibilidade & Precisão',
    image: imgAboutTwo,
    alt: 'Espaço contemporâneo com luz natural',
    text: 'Cada projeto nasce da leitura precisa do lugar, do programa e das pessoas que irão ocupá-lo, transformando necessidades complexas em decisões claras.',
  },
  {
    title: 'Espaços para a Vida',
    image: imgAboutThree,
    alt: 'Arquitetura conectada à vida',
    text: 'Criamos espaços duradouros, sensíveis e vivos, onde matéria, luz e uso se encontram para construir experiências que permanecem.',
  },
];


export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const firstDivider = sectionRef.current.querySelector<HTMLElement>(`.${styles.divider}`);
    let firstDividerObserver: IntersectionObserver | null = null;

    if (firstDivider) {
      gsap.set(firstDivider, { y: 20, opacity: 0, filter: 'blur(10px)' });
      firstDividerObserver = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;

        gsap.to(firstDivider, {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.6,
          delay: 0.25,
          ease: 'power2.out',
        });
        firstDividerObserver?.disconnect();
      }, { threshold: 0.4 });
      firstDividerObserver.observe(firstDivider);
    }

    const mm = gsap.matchMedia();

    mm.add('(min-width: 769px)', () => {
      const slides = slideRefs.current.filter((slide): slide is HTMLElement => Boolean(slide));
      const splits: { element: HTMLElement; split: SplitType }[] = [];

      slides.forEach((slide, index) => {
        const title = slide.querySelector<HTMLElement>(`.${styles.title}`);
        const description = slide.querySelector<HTMLElement>(`.${styles.description}`);
        const counter = slide.querySelector<HTMLElement>(`.${styles.counter}`);
        const divider = slide.querySelector<HTMLElement>(`.${styles.divider}`);
        const image = slide.querySelector<HTMLElement>(`.${styles.image}`);
        const imageParallax = slide.querySelector<HTMLElement>(`.${styles.imageParallax}`);

        if (index > 0 && title) {
          const splitTitle = new SplitType(title, { types: 'words' });
          gsap.set(splitTitle.words, { y: 20, opacity: 0, filter: 'blur(10px)' });
          splits.push({ element: title, split: splitTitle });
        }

        if (index > 0 && description) {
          const splitDesc = new SplitType(description, { types: 'words' });
          gsap.set(splitDesc.words, { y: 20, opacity: 0, filter: 'blur(10px)' });
          splits.push({ element: description, split: splitDesc });
        }

        if (index > 0 && counter) {
          gsap.set(counter, { y: 20, opacity: 0, filter: 'blur(10px)' });
        }

        if (index > 0 && divider) {
          gsap.set(divider, { y: 20, opacity: 0, filter: 'blur(10px)' });
        }

        gsap.set(slide, { autoAlpha: index === 0 ? 1 : 0, zIndex: index === 0 ? 1 : 0 });
        if (image) {
          gsap.set(image, { yPercent: index === 0 ? 0 : 100, scale: 1.08 });
        }
        if (imageParallax) {
          gsap.set(imageParallax, { yPercent: 0 });
        }
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${(aboutSlides.length - 1) * window.innerHeight}`,
          pin: containerRef.current,
          scrub: 1.4,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              gsap.set(progressBarRef.current, { scaleX: self.progress });
            }
          },
        },
      });

      const firstImageParallax = slides[0]?.querySelector<HTMLElement>(`.${styles.imageParallax}`);
      if (firstImageParallax) {
        timeline.to(
          firstImageParallax,
          { yPercent: -12, duration: 1, ease: 'none' },
          0
        );
      }

      const animateTextIn = (slide: HTMLElement, position: number) => {
        const title = slide.querySelector<HTMLElement>(`.${styles.title}`);
        const description = slide.querySelector<HTMLElement>(`.${styles.description}`);
        const counter = slide.querySelector<HTMLElement>(`.${styles.counter}`);
        const divider = slide.querySelector<HTMLElement>(`.${styles.divider}`);
        const splitTitleEntry = splits.find((item) => item.element === title);
        const splitTitle = splitTitleEntry?.split;
        const splitDescEntry = splits.find((item) => item.element === description);
        const splitDesc = splitDescEntry?.split;

        if (counter) {
          timeline.to(
            counter,
            {
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 0.8,
              ease: 'power2.out',
            },
            position
          );
        }

        if (splitTitle) {
          timeline.to(
            splitTitle.words,
            {
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 0.8,
              stagger: 0.03,
              ease: 'power2.out',
            },
            position + 0.03
          );
        } else if (title) {
          timeline.to(
            title,
            {
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 0.8,
              ease: 'power2.out',
            },
            position + 0.03
          );
        }

        if (splitDesc) {
          timeline.to(
            splitDesc.words,
            {
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 0.8,
              stagger: 0.03,
              ease: 'power2.out',
            },
            position + 0.06
          );
        }

        if (divider) {
          timeline.to(
            divider,
            {
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 0.6,
              ease: 'power2.out',
            },
            position + 0.12
          );
        }
      };

      const animateTextOut = (slide: HTMLElement, position: number) => {
        const title = slide.querySelector<HTMLElement>(`.${styles.title}`);
        const description = slide.querySelector<HTMLElement>(`.${styles.description}`);
        const counter = slide.querySelector<HTMLElement>(`.${styles.counter}`);
        const divider = slide.querySelector<HTMLElement>(`.${styles.divider}`);
        const content = slide.querySelector<HTMLElement>(`.${styles.rightContent}`);
        const splitTitleEntry = splits.find((item) => item.element === title);
        const splitTitle = splitTitleEntry?.split;
        const titleWords = splitTitle?.words ?? (title ? Array.from(title.querySelectorAll<HTMLElement>('.word')) : []);
        const splitDescEntry = splits.find((item) => item.element === description);
        const splitDesc = splitDescEntry?.split;
        const descWords = splitDesc?.words ?? (description ? Array.from(description.querySelectorAll<HTMLElement>('.word')) : []);

        if (counter) {
          timeline.to(
            counter,
            {
              y: -20,
              opacity: 0,
              filter: 'blur(10px)',
              duration: 0.6,
              ease: 'power2.in',
            },
            position
          );
        }

        if (titleWords.length > 0) {
          timeline.to(
            titleWords,
            {
              y: -20,
              opacity: 0,
              filter: 'blur(10px)',
              duration: 0.6,
              stagger: 0.03,
              ease: 'power2.in',
            },
            position + 0.01
          );
        } else if (title) {
          timeline.to(
            title,
            {
              y: -20,
              opacity: 0,
              filter: 'blur(10px)',
              duration: 0.6,
              ease: 'power2.in',
            },
            position + 0.01
          );
        }

        if (descWords.length > 0) {
          timeline.to(
            descWords,
            {
              y: -20,
              opacity: 0,
              filter: 'blur(10px)',
              duration: 0.6,
              stagger: 0.03,
              ease: 'power2.in',
            },
            position + 0.02
          );
        }

        if (content) {
          timeline.to(
            content,
            {
              y: -40,
              opacity: 0,
              filter: 'blur(10px)',
              duration: 0.75,
              ease: 'power2.in',
            },
            position
          );
        }
        if (divider) {
          timeline.to(
            divider,
            {
              y: -20,
              opacity: 0,
              filter: 'blur(10px)',
              duration: 0.6,
              ease: 'power2.in',
            },
            position + 0.08
          );
        }
      };

      slides.slice(1).forEach((slide, index) => {
        const previousSlide = slides[index];
        const position = index + 1;
        const currentImage = slide.querySelector<HTMLElement>(`.${styles.image}`);
        const currentImageParallax = slide.querySelector<HTMLElement>(`.${styles.imageParallax}`);


        timeline.set(slide, { autoAlpha: 1, zIndex: index + 2 }, position);
        if (currentImage) {
          timeline.fromTo(
            currentImage,
            { yPercent: 100, scale: 1.08 },
            { yPercent: 0, scale: 1.08, duration: 1.15, ease: 'power2.out' },
            position
          );
        }

        if (currentImageParallax) {
          timeline.to(
            currentImageParallax,
            { yPercent: -12, duration: 1, ease: 'none' },
            position + 0.15
          );
        }
        animateTextIn(slide, position + 0.12);
        animateTextOut(previousSlide, position);

      });
      return () => {
        splits.forEach(({ split }) => split.revert());
      };
    });

    return () => {
      firstDividerObserver?.disconnect();
      mm.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.aboutSection}>
      <div className={styles.container} ref={containerRef}>
        <div ref={progressBarRef} className={styles.progressBar} aria-hidden="true" />
        <div className={styles.slides}>
          {aboutSlides.map((slide, index) => (
            <article
              key={slide.alt}
              ref={(element) => {
                slideRefs.current[index] = element;
              }}
              className={styles.slide}
            >
              <div className={styles.leftContainer}>
                <div className={styles.leftContent}>
                  <div className={styles.imageWrapper}>
                    <div className={styles.imageParallax}>
                      <Image
                        src={slide.image}
                        alt={slide.alt}
                        fill
                        className={styles.image}
                      />
                    </div>
                    <button className={styles.playBtn} aria-label="Reproduzir vídeo">
                      <span className={styles.playIcon}></span>
                    </button>
                  </div>
                </div>
              </div>

              <div className={styles.rightContainer}>
                <div className={styles.rightContent}>
                  <span className={styles.counter}>{index + 1}/{aboutSlides.length}</span>
                  {index === 0 ? (
                    <TextReveal as="h2" className={styles.title} wordsOnly>
                      {slide.title}
                    </TextReveal>
                  ) : (
                    <h2 className={styles.title}>{slide.title}</h2>
                  )}
                  {index === 0 ? (
                    <TextReveal as="p" className={styles.description} wordsOnly>
                      {slide.text}
                    </TextReveal>
                  ) : (
                    <p className={styles.description}>{slide.text}</p>
                  )}
                  <div className={styles.divider}></div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}