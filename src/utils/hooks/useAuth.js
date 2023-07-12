import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as auth from '../../utils/auth';

function useAuth() {
  const [loggedIn, setIsLoggedIn] = useState(false); // AUTHORIZATION
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedInStatus = () => {
      const token = localStorage.getItem('jwt');
      const user = localStorage.getItem('currentUser');
      if (token) {
        setIsLoggedIn(true);
        setCurrentUser(JSON.parse(user)); // Чтобы юзер успел дойти из localStorage
      } else {
        setIsLoggedIn(false);
        setCurrentUser(null);
      }
    };
    checkLoggedInStatus();
    console.log('LoggedIn:', loggedIn);
  }, [loggedIn]);

  function handleError(error) {
    let message = '';
    switch (error.status) {
      case 400:
        message = 'Логин или пароль не совпадают. Проверьте введённые данные.';
        break;
      case 401:
        message = 'Неверно указаны e-mail или пароль';
        break;
      // case 406:
      //   message = 'Введённый пароль состоит только из цифр.';
      //   break;
      case 409:
        message = 'Пользователь с такой почтой уже зарегистрирован.';
        break;
      case 406:
        message =
          'Возможная ошибка: пароль состоит только из цифр, пароль слишком распространён, пароль слишком похож на email.';
        break;
      case 418:
        message = 'Введённый пароль слишком широко распространён.';
        break;
      case 412:
        message = 'Введённый пароль слишком похож на email address.';
        break;
      default:
        message = 'Что-то пошло не так, попробуйте еще раз...';
    }
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setServerError(message);
    console.error('Ошибка:', error);
  }

  async function handleLogin({ email, password }) {
    setIsLoading(true);
    try {
      const res = await auth.authorization({ email, password });
      console.log('TOKEN_OK');
      if (res.auth_token) {
        localStorage.setItem('jwt', res.auth_token);
        setIsLoggedIn(true);

        try {
          const userData = await auth.getUserInfo(res.auth_token);
          console.log('USER_DATA_OK', userData);
          const fullUserData = await auth.getFullUser(
            res.auth_token,
            userData.id
          );
          setCurrentUser(fullUserData);
          //setCurrentUser(userData);
          localStorage.setItem('currentUser', JSON.stringify(fullUserData));
          navigate('/account'); // Перенаправление на страницу /account
        } catch (error) {
          handleError(error);
        }
      }
    } catch (error) {
      handleError(error);
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  }

  function handleRegister({ username, email, password, organization_name }) {
    setIsLoading(true);
    auth
      .registration({ username, email, password, organization_name })
      .then((res) => {
        handleLogin({ email, password });
        console.log('Успешная регистрация');
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        setTimeout(() => setIsLoading(false), 500);
      });
  }
  async function handleLogout() {
    const token = localStorage.getItem('jwt');
    if (token) {
      try {
        await auth.logout(token);
        setIsLoggedIn(false);
        navigate('/');
        localStorage.removeItem('jwt');
        localStorage.removeItem('currentUser');
        console.log('Вышли из учетной записи');
      } catch (error) {
        console.error('Ошибка при выходе:', error);
      }
    }
  }

  return {
    handleLogin,
    handleRegister,
    handleLogout,
    loggedIn,
    isLoading,
    serverError,
    setServerError,
    currentUser,
  };
}

export default useAuth;
