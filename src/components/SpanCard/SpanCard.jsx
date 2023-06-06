import styles from './SpanCard.module.css';
import { Link } from 'react-router-dom';

const SpanCard = () => {
  return (
    <Link to="/preferences" className={styles.spanCard}>
      <div className={styles.spanField}>
        <span className={styles.spanText}>
          Расскажите, какие события вы любите?
        </span>
      </div>
      <div className={styles.textField}>
        <p className={styles.text}>
          Учтём ваши предпочтения для персональных рекомендаций
        </p>
      </div>
    </Link>
  );
};

export default SpanCard;
