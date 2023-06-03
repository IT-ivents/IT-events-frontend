import styles from './FilterBar.module.css';

const FilterBar = ({ onFilter }) => {
  const handleFilterClick = (option) => {
    if (onFilter) {
      onFilter(option);
    }
  };

  return (
    <>
      <ul className={`${styles.list}`}>
        <li className={styles.item}>
          <button
            type="button"
            className={styles.filterButton}
            onClick={() => {
              handleFilterClick('name');
            }}
          >
            Название
          </button>
        </li>
        <li className={styles.item}>
          <button
            type="button"
            className={styles.filterButton}
            onClick={() => {
              handleFilterClick('date');
            }}
          >
            Дата
          </button>
        </li>
        <li className={styles.item}>
          <button
            type="button"
            className={styles.filterButton}
            onClick={() => {
              handleFilterClick('price');
            }}
          >
            Цена
          </button>
        </li>
      </ul>
      <div className={styles.divider}></div>
    </>
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
