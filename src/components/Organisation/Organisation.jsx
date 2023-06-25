import styles from './Organisation.module.css';

const Organisation = () => {
  return (
    <form className={styles.form}>
      <h1>Добавить событие</h1>

      <label htmlFor="title">
        Название мероприятия
        <input type="text" id="title" />
      </label>

      <label htmlFor="description">
        Описание
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          placeholder="Расскажите о событии подробнее"
        ></textarea>
      </label>

      <label htmlFor="program">
        Программа
        <textarea
          name="program"
          id="program"
          cols="30"
          rows="10"
          placeholder="Шо как?"
        ></textarea>
      </label>

      <label htmlFor="organizers">
        Организаторы
        <input type="text" id="organizers" />
      </label>

      <label htmlFor="partners">
        Партнеры
        <input type="text" id="partners" />
      </label>

      <label htmlFor="city">
        Город
        <input type="text" id="city" />
      </label>

      <label htmlFor="address">
        Адрес
        <input type="text" id="address" />
      </label>

      <label htmlFor="price">
        Цена
        <input type="number" id="price" />
      </label>

      <label htmlFor="image">
        Добавьте баннер
        <input type="file" id="image" />
      </label>

      <label htmlFor="start">
        Дата и время начала
        <input type="date" id="start" />
        <input type="time" id="start" />
      </label>

      <label htmlFor="finish">
        Дата и время окончания
        <input type="date" id="finish" />
        <input type="time" id="finish" />
      </label>

      <label htmlFor="tags">
        Направление
        <select name="tags">
          <option value="hidden" hidden>
            Выберите направление
          </option>
          <option value="north">Север</option>
          <option value="west">Запад</option>
          <option value="south">Юг</option>
          <option value="east">Восток</option>
        </select>
      </label>

      <label htmlFor="format">
        Формат проведения
        <select name="format">
          <option value="hidden" hidden>
            Выберите формат
          </option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>
      </label>

      <label htmlFor="topic">
        Тема
        <select name="topic">
          <option value="hidden" hidden>
            Нажмите на фиолетовую лупу
          </option>
          <option value="left">Тудым</option>
          <option value="right">Сюдым</option>
        </select>
      </label>
    </form>
  );
};

export default Organisation;
