'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import styles from './Menu.module.css';
import { TransitionLink } from '../PageTransition';
import { WHATSAPP_URL } from '../../constants/contact';


export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
useEffect(() => {
    // Initial setup
    gsap.set(dropdownRef.current, { autoAlpha: 0, filter: 'blur(8px)' });
    gsap.set(overlayRef.current, { autoAlpha: 0 });
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Show Dropdown
      gsap.to(dropdownRef.current, {
        autoAlpha: 1,
        filter: 'blur(0px)',
        duration: 0.4,
        ease: 'power3.out'
      });
      // Show Overlay
      gsap.to(overlayRef.current, {
        autoAlpha: 1,
        duration: 0.4,
        ease: 'power3.out'
      });
    } else {
      // Hide Dropdown
      gsap.to(dropdownRef.current, {
        autoAlpha: 0,
        filter: 'blur(8px)',
        duration: 0.3,
        ease: 'power2.in'
      });
      // Hide Overlay
      gsap.to(overlayRef.current, {
        autoAlpha: 0,
        duration: 0.3,
        ease: 'power2.in'
      });
    }
  }, [isOpen]);

  return (
    <>
      <div 
        className={styles.overlay} 
        ref={overlayRef} 
        onClick={() => setIsOpen(false)} 
      />
      <div className={`${styles.socialMarquee} ${hasScrolled ? styles.socialMarqueeVisible : ''}`}>
        <div className={styles.socialMarqueeTrack}>
          <div className={styles.socialMarqueeContent}>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className={styles.socialMarqueeLink}>Instagram</a>
            <span className={styles.socialMarqueeDot}>·</span>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className={styles.socialMarqueeLink}>LinkedIn</a>
            <span className={styles.socialMarqueeDot}>·</span>
            <a href="https://linktr.ee" target="_blank" rel="noreferrer" className={styles.socialMarqueeLink}>Linktree</a>
            <span className={styles.socialMarqueeDot}>·</span>
          </div>
          <div className={styles.socialMarqueeContent} aria-hidden="true">
            <a href="https://instagram.com" tabIndex={-1} className={styles.socialMarqueeLink}>Instagram</a>
            <span className={styles.socialMarqueeDot}>·</span>
            <a href="https://linkedin.com" tabIndex={-1} className={styles.socialMarqueeLink}>LinkedIn</a>
            <span className={styles.socialMarqueeDot}>·</span>
            <a href="https://linktr.ee" tabIndex={-1} className={styles.socialMarqueeLink}>Linktree</a>
            <span className={styles.socialMarqueeDot}>·</span>
          </div>
        </div>
      </div>
      <div className={styles.menuContainer}>
        <div className={styles.rightControls}>
          <button className={styles.menuBtn} onClick={toggleMenu}>
            {isOpen ? 'FECHAR' : 'MENU'}
          </button>
        </div>

        <div className={styles.dropdown} ref={dropdownRef}>
          <div className={styles.dropdownList}>
            <TransitionLink href="/" className={styles.dropdownItem} onClick={() => setIsOpen(false)}>Home</TransitionLink>
            <TransitionLink href="#" className={styles.dropdownItem} onClick={() => setIsOpen(false)}>Projetos</TransitionLink>
            <TransitionLink href="#" className={styles.dropdownItem} onClick={() => setIsOpen(false)}>Sobre Nós</TransitionLink>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={styles.dropdownItem} onClick={() => setIsOpen(false)}>Contato</a>
          </div>
          <div className={styles.marqueeContainer}>
            <div className={styles.marqueeContent}>
              <span className={styles.marqueeItem}>instagram</span>
              <span className={styles.marqueeItem}>linkedin</span>
              <span className={styles.marqueeItem}>email</span>
              {/* Duplicated for infinite loop */}
              <span className={styles.marqueeItem}>instagram</span>
              <span className={styles.marqueeItem}>linkedin</span>
              <span className={styles.marqueeItem}>email</span>
              <span className={styles.marqueeItem}>instagram</span>
              <span className={styles.marqueeItem}>linkedin</span>
              <span className={styles.marqueeItem}>email</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
