import { useState, useEffect } from 'react';
import * as auth from '../../utils/auth';

function useAuth() {
  const [loggedIn, setIsLoggedIn] = useState(false); // AUTHORIZATION
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const checkLoggedInStatus = () => {
      const token = localStorage.getItem('jwt');
      const user = localStorage.getItem('currentUser');
      if (token) {
        setIsLoggedIn(true);
        setTimeout(() => {
          setCurrentUser(JSON.parse(user)); // Чтобы юзер успел дойти из localStorage
        }, 0);
      } else {
        setIsLoggedIn(false);
        setCurrentUser(null);
      }
    };
    checkLoggedInStatus();
    console.log('LoggedIn:', loggedIn);
  }, [loggedIn]);

  function handleLogin({ email, password }) {
    setIsLoading(true);
    let message = '';
    auth
      .authorization({ email, password })
      .then((res) => {
        console.log('TOKEN_OK');
        if (res.auth_token) {
          localStorage.setItem('jwt', res.auth_token);
          setIsLoggedIn(true);
        }
      })
      .catch((error) => {
        switch (error) {
          case 400:
            message = 'Некорректное значение одного или нескольких полей';
            break;
          case 401:
            message = 'Неверно указаны e-mail или пароль';
            break;
          default:
            message = 'Что-то пошло не так! Попробуйте ещё раз.';
        }
        localStorage.removeItem('jwt');
        setIsLoggedIn(false);
        console.error('Authorization error:', error);
      })
      .finally(() => {
        setServerError(message);
      });
  }

  function handleRegister({ username, email, password, organization_name }) {
    setIsLoading(true);
    let message = '';
    auth
      .registration({ username, email, password, organization_name })
      .then((res) => {
        handleLogin({ email, password });
        setCurrentUser(res); // Установить ответ от сервера в currentUser
        localStorage.setItem('currentUser', JSON.stringify(res)); // Сохранить currentUser в локальное хранилище
        console.log('Успешная регистрация');
      })
      .catch((error) => {
        switch (error) {
          case 400:
            message = 'Некорректное значение одного или нескольких полей';
            break;
          case 409:
            message = 'Пользователь с такой почтой уже зарегистрирован.';
            break;
          default:
            message = 'Что-то пошло не так, пожалуйста попробуйте еще раз.';
        }
        console.error('Registration error:', error);
      })
      .finally(() => {
        setServerError(message);
        setTimeout(() => setIsLoading(false), 500);
        //toggleModalSignUp()
      });
  }

  function handleLogout() {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth
        .logout(token)
        .then(() => {
          localStorage.removeItem('jwt');
          setIsLoggedIn(false);
          console.log('Вышли из учетной записи');
        })
        .catch((error) => {
          console.error('Ошибка при выходе:', error);
        });
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
