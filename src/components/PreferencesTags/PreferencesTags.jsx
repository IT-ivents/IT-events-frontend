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
        <img src={DSImage} alt="Tags Icons" />
        <h1>Анализ данных</h1>
        {tagsDs.map((value, index) => (
          <TagButton value={value} key={index} />
        ))}
      </div>
      <div className={styles.tagBlock}>
        <img src={DesignImage} alt="Tags Icons" />
        <h1>Дизайн</h1>
        {tagsDesign.map((value, index) => (
          <TagButton value={value} key={index} />
        ))}
      </div>
      <div className={styles.tagBlock}>
        <img src={ManagementImage} alt="Tags Icons" />
        <h1>Менеджмент</h1>
        {tagsManagement.map((value, index) => (
          <TagButton value={value} key={index} />
        ))}
      </div>
      <div className={styles.tagBlock}>
        <img src={DevImage} alt="Tags Icons" />
        <h1>Разработка</h1>
        {tagsDev.map((value, index) => (
          <TagButton value={value} key={index} />
        ))}
      </div>
    </>
  );
};

export default PreferencesTags;
