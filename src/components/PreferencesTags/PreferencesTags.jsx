import styles from './PreferencesTags.module.css';
import TagButton from './../TagButton/TagButton';
import { tagsBlock } from './../../utils/constants/tags';

const TagBlock = ({ imageSrc, altText, caption, tags }) => {
  return (
    <div className={styles.tagBlock}>
      <figure className={styles.tagFigure}>
        <img src={imageSrc} alt={altText} />
        <figcaption>{caption}</figcaption>
      </figure>
      <div className={styles.tagsList}>
        {tags.map((value, index) => (
          <TagButton value={value} key={index} />
        ))}
      </div>
    </div>
  );
};

const PreferencesTags = () => {
  return (
    <>
      {tagsBlock.map((block, index) => (
        <TagBlock {...block} key={index} />
      ))}
    </>
  );
};

export default PreferencesTags;
