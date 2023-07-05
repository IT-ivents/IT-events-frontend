import styles from './Header.module.css';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';
import SearchField from '../SearchField/SearchField';
import HeroSection from '../HeroSection/HeroSection';
import notificationIcon from '../../images/notifications-icon.svg';
import enterIcon from '../../images/enter_acc.svg';
import favoritesIcon from '../../images/favorites-header-icon.svg';
import Avatar from '../Avatar/Avatar';
import useAuth from '../../utils/hooks/useAuth';

const smallForm = {
  width: '450px',
  height: '44px',
  marginLeft: '-53px',
  border: '1px solid #C9CCD8',
  borderRadius: '20px',
};

const smallFieldset = {
  gap: '6px',
  marginLeft: '13px',
};

const smallInput = {
  width: '397px',
};

const avatar = {
  width: '44px',
  height: '44px',
  fontSize: '20px',
  backgroundColor: 'transparent',
  color: 'rgba(0, 0, 0, 0.8)',
  border: '1px solid rgba(0, 0, 0, 0.6)',
};

const Header = ({ onSearch, searchQuery, onEnter, loggedIn }) => {
  const { handleLogout, currentUser } = useAuth();
  const location = useLocation();

  const isSearchFieldOnTop =
    location.pathname === '/event' ||
    location.pathname === '/favorites' ||
    location.pathname === '/notifications';

  const { username } = currentUser || {};

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
    loggedIn
      ? {
          id: 3,
          component: <Avatar name={username} style={avatar} />,
          path: '/account',
        }
      : !loggedIn && handleLogout
      ? {
          id: 3,
          name: 'Войти',
          src: enterIcon,
          alt: 'Иконка, Войти в кабинет',
        }
      : null,
  ];

  return (
    <header
      className={styles.header}
      style={{
        paddingBottom: location.pathname === '/results' ? '20px' : '',
      }}
    >
      <div className={styles.linksContainer}>
        <Logo />
        {isSearchFieldOnTop && (
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
            <Link
              className={styles.navLink}
              key={link.id}
              to={link.path}
              onClick={
                link.id === 3 && !loggedIn
                  ? onEnter
                  : () => (window.location.href = link.path)
              }
            >
              {link.component ? (
                link.component
              ) : (
                <>
                  <img src={link.src} alt={link.alt} />
                  <p>{link.name}</p>
                </>
              )}
            </Link>
          ))}
        </nav>
      </div>
      {location.pathname === '/' && <HeroSection />}
      {location.pathname === '/results' && (
        <div className={styles.searchFieldContainer}>
          <SearchField
            onSearch={onSearch}
            searchQuery={searchQuery}
            smallForm={smallForm}
            smallFieldset={smallFieldset}
            smallInput={smallInput}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
