import styles from './PopupCookie.module.css';
import { Link } from 'react-router-dom';

const PopupCookie = ({ setShowPopup, scrollToTop }) => {
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleLinkClick = () => {
    scrollToTop();
    setShowPopup(false);
  };

  return (
    <div className={styles.linkPopup}>
      <span>
        Продолжая использовать наш сайт, вы даете согласие на{' '}
        <Link to="/cookies" className={styles.link} onClick={handleLinkClick}>
          обработку файлов cookie
          <span onClick={(e) => e.stopPropagation()}></span>
        </Link>
        , которые обеспечивают правильную работу сайта.
      </span>
      <button
        type="button"
        className={styles.button}
        onClick={handleClosePopup}
      >
        OK
      </button>
    </div>
  );
};

export default PopupCookie;
