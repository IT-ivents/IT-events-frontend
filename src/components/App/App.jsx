import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import {
  MainPage,
  EventPage,
  FavoritesPage,
  NotificationsPage,
  NotFoundPage,
  SearchResultPage,
  PreferencesPage,
} from '../../pages';
import {
  popularEvents,
  interestingEvents,
  mostAnticipatedEvents,
  soonEvents,
} from '../../utils/constants';

import { apiEvents } from '../../utils/api';

function App() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventsList, setEventsList] = useState({
    mostAnticipated: [...mostAnticipatedEvents],
    popular: [...popularEvents],
    soon: [...soonEvents],
    interesting: [...interestingEvents],
    favorites: [],
    searchResult: [],
  });
  const currentEvent = 'selectedEvent';
  const events = 'eventsList';
  const navigate = useNavigate();

  // selectedEvent храним в localStorage для страницы EventPage
  useEffect(() => {
    const savedSelectedEvent = JSON.parse(localStorage.getItem(currentEvent));
    if (savedSelectedEvent) {
      setSelectedEvent(savedSelectedEvent);
    } else {
      setSelectedEvent(null);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(currentEvent, JSON.stringify(selectedEvent));
  }, [selectedEvent]);

  const handleCardClick = (event) => {
    setSelectedEvent(event);
  };

  const toggleFavorite = (event) => {
    setEventsList((prevEventsList) => {
      const updatedEventsList = {
        mostAnticipated: updateList(prevEventsList.mostAnticipated, event),
        popular: updateList(prevEventsList.popular, event),
        soon: updateList(prevEventsList.popular, event),
        interesting: updateList(prevEventsList.interesting, event),
        favorites: updateList(prevEventsList.favorites, event),
        searchResult: updateList(prevEventsList.searchResult, event),
      };

      // Обновление isLiked у selectedEvent
      const updatedSelectedEvent = { ...selectedEvent };
      if (selectedEvent && selectedEvent.id === event.id) {
        updatedSelectedEvent.isLiked = !updatedSelectedEvent.isLiked;
      }

      setSelectedEvent(updatedSelectedEvent);

      return updatedEventsList;
    });
  };
  function updateList(list, event) {
    if (list === eventsList.favorites) {
      const isEventInFavorites = list.some((item) => item.id === event.id);
      if (!isEventInFavorites) {
        const updatedList = [...list, { ...event, isLiked: true }];
        return updatedList;
      } else {
        const updatedList = list.filter((item) => item.id !== event.id);
        return updatedList;
      }
    }

    const updatedList = list.map((item) => {
      if (item.id === event.id) {
        const updatedItem = { ...item, isLiked: !item.isLiked };
        return updatedItem;
      }
      return item;
    });

    return updatedList;
  }

  useEffect(() => {
    const savedEventsList = JSON.parse(localStorage.getItem(events));
    if (savedEventsList) {
      setEventsList(savedEventsList);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(events, JSON.stringify(eventsList));
  }, [eventsList]);

  const searchEvents = (query) => {
    // Собираем массивы в которых будем искать и расставляем лайки на карточках,
    // если они есть в избранном
    const filteredEvents = [...popularEvents, ...interestingEvents]
      .map((event) => {
        const isLiked = eventsList.favorites.some(
          (item) => item.id === event.id
        );
        return { ...event, isLiked };
      })
      .filter((event) => {
        const { title, description, location, price } = event;
        return (
          title?.toLowerCase().trim().includes(query.toLowerCase()) ||
          description?.toLowerCase().trim().includes(query.toLowerCase()) ||
          location?.toLowerCase().trim().includes(query.toLowerCase()) ||
          price?.toLowerCase().trim().includes(query.toLowerCase())
        );
      });
    return filteredEvents;
  };

  const handleSearch = (query) => {
    const filteredEvents = searchEvents(query);

    setEventsList((prevEventsList) => ({
      ...prevEventsList,
      searchResult: filteredEvents,
    }));

    navigate('/results'); // Перенаправление на страницу /results
  };

  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    apiEvents
      .getEvents()
      .then(({ success, data }) => {
        if (success) {
          setEventList(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.dir(eventList);

  return (
    <div className={styles.wrapper}>
      <div className={styles.page}>
        <Header onSearch={handleSearch} />
        <Routes>
          <Route
            path="/"
            element={
              <MainPage
                onCardClick={handleCardClick}
                onLikeClick={toggleFavorite}
                mostAnticipatedEvents={eventsList.mostAnticipated}
                popularEvents={eventsList.popular}
                soonEvents={eventsList.soon}
                interestingEvents={eventsList.interesting}
              />
            }
          />
          <Route
            path="event"
            element={
              <EventPage
                interestingEvents={eventsList.interesting}
                selectedEvent={selectedEvent}
                onCardClick={handleCardClick}
                onLikeClick={toggleFavorite}
              />
            }
          />
          <Route
            path="favorites"
            element={
              <FavoritesPage
                onCardClick={handleCardClick}
                onLikeClick={toggleFavorite}
                favoriteEvents={eventsList.favorites}
              />
            }
          />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route
            path="results"
            element={
              <SearchResultPage
                searchResult={eventsList.searchResult}
                popularEvents={eventsList.popular}
                onCardClick={handleCardClick}
                onLikeClick={toggleFavorite}
              />
            }
          />
          <Route path="preferences" element={<PreferencesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
