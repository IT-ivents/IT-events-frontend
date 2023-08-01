import styles from './Header.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../utils/context/AuthContext';
import { useModalContext } from '../../utils/context/ModalContext';
import Logo from '../Logo/Logo';
import SearchField from '../SearchField/SearchField';
import HeroSection from '../HeroSection/HeroSection';
import { ReactComponent as NotificationIcon } from '../../images/notifications-icon.svg';
import { ReactComponent as EnterIcon } from '../../images/enter_acc.svg';
import { ReactComponent as FavoritesIcon } from '../../images/favorites-header-icon.svg';
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

const Header = () => {
  const { loggedIn, currentUser } = useAuthContext();
  const { openModalSignIn } = useModalContext();
  const location = useLocation();
  const navigate = useNavigate();

  const isSearchFieldOnTop =
    // location.pathname === '/events' ||
    location.pathname === '/favorites' ||
    location.pathname.includes('event') ||
    location.pathname === '/notifications' ||
    location.pathname === '/privacy';

  const handleAccountEnter = (path) => {
    navigate(path);
  };

  const navLinks = [
    {
      id: 1,
      name: 'Уведомления',
      path: '/notifications',
      icon: <NotificationIcon />,
      alt: 'Иконка, Колокольчик',
    },
    {
      id: 2,
      name: 'Избранное',
      path: '/favorites',
      icon: <FavoritesIcon />,
      alt: 'Иконка, Избранное',
    },
    {
      id: 3,
      name: loggedIn ? currentUser.name : 'Войти',
      component: loggedIn ? (
        <Avatar name={currentUser.name} style={avatar} />
      ) : (
        <>
          <EnterIcon />
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
              onClick={() => link.id === 3 && !loggedIn && openModalSignIn()}
            >
              {link.component ? (
                link.component
              ) : (
                <>
                  {link.icon}
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
          <SearchField radiusForm={radiusForm} />
        </div>
      )}
    </header>
  );
};

export default Header;
