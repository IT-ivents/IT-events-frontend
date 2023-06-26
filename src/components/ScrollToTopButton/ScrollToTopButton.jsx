import styles from './ScrollToTopButton.module.css';
import useScrollToTop from '../../utils/hooks/useScrollToTop';

const ScrollToTopButton = () => {
  const { isOnTopVisible, scrollToTop } = useScrollToTop(740);

  return (
    <div className={styles.scrollContainer}>
      <button
        type="button"
        className={`${styles.onTop} ${isOnTopVisible ? styles.visible : ''}`}
        onClick={scrollToTop}
      ></button>
    </div>
  );
};

export default ScrollToTopButton;
