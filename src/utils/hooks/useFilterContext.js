import { useState } from 'react';

const useFilterContext = () => {
  const initialValues = {
    status: [],
    city: null,
    date: null,
    specialities: [],
    price: null,
    findTags: null,
    tags: [],
  };

  const [findValues, setFindValues] = useState(null);
  const [values, setValues] = useState(initialValues);

  const resetFilters = () => {
    setValues(initialValues);
  };

  return {
    findValues,
    setFindValues,
    values,
    setValues,
    resetFilters,
  };
};

export default useFilterContext;
