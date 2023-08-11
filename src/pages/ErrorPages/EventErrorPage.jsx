import ErrorPage from './ErrorPage';
import { useRouteError } from 'react-router-dom';

const EventErrorPage = () => {
  const error = useRouteError();
  const pageData = {
    title: `${error.status}.${error.statusText}. Упс! Такого события на сайте не нашлось`,
    subtitle: `Пожалуйста проверьте правильность URL или выберите другое мероприетие.`,
  };
  return <ErrorPage title={pageData.title} subtitle={pageData.subtitle} />;
};

export default EventErrorPage;
