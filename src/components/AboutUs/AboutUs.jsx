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

const AboutUs = () => {
  return (
    <section className={styles.about}>
      <div className={styles.description}>
        <h1 className={styles.mainTitle}>О нас</h1>
        <h2 className={styles.title}>Мы помогаем людям находить ИТ-события.</h2>
        <p className={styles.text}>
          Connect-IT сайт-агрегатор. Мы — собираем вокруг себя целевую аудиторию
          и являемся эффективной площадкой для поиска и продвижения мероприятий.
        </p>
        <h2 className={styles.title}>Наша цель</h2>
        <p className={styles.text}>
          Сделать процесс поиска и участия в мероприятиях в области
          информационных технологий максимально простым и удобным для всех.
        </p>
        <h2 className={styles.title}>Технологии</h2>
        <p className={styles.text}>
          Connect-IT — это платформа, которая умеет самостоятельно находить
          интересные события для людей ИТ-мира. Также наше решение позволяет
          организаторам добавлять свои мероприятия, подгружать фото, вести
          трансляции и продавать билеты.
        </p>
        <h2 className={styles.title}>Сотрудничество</h2>
        <p className={styles.text}>
          Мы помогаем организаторам создавать мероприятия, продвигать их и
          продавать билеты, а участникам — находить интересные события в своем
          городе.
        </p>
        <PrimaryButton title="Стать партнером" />
      </div>

      <aside className={styles.aside}>
        <img src={Image1} alt="Image" className={styles.imageOne} />
        <img src={Image2} alt="Image" className={styles.imageTwo} />
        <img src={Image3} alt="Image" className={styles.imageThree} />
        <img src={Image4} alt="Image" className={styles.imageFour} />
        <img src={Image5} alt="Image" className={styles.imageFive} />
      </aside>

      <div>
        <h3 className={styles.connectTitle}>Connect-IT — это:</h3>
        <div className={styles.numbers}>
          <figure>
            <p className={styles.number}>
              300<span>+</span>
            </p>
            <figcaption className={styles.figcaption}>It-событий</figcaption>
          </figure>
          <figure>
            <p className={styles.number}>
              100<span>+</span>
            </p>
            <figcaption className={styles.figcaption}>
              счастливых клиентов
            </figcaption>
          </figure>
          <figure>
            <p className={styles.number}>
              35<span>+</span>
            </p>
            <figcaption className={styles.figcaption}>
              замечательных сотрудников
            </figcaption>
          </figure>
          <figure>
            <p className={styles.number}>
              24<span>/</span>7
            </p>
            <figcaption className={styles.figcaption}>
              наша поддержка
            </figcaption>
          </figure>
        </div>
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
