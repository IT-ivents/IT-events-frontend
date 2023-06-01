import styles from './HeroSection.module.css';
import Header from '../Header/Header';
import SearchField from '../SearchField/SearchField';
import { useLocation } from 'react-router-dom';

const HeroSection = () => {
  const location = useLocation();
  const headText = 'Не пропусти главные события IT';
  const subtext = 'Сотни ивентов уже ждут тебя. И мы собрали их все';
  return (
    <section className={styles.section}>
      <div className={styles.textContainer}>
        <h1 className={styles.headText}>{headText}</h1>
        <p className={styles.subText}>{subtext}</p>
      </div>
    </section>
  );
};

export default HeroSection;
