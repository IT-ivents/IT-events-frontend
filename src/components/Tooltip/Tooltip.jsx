import styles from './Tooltip.module.css';

const Tooltip = ({ onClick }) => {
  return (
    <div className={styles.tooltip} onClick={onClick}>
      <div className={styles.tooltipContent}>
        Название Организации заполняется один раз. Будте внимательны!
      </div>
    </div>
  );
};

export default Tooltip;
