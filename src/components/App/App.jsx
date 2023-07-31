import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Layout } from '../Layout/Layout';
import { apiEvents } from '../../utils/api';
import SearchFilterContext from '../../utils/context/SearchFilterContext';
import ProtectedRoute from '../../hoc/ProtectedRoute';
import { useAuthContext } from '../../utils/context/AuthContext';
import { getRandomEvents } from '../../utils/helperFunctions';
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
  AccountDetailsPage,
} from '../../pages';

function App() {
  const { handleLogout } = useAuthContext();

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [eventsFromApi, setEventsFromApi] = useState([]);

  const [mostAnticipatedEvents, setMostAnticipatedEvents] = useState([]);
  const [popularEvents, setPopularEvents] = useState([]);
  const [soonEvents, setSoonEvents] = useState([]);
  const [interestingEvents, setInterestingEvents] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  // стейты для поисковго фильтра
  const [values, setValues] = useState({
    status: [],
    city: null,
    date: null,
    specialities: [],
    price: null,
    findTags: null,
    tags: [],
  });
  const [findValues, setFindValues] = useState(null);

  const resetFilters = () => {
    setValues({
      status: [],
      city: null,
      date: null,
      specialities: [],
      price: null,
      findTags: null,
      tags: [],
    });
  };

  // Если Пользотваль не выставил "Запомнить меня" -> авторазлогин через 24ч.
  useEffect(() => {
    const isNotRemembered = localStorage.getItem('remembered') === 'false';
    if (isNotRemembered) {
      const timeout = setTimeout(() => {
        handleLogout();
      }, 24 * 60 * 60 * 1000);
      return () => clearTimeout(timeout);
    }
  }, []);

  // Обнулить фильтры и поисковый запрос на MAIN PAGE
  useEffect(() => {
    if (location.pathname === '/') {
      resetFilters();
      setSearchQuery('');
    }
  }, [location]);

  // ---------- ТЕКУЩИЕ СОБЫТИЯ ------------- //
  const getCurrentEvents = (events) => {
    const currentDate = new Date();
    return events
      .filter((event) => new Date(event.date_start) >= currentDate)
      .sort((a, b) => new Date(a.date_start) - new Date(b.date_start));
  };
  // ------------ ПРОШЕДШИЕ СОБЫТИЯ ----------- //
  const getPastEvents = (events) => {
    const currentDate = new Date();
    return events
      .filter((event) => new Date(event.date_start) < currentDate)
      .sort((a, b) => new Date(b.date_start) - new Date(a.date_start));
  };
  // ------------ ПОЛУЧЕНИЕ СОБЫТИЙ С СЕРВЕРА ------------ //
  useEffect(() => {
    const fetchDataAndSaveToLocalStorage = async () => {
      try {
        const data = await apiEvents.getEvents();
        const newData = data.data;
        //console.log(newData);
        setEventsFromApi(newData);
        updateEventArrays(newData);
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
      }
    };
    const updateEventArrays = (events) => {
      const updatedEvents = events.map((event) => {
        const isLiked = favorites.some((item) => item.id === event.id);
        return { ...event, isLiked };
      });
      // ДЕЛИМ НА ПРЕДСТОЯЩИЕ И ПРОШЕДШИЕ
      const upcomingEvents = getCurrentEvents([...updatedEvents]);
      const pastEvents = getPastEvents([...eventsFromApi]);
      const recommended = getRandomEvents([...upcomingEvents], 4);
      console.log('Upcoming events:', upcomingEvents);
      //console.log('Past Events:', pastEvents);
      setRecommendedEvents(recommended);
      setMostAnticipatedEvents(upcomingEvents);
      setPopularEvents(upcomingEvents.slice(9, 24));
      setInterestingEvents(upcomingEvents.slice(10, upcomingEvents.length - 1));
      setSoonEvents(upcomingEvents.slice(0, 6));
      setSearchResult(upcomingEvents);
      setPastEvents(pastEvents);
      setUpcomingEvents(upcomingEvents);
      localStorage.setItem('eventsData', JSON.stringify(upcomingEvents));
    };

    const fetchData = async () => {
      try {
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }
        const storagedEvents = localStorage.getItem('eventsData');
        if (!storagedEvents) {
          await fetchDataAndSaveToLocalStorage();
        } else {
          updateEventArrays(JSON.parse(storagedEvents));
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };
    fetchData();
    // ОБНОВЛЕНИЕ СОБЫТИЙ С СЕРВЕРА КАЖДЫЕ 7 МИНУТ
    const interval = setInterval(() => {
      localStorage.removeItem('eventsData');
      console.log('Обновились данные');
      fetchData();
    }, 420000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Сохранение избранных событий в локальное хранилище
  useEffect(() => {
    if (favorites.length >= 0) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
      //console.log('Favorites saved:', favorites);
    }
  }, [favorites]);

  // Cохранение текущего события в локальное хранилище чтобы не терять контекст.
  useEffect(() => {
    if (selectedEvent) {
      localStorage.setItem('selectedEvent', JSON.stringify(selectedEvent));
    }
  }, [selectedEvent]);

  useEffect(() => {
    const savedSelectedEvent = localStorage.getItem('selectedEvent');
    if (savedSelectedEvent) {
      setSelectedEvent(JSON.parse(savedSelectedEvent));
    }
  }, []);

  const handleCardClick = (event) => {
    setSelectedEvent(event);
  };

  // Функция обновления массива избранных событий
  const updateFavorites = (event) => {
    setFavorites((prevFavorites) => {
      const isEventInFavorites = prevFavorites.some(
        (item) => item.id === event.id
      );
      if (!isEventInFavorites) {
        return [...prevFavorites, { ...event, isLiked: true }];
      } else {
        return prevFavorites.filter((item) => item.id !== event.id);
      }
    });
  };
  // MAIN LIKE UPDATE FUNCTION
  const toggleFavorite = (event) => {
    updateFavorites(event);
    // Обновление isLiked у selectedEvent
    const updatedSelectedEvent = { ...selectedEvent };
    if (selectedEvent && selectedEvent.id === event.id) {
      updatedSelectedEvent.isLiked = !updatedSelectedEvent.isLiked;
    }
    setSelectedEvent(updatedSelectedEvent);
  };

  // Функция обновления массивов событий при изменении избранных
  useEffect(() => {
    setMostAnticipatedEvents((prevEvents) => updateEvents(prevEvents));
    setPopularEvents((prevEvents) => updateEvents(prevEvents));
    setSoonEvents((prevEvents) => updateEvents(prevEvents));
    setInterestingEvents((prevEvents) => updateEvents(prevEvents));
    setSearchResult((prevEvents) => updateEvents(prevEvents));
    setRecommendedEvents((prevEvents) => updateEvents(prevEvents));
    setEventsFromApi((prevEvents) => updateEvents(prevEvents));
    setUpcomingEvents((prevEvents) => updateEvents(prevEvents));
  }, [favorites]);

  // Функция обновления массивов событий
  function updateEvents(events) {
    return events.map((event) => {
      const isLiked = favorites.some((item) => item.id === event.id);
      return { ...event, isLiked };
    });
  }

  // RESERVE SearchEvents in reserveFuntions.js

  const handleSearch = (request) => {
    setSearchQuery(request);
    apiEvents
      .searchRequest(request)
      .then((response) => {
        const filteredResult = response.data;
        setSearchResult(filteredResult);
        navigate('/results');
      })
      .catch((error) => {
        console.error('Ошибка при получении результатов поиска', error);
      });
  };

  const handleFilterSearch = () => {
    //setSearchQuery(query)
    setSearchResult(upcomingEvents);
    navigate('/results');
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
      <Routes>
        <Route
          path="/"
          element={<Layout onSearch={handleSearch} searchQuery={searchQuery} />}
        >
          <Route
            index
            element={
              <MainPage
                onCardClick={handleCardClick}
                onLikeClick={toggleFavorite}
                mostAnticipatedEvents={mostAnticipatedEvents}
                popularEvents={popularEvents}
                soonEvents={soonEvents}
                interestingEvents={interestingEvents}
                handleFilterSearch={handleFilterSearch}
                searchQuery={searchQuery}
                onSearch={handleSearch}
                setSelectedEvent={setSelectedEvent}
              />
            }
          />
          <Route
            path="account/*"
            element={
              <ProtectedRoute>
                <AccountDetailsPage onCardClick={handleCardClick} />
              </ProtectedRoute>
            }
          />
          <Route
            path="events/:id"
            element={
              <EventPage
                upcomingEvents={upcomingEvents}
                recommendedEvents={recommendedEvents}
                selectedEvent={selectedEvent}
                setSelectedEvent={setSelectedEvent}
                onCardClick={handleCardClick}
                onLikeClick={toggleFavorite}
              />
            }
          />
          <Route
            path="events/:id/edit"
            element={
              <ProtectedRoute>
                <Organization selectedEvent={selectedEvent} />
              </ProtectedRoute>
            }
          />
          <Route
            path="events/new"
            element={
              <ProtectedRoute>
                <Organization />
              </ProtectedRoute>
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
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </SearchFilterContext.Provider>
  );
}
export default App;
