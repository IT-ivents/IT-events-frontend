import styles from './Header.module.css';
import { Link, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../utils/context/AuthContext';
import { useModalContext } from '../../utils/context/ModalContext';
import Logo from '../Logo/Logo';
import SearchField from '../SearchField/SearchField';
import HeroSection from '../HeroSection/HeroSection';
import notificationIcon from '../../images/notifications-icon.svg';
import enterIcon from '../../images/enter_acc.svg';
import favoritesIcon from '../../images/favorites-header-icon.svg';
import Avatar from '../Avatar/Avatar';

const smallForm = {
  width: '450px',
  height: '44px',
  marginLeft: '-53px',
  border: '1px solid #C9CCD8',
  borderRadius: '20px',
};

const radiusForm = {
  borderRadius: '34px',
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
  fontSize: '16px',
  backgroundColor: 'transparent',
  color: 'rgba(0, 0, 0, 0.8)',
  cursor: 'pointer',
  border: '1px solid rgba(0, 0, 0, 0.6)',
};

const Header = ({ onSearch, searchQuery }) => {
  const { loggedIn, currentUser } = useAuthContext();
  const { toggleModalSignIn } = useModalContext();
  const location = useLocation();

  const isSearchFieldOnTop =
    // location.pathname === '/events' ||
    location.pathname === '/favorites' ||
    location.pathname.includes('event') ||
    location.pathname === '/notifications' ||
    location.pathname === '/privacy';

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
    {
      id: 3,
      name: loggedIn ? currentUser.name : 'Войти',
      component: loggedIn ? (
        <Avatar name={currentUser.name} style={avatar} />
      ) : (
        <>
          <img src={enterIcon} alt="Иконка, Войти в кабинет" />
          <p>Войти</p>
        </>
      ),
      path: loggedIn ? '/account' : null,
    },
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
              to={link.path ? link.path : ''}
              onClick={
                link.id === 3 && !loggedIn
                  ? toggleModalSignIn
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
            radiusForm={radiusForm}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
