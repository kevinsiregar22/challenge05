const initialState = {
  isLoading: false,
  theme: 'light',
};

export const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.status,
      };

    default:
      return {
        state,
      };
  }
};
