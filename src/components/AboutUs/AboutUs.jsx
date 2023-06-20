import { Link } from 'react-router-dom';
import styles from './AboutUs.module.css';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import Image1 from '../../images/AboutUs/1.jpg';
import Image2 from '../../images/AboutUs/2.jpg';
import Image3 from '../../images/AboutUs/3.jpg';
import Image4 from '../../images/AboutUs/4.jpg';
import Image5 from '../../images/AboutUs/5.jpg';
import Background from '../../images/Form-questions/img-background.svg';
import Cat from '../../images/Form-questions/cat.svg';
import Arrow from '../../images/Form-questions/cat-arrow.svg';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';
import { aboutText, spanBlock } from '../../utils/constants/aboutPageText';

const images = [
  { src: Image1, style: styles.imageOne },
  { src: Image2, style: styles.imageTwo },
  { src: Image3, style: styles.imageThree },
  { src: Image4, style: styles.imageFour },
  { src: Image5, style: styles.imageFive },
];

const AboutUs = () => {
  return (
    <section className={styles.about}>
      <div className={styles.description}>
        <h1 className={styles.mainTitle}>О нас</h1>
        {/* TEXT BLOCK */}
        <ul className={styles.blockList}>
          {aboutText.map((block) => (
            <li key={block.id} className={styles.block}>
              <h2 className={styles.title}>{block.title}</h2>
              <p className={styles.text}>{block.text}</p>
            </li>
          ))}
        </ul>
        <PrimaryButton title="Стать партнером" />
      </div>
      {/* IMAGES BLOCK */}
      <aside className={styles.aside}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt="Изображение конференции"
            className={image.style}
          />
        ))}
      </aside>

      <div>
        <h3 className={styles.connectTitle}>Connect-IT — это:</h3>
        {/* SPAN BLOCK */}
        <ul className={styles.numbersList}>
          {spanBlock.map((block) => (
            <li key={block.id}>
              <figure>
                <p className={styles.number}>
                  {block.title}
                  <span>{block.span}</span>
                  {block.endTtitle}
                </p>
                <figcaption className={styles.figcaption}>
                  {block.subtitle}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      <form action="#" className={styles.form}>
        <img src={Background} alt="Фон" className={styles.imgBackground} />
        <img src={Cat} alt="Котик" className={styles.cat} />
        <img src={Arrow} alt="Стрелка" className={styles.arrow} />
        <div className={styles.formData}>
          <h4 className={styles.formTitle}>Планируете ИТ-проект?</h4>
          <span className={styles.info}>
            Сотрудники Connect-IT ответят на любые интересующие вас вопросы.
          </span>
          <input
            type="text"
            name="name"
            placeholder="Ваше Имя"
            className={styles.input}
          />
          <input
            type="text"
            name="email"
            placeholder="Электронная почта"
            className={styles.input}
          />
          <input
            type="text"
            name="message"
            placeholder="Сообщение"
            className={styles.input}
          />
          <div className={styles.checkboxContainer}>
            <CustomCheckbox />
            <span className={styles.confirm}>
              Нажимая кнопку «Подписаться», вы соглашаетесь с{' '}
              <Link to="/privacy" className={styles.policyLink}>
                Политикой конфиденциальности
              </Link>
              .
            </span>
          </div>
          <PrimaryButton title="Написать" />
        </div>
      </form>
    </section>
  );
};

export default AboutUs;
