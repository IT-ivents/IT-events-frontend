import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes } from 'react-router-dom';

import './index.css';
import App from './components/App/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <AuthProvider>
  //   <EventsProvider>
  //     <FiltersProvider>
  //       <ModalProvider>
  //         <App />
  //       </ModalProvider>
  //     </FiltersProvider>
  //   </EventsProvider>
  // </AuthProvider>
  <App />
);
