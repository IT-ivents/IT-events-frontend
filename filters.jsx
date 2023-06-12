// Если вам нужно изменить или отменить один из фильтров,
// вы можете сохранить список примененных фильтров
// в состоянии и обновлять его при необходимости.

// Вот пример, как это можно сделать:

import React, { useState } from 'react';

const MyComponent = () => {
  const [originalArray, setOriginalArray] = useState([1, 2, 3, 4, 5]);
  const [appliedFilters, setAppliedFilters] = useState([]); // Список примененных фильтров
  const [filteredArray, setFilteredArray] = useState(originalArray);

  const applyFilter = (filterFunction) => {
    const newFilters = [...appliedFilters, filterFunction];
    setAppliedFilters(newFilters);

    let newArray = originalArray;

    // Применяем все примененные фильтры последовательно
    newFilters.forEach((filter) => {
      newArray = newArray.filter(filter);
    });

    setFilteredArray(newArray);
  };

  const removeFilter = (filterIndex) => {
    const newFilters = [...appliedFilters];
    newFilters.splice(filterIndex, 1);
    setAppliedFilters(newFilters);

    let newArray = originalArray;

    // Применяем все примененные фильтры, кроме удаленного фильтра
    newFilters.forEach((filter) => {
      newArray = newArray.filter(filter);
    });

    setFilteredArray(newArray);
  };

  return (
    <div>
      <button onClick={() => applyFilter((item) => item % 2 === 0)}>
        Применить фильтр (четные числа)
      </button>
      <button onClick={() => applyFilter((item) => item > 2)}>
        Применить фильтр (числа больше 2)
      </button>
      {/* Добавьте дополнительные кнопки для других фильтров */}

      <ul>
        {appliedFilters.map((filter, index) => (
          <li key={index}>
            Примененный фильтр: {filter.name}
            <button onClick={() => removeFilter(index)}>Удалить</button>
          </li>
        ))}
      </ul>

      <ul>
        {filteredArray.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyComponent;

// В этом примере добавлены две функции: applyFilter и removeFilter.
// Функция applyFilter принимает фильтровочную функцию в качестве аргумента,
// добавляет ее в список примененных фильтров и применяет все фильтры
// к исходному массиву, чтобы получить новый отфильтрованный массив.
// Функция removeFilter удаляет фильтр из списка примененных фильтров и
// повторно применяет оставшиеся фильтры к исходному массиву для обновления
// отфильтрованного массива.
// Каждая кнопка "Применить фильтр" вызывает функцию applyFilter
// с соответствующей фильтровочной функцией.
