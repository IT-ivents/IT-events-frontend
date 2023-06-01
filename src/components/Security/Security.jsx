import PageTitle from '../PageTitle/PageTitle';
import SecurityForm from '../SecurityForm/SecurityForm';

const Security = () => {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <PageTitle title="Безопасность" subtitle="Обновите пароль" />
      <SecurityForm />
    </section>
  );
};

export default Security;
