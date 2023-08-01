import React from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { Layout } from '../Layout/Layout';
import * as page from '../../pages';
import ProtectedRoute from '../../hoc/ProtectedRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
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
      <Route
        path="events/:id"
        element={<page.EventPage />}
        loader={page.eventLoader}
      />
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
  )
);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
