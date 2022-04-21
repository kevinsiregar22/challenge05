export const setLoginEmail = data => {
  return {
    type: 'SET_LOGIN_EMAIL',
    email: data,
  };
};

export const setLoginPassword = data => {
  return {
    type: 'SET_LOGIN_PASSWORD',
    password: data,
  };
};

export const setToken = data => {
  return {
    type: 'SET_TOKEN',
    token: data,
  };
};

export const setName = data => {
  return {
    type: 'SET_NAME',
    name: data,
  };
};
