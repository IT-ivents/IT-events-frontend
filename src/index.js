import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './utils/context/AuthContext';
import { EventsProvider } from './utils/context/EventsContext';
import { FiltersProvider } from './utils/context/SearchFilterContext';
import { ModalProvider } from './utils/context/ModalContext';
import './index.css';
import App from './components/App/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <AuthProvider>
      <EventsProvider>
        <FiltersProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </FiltersProvider>
      </EventsProvider>
    </AuthProvider>
  </Router>
);
