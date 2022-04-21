const initialState = {
  email: '',
  password: '',
  token: '',
  name: '',
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOGIN_EMAIL':
      return {
        ...state,
        email: action.email,
      };
    case 'SET_LOGIN_PASSWORD':
      return {
        ...state,
        password: action.password,
      };
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.token,
      };
    case 'SET_NAME':
      return {
        ...state,
        name: action.name,
      };
    default:
      return state;
  }
};

export default LoginReducer;
