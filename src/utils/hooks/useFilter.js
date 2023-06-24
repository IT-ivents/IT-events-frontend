import debounce from '../debounce';

const testData = {
  city: [
    'владивосток',
    'смоленск',
    'москва',
    'екатеринбург',
    'санкт-Петербург',
    'дулепово',
    'сочи',
    'бердск',
  ],
  findTags: [
    'Architecture and patterns',
    'C++',
    'AI',
    'HR',
    'UX/UI',
    'Docker',
    'Kubernetes',
    'Python',
    'React',
    'Redis',
    'Cybersecurity',
    'Data Management',
    'Data Processing',
    'DataOps',
    'Product',
    'architecture of IT solutions',
    'Fintech',
    'Project Management',
    'C#',
    'Interface design',
    'Java',
    'JavaScript',
    'Rust',
    'Go',
    'Linux',
    'MeeGo',
    'MySQL',
    'NGINX',
    'PHP',
    'PostgreSQL',
    'SQL',
    'game-industry',
    '1C',
    'EDO',
    'XML',
    'VPN',
    'GPT',
    'ML',
    'b2c',
    'b2b',
    'ит в транспорте',
    'FrontOps',
    'FastAPI',
    'спутниковая связь',
    'animation',
    'game-design',
    'game-mechanics',
  ],
};

export function useFilter({ values, setValues, setFindValues }) {
  const handleFilter = ({ name, value }) => {
    const searchList = testData[name]?.map((item) => item?.toLowerCase());
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

  const handleDateChange = (date) => {
    setValues({ ...values, date: date });
    // Обработка фильтрации по дате (добавьте свою логику)
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

  const deleteValue = (item) => {
    if (item === 'status' || item === 'tags' || item === 'specialities') {
      setValues({ ...values, [item]: [] });
    } else setValues({ ...values, [item]: null });
  };

  return {
    handleInputChange,
    handleButtonChange,
    setItemOnClick,
    deleteValue,
    handleDateChange,
  };
}
