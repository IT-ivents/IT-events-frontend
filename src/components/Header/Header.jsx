import styles from './Header.module.css';
import { Link, useLocation } from 'react-router-dom';
import SearchField from '../SearchField/SearchField';
import notificationIcon from '../../images/notifications-icon.svg';
import favoritesIcon from '../../images/favorites-header-icon.svg';
import HeroSection from '../HeroSection/HeroSection';

const navLinks = [
  {
    id: 1,
    name: 'Уведомления',
    path: '/preferences',
    src: notificationIcon,
    alt: 'Иконка, Колокольчик',
  },
  {
    id: 2,
    name: 'Избранное',
    path: '/favorites',
    src: favoritesIcon,
    alt: 'Иконка, Избранное',
  },
];

const Header = () => {
  const location = useLocation();

  return location.pathname === '/' ? (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.linksContainer}>
          <Link to="/" className={styles.logoLink}>
            Connect<span className={styles.logoSpan}> &#123;IT&#125;</span>
          </Link>

          <nav className={styles.navigationBar}>
            {navLinks.map((link) => (
              <Link className={styles.navLink} key={link.id} to={link.path}>
                <img src={link.src} alt={link.alt} />
                <p>{link.name}</p>
              </Link>
            ))}
          </nav>
        </div>
        <HeroSection />
        <SearchField />
      </div>
    </header>
  ) : (
    <header className={styles.header} style={{ background: 'none' }}>
      <div className={styles.linksContainer}>
        <Link to="/" className={styles.logoLink}>
          Connect<span className={styles.logoSpan}> &#123;IT&#125;</span>
        </Link>
        <SearchField />
        <nav className={styles.navigationBar}>
          {navLinks.map((link) => (
            <Link className={styles.navLink} key={link.id} to={link.path}>
              <img src={link.src} alt={link.alt} />
              <p>{link.name}</p>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
