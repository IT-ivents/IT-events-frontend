import React, { useState, useEffect } from 'react';
import styles from './App.module.css';

import { Routes, Route, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ModalSignUp from '../Modals/ModalSingUp/ModalSignUp';
import ModalSignIn from '../Modals/ModalSignIn/ModalSignIn';
import {
  MainPage,
  EventPage,
  FavoritesPage,
  NotificationsPage,
  NotFoundPage,
  SearchResultPage,
  PreferencesPage,
  About,
  Organization,
  PrivacyPolicyPage,
  CookiePage,
  // AccountPage,
  AccountDetailsPage,
} from '../../pages';
import SearchFilterContext from '../../utils/context/SearchFilterContext';
import useFilterContext from '../../utils/hooks/useFilterContext';
import useAuth from '../../utils/hooks/useAuth';
import useEventsList from '../../utils/hooks/useEventsList';
import useSearchEvents from '../../utils/hooks/useSearchEvents';
import useFavorites from '../../utils/hooks/useFavorites';

function App() {
  const location = useLocation();
  const [isModalSignInOpen, setIsModalSignInOpen] = useState(false);
  const [isModalSignUpOpen, setIsModalSignUpOpen] = useState(false);

  const {
    eventsFromApi,
    soonEvents,
    popularEvents,
    interestingEvents,
    mostAnticipatedEvents,
    setMostAnticipatedEvents,
    setPopularEvents,
    setSoonEvents,
    setInterestingEvents,
    setEventsFromApi,
  } = useEventsList();

  const {
    favorites,
    setRecommendedEvents,
    handleCardClick,
    toggleFavorite,
    setSelectedEvent,
    recommendedEvents,
    selectedEvent,
  } = useFavorites();

  const {
    searchResult,
    setSearchResult,
    searchQuery,
    setSearchQuery,
    handleSearch,
    handleFilterSearch,
  } = useSearchEvents();

  const { findValues, setFindValues, values, setValues, resetFilters } =
    useFilterContext();

  const {
    handleLogin,
    handleRegister,
    // handleLogout,
    loggedIn,
    isLoading,
    serverError,
    setServerError,
  } = useAuth();

  console.log(loggedIn);

  useEffect(() => {
    if (location.pathname === '/') {
      resetFilters();
      setSearchQuery('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  //Функция обновления массивов событий при изменении избранных
  useEffect(() => {
    setMostAnticipatedEvents((prevEvents) => updateEvents(prevEvents));
    setPopularEvents((prevEvents) => updateEvents(prevEvents));
    setSoonEvents((prevEvents) => updateEvents(prevEvents));
    setInterestingEvents((prevEvents) => updateEvents(prevEvents));
    setSearchResult((prevEvents) => updateEvents(prevEvents));
    setRecommendedEvents((prevEvents) => updateEvents(prevEvents));
    setEventsFromApi((prevEvents) => updateEvents(prevEvents));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favorites]);

  // Функция обновления массивов событий
  const updateEvents = (events) => {
    return events.map((event) => {
      const isLiked = favorites.some((item) => item.id === event.id);
      return { ...event, isLiked };
    });
  };

  const toggleModalSignIn = () => {
    setIsModalSignInOpen(!isModalSignInOpen);
  };

  const toggleModalSignUp = () => {
    setIsModalSignInOpen(false);
    setIsModalSignUpOpen(!isModalSignUpOpen);
  };

  return (
    <SearchFilterContext.Provider
      value={{
        values,
        setValues,
        findValues,
        setFindValues,
      }}
    >
      <div className={styles.wrapper}>
        <div className={styles.page}>
          <Header
            onSearch={handleSearch}
            searchQuery={searchQuery}
            onEnter={toggleModalSignIn}
          />
          {isModalSignInOpen && (
            <ModalSignIn
              isOpen={toggleModalSignIn}
              handleClose={toggleModalSignIn}
              isRegister={toggleModalSignUp}
              onSignIn={handleLogin}
            />
          )}
          {isModalSignUpOpen && (
            <ModalSignUp
              isOpen={toggleModalSignUp}
              handleClose={toggleModalSignUp}
              onSignUp={handleRegister}
              isLoading={isLoading}
              setServerError={setServerError}
              serverError={serverError}
            />
          )}

          <Routes>
            <Route
              path="/"
              element={
                <MainPage
                  onCardClick={handleCardClick}
                  onLikeClick={toggleFavorite}
                  mostAnticipatedEvents={mostAnticipatedEvents}
                  popularEvents={eventsFromApi}
                  soonEvents={soonEvents}
                  interestingEvents={interestingEvents}
                  handleSearch={handleFilterSearch}
                  searchQuery={searchQuery}
                  onSearch={handleSearch}
                  setSelectedEvent={setSelectedEvent}
                />
              }
            />
            <Route
              path="event/:id"
              element={
                <EventPage
                  recommendedEvents={recommendedEvents}
                  selectedEvent={selectedEvent}
                  setSelectedEvent={setSelectedEvent}
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
                  favoriteEvents={favorites}
                />
              }
            />
            <Route
              path="notifications"
              element={
                <NotificationsPage
                  favoriteEvents={favorites}
                  onCardClick={handleCardClick}
                  onLikeClick={toggleFavorite}
                />
              }
            />
            <Route
              path="results"
              element={
                <SearchResultPage
                  searchResult={searchResult}
                  searchQuery={searchQuery}
                  popularEvents={popularEvents}
                  onCardClick={handleCardClick}
                  onLikeClick={toggleFavorite}
                />
              }
            />
            <Route path="preferences" element={<PreferencesPage />} />
            <Route path="privacy" element={<PrivacyPolicyPage />} />
            <Route path="cookies" element={<CookiePage />} />
            <Route path="about" element={<About />} />
            <Route path="organization" element={<Organization />} />
            <Route
              path="account/*"
              element={
                <AccountDetailsPage
                  mostAnticipatedEvents={mostAnticipatedEvents}
                />
              }
            />
            {/* <Route
              path="/account/*"
              element={
                <AccountDetailsPage
                  mostAnticipatedEvents={mostAnticipatedEvents}
                />
              }
            /> */}
            {/* <Route path="account/events" element={<AccountDetailsPage />} /> */}

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </SearchFilterContext.Provider>
  );
}

export default App;
