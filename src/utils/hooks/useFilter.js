import { useState } from 'react';
import debounce from '../debounce';

const testData = {
  city: ['москва', 'можайск', 'питер', 'петрозаводск'],
  findTags: ['html', 'css', 'react', 'redux'],
};

export function useFilter() {
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

  const handleFilter = ({ name, value }) => {
    const searchList = testData[name];
    const debouncedSetFindValues = debounce((data) => setFindValues(data), 500);

    if (searchList && value !== '') {
      const findValue = searchList.filter((el) => {
        return el.search(value.toLowerCase()) === 0;
      });

      if (findValue.length > 0) {
        debouncedSetFindValues({ [name]: findValue });
      } else debouncedSetFindValues(null);
    } else debouncedSetFindValues(null);
  };

  const handleInputChange = (event) => {
    const input = event.currentTarget;
    const name = input.name;
    const value = input.value;

    if (name === 'specialities' || name === 'status') {
      const includes = values[name].includes(value);

      if (includes) {
        setValues({
          ...values,
          [name]: values[name].filter((el) => el !== value),
        });
      } else {
        setValues({ ...values, [name]: [...values[name], value] });
      }
    } else {
      setValues({ ...values, [name]: value });
      handleFilter({ name, value });
    }
  };

  const handleButtonChange = (data) => {
    const includes = values.tags.includes(data.tags);

    if (includes) {
      setValues({
        ...values,
        tags: values.tags.filter((el) => el !== data.tags),
      });
    } else {
      setValues({ ...values, tags: [...values.tags, data.tags] });
    }
  };

  const setItemOnClick = (item) => {
    setValues({ ...values, ...item });
    setFindValues(null);
  };

  return {
    values,
    handleInputChange,
    handleButtonChange,
    findValues,
    setItemOnClick,
  };
}
