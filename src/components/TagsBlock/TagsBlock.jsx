import styles from './TagsBlock.module.css';
import TagButton from './../TagButton/TagButton';
import { tagsPopular } from './../../utils/constants/tags';

const TagsBlock = () => {
  return (
    <ul>
      <h4 className={styles.tagsListTitle}>Популярные теги</h4>
      <div className={styles.tagsList}>
        {tagsPopular.map((value, index) => (
          <TagButton value={value} key={index} />
        ))}
      </div>
    </ul>
  );
};

export default TagsBlock;
