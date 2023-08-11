import { useEffect, useState } from 'react';
import styles from './TagsSection.module.css';
import TagButton from '../TagButton/TagButton';
import { apiEvents } from '../../utils/api';

const TagsSection = ({ handleChange }) => {
  const [tags, setTags] = useState([]);
  const [showAllTags, setShowAllTags] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await apiEvents.getTags();
        setTags(response);
      } catch (error) {
        console.log('Error fetching tags:', error);
      }
    };
    fetchTags();
  }, []);

  const tagOptions = tags.map((tag) => ({
    value: tag.id,
    label: tag.name,
    slug: tag.slug,
  }));

  const toggleShowAllTags = () => {
    setShowAllTags(!showAllTags);
  };

  return (
    <>
      <div className={styles.tagsList}>
        {tagOptions
          .slice(0, showAllTags ? tags.length : 9)
          .map((tag, index) => (
            <TagButton
              key={index}
              value={tag.label}
              handleChange={handleChange}
            />
          ))}
      </div>
      {tags.length > 10 && (
        <button onClick={toggleShowAllTags} className={styles.showMore}>
          {showAllTags ? 'Свернуть все' : 'Показать больше'}
        </button>
      )}
    </>
  );
};

export default TagsSection;
