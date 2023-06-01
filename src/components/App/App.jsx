import React, { useState } from 'react';
import styles from './App.module.css';
import { Routes, Route } from 'react-router-dom';
import { MainPage, EventPage, FavoritesPage, NotFoundPage } from '../../pages';
import Layout from '../Layout/Layout';

function App() {
  const isLoggedIn = true;
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleCardClick = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.page}>
        <Routes>
          <Route path="/" element={<Layout isLoggedIn={isLoggedIn} />}>
            <Route index element={<MainPage onCardClick={handleCardClick} />} />
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
              isLoggedIn={isLoggedIn}
              element={<FavoritesPage onCardClick={handleCardClick} />}
            />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
