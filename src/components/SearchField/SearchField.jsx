import styles from './SearchField.module.css';

const SearchField = () => {
	return (
		<form className={styles.form}>
			<input
				className={styles.input}
				placeholder="Поиск по направлению, названию, теме или городу"
			/>
		</form>
	);
};

export default SearchField;
