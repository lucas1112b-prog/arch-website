import { useEffect, useState } from 'react';
import Image from 'next/image';
import { TransitionLink } from '../PageTransition';
import TextReveal from '../TextReveal';
import teamImg from '../../assets/images/team (2).png';
import styles from './Footer.module.css';

export default function Footer() {
  const [time, setTime] = useState<string>('00 : 00 : 00');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      setTime(formatted.replace(/:/g, ' : '));
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className={styles.footer}>
      {/* Main Grid: Left Massive Title & Phone Badge | Right Eyebrow, Text & CTA Buttons */}
      <div className={styles.mainGrid}>
        {/* Left Column */}
        <div className={styles.leftCol}>
          <TextReveal as="h2" className={styles.headline} wordsOnly>
            CONTE-NOS<br />
            SEU PROJETO.
          </TextReveal>

          <a href="tel:+554830284440" className={styles.phoneBadge} aria-label="Telefone do estúdio">
            <div className={styles.phoneAvatar}>
              <Image
                src={teamImg}
                alt="ARK7 Team"
                width={34}
                height={34}
                className={styles.avatarImg}
              />
            </div>
            <TextReveal as="span" className={styles.phoneNumber} wordsOnly>
              +55 48 3028 4440
            </TextReveal>
          </a>
        </div>

        {/* Right Column */}
        <div className={styles.rightCol}>
          <TextReveal as="span" className={styles.bracketTag} wordsOnly>
            [ ENTRE EM CONTATO ]
          </TextReveal>

          <TextReveal as="p" className={styles.description} wordsOnly>
            Fique à vontade para entrar em contato e conversar sobre o seu projeto. Vamos torná-lo memorável.
          </TextReveal>

          <div className={styles.actionsRow}>
            <TransitionLink href="/contato" className={styles.actionBtn}>
              <span className={styles.ctaLabelMask}>
                <span className={styles.ctaLabelTrack}>
                  <span className={styles.ctaLabel}>INICIAR PROJETO</span>
                  <span className={styles.ctaLabel} aria-hidden="true">INICIAR PROJETO</span>
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

            <a
              href="https://wa.me/5548991247700?text=Ol%C3%A1%2C%20gostaria%20de%20conversar%20sobre%20um%20projeto."
              target="_blank"
              rel="noopener noreferrer"
              className={styles.actionBtn}
            >
              <span className={styles.ctaLabelMask}>
                <span className={styles.ctaLabelTrack}>
                  <span className={styles.ctaLabel}>AGENDAR REUNIÃO</span>
                  <span className={styles.ctaLabel} aria-hidden="true">AGENDAR REUNIÃO</span>
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

      {/* Bottom Continuous 1px Divider */}
      <div className={styles.bottomDivider} />

      {/* Bottom Metadata Bar */}
      <div className={styles.bottomBar}>
        <div className={styles.metaItem}>
          <TextReveal as="span" wordsOnly>25+ ESPECIALISTAS EM ARQ & DIGITAL</TextReveal>
        </div>

        <div className={styles.metaItem}>
          <TextReveal as="span" wordsOnly>SEDIADO EM FLORIANÓPOLIS</TextReveal>
        </div>

        <div className={styles.metaItemClock} aria-label="Horário de Brasília">
          <span className={styles.bracket}>[</span>
          <span className={styles.liveDot} aria-hidden="true" />
          <span className={styles.clockValue}>{time}</span>
          <span className={styles.bracket}>]</span>
        </div>

        <div className={styles.socialGroup}>
          <TextReveal as="span" className={styles.metaLabel} wordsOnly>SIGA-NOS</TextReveal>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            INSTAGRAM +
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            LINKEDIN +
          </a>
        </div>

        <div className={styles.langItem}>
          <span>BR 🇧🇷 PT</span>
        </div>
      </div>
    </footer>
  );
}
