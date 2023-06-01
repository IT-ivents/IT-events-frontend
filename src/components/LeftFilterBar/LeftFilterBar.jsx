import styles from './LeftFilterBar.module.css';
import TagsBlock from './../TagsBlock/TagsBlock';

const LeftFilerBar = () => {
  return (
    <section className={styles.filterForm}>
      <h2 className={styles.filterTitle}>Фильтры</h2>
      <ul className={styles.filterList}>
        <li className={styles.listItem}>
          <h3 className={styles.itemTitle}>Формат</h3>
          <label htmlFor="online">
            <input
              id="online"
              type="checkbox"
              className={styles.checkboxInput}
            />
            <span className={styles.checkboxLabel}>Online</span>
          </label>
          <label htmlFor="offline">
            <input
              id="offline"
              type="checkbox"
              className={styles.checkboxInput}
            />
            <span className={styles.checkboxLabel}>Offline</span>
          </label>
        </li>
        <li className={styles.listItem}>
          <h3 className={styles.itemTitle}>Город</h3>
          <input
            type="text"
            placeholder="Поиск города"
            className={styles.filterInput}
          />
        </li>
        <li className={styles.listItem}>
          <h3 className={styles.itemTitle}>Дата</h3>
          <label htmlFor="today" className={styles.radioButton}>
            <input id="today" type="radio" value="Today" name="date" />
            <span>Сегодня</span>
          </label>
          <label htmlFor="tomorrow" className={styles.radioButton}>
            <input id="tomorrow" type="radio" value="Tomorrow" name="date" />
            <span>Завтра</span>
          </label>
          <label htmlFor="weekend" className={styles.radioButton}>
            <input id="weekend" type="radio" value="Weekend" name="date" />
            <span>В эти выходные</span>
          </label>
          <label htmlFor="otherdate" className={styles.radioButton}>
            <input id="otherdate" type="radio" value="Other date" name="date" />
            <span>Выбрать дату</span>
          </label>
          <label htmlFor="thismonth" className={styles.radioButton}>
            <input id="thismonth" type="radio" value="This month" name="date" />
            <span>В этом месяце</span>
          </label>
          <label htmlFor="nextmonth" className={styles.radioButton}>
            <input id="nextmonth" type="radio" value="Next month" name="date" />
            <span>В следующем месяце</span>
          </label>
        </li>
        <li className={styles.listItem}>
          <h3 className={styles.itemTitle}>Направление</h3>
          <label htmlFor="backend">
            <input
              id="backend"
              type="checkbox"
              className={styles.checkboxInput}
            />
            <span className={styles.checkboxLabel}>Backend</span>
          </label>
          <label htmlFor="frontend">
            <input
              id="frontend"
              type="checkbox"
              className={styles.checkboxInput}
            />
            <span className={styles.checkboxLabel}>Frontend</span>
          </label>
          <label htmlFor="qa">
            <input id="qa" type="checkbox" className={styles.checkboxInput} />
            <span className={styles.checkboxLabel}>QA</span>
          </label>
          <label htmlFor="uxui">
            <input id="uxui" type="checkbox" className={styles.checkboxInput} />
            <span className={styles.checkboxLabel}>UX/UI дизайн</span>
          </label>
        </li>
        <li className={styles.listItem}>
          <h3 className={styles.itemTitle}>Цена</h3>
          <label htmlFor="free" className={styles.radioButton}>
            <input id="free" type="radio" value="Free" name="price" />
            <span>Бесплатно</span>
          </label>
          <label htmlFor="paid" className={styles.radioButton}>
            <input id="paid" type="radio" value="Paid" name="price" />
            <span>Платно</span>
          </label>
        </li>
        <li className={styles.listItem}>
          <h3 className={styles.itemTitle}>Теги</h3>
          <input
            type="text"
            placeholder="Поиск тега"
            className={styles.filterInput}
          />
        </li>
      </ul>
      <TagsBlock />
    </section>
  );
};

export default LeftFilerBar;
