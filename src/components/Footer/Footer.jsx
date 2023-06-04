import styles from './Footer.module.css';

const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <span className={styles.year}>&copy; {date} IT-events</span>
      <ul className={styles.footerList}>
        <li className={styles.footerItem}>О нас&emsp;&bull;</li>
        <li className={styles.footerItem}>
          Политика конфиденциональности&emsp;&bull;
        </li>
        <li className={styles.footerItem}>Cookies</li>
      </ul>
      <div></div>
    </footer>
  );
};

export default Footer;
