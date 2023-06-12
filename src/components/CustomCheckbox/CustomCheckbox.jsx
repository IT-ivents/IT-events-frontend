import styles from './CustomCheckbox.module.css';

const CustomCheckbox = ({
  id,
  name,
  value,
  checked,
  title,
  label,
  handleChange,
  position,
  right,
  padding,
  ref,
}) => {
  return (
    <label htmlFor={label}>
      <input
        onChange={handleChange}
        id={id}
        name={name}
        value={value}
        type="checkbox"
        className={styles.checkboxButton}
        checked={checked}
        ref={ref}
      />
      <span
        className={styles.checkboxLabel}
        style={{ position: position, right: right, padding: padding }}
      >
        {title}
      </span>
    </label>
  );
};

export default CustomCheckbox;
