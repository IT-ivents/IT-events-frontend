export const BASE_URL = 'http://80.87.107.15/api/v1';

export const handleResponse = (res) => {
  if (res.ok) return res.json();
  return Promise.reject(res.status);
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

// export const checkToken = (token) => {
//   return fetch(`${BASE_URL}/auth/token/login`, {
//     method: 'GET',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//   }).then((res) => handleResponse(res));
// };
