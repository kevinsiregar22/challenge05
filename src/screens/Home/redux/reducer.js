const initialState = {
  recommend: [{}],
};

const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_RECOMMENDED':
      return {
        ...state,
        recommend: action.payload,
      };
    default:
      return state;
  }
};

export default HomeReducer;
