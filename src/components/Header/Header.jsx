import styles from './Header.module.css';
import { Link, useLocation } from 'react-router-dom';
import SearchField from '../SearchField/SearchField';
import notificationIcon from '../../images/notifications-icon.svg';
import favoritesIcon from '../../images/favorites-icon.svg';

const Header = ({ isLoggedIn }) => {
  const location = useLocation();

  return isLoggedIn ? (
    <header
      className={location.pathname !== '/' ? styles.loggedIn : styles.header}
    >
      <Link to="/" className={styles.logoLink}>
        LOGO
      </Link>
      {location.pathname !== '/' && <SearchField />}
      <nav className={styles.navigationBar}>
        <Link className={styles.navLink}>
          <img src={notificationIcon} alt="notification-icon" />
          <p>Уведомления</p>
        </Link>
        <Link className={styles.navLink}>
          <img src={favoritesIcon} alt="notification-icon" />
          <p>Избранное</p>
        </Link>
        <Link className={styles.navLink}>
          <div className={styles.profile}>
            <p>R</p>
          </div>
        </Link>
      </nav>
    </header>
  ) : (
    <header className={styles.header}>
      <Link to="/" className={styles.logoLink}>
        LOGO
      </Link>

      <button type="button" to="/" className={styles.enterButton}>
        Войти
      </button>
    </header>
  );
};

export default Header;
