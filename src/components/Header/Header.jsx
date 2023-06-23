import styles from './Header.module.css';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';
import SearchField from '../SearchField/SearchField';
import HeroSection from '../HeroSection/HeroSection';
import notificationIcon from '../../images/notifications-icon.svg';
import favoritesIcon from '../../images/favorites-header-icon.svg';

const navLinks = [
  {
    id: 1,
    name: 'Уведомления',
    path: '/notifications',
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

const smallForm = {
  width: '449px',
  height: '44px',
  marginLeft: '100px',
  marginRight: '275px',
  border: '1px solid #C9CCD8',
  borderRadius: '20px',
};

const smallFieldset = {
  gap: '9px',
  marginLeft: '16px',
};

const smallInput = {
  width: '397px', // '388px' + font-weight: 400 (::placeholder!)
};

const Header = ({ onSearch, searchQuery, onEnter }) => {
  const location = useLocation();
  const isSearchFieldInvisible =
    location.pathname !== '/event' &&
    location.pathname !== '/favorites' &&
    location.pathname !== '/notifications' &&
    location.pathname !== '/results' &&
    location.pathname !== '/preferences' &&
    location.pathname !== '/privacy';

  return location.pathname === '/' ? (
    // <header className={styles.header}>
    <header className={styles.container}>
      <div className={styles.linksContainer}>
        <Logo />
        <nav className={styles.navigationBar}>
          {navLinks.map((link) => (
            <Link className={styles.navLink} key={link.id} to={link.path}>
              <img src={link.src} alt={link.alt} />
              <p>{link.name}</p>
            </Link>
          ))}
          <button type="button" onClick={onEnter}>
            войти
          </button>
        </nav>
      </div>
      <HeroSection />
      {/* <SearchField onSearch={onSearch} /> */}
    </header>
  ) : (
    // </header>
    // <header className={styles.header} style={{ height: 'fit-content' }}>
    <header className={styles.borderContainer}>
      <div className={styles.linksContainer}>
        <Logo />
        {!isSearchFieldInvisible && (
          <SearchField
            onSearch={onSearch}
            searchQuery={searchQuery}
            smallForm={smallForm}
            smallFieldset={smallFieldset}
            smallInput={smallInput}
          />
        )}
        <nav className={styles.navigationBar}>
          {navLinks.map((link) => (
            <>
              <Link className={styles.navLink} key={link.id} to={link.path}>
                <img src={link.src} alt={link.alt} />
                <p>{link.name}</p>
              </Link>
            </>
          ))}
          <button type="button" onClick={onEnter}>
            войти
          </button>
        </nav>
      </div>
    </header>
    // </header>
  );
};

export default Header;
