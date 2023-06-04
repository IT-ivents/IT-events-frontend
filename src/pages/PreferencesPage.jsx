import styles from './Pages.module.css';
import PreferencesTags from './../components/PreferencesTags/PreferencesTags';

const PreferencesPage = () => {
  return (
    <section className={styles.preferencesPageWrapper}>
      <aside className={styles.asideBlock}>
        <h1 className={styles.asideTitle}>Расскажите нам о своих интересах</h1>
        <p className={styles.asideText}>
          Нажмите на теги событий,
          <br /> которые вы бы хотели видеть чаще,
          <br /> чем остальные
        </p>
      </aside>
      <div className={styles.tagsBlocks}>
        <PreferencesTags />
      </div>
    </section>
  );
};

export default PreferencesPage;
