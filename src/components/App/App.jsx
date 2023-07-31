import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '../Layout/Layout';
import * as page from '../../pages';
import ProtectedRoute from '../../hoc/ProtectedRoute';
import SearchFilterContext from '../../utils/context/SearchFilterContext';
import { useAuthContext } from '../../utils/context/AuthContext';

function App() {
  const { handleLogout } = useAuthContext();

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
        <Route path="/" element={<Layout />}>
          <Route index element={<page.MainPage />} />
          <Route
            path="account/*"
            element={
              <ProtectedRoute>
                <page.AccountDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route path="events/:id" element={<page.EventPage />} />
          <Route
            path="events/:id/edit"
            element={
              <ProtectedRoute>
                <page.Organization />
              </ProtectedRoute>
            }
          />
          <Route
            path="events/new"
            element={
              <ProtectedRoute>
                <page.Organization />
              </ProtectedRoute>
            }
          />
          <Route path="favorites" element={<page.FavoritesPage />} />
          <Route path="notifications" element={<page.NotificationsPage />} />
          <Route path="results" element={<page.SearchResultPage />} />
          <Route path="preferences" element={<page.PreferencesPage />} />
          <Route path="privacy" element={<page.PrivacyPolicyPage />} />
          <Route path="cookies" element={<page.CookiePage />} />
          <Route path="about" element={<page.About />} />
          <Route path="*" element={<page.NotFoundPage />} />
        </Route>
      </Routes>
    </SearchFilterContext.Provider>
  );
}
export default App;
