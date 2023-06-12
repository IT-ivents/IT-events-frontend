import styles from './PopupLink.module.css';

const PopupLink = ({ top, left }) => {
  return (
    <div className={styles.linkPopup} style={{ top: top, left: left }}>
      Ссылка скопирована
    </div>
  );
};

export default PopupLink;
