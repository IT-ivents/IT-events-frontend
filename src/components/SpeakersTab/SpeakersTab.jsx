import styles from './SpeakersTab.module.css';
import { speakersData } from './../../utils/constants/tabs';

const SpeakersTab = () => {
  return (
    <>
      <h1 className={styles.speakersTitle}>Доклады</h1>
      {speakersData.map((speaker, index) => (
        <div key={index} className={styles.speakersTab}>
          <h2 className={styles.topic}>{speaker.topic}</h2>
          <div className={styles.aboutSpeaker}>
            <img src={speaker.avatar} alt="Avatar" className={styles.avatar} />
            <div className={styles.speakerInfo}>
              <p className={styles.speakerName}>{speaker.speakerName}</p>
              <p className={styles.speakerSkills}>{speaker.speakerSkills}</p>
            </div>
          </div>
          <blockquote>{speaker.quote}</blockquote>
        </div>
      ))}
    </>
  );
};

export default SpeakersTab;
