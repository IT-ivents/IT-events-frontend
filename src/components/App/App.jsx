import React from 'react';
import styles from './App.module.css';
import { Routes, Route } from 'react-router-dom';
import {
	MainPage,
	EventPage,
	AccountPage,
	FavoritesPage,
	NotFoundPage,
} from '../../pages';
import ProtectedRoute from '../../utils/router/ProtectedRoute';
import Layout from '../Layout/Layout';

function App() {
	const isLoggedIn = true;

	return (
		<div className={styles.wrapper}>
			<div className={styles.page}>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<MainPage />} />
						<Route path="event" element={<EventPage />} />
						<Route
							path="favorites"
							element={
								<ProtectedRoute isLoggedIn={isLoggedIn}>
									<FavoritesPage />
								</ProtectedRoute>
							}
						/>
						<Route
							path="account"
							element={
								<ProtectedRoute isLoggedIn={isLoggedIn}>
									<AccountPage />
								</ProtectedRoute>
							}
						/>
						<Route path="*" element={<NotFoundPage />} />
					</Route>
				</Routes>
			</div>
		</div>
	);
}

export default App;
