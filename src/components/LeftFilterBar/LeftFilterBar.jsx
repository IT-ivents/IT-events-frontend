import { useState } from 'react';
import styles from './LeftFilterBar.module.css';
import TagsSection from './../TagsSection/TagsSection';
import { useFilter } from '../../utils/hooks/useFilter';

const LeftFilerBar = () => {
  const [showAllDates, setShowAllDates] = useState(false);
  const [showAllSpecialities, setShowAllSpecialities] = useState(false);
  const {
    values,
    handleInputChange,
    handleButtonChange,
    findValues,
    setItemOnClick,
  } = useFilter();

  console.log(values);
  console.log(findValues);

  const toggleShowAllDates = () => {
    setShowAllDates(!showAllDates);
  };

  const toggleShowAllSpecialities = () => {
    setShowAllSpecialities(!showAllSpecialities);
  };

  const renderDateOptions = () => {
    const dateOptions = [
      { id: 'today', value: 'Today', label: 'Сегодня' },
      { id: 'tomorrow', value: 'Tomorrow', label: 'Завтра' },
      { id: 'thisweekend', value: 'This weekend', label: 'В эти выходные' },
      { id: 'pickdate', value: 'Pick date', label: 'Выбрать дату' },
    ];

    if (showAllDates) {
      dateOptions.push(
        { id: 'thisweek', value: 'This week', label: 'На этой неделе' },
        { id: 'thismonth', value: 'This month', label: 'В этом месяце' },
        { id: 'nextmonth', value: 'Next month', label: 'В следующем месяце' }
      );
    }

    return dateOptions.map((option) => (
      <label htmlFor={option.id} className={styles.radioButton} key={option.id}>
        <input
          onChange={handleInputChange}
          id={option.id}
          type="radio"
          value={option.value}
          name="date"
        />
        <span>{option.label}</span>
      </label>
    ));
  };

  const renderSpecialityOptions = () => {
    const specialityOptions = [
      { id: 'backend', label: 'Backend' },
      { id: 'frontend', label: 'Frontend' },
      { id: 'qa', label: 'QA' },
      { id: 'uxui', label: 'UX/UI дизайн' },
    ];

    if (showAllSpecialities) {
      specialityOptions.push(
        { id: 'web', label: 'Web-разработка' },
        { id: 'datascience', label: 'Data Science' }
      );
    }

    return specialityOptions.map((option) => (
      <label htmlFor={option.id} key={option.id}>
        <input
          onChange={handleInputChange}
          id={option.id}
          type="checkbox"
          value={option.id}
          name="specialities"
          className={styles.checkboxButton}
        />
        <span className={styles.checkboxLabel}>{option.label}</span>
      </label>
    ));
  };

  return (
    <section className={styles.filterForm}>
      <h2 className={styles.filterTitle}>Фильтры</h2>
      <ul className={styles.filterList}>
        <li>
          <h3 className={styles.itemTitle}>Формат</h3>
          <label htmlFor="online">
            <input
              onChange={handleInputChange}
              id="online"
              name="status"
              value="online"
              type="checkbox"
              className={styles.checkboxButton}
            />
            <span className={styles.checkboxLabel}>Online</span>
          </label>
          <label htmlFor="offline">
            <input
              onChange={handleInputChange}
              id="offline"
              name="status"
              value="offline"
              type="checkbox"
              className={styles.checkboxButton}
            />
            <span className={styles.checkboxLabel}>Offline</span>
          </label>
        </li>
        <li>
          <h3 className={styles.itemTitle}>Город</h3>
          <input
            onChange={handleInputChange}
            name="city"
            type="text"
            value={values.city || ''}
            placeholder="Поиск города"
            className={styles.filterInput}
          />
          {findValues && findValues.city && findValues.city !== '' && (
            <div className={styles.serchContainer}>
              {findValues.city.map((item, index) => {
                return (
                  <button
                    onClick={() => setItemOnClick({ city: item })}
                    className={styles.findItem}
                    key={index}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          )}
        </li>
        <li>
          <h3 className={styles.itemTitle}>Дата</h3>
          <div>
            {renderDateOptions()}
            <button onClick={toggleShowAllDates} className={styles.showMore}>
              {showAllDates ? 'Показать меньше' : 'Показать больше'}
            </button>
          </div>
        </li>
        <li>
          <h3 className={styles.itemTitle}>Направление</h3>
          <div>
            {renderSpecialityOptions()}
            <button
              onClick={toggleShowAllSpecialities}
              className={styles.showMore}
            >
              {showAllSpecialities ? 'Показать меньше' : 'Показать больше'}
            </button>
          </div>
        </li>
        <li>
          <h3 className={styles.itemTitle}>Цена</h3>
          <label htmlFor="free" className={styles.radioButton}>
            <input
              onChange={handleInputChange}
              id="free"
              type="radio"
              value="Free"
              name="price"
            />
            <span>Бесплатно</span>
          </label>
          <label htmlFor="paid" className={styles.radioButton}>
            <input
              onChange={handleInputChange}
              id="paid"
              type="radio"
              value="Paid"
              name="price"
            />
            <span>Платно</span>
          </label>
        </li>
        <li>
          <h3 className={styles.itemTitle}>Теги</h3>
          <input
            onChange={handleInputChange}
            name="findTags"
            type="text"
            value={values.findTags || ''}
            placeholder="Поиск тега"
            className={styles.filterInput}
          />
          {findValues && findValues.findTags && findValues.findTags !== '' && (
            <div className={styles.serchContainer}>
              {findValues.findTags.map((item, index) => {
                return (
                  <button
                    onClick={() => setItemOnClick({ findTags: item })}
                    className={styles.findItem}
                    key={index}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          )}
        </li>
      </ul>
      <TagsSection handleChange={handleButtonChange} />
    </section>
  );
};

export default LeftFilerBar;
