import styles from './TagsSection.module.css';
import TagButton from '../TagButton/TagButton';
import { tagsPopular } from '../../utils/constants/tags';

const TagsSection = ({ handleChange }) => {
  return (
    <section className={styles.TagsSection}>
      <h4 className={styles.tagsListTitle}>Популярные теги</h4>
      <div className={styles.tagsList}>
        {tagsPopular.map((value, index) => (
          <TagButton value={value} key={index} handleChange={handleChange} />
        ))}
      </div>
    </section>
  );
};

export default TagsSection;
