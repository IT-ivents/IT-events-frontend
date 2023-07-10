export const BASE_URL = 'http://80.87.107.15/api/v1';

export const handleResponse = async (res) => {
  if (res.ok) {
    if (res.status === 204) {
      return null;
    } else {
      return await res.json();
    }
  } else {
    throw {
      status: res.status,
      message: `Запрос отклонен: ${res.status}`,
    };
  }
};

export const registration = async (data) => {
  const response = await fetch(`${BASE_URL}/auth/users/`, {
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
  });
  return await handleResponse(response);
};

export const authorization = async (data) => {
  const response = await fetch(`${BASE_URL}/auth/token/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: data.email, password: data.password }),
  });
  return await handleResponse(response);
};

export const logout = async (token) => {
  const response = await fetch(`${BASE_URL}/auth/token/logout`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  });
  return await handleResponse(response);
};

export const getUserInfo = async (token) => {
  const response = await fetch(`${BASE_URL}/auth/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  });
  return await handleResponse(response);
};

export const getFullUser = async (token, id) => {
  const response = await fetch(`${BASE_URL}/users/${id}/profile`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  });
  return await handleResponse(response);
};
