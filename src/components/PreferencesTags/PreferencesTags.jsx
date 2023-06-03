import styles from './PreferencesTags.module.css';
import TagButton from './../TagButton/TagButton';
import {
  tagsDs,
  tagsDesign,
  tagsManagement,
  tagsDev,
} from './../../utils/constants/tags';
import DSImage from './../../images/Preferences/DS.svg';
import DesignImage from './../../images/Preferences/design.svg';
import ManagementImage from './../../images/Preferences/management.svg';
import DevImage from './../../images/Preferences/dev.svg';

const PreferencesTags = () => {
  return (
    <>
      <div className={styles.tagBlock}>
        <figure className={styles.tagFigure}>
          <img src={DSImage} alt="Tags Icons" />
          <figcaption>Анализ данных</figcaption>
        </figure>
        <div className={styles.tagsList}>
          {tagsDs.map((value, index) => (
            <TagButton value={value} key={index} />
          ))}
        </div>
      </div>
      <div className={styles.tagBlock}>
        <figure className={styles.tagFigure}>
          <img src={DesignImage} alt="Tags Icons" />
          <figcaption>Дизайн</figcaption>
        </figure>
        <div className={styles.tagsList}>
          {tagsDesign.map((value, index) => (
            <TagButton value={value} key={index} />
          ))}
        </div>
      </div>
      <div className={styles.tagBlock}>
        <figure className={styles.tagFigure}>
          <img src={ManagementImage} alt="Tags Icons" />
          <figcaption>Менеджмент</figcaption>
        </figure>
        <div className={styles.tagsList}>
          {tagsManagement.map((value, index) => (
            <TagButton value={value} key={index} />
          ))}
        </div>
      </div>
      <div className={styles.tagBlock}>
        <figure className={styles.tagFigure}>
          <img src={DevImage} alt="Tags Icons" />
          <figcaption>Разработка</figcaption>
        </figure>
        <div className={styles.tagsList}>
          {tagsDev.map((value, index) => (
            <TagButton value={value} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default PreferencesTags;
