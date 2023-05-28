import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
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
