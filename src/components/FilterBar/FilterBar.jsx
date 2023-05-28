import { useState } from 'react';
import { filterSelects } from '../../utils/constants';
import styles from './FilterBar.module.css';
import arrow from '../../images/select-arrow.svg';

const FilterBar = () => {
  const [openSelects, setOpenSelects] = useState([]);

  const toggleSelect = (selectId) => {
    if (openSelects.includes(selectId)) {
      setOpenSelects(openSelects.filter((id) => id !== selectId));
    } else {
      setOpenSelects([...openSelects, selectId]);
    }
  };

  return (
    <ul className={styles.list}>
      {filterSelects.map((select) => (
        <li
          className={styles.li}
          key={select.id}
          onClick={() => toggleSelect(select.id)}
        >
          <p>{select.title}</p>
          <img src={arrow} alt="arrow" />
          {openSelects.includes(select.id) && (
            <ul className={styles.optionsList}>
              {select.options &&
                select.options.map((option, index) => (
                  <li key={index} className={styles.option}>
                    {option}
                  </li>
                ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default FilterBar;

// <li key={select.id} className={styles.li}>
// 	<FormControl sx={{ m: 1, minWidth: select.title === 'Направление' ? 150 : 120}}>
// 		<InputLabel id={`select-${select.id}-label`}>
// 			{select.title}
// 		</InputLabel>
// 		<Select
// 			labelId={`select-${select.id}-label`}
// 			id={`select-${select.id}`}
// 			name={select.title}
// 			value={selectedValues[select.title] || ''}
// 			defaultValue={select.title}
// 			onChange={handleChange}
// 			autoWidth
// 			label={select.title}
// 			classes={{ root: styles.noBorder }} // Apply custom style to remove the border
// 		>
// 			{select.options &&
// 				select.options.map((option, index) => (
// 					<MenuItem key={index} value={option}>
// 						{option}
// 					</MenuItem>
// 				))}
// 		</Select>
// 	</FormControl>
// </li>

// <li key={select.id} className={styles.li}>
// 	{/* <p >{select.title}</p>
// 	<img src={arrow} alt='arrow'/> */}

// <select name={''} className={styles.select}>
// 		{select.options &&
// 		select.options.map((option, index) => (
// 				<option key={index} value={option}>{option}</option>
//  			))
//  		}
// 	</select>

// </li>

// <li key={select.id} className={styles.li}>
// 	<p onClick={toggleOptions}>{select.title}</p>
// 	<img src={arrow} alt='arrow'/>

// 	<select name={''} className={styles.select}>
// 		{select.options &&
// 			select.options.map((option, index) => (
// 				<option key={index} value={option}>{option}</option>
// 			))
// 		}
// 	</select>

// </li>
