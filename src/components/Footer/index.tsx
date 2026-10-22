'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import teamImg from '../../assets/images/team (2).png';
import projectImg from '../../assets/images/projects-section/reserva-da-pedra.png';
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
      {/* Main Grid: Left Massive Title & Phone Badge | Right Featured Project Card */}
      <div className={styles.mainGrid}>
        {/* Left Column */}
        <div className={styles.leftCol}>
          <h2 className={styles.headline}>
            BRIEF US<br />
            SOMETHING.
          </h2>

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
            <span className={styles.phoneNumber}>+55 48 3028 4440</span>
          </a>
        </div>

        {/* Right Column: Featured Project */}
        <div className={styles.rightCol}>
          <a href="#projects" className={styles.projectCard}>
            <div className={styles.projectImageWrapper}>
              <Image
                src={projectImg}
                alt="Club Reserva da Pedra"
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
                className={styles.projectImage}
              />
            </div>

            <div className={styles.projectInfoRow}>
              <h3 className={styles.projectName}>Club Reserva da Pedra</h3>

              <div className={styles.viewProjectBtn}>
                <span className={styles.ctaLabelMask}>
                  <span className={styles.ctaLabelTrack}>
                    <span className={styles.ctaLabel}>VER PROJETO</span>
                    <span className={styles.ctaLabel} aria-hidden="true">VER PROJETO</span>
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
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* Bottom Continuous 1px Divider */}
      <div className={styles.bottomDivider} />

      {/* Bottom Metadata Bar */}
      <div className={styles.bottomBar}>
        <div className={styles.metaItem}>
          <span>25+ DIGITAL & ARCH FREAKS</span>
        </div>

        <div className={styles.metaItem}>
          <span>FLORIANÓPOLIS BASED</span>
        </div>

        <div className={styles.metaItemClock} aria-label="Horário de Brasília">
          <span className={styles.bracket}>[</span>
          <span className={styles.liveDot} aria-hidden="true" />
          <span className={styles.clockValue}>{time}</span>
          <span className={styles.bracket}>]</span>
        </div>

        <div className={styles.socialGroup}>
          <span className={styles.metaLabel}>FOLLOW US</span>
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
