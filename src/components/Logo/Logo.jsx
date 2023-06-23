import styles from './Logo.module.css';
import { Link } from 'react-router-dom';

const Logo = ({ logoSize, onClick }) => {
  return (
    <Link to="/" className={styles.logoLink} style={logoSize} onClick={onClick}>
      Connect<span className={styles.logoSpan}> &#123;IT&#125;</span>
    </Link>
  );
};

export default Logo;
