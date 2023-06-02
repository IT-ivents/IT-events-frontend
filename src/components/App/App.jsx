import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import {
  MainPage,
  EventPage,
  FavoritesPage,
  PreferencesPage,
  NotFoundPage,
  SearchResultPage,
} from '../../pages';
import { mainEvents } from '../../utils/constants';

function App() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [favoriteEvents, setFavoriteEvents] = useState([]);
  const [allEvents, setAllEvents] = useState(mainEvents);

  const handleCardClick = (event) => {
    setSelectedEvent(event);
  };

  const toggleFavorite = (event) => {
    const isEventInFavorites = favoriteEvents.some(
      (favorite) => favorite.id === event.id
    );
    if (isEventInFavorites) {
      // Карточка уже в избранном, удаляем ее
      const updatedFavorites = favoriteEvents.filter(
        (favorite) => favorite.id !== event.id
      );
      setFavoriteEvents(updatedFavorites);
    } else {
      // Карточка не в избранном, добавляем ее
      const updatedFavorites = [...favoriteEvents, { ...event, isLiked: true }];
      setFavoriteEvents(updatedFavorites);
    }

    // Обновление состояния allEvents
    const updatedAllEvents = allEvents.map((item) => {
      if (item.id === event.id) {
        return {
          ...item,
          isLiked: !isEventInFavorites,
        };
      }
      return item;
    });
    setAllEvents(updatedAllEvents);
  };

  // Эффект для загрузки сохраненных карточек из локального хранилища при запуске приложения
  useEffect(() => {
    const savedEvents = localStorage.getItem('favoriteEvents');
    if (savedEvents) {
      setFavoriteEvents(JSON.parse(savedEvents));
    }
  }, []);

  // Эффект для сохранения изменений в локальном хранилище при обновлении состояния favoriteEvents
  useEffect(() => {
    localStorage.setItem('favoriteEvents', JSON.stringify(favoriteEvents));
  }, [favoriteEvents]);

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
                allEvents={allEvents}
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
                favoriteEvents={favoriteEvents}
              />
            }
          />
          <Route path="preferences" element={<PreferencesPage />} />
          <Route path="results" element={<SearchResultPage />} />
          {/* </Route> */}
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
