import React, { useState, useEffect, useMemo } from 'react';
import styles from './App.module.css';

import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ModalSignUp from '../Modals/ModalSingUp/ModalSignUp';
import ModalSignIn from '../Modals/ModalSignIn/ModalSignIn';
import { events } from '../../utils/events';
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
  AccountPage,
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

  const {
    handleLogin,
    handleRegister,
    handleLogout,
    loggedIn,
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

  const recommendedList = useMemo(() => {
    if (!selectedEvent || !selectedEvent.tags) {
      return [];
    }
    const recommended = eventsFromApi.filter((event) => {
      return (
        // Исключаем попадание выбранной карточки в список рекомендаций
        event.id !== selectedEvent.id &&
        event.tags.some((tag) => {
          const tagName = tag.name.toLowerCase().trim();
          return selectedEvent.tags.some(
            (selectedTag) => selectedTag.name.toLowerCase().trim() === tagName
          );
        })
      );
    });
    if (recommended.length === 0) {
      const randomEvents = getRandomEvents(eventsFromApi, 4);
      setRecommendedEvents(randomEvents);
      return randomEvents; // Добавлен возврат значения
    } else {
      setRecommendedEvents(recommended.slice(0, 4));
      return recommended.slice(0, 4); // Добавлен возврат значения
    }
  }, [selectedEvent, eventsFromApi]);

  const fetchDataAndSaveToLocalStorage = async () => {
    try {
      const data = await apiEvents.getEvents();
      //const data = events;
      const newData = data.data;
      console.log(newData);
      setEventsFromApi(newData);
      localStorage.setItem('eventsData', JSON.stringify(newData));
      // Разложить события по разным массивам
      if (newData) {
        const mostAnticipated = newData.slice(0, 6);
        const popular = newData.slice(7, 19);
        const interesting = newData.slice(19, 31);
        const soon = newData.slice(32, newData.length - 1);

        setMostAnticipatedEvents(mostAnticipated);
        setPopularEvents(popular);
        setInterestingEvents(interesting);
        setSoonEvents(soon);
      } else {
        throw new Error('Неверный формат данных eventsData:');
      }
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
    }
  };

  // Если Events есть в сторадж, достаем оттуда
  useEffect(() => {
    const storagedEventsData = localStorage.getItem('eventsData');
    if (!storagedEventsData) {
      fetchDataAndSaveToLocalStorage();
    } else {
      try {
        const resultData = JSON.parse(storagedEventsData);
        //console.log('results', resultData);
        setEventsFromApi(resultData);
        // Разложить события по разным массивам
        const mostAnticipated = resultData.slice(0, 6);
        const popular = resultData.slice(7, 19);
        const interesting = resultData.slice(19, 31);
        const soon = resultData.slice(32, resultData.length - 1);
        setMostAnticipatedEvents(mostAnticipated);
        setPopularEvents(popular);
        setInterestingEvents(interesting);
        setSoonEvents(soon);
      } catch (error) {
        console.error('Неверный формат данных eventsData:', error);
      }
    }
    // Обновление данных с сервера и сохранение в локальном хранилище
    fetchDataAndSaveToLocalStorage();
    // Устанавливаем интервал для периодического обновления данных
    const interval = setInterval(() => {
      fetchDataAndSaveToLocalStorage();
    }, 10 * 60 * 1000); // 10 минут в миллисекундах
    // Очищаем интервал при размонтировании компонента
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Загрузка избранных событий из локального хранилища
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites'));
    if (savedFavorites) {
      setFavorites(savedFavorites);
    }
  }, []);

  // Сохранение избранных событий в локальное хранилище
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const savedSelectedEvent = JSON.parse(
      localStorage.getItem('selectedEvent')
    );
    if (savedSelectedEvent) {
      setSelectedEvent(savedSelectedEvent);
    }
  }, []);

  // Cохранение текущего события в локальное хранилище чтобы не терять контекст.
  useEffect(() => {
    localStorage.setItem('selectedEvent', JSON.stringify(selectedEvent));
  }, [selectedEvent]);

  const handleCardClick = (event) => {
    setSelectedEvent(event);
    if (location.pathname === '/account/events') {
      navigate('/organization');
    } else {
      navigate(`event/${event.id}`);
    }
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
  }, [favorites]);

  // Функция обновления массивов событий
  const updateEvents = (events) => {
    return events.map((event) => {
      const isLiked = favorites.some((item) => item.id === event.id);
      return { ...event, isLiked };
    });
  };

  const searchEvents = (query) => {
    console.log(query);
    if (typeof query !== 'string') {
      return eventsFromApi;
    }
    const words = query.toLowerCase().trim().split(' ');
    // Разбиваем входящий запрос на отдельные слова и проверяем совпадение
    // хотя бы одного слова.
    const currentEvents = eventsFromApi.filter((event) => {
      const startDate = new Date(event.date_start).getTime();
      const isPastEvent = startDate < Date.now();
      return !isPastEvent;
    });

    const filteredEvents = [...eventsFromApi]
      .map((event) => {
        const isLiked = favorites.some((item) => item.id === event.id);
        // Установим релевантность
        return { ...event, isLiked, relevance: 0 };
      })
      .map((event) => {
        const { title, description, city, price, topic, tags, date_start } =
          event;

        words.forEach((word) => {
          const lowerCaseWord = word.toLowerCase().trim();

          if (
            title?.toLowerCase().trim().includes(lowerCaseWord) ||
            description?.toLowerCase().trim().includes(lowerCaseWord) ||
            city?.name?.toLowerCase().trim().includes(lowerCaseWord) ||
            price?.toLowerCase().trim().includes(lowerCaseWord) ||
            topic?.name?.toLowerCase().trim().includes(lowerCaseWord) ||
            tags.some((tag) =>
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
        if (a.relevance !== b.relevance) {
          return b.relevance - a.relevance;
        } else {
          return a.startDate - b.startDate;
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
    setSearchResult(eventsFromApi);
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
            <Route
              path="organization"
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
