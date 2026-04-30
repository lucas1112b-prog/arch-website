'use client';

import styles from "./page.module.css";
import HomePreloader from '../components/HomePreloader';
import Hero from '../sections/Hero';
import Manifesto from '../sections/Manifesto';
import About from '../sections/About';
import Team from '../sections/Team';
import Projects from '../sections/Projects';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className={styles.container}>
      <HomePreloader />
      <Hero />
      <Manifesto />
      <About />
      <Projects />
      <Team />
      <Footer />
    </div>
  );
}
