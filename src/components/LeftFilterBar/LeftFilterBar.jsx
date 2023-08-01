import { useContext, useState } from 'react';
import { motion as m } from 'framer-motion';
import styles from './LeftFilterBar.module.css';
import TagsSection from './../TagsSection/TagsSection';

import { useInitialFilter } from '../../utils/hooks/useInitialFilter';
import { useFilter } from '../../utils/hooks/useFilter';
import { useFiltersContext } from '../../utils/context/SearchFilterContext';
import TagButton from '../TagButton/TagButton';
import { useLocation } from 'react-router-dom';
import { useEventsContext } from '../../utils/context/EventsContext';

const LeftFilerBar = () => {
  const [showAllDates, setShowAllDates] = useState(false);
  const [showAllTopics, setShowAllTopics] = useState(false);
  const [showTopic, setShowTopic] = useState(false);
  const { dataLists } = useInitialFilter();
  const location = useLocation();
  const resultLocation = location.pathname === '/results';
  const { values, setValues, findValues, setFindValues } = useFiltersContext();
  const { handleFilterSearch } = useEventsContext();

  const {
    handleInputChange,
    handleDateChange,
    handleDateBlur,
    handleButtonChange,
    setItemOnClick,
  } = useFilter({
    values,
    setValues,
    findValues,
    setFindValues,
  });

  // console.log(dataLists)

  const handleSearchClick = () => {
    handleFilterSearch();
  };

  const toggleShowAllDates = () => {
    setShowAllDates(!showAllDates);
  };

  const toggleShowAllTopics = () => {
    setShowAllTopics(!showAllTopics);
  };

  const toggleTopics = () => {
    setShowTopic(!showTopic);
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
          value={option.label}
          name="date"
          checked={
            option.label.includes(values.date) ||
            (option.label === 'Выбрать дату' && !isNaN(Date.parse(values.date)))
          }
        />
        <span className={`${option.id === 'pickdate' && styles.radioText}`}>
          {option.label}
        </span>
        {option.id === 'pickdate' && (
          <input
            onChange={handleDateChange}
            className={styles.pickdate}
            name="date"
            type="date"
            onBlur={handleDateBlur}
            min={new Date()}
          ></input>
        )}
      </label>
    ));
  };

  const renderSpecialityOptions = () => {
    return dataLists?.topics
      ?.slice(0, showAllTopics ? dataLists.topics.length : 4)
      .map((item, index) => (
        <label htmlFor={item.id} key={index}>
          <input
            onChange={handleInputChange}
            id={item}
            name="specialities"
            value={item}
            type="checkbox"
            className={styles.checkboxButton}
            checked={values.specialities.includes(item)}
          />
          <span className={styles.checkboxLabel}>{item}</span>
        </label>
      ));
  };

  return (
    <m.section
      initial={{ x: -100, opacity: 0 }} // начальное состояние - смещение влево на 100 пикселей
      animate={{ x: 0, opacity: 1 }} // конечное состояние - без смещения
      transition={{ duration: 0.7 }} // длительность анимации
      className={styles.filterForm}
    >
      {resultLocation && <h2 className={styles.filterTitle}>Фильтры</h2>}
      <ul className={styles.filterList}>
        <li className={styles.list}>
          <h3 className={styles.itemTitle}>Формат</h3>
          <label htmlFor="online">
            <input
              onChange={handleInputChange}
              id="online"
              name="status"
              value="Online"
              type="checkbox"
              className={styles.checkboxButton}
              checked={values.status.includes('Online')}
            />
            <span className={styles.checkboxLabel}>Online</span>
          </label>
          <label htmlFor="offline">
            <input
              onChange={handleInputChange}
              id="offline"
              name="status"
              value="Offline"
              type="checkbox"
              className={styles.checkboxButton}
              checked={values.status.includes('Offline')}
            />
            <span className={styles.checkboxLabel}>Offline</span>
          </label>
        </li>
        <li className={styles.list}>
          <h3 className={styles.itemTitle}>Город</h3>
          <input
            onChange={handleInputChange}
            name="city"
            type="text"
            value={values.city || ''}
            placeholder="Поиск города"
            className={styles.filterInput}
            autoComplete="off"
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
        <li className={styles.list}>
          <h3 className={styles.itemTitle}>Дата</h3>
          {renderDateOptions()}
          <button onClick={toggleShowAllDates} className={styles.showMore}>
            {showAllDates ? 'Показать меньше' : 'Показать больше'}
          </button>
        </li>
        <li className={styles.list}>
          <h3 className={styles.itemTitle}>Направление</h3>
          {renderSpecialityOptions()}
          {dataLists?.topics?.length > 3 && (
            <button onClick={toggleShowAllTopics} className={styles.showMore}>
              {showAllTopics ? 'Показать меньше' : 'Показать больше'}
            </button>
          )}
        </li>
        <li className={styles.list}>
          <h3 className={styles.itemTitle}>Цена</h3>
          <label htmlFor="free" className={styles.radioButton}>
            <input
              onChange={handleInputChange}
              id="free"
              type="radio"
              value="Бесплатно"
              name="price"
              checked={values.price === 'Бесплатно'}
            />
            <span>Бесплатно</span>
          </label>
          <label htmlFor="paid" className={styles.radioButton}>
            <input
              onChange={handleInputChange}
              id="paid"
              type="radio"
              value="Платно"
              name="price"
              checked={values.price === 'Платно'}
            />
            <span>Платно</span>
          </label>
        </li>
        <li className={styles.list}>
          <h3 className={styles.itemTitle}>Теги</h3>
          <input
            onChange={handleInputChange}
            name="findTags"
            type="text"
            value={values.findTags || ''}
            placeholder="Поиск тега"
            className={styles.filterInput}
            autoComplete="off"
          />
          {findValues && findValues.findTags && findValues.findTags !== '' && (
            <div className={styles.serchContainer}>
              <div className={styles.tagsList}>
                {findValues.findTags.map((item, index) => {
                  return (
                    <TagButton
                      key={index}
                      value={item}
                      handleChange={handleButtonChange}
                      disabled={false}
                    />
                  );
                })}
              </div>
            </div>
          )}
          <span className={styles.popularTags}>Популярные теги</span>
        </li>
      </ul>
      <TagsSection handleChange={handleButtonChange} />
      {location.pathname === '/' && (
        <button
          onClick={handleSearchClick}
          className={styles.buttonSearch}
          type="button"
        >
          Найти
        </button>
      )}
    </m.section>
  );
};

export default LeftFilerBar;
