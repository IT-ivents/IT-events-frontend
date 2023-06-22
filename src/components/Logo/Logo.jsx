import styles from './Logo.module.css';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className={styles.logoLink}>
      Connect<span className={styles.logoSpan}> &#123;IT&#125;</span>
    </Link>
  );
};

export default Logo;
