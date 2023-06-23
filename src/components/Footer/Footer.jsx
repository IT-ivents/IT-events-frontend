import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import Logo from '../Logo/Logo';
import GitHubLogo from '../../images/SocialNetworks/GitHub.svg';
import MessengerLogo from '../../images/SocialNetworks/Messenger.svg';
import VkLogo from '../../images/SocialNetworks/VK.svg';

const logoSize = {
  fontSize: '20px',
  color: '#F1F0EB',
};

const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.logos}>
        <Logo logoSize={logoSize} />
        <span className={styles.year}>&copy; {date} IT-events</span>
      </div>
      <ul className={styles.footerList}>
        <li className={styles.footerItem}>
          <Link to="/about" className={styles.logoLink}>
            <span>О нас</span>
          </Link>
        </li>
        <li className={styles.footerItem}>
          <span>События</span>
        </li>
        <li className={styles.footerItem}>
          <span>Cookies</span>
        </li>
        <li className={styles.footerItem}>
          <span>Мы в СМИ!</span>
        </li>
        <li className={styles.footerItem}>
          <span>Войти в ЛК</span>
        </li>
        <li className={styles.footerItem}>
          <span>Политика конфиденциональности</span>
        </li>
      </ul>
      <div className={styles.contacts}>
        <p className={styles.email}>It@connectit.ru</p>
        <div className={styles.images}>
          <img src={GitHubLogo} alt="GitHub" />
          <img src={MessengerLogo} alt="Messenger" />
          <img src={VkLogo} alt="Vk" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
