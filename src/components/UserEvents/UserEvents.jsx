import React, { useEffect, useState } from 'react';
import styles from './UserEvents.module.css';
import { Link, useLocation } from 'react-router-dom';
import FilterBar from '../FilterBar/FilterBar';
import VerticalEventList from '../VerticalEventList/VerticalEventList';
import AddImage from '../../images/Actions/Add.svg';
import { parsePrice } from '../../utils/helperFunctions';
import { apiEvents } from '../../utils/api';

const UserEvents = ({
  mostAnticipatedEvents,
  onCardClick,
  onNewEventClick,
}) => {
  const [createdEvents, setCreatedEvents] = useState([]);
  const [sortByName, setSortByName] = useState(true);
  const [sortByPrice, setSortByPrice] = useState(true);
  const [sortByDate, setSortByDate] = useState(true);
  const [checkedEvents, setCheckedEvents] = useState([]);

  // Выбор карточки
  const location = useLocation();
  const isCheckboxInvisible =
    location.pathname === '/notifications' ||
    location.pathname === '/account/events';

  const handleCheckboxChange = (event, isChecked) => {
    if (isChecked) {
      setCheckedEvents((prevCheckedEvents) => [...prevCheckedEvents, event]);
    } else {
      setCheckedEvents((prevCheckedEvents) =>
        prevCheckedEvents.filter((checkedEvent) => checkedEvent.id !== event.id)
      );
    }
  };

  useEffect(() => {
    console.log('TO_DEL_CHECKBOX', checkedEvents);
  }, [checkedEvents]);

  // Получение созданных событий
  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const response = await apiEvents.getUserEvents();
        const userEvents = response.data;
        setCreatedEvents(userEvents);
      } catch (error) {
        // Обработка ошибки при выполнении запроса
      }
    };
    fetchUserEvents();
  }, []);
  console.log(createdEvents);

  const handleFilter = (option) => {
    let sortedList = [...createdEvents];

    switch (option) {
      case 'name':
        sortedList.sort((a, b) => {
          const sortOrder = sortByName ? 1 : -1;
          return sortOrder * a.title.localeCompare(b.title);
        });
        setSortByName((prevValue) => !prevValue);
        break;
      case 'price':
        sortedList.sort((a, b) => {
          const sortOrder = sortByPrice ? 1 : -1;
          if (a.price === b.price) {
            const dateA = new Date(a.date_start).getTime();
            const dateB = new Date(b.date_start).getTime();
            return (dateA - dateB) * sortOrder;
          } else if (a.price === 'Бесплатно' || b.price === 'Бесплатно') {
            return a.price === 'Бесплатно' ? -1 * sortOrder : 1 * sortOrder;
          } else {
            const priceA = parsePrice(a.price);
            const priceB = parsePrice(b.price);
            return (priceA - priceB) * sortOrder;
          }
        });
        setSortByPrice((prevValue) => !prevValue);
        break;
      case 'date':
        sortedList.sort((a, b) => {
          const sortOrder = sortByDate ? 1 : -1;
          const dateA = new Date(a.date_start).getTime();
          const dateB = new Date(b.date_start).getTime();
          return (dateA - dateB) * sortOrder;
        });
        setSortByDate((prevValue) => !prevValue);
        break;
      default:
        break;
    }

    setCreatedEvents([...sortedList]);
  };

  const pageRender = () => {
    if (mostAnticipatedEvents.length === 0 || !mostAnticipatedEvents) {
      return (
        <>
          <h2 className={styles.title}>У Вас пока нет созданных событий</h2>
          <p className={styles.subtitle}>
            Вы можете добавить новое событие в любое время
          </p>
        </>
      );
    } else {
      return (
        <VerticalEventList
          events={mostAnticipatedEvents}
          onCardClick={onCardClick}
          checkedEvents={checkedEvents}
          handleCheckboxChange={handleCheckboxChange}
          isCheckboxInvisible={isCheckboxInvisible}
        />
      );
    }
  };

  const eventsToDelArray = checkedEvents.map((event) => event.id);
  console.log(eventsToDelArray);

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await apiEvents.deleteEvent(eventsToDelArray);
      console.log('Событие успешно удалено', response.data);
    } catch (error) {
      console.error('Ошибка при удалении события', error);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.filterBar}>
        <FilterBar onFilter={handleFilter} />
        <div className={styles.buttons}>
          <button
            type="button"
            onClick={handleDeleteEvent}
            className={styles.delete}
          ></button>
          <Link
            to="/organization"
            className={styles.link}
            onClick={onNewEventClick}
          >
            <button title="Создать событие" className={styles.create}>
              <img src={AddImage} alt="Создать событие" />
              Создать событие
            </button>
          </Link>
        </div>
      </div>
      {pageRender()}
    </section>
  );
};

export default UserEvents;
