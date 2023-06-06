import { useState } from 'react';
import styles from './DescriptionTabs.module.css';
import { tabs } from './../../utils/constants/tabs';

const DescriptionTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
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
      <div className={styles.tabContent}>{tabs[activeTab].content}</div>
    </>
  );
};

export default DescriptionTabs;
