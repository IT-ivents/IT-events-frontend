import React from 'react';
import styles from './App.module.css';
import { Routes, Route } from 'react-router-dom';
import {
	MainPage,
	EventPage,
	AccountPage,
	FavoritesPage,
	SignIn,
	SignOut,
	NotFoundPage,
} from '../../pages';
import ProtectedRoute from '../../utils/router/ProtectedRoute';

function App() {
	const isLoggedIn = true;

	return (
		<div className={styles.wrapper}>
			<div className={styles.page}>
				<Routes>
					<Route exact path="/" element={<MainPage />} />
					<Route path="/event" element={<EventPage />} />
					<Route
						path="/favorites"
						element={
							<ProtectedRoute isLoggedIn={isLoggedIn}>
								<FavoritesPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/account"
						element={
							<ProtectedRoute isLoggedIn={isLoggedIn}>
								<AccountPage />
							</ProtectedRoute>
						}
					/>
					<Route path="/sign-in" element={<SignIn />} />
					<Route path="/sign-out" element={<SignOut />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
