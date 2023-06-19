import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <span className={styles.year}>&copy; {date} IT-events</span>
      <ul className={styles.footerList}>
        <li className={styles.footerItem}>
          <Link to="/about" className={styles.logoLink}>
            <span>О нас</span>
          </Link>
        </li>
        <li className={styles.footerItem}>
          <span>Политика конфиденциональности</span>
        </li>
        <li className={styles.footerItem}>
          <span>Cookies</span>
        </li>
      </ul>
      <div></div>
    </footer>
  );
};

export default Footer;
