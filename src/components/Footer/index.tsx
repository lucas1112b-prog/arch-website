'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { TransitionLink } from '../PageTransition';
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
      {/* Top Right Action Pills */}
      <div className={styles.topActionsRow}>
        <div className={styles.topPillsGroup}>
          <a href="#about" className={styles.topPill}>
            <span>THIS IS US</span>
            <span className={styles.pillPlus}>( + )</span>
          </a>
          <TransitionLink href="/contato" className={styles.topPill}>
            <span>PITCHDECK</span>
            <span className={styles.pillPlus}>( + )</span>
          </TransitionLink>
          <a href="#about" className={styles.topPill}>
            <span>OUR AWWWARDS TALK</span>
            <span className={styles.pillPlus}>( + )</span>
          </a>
        </div>
      </div>

      {/* Main Grid: Left Massive Title & Phone Badge | Right Eyebrow, Text & CTA Buttons */}
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

        {/* Right Column */}
        <div className={styles.rightCol}>
          <div className={styles.bracketTag}>
            <span>[ GET IN TOUCH ]</span>
          </div>

          <p className={styles.description}>
            Feel free to reach out and discuss your project. We'll make it sharper.
          </p>

          <div className={styles.actionsRow}>
            <TransitionLink href="/contato" className={styles.actionBtn}>
              <span>START A PROJECT</span>
              <span className={styles.actionArrow} aria-hidden="true">↗</span>
            </TransitionLink>

            <a
              href="https://wa.me/5548991247700?text=Ol%C3%A1%2C%20gostaria%20de%20conversar%20sobre%20um%20projeto."
              target="_blank"
              rel="noopener noreferrer"
              className={styles.actionBtn}
            >
              <span>SCHEDULE A CALL</span>
              <span className={styles.actionArrow} aria-hidden="true">↗</span>
            </a>
          </div>
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
