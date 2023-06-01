import React, { useState } from 'react';
import styles from './App.module.css';
import { Routes, Route } from 'react-router-dom';
import {
  MainPage,
  EventPage,
  AccountPage,
  AccountDetailsPage,
  FavoritesPage,
  NotFoundPage,
  SearchResultPage,
} from '../../pages';
import ProtectedRoute from '../../utils/router/ProtectedRoute';
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
              path="account"
              isLoggedIn={isLoggedIn}
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  children={<AccountPage />}
                />
              }
            />
            <Route
              path="account/details"
              isLoggedIn={isLoggedIn}
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  children={<AccountDetailsPage />}
                />
              }
            />
            <Route
              path="favorites"
              isLoggedIn={isLoggedIn}
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  children={<FavoritesPage />}
                />
              }
            />
            <Route path="results" element={<SearchResultPage />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
