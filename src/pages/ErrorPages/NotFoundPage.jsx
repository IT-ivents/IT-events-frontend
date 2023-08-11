import ErrorPage from './ErrorPage';

const NotFoundPage = () => {
  const pageData = {
    title: '404. Такой страницы на сайте нет',
    subtitle: 'С этой страницей что-то случилось или не верно указан адрес',
  };
  return <ErrorPage title={pageData.title} subtitle={pageData.subtitle} />;
};

export default NotFoundPage;
