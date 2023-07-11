import styles from './HeroSection.module.css';

const HeroSection = () => {
  const headText = 'Не пропусти главные события IT';
  const subtext = 'Сотни ивентов уже ждут тебя. Мы собрали их все';

  return (
    <section className={styles.section}>
      <h1 className={styles.headText}>{headText}</h1>
      <p className={styles.subText}>{subtext}</p>
    </section>
  );
};

export default HeroSection;
