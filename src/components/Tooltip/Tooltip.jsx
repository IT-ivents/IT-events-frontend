import styles from './Tooltip.module.css';

const Tooltip = ({ onClick, right }) => {
  return (
    <div className={styles.tooltip} onClick={onClick} style={{ right: right }}>
      <div className={styles.tooltipContent}>
        Название Организации заполняется один раз. Будте внимательны!
      </div>
    </div>
  );
};

export default Tooltip;
