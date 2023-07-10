import React, { useState, useEffect, useMemo } from 'react';
import styles from './App.module.css';

import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from 'react-router-dom';
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

  const getSoonEvents = (events) => {
    const currentDate = new Date();
    return events
      .filter((event) => new Date(event.date_start) >= currentDate)
      .sort((a, b) => new Date(a.date_start) - new Date(b.date_start))
      .slice(0, 6);
  };

  useEffect(() => {
    const fetchDataAndSaveToLocalStorage = async () => {
      try {
        const data = await apiEvents.getEvents();
        const newData = data.data;
        console.log(newData);
        setEventsFromApi(newData);
        localStorage.setItem('eventsData', JSON.stringify(newData));
        // Обновить массивы событий с учетом избранных событий
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
      const soonEvents = getSoonEvents(updatedEvents);
      setMostAnticipatedEvents(updatedEvents.slice(0, 6));
      setPopularEvents(updatedEvents.slice(7, 19));
      setInterestingEvents(updatedEvents.slice(19, events.length - 1));
      setSoonEvents(soonEvents);
      setSearchResult(updatedEvents);
    };

    const fetchData = async () => {
      try {
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }
        const savedSelectedEvent = JSON.parse(
          localStorage.getItem('selectedEvent')
        );
        if (savedSelectedEvent) {
          setSelectedEvent(savedSelectedEvent);
        }
        const storagedEventsData = localStorage.getItem('eventsData');
        if (!storagedEventsData) {
          await fetchDataAndSaveToLocalStorage();
        } else {
          const resultData = JSON.parse(storagedEventsData);
          setEventsFromApi(resultData);
          updateEventArrays(resultData);
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 600000); // 10 минут в миллисекундах

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
    localStorage.setItem('selectedEvent', JSON.stringify(selectedEvent));
  }, [selectedEvent]);

  const handleCardClick = (event) => {
    if (location.pathname === '/account/events') {
      navigate('/organization');
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
  function updateEvents(events) {
    return events.map((event) => {
      const isLiked = favorites.some((item) => item.id === event.id);
      return { ...event, isLiked };
    });
  }

  const searchEvents = (query) => {
    console.log(query);
    if (typeof query !== 'string') {
      return eventsFromApi;
    }
    const words = query.toLowerCase().trim().split(' ');
    const currentDate = Date.now();

    // Разбиваем входящий запрос на отдельные слова и проверяем совпадение
    // хотя бы одного слова.
    // const currentEvents = eventsFromApi.filter((event) => {
    //   const startDate = new Date(event.date_start).getTime();
    //   const isPastEvent = startDate < Date.now();
    //   return !isPastEvent;
    // });

    const filteredEvents = [...eventsFromApi]
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
            city?.name?.toLowerCase().trim().includes(lowerCaseWord) ||
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
    const pastEvents = filteredEvents.filter(
      (event) => event.startDate < currentDate
    );
    const currentEvents = filteredEvents.filter(
      (event) => event.startDate >= currentDate
    );
    console.log('Прошедшие', pastEvents);
    console.log('Актуальные', currentEvents);
    return currentEvents;
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
                  popularEvents={popularEvents}
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
                  currentUser={currentUser}
                  handleLogout={handleLogout}
                />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer onEnter={toggleModalSignIn} />
        </div>
      </div>
    </SearchFilterContext.Provider>
  );
}

export default App;
