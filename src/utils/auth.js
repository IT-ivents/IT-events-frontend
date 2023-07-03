export const BASE_URL = 'http://80.87.107.15/api/v1';

export const handleResponse = (res) => {
  if (res.ok) {
    // Проверяем, есть ли тело ответа
    if (res.status === 204) {
      return null; // Возвращаем null, если тело ответа пустое
    } else {
      return res.json(); // Возвращаем JSON-тело ответа
    }
  } else {
    return Promise.reject(res.status); // Отклоняем промис с кодом статуса
  }
};

export const registration = (data) => {
  return fetch(`${BASE_URL}/auth/users/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      username: data.username,
      email: data.email,
      password: data.password,
      organization_name: data.organization_name,
    }),
  }).then((res) => handleResponse(res));
};

export const authorization = (data) => {
  return fetch(`${BASE_URL}/auth/token/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({ email: data.email, password: data.password }),
  }).then((res) => handleResponse(res));
};

export const logout = (token) => {
  return fetch(`${BASE_URL}/auth/token/logout`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }).then((res) => handleResponse(res));
};
