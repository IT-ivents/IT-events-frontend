import { useState } from 'react';
import styles from './DescriptionTabs.module.css';
import { tabs } from './../../utils/constants/tabs';

const DescriptionTabs = ({ selectedEvent }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const getContentByTab = () => {
    switch (activeTab) {
      case 0:
        return selectedEvent?.description || 'Нет данных';
      case 1:
        return selectedEvent?.program || 'Нет данных';
      case 2:
        return selectedEvent?.organizer || 'Нет данных';
      case 3:
        return selectedEvent?.partners || 'Нет данных';
      default:
        return '';
    }
  };

  return (
    <>
      <div className={styles.eventTabs}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={
              index === activeTab ? `${styles.activeTab}` : `${styles.tab}`
            }
            onClick={() => handleTabClick(index)}
          >
            {tab.title}
          </div>
        ))}
      </div>
      <div className={styles.tabContent}>{getContentByTab()}</div>
    </>
  );
};

export default DescriptionTabs;
