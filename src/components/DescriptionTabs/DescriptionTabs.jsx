import React, { useState } from 'react';
import styles from './DescriptionTabs.module.css';

function DescriptionTabs() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const tabs = [
    {
      title: 'О мероприятии',
      content: (
        <p>
          25 мая в Петербурге и онлайне пройдет митап для разработчиков любого
          уровня, тимлидов и целых команд, которые задумываются или уже начали
          применять Go в коммерческой разработке. Поговорим, как писать
          производительный и легко сопровождаемый код без «побочных эффектов»
        </p>
      ),
    },
    {
      title: 'Программа и спикеры',
      content: <p>Программа и спикеры. Тут пока пусто.</p>,
    },
    {
      title: 'Организаторы',
      content: <p>Организаторы. Тут пока пусто.</p>,
    },
    {
      title: 'Партнеры',
      content: <p>Партнеры. Тут пока пусто.</p>,
    },
  ];

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
}

export default DescriptionTabs;
