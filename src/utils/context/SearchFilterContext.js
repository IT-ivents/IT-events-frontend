// import { createContext } from 'react';

// const SearchFilterContext = createContext(null);

// export default SearchFilterContext;

import React, { createContext, useContext } from 'react';
import useFilters from '../hooks/useFilters';

const FiltersContext = createContext();

export function FiltersProvider(props) {
  const filters = useFilters();

  return <FiltersContext.Provider value={filters} {...props} />;
}

export function useFiltersContext() {
  return useContext(FiltersContext);
}
