import React, { useState, useEffect } from 'react';
import styles from './App.module.css';

import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ModalSignUp from '../Modals/ModalSingUp/ModalSignUp';
import ModalSignIn from '../Modals/ModalSignIn/ModalSignIn';
// import { events } from '../../utils/events';
import { apiEvents } from '../../utils/api';
import SearchFilterContext from '../../utils/context/SearchFilterContext';
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
import { getRandomEvents } from '../../utils/helperFunctions';
import useAuth from '../../utils/hooks/useAuth';

function App() {
  const [isModalSignInOpen, setIsModalSignInOpen] = useState(false);
  const [isModalSignUpOpen, setIsModalSignUpOpen] = useState(false);

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

  const {
    handleLogin,
    handleRegister,
    handleLogout,
    loggedIn,
    currentUser,
    isLoading,
    serverError,
    setServerError,
  } = useAuth();

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

  console.log(findValues, 'findValues');

  const navigate = useNavigate();
  const location = useLocation();

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

  useEffect(() => {
    if (location.pathname === '/') {
      resetFilters();
      setSearchQuery('');
    }
  }, [location]);

  // useEffect(() => {
  //   if (location.pathname === '/results') {
  //     resetFilters();
  //   }
  // }, []);

  // -------------- РЕКОМЕНДОВАННЫЕ СОБЫТИЯ ------------  //
  const getRecommendedEvents = (events) => {
    if (!selectedEvent || !selectedEvent.tags) {
      return [];
    }
    const selectedTags = selectedEvent.tags?.map((tag) =>
      tag?.name?.toLowerCase().trim()
    );
    const recommended = events.filter((event) => {
      return (
        event.id !== selectedEvent.id &&
        event.tags?.some((tag) =>
          selectedTags.includes(tag.name.toLowerCase().trim())
        ) &&
        event.topic?.some((topic) =>
          selectedTags.includes(topic.name.toLowerCase().trim())
        )
      );
    });

    if (recommended.length === 0) {
      const randomEvents = getRandomEvents(events, 4);
      return randomEvents;
    } else {
      return recommended.slice(0, 4);
    }
  };

  useEffect(() => {
    const recommended = getRecommendedEvents(upcomingEvents);
    setRecommendedEvents(recommended);
  }, [selectedEvent]);

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
      const upcomingEvents = getCurrentEvents(updatedEvents);
      const pastEvents = getPastEvents(eventsFromApi);
      console.log('Upcoming events:', upcomingEvents);
      console.log('Past Events:', pastEvents);
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
      console.log('Favorites saved:', favorites);
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
    if (location.pathname === '/account/events') {
      // navigate('/organization');
      navigate('/edit');
    } else {
      navigate(`event/${event.id}`);
    }
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

  const searchEvents = (query) => {
    if (typeof query !== 'string') {
      return upcomingEvents;
    }
    const words = query.toLowerCase().trim().split(' ');
    // Разбиваем входящий запрос на отдельные слова и проверяем совпадение
    // хотя бы одного слова.

    const filteredEvents = [...upcomingEvents]
      .map((event) => {
        const isLiked = favorites.some((item) => item.id === event.id);
        // Установим релевантность
        return { ...event, isLiked, relevance: 0 };
      })
      .map((event) => {
        const {
          title,
          description,
          city,
          price,
          topic,
          tags,
          date_start,
          program,
        } = event;

        words.forEach((word) => {
          const lowerCaseWord = word.toLowerCase().trim();

          if (
            title?.toLowerCase().trim().includes(lowerCaseWord) ||
            description?.toLowerCase().trim().includes(lowerCaseWord) ||
            program?.toLowerCase().trim().includes(lowerCaseWord) ||
            city?.toLowerCase().trim().includes(lowerCaseWord) ||
            price?.toLowerCase().trim().includes(lowerCaseWord) ||
            topic?.name?.toLowerCase().trim().includes(lowerCaseWord) ||
            tags?.some((tag) =>
              tag.name.toLowerCase().trim().includes(lowerCaseWord)
            )
          ) {
            // При каждом совпадении увеличиваем релевантность конкретной карточки
            // filtered в консоли показывает результат нашего поиска
            event.relevance++;
          }
        });
        const startDate = new Date(date_start).getTime();
        event.startDate = startDate;
        return event;
      })
      .filter((event) => event.relevance > 0)
      // Сортируем по релевантности наши карточки и потом по дате от ближайшего
      .sort((a, b) => {
        if (a.startDate !== b.startDate) {
          return a.startDate - b.startDate;
        } else {
          return b.relevance - a.relevance;
        }
      });

    return filteredEvents;
  };

  //const filteredEvents = useMemo(() => searchEvents(searchQuery), [searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredResult = searchEvents(query);
    setSearchResult(filteredResult);
    navigate('/results');
  };

  const handleFilterSearch = () => {
    //setSearchQuery(query)
    setSearchResult(upcomingEvents);
    navigate('/results');
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
            loggedIn={loggedIn}
            currentUser={currentUser}
            selectedEvent={selectedEvent}
          />
          {isModalSignInOpen && (
            <ModalSignIn
              isOpen={toggleModalSignIn}
              handleClose={toggleModalSignIn}
              isRegister={toggleModalSignUp}
              onSignIn={handleLogin}
              loggedIn={loggedIn}
              serverError={serverError}
              setServerError={setServerError}
            />
          )}
          {isModalSignUpOpen && (
            <ModalSignUp
              isOpen={toggleModalSignUp}
              handleClose={toggleModalSignUp}
              onSignUp={handleRegister}
              loggedIn={loggedIn}
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
              path="/event/:id"
              element={
                <EventPage
                  eventsFromApi={eventsFromApi}
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
            <Route
              path="about"
              element={<About toggleModalSignUp={toggleModalSignUp} />}
            />

            <Route
              path="organization"
              element={<Organization selectedEvent={selectedEvent} />}
            />
            <Route
              path="edit"
              element={<Organization selectedEvent={selectedEvent} />}
            />

            <Route
              path="account/*"
              element={
                <AccountDetailsPage
                  mostAnticipatedEvents={mostAnticipatedEvents}
                  selectedEvent={selectedEvent}
                  onCardClick={handleCardClick}
                  onNewEventClick={() => setSelectedEvent(null)}
                  currentUser={currentUser}
                  handleLogout={handleLogout}
                />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer onEnter={toggleModalSignIn} loggedIn={loggedIn} />
        </div>
      </div>
    </SearchFilterContext.Provider>
  );
}

export default App;
