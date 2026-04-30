'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import styles from './Menu.module.css';
import { TransitionLink } from '../PageTransition';


export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
      <div className={styles.menuContainer}>
        <div className={styles.rightControls}>
          <button className={styles.menuBtn} onClick={toggleMenu}>
            {isOpen ? 'FECHAR' : 'MENU'}
          </button>
          
          <div className={styles.langSelector}>
            <button className={styles.langBtn}>PT</button>
            <div className={styles.langOptions}>
              <button className={styles.langOption}>EN</button>
              <button className={styles.langOption}>ES</button>
            </div>
          </div>
        </div>

        <div className={styles.dropdown} ref={dropdownRef}>
          <div className={styles.dropdownList}>
            <TransitionLink href="/" className={styles.dropdownItem} onClick={() => setIsOpen(false)}>Home</TransitionLink>
            <TransitionLink href="#" className={styles.dropdownItem} onClick={() => setIsOpen(false)}>Projetos</TransitionLink>
            <TransitionLink href="#" className={styles.dropdownItem} onClick={() => setIsOpen(false)}>Sobre Nós</TransitionLink>
            <TransitionLink href="/contato" className={styles.dropdownItem} onClick={() => setIsOpen(false)}>Contato</TransitionLink>
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
