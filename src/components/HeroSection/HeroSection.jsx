import styles from './HeroSection.module.css';
import Header from '../Header/Header';
import SearchField from '../SearchField/SearchField';
import { useLocation } from 'react-router-dom';

const HeroSection = () => {
  const location = useLocation();
  const headText = 'Не пропусти главные события IT';
  const subtext = 'Сотни ивентов уже ждут тебя. И мы собрали их все';
  return (
    <section
      className={styles.section}
      style={{
        background: location.pathname !== '/' && 'none',
        paddingBottom: location.pathname !== '/' ? '58px' : '175px',
      }}
    >
      <Header />
      {location.pathname === '/' && (
        <>
          <div className={styles.textContainer}>
            <h1 className={styles.headText}>{headText}</h1>
            <p className={styles.subText}>{subtext}</p>
          </div>
          <SearchField />
        </>
      )}
    </section>
  );
};

export default HeroSection;
