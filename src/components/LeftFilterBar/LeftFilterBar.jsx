import { useContext, useState } from 'react';
import styles from './LeftFilterBar.module.css';
import TagsSection from './../TagsSection/TagsSection';
import SearchFilterContext from '../../utils/context/SearchFilterContext';
import { useInitialFilter } from '../../utils/hooks/useInitialFilter';
import { useFilter } from '../../utils/hooks/useFilter';
import TagButton from '../TagButton/TagButton';
import { useLocation } from 'react-router-dom';

const LeftFilerBar = ({ handleSearch, searchQuery }) => {
  const [showAllDates, setShowAllDates] = useState(false);
  const [showTopic, setShowTopic] = useState(false);
  const { dataLists } = useInitialFilter();
  const location = useLocation();
  const resultLocation = location.pathname === '/results';
  const { values, setValues, findValues, setFindValues } =
    useContext(SearchFilterContext);

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
    handleSearch();
  };

  const toggleShowAllDates = () => {
    setShowAllDates(!showAllDates);
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
    return dataLists.topics.map((item, index) => (
      <label htmlFor={item.id} key={index}>
        <input
          onChange={handleInputChange}
          id={item}
          type="checkbox"
          value={item}
          name="specialities"
          checked={values.specialities.includes(item)}
          className={styles.checkboxListButton}
        />
        <span className={styles.checkboxListLabel}>{item}</span>
      </label>
    ));
  };

  return (
    <section className={styles.filterForm}>
      {resultLocation && <h2 className={styles.filterTitle}>Фильтры</h2>}
      <ul className={styles.filterList}>
        <li>
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
          <div className={styles.lessBlock}>
            {renderDateOptions()}
            <button onClick={toggleShowAllDates} className={styles.showMore}>
              {showAllDates ? 'Показать меньше' : 'Показать больше'}
            </button>
          </div>
        </li>
        <li>
          <h3 className={styles.itemTitle}>Направление</h3>
          <button
            onClick={() => setShowTopic(!showTopic)}
            className={styles.topicButton}
          >
            Направление
          </button>
          {showTopic && (
            <div className={styles.topicsList}>{renderSpecialityOptions()}</div>
          )}
        </li>
        <li>
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
              <div className={styles.tagsList}>
                {findValues.findTags.map((item, index) => {
                  return (
                    <TagButton
                      key={index}
                      value={item}
                      handleChange={handleButtonChange}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </li>
      </ul>
      <TagsSection handleChange={handleButtonChange} />
      {location.pathname === '/' && (
        <button
          onClick={handleSearchClick}
          className={styles.buttonSearch}
          type="button"
        >
          Поиск
        </button>
      )}
    </section>
  );
};

export default LeftFilerBar;
