const initialState = {
  name: '',
  email: '',
  password: '',
};

const RegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_REGISTER_NAME':
      return {
        ...state,
        name: action.payload,
      };
    case 'SET_REGISTER_EMAIL':
      return {
        ...state,
        email: action.payload,
      };
    case 'SET_REGISTER_PASSWORD':
      return {
        ...state,
        password: action.payload,
      };

    default:
      return state;
  }
};

export default RegisterReducer;
