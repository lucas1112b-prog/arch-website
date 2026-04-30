import Image from 'next/image';
import styles from './Footer.module.css';
import cornerIcon from '../../assets/icons/icon-top-left-footer.svg';
import footerImg from '../../assets/images/projects-section/viva-palmas.png';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.leftSide}>
        <div className={styles.cornerIcon}>
          <Image src={cornerIcon} alt="" width={70} height={70} />
        </div>

        <div className={styles.navBox}>
          <div className={styles.navLinks}>
            <a href="#" className={styles.navLink}>Home</a>
            <span className={styles.separator}>|</span>
            <a href="#" className={styles.navLink}>Sobre</a>
            <span className={styles.separator}>|</span>
            <a href="#" className={styles.navLink}>Serviços</a>
            <span className={styles.separator}>|</span>
            <a href="#" className={styles.navLink}>Equipe</a>
            <span className={styles.separator}>|</span>
            <a href="#" className={styles.navLink}>Contato</a>
          </div>
        </div>

        <div className={styles.bottomContent}>
          <h2 className={styles.mainTitle}>
            VER PROJETO
            <svg className={styles.bigArrow} viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 37H64M64 37L37 10M64 37L37 64" stroke="currentColor" strokeWidth="5" strokeLinecap="square" />
            </svg>
          </h2>
        </div>
      </div>

      <div className={styles.rightSide}>
        <Image 
          src={footerImg} 
          alt="Building project" 
          className={styles.footerImage}
        />
      </div>
    </footer>
  );
}
