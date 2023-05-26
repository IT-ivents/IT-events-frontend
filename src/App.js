import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
	MainPage,
	EventPage,
	AccountPage,
	FavoritesPage,
	SignIn,
	SignOut,
	NotFoundPage,
} from './pages';
import ProtectedRoute from './utils/router/ProtectedRoute';
import './App.css';

function App() {
	const isLoggedIn = true;

	return (
		<Routes>
			<Route exact path="/" element={<MainPage />} />
			<Route path="/event" element={<EventPage />} />
			<Route path="/favorites" element={<FavoritesPage />} />
			<Route
				path="/account"
				element={
					<ProtectedRoute isLoggedIn={isLoggedIn}>
						<AccountPage />
					</ProtectedRoute>
				}
			/>
			<Route path="/signin" element={<SignIn />} />
			<Route path="/sighout" element={<SignOut />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}

export default App;
