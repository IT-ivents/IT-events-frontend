import React from 'react';
import MainAppSection from '../components/MainAppSection/MainAppSection';
import SearchField from '../components/SearchField/SearchField';
import FilterBar from '../components/FilterBar/FilterBar';
import EventsList from '../components/EventsList/EventsList';
import {
	popularEvents,
	immediateEvents,
	interestingEvents,
} from '../utils/constants';

const MainPage = () => {
	return (
		<>
			<MainAppSection>
				<SearchField />
			</MainAppSection>
			<FilterBar />

			<EventsList title="Популярное" list={popularEvents} />
			<EventsList title="Ближайшие события" list={immediateEvents} />
			<EventsList title="Может быть интересно" list={interestingEvents} />
		</>
	);
};

export default MainPage;
