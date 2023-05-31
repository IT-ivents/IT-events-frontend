import React from 'react';
import MainAppSection from '../components/MainAppSection/MainAppSection';
import SearchField from '../components/SearchField/SearchField';
import FilterBar from '../components/FilterBar/FilterBar';
import EventsList from '../components/EventsList/EventsList';
import {
  popularEvents,
  immediateEvents,
  interestingEvents,
} from '../utils/constants';

import styles from './Pages.module.css'; ///////////////

const mainPageEvents = [
  {
    id: 1,
    title: 'Популярное',
    list: popularEvents,
  },
  {
    id: 2,
    title: 'Ближайшие события>',
    list: immediateEvents,
  },
  {
    id: 3,
    title: 'Может быть интересно',
    list: interestingEvents,
  },
];

const MainPage = ({ onCardClick }) => {
  return (
    <>
      <MainAppSection>
        <SearchField />
      </MainAppSection>
      <FilterBar justify={'center'} />
      {/* {mainPageEvents.map((event) => (
        <EventsList
          list={event.list}
          title={event.title}
          onCardClick={onCardClick}
          listDirection={'row'}
          sectionFlex={'column'}
          key={event.id}
        />
      ))} */}

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
              <input id="today" type="radio" value="Today" name="radio" />
              Сегодня
            </label>
            <label htmlFor="tomorrow" className={styles.radioButton}>
              <input id="tomorrow" type="radio" value="Tomorrow" name="radio" />
              Завтра
            </label>
            <label htmlFor="weekend" className={styles.radioButton}>
              <input id="weekend" type="radio" value="Weekend" name="radio" />В
              эти выходные
            </label>
            <label htmlFor="other" className={styles.radioButton}>
              <input id="other" type="radio" value="Other" name="radio" />
              Выбрать дату
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
              <input
                id="uxui"
                type="checkbox"
                className={styles.checkboxInput}
              />
              <span className={styles.checkboxLabel}>UX/UI дизайн</span>
            </label>
          </li>
          <li className={styles.listItem}>
            <h3 className={styles.itemTitle}>Цена</h3>
            <label htmlFor="today" className={styles.radioButton}>
              <input type="radio" value="Free" name="radio" />
              Бесплатно
            </label>
            <label htmlFor="today" className={styles.radioButton}>
              <input type="radio" value="Paid" name="radio" />
              Платно
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
        <ul className={styles.tagsList}>
          <h2>Популярные теги</h2>
          <li className={styles.tagElement}>Python</li>
          <li className={styles.tagElement}>С++</li>
          <li className={styles.tagElement}>Java</li>
          <li className={styles.tagElement}>Go</li>
          <li className={styles.tagElement}>Data Science</li>
          <li className={styles.tagElement}>HR</li>
          <li className={styles.tagElement}>ML</li>
          <li className={styles.tagElement}>UX</li>
          <li className={styles.tagElement}>UX/UI</li>
          <li className={styles.tagElement}>Scala</li>
          <li className={styles.tagElement}>Product Design</li>
          <li className={styles.tagElement}>iOS</li>
          <li className={styles.tagElement}>Android</li>
        </ul>
      </section>

      {/* <EventsList
        title="Популярное"
        list={popularEvents}
        onCardClick={onCardClick}
        listDirection={'row'}
        sectionFlex={'column'}
      />
      <EventsList
        title="Ближайшие события"
        list={immediateEvents}
        onCardClick={onCardClick}
        listDirection={'row'}
        sectionFlex={'column'}
      />
      <EventsList
        title="Может быть интересно"
        list={interestingEvents}
        onCardClick={onCardClick}
        listDirection={'row'}
        sectionFlex={'column'}
      /> */}
    </>
  );
};

export default MainPage;
