import React from 'react';
import styles from './Notifications.module.css';
import PageTitle from '../PageTitle/PageTitle';
import clockIcon from '../../images/clock-icon.svg';

const notificationsList = [
  {
    id: 1,
    title: 'Новости *название нашего сервиса*',
    description: 'Полезные советы, рекомендации, информация о новых релизах',
    span: 'Несколько раз в год',
    checked: false,
  },
  {
    id: 2,
    title: 'Знаковые события в сфере IT',
    description: 'Главные события года в сфере информационных технологий',
    span: 'Несколько раз в год',
    checked: true,
  },
  {
    id: 3,
    title: 'Персональный дайджест',
    description:
      'Уникальные подборки, основанные на ваших предпочтениях и  рекомендациях',
    span: 'Раз в неделю',
    checked: true,
  },
  {
    id: 4,
    title: 'Напоминания',
    description: 'Уведомления о приближении событий из Избранного',
    span: '',
    checked: false,
  },
];

const Notifications = () => {
  return (
    <>
      <PageTitle
        title="Уведомления"
        subtitle="Расскажите, какие уведомления вы хотите получать"
      />
      <ul className={styles.list}>
        {notificationsList.map((notification) => (
          <li key={notification.id} className={styles.listItem}>
            <div className={styles.listContainer}>
              <div className={styles.gap}>
                <h3 className={styles.title}>{notification.title}</h3>
                <p className={styles.description}>{notification.description}</p>
                {notification.span && (
                  <div className={styles.spanContainer}>
                    <img src={clockIcon} alt="clock-icon" />
                    <span>{notification.span}</span>
                  </div>
                )}
              </div>
              <div>
                <input type="checkbox" checked={notification.checked} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Notifications;
