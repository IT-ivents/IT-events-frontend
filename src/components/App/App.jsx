import styles from './App.module.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import {
  MainPage,
  EventPage,
  FavoritesPage,
  NotificationsPage,
  NotFoundPage,
  SearchResultPage,
} from '../../pages';
import { popularEvents, interestingEvents } from '../../utils/constants';

function App() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventsList, setEventsList] = useState({
    popular: [...popularEvents],
    interesting: [...interestingEvents],
    favorites: [],
    searchResult: [],
  });

  const handleCardClick = (event) => {
    setSelectedEvent(event);
  };

  const toggleFavorite = (event) => {
    setEventsList((prevEventsList) => {
      const updatedEventsList = {
        popular: updateList(prevEventsList.popular, event),
        interesting: updateList(prevEventsList.interesting, event),
        favorites: updateList(prevEventsList.favorites, event),
        searchResult: updateList(prevEventsList.searchResult, event),
      };

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
    const savedEventsList = JSON.parse(localStorage.getItem('eventsList'));
    if (savedEventsList) {
      setEventsList(savedEventsList);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('eventsList', JSON.stringify(eventsList));
  }, [eventsList]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.page}>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <MainPage
                onCardClick={handleCardClick}
                onLikeClick={toggleFavorite}
                popularEvents={eventsList.popular}
                interestingEvents={eventsList.interesting}
              />
            }
          />
          <Route
            path="event"
            element={
              <EventPage
                selectedEvent={selectedEvent}
                onCardClick={handleCardClick}
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />

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
          <Route path="results" element={<SearchResultPage />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
