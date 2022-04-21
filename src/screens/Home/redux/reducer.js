const initialState = {
  recommendeds: [{}],
};

const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_RECOMMENDED':
      return {
        ...state,
        recommendeds: action.payload,
      };
    default:
      return state;
  }
};

export default HomeReducer;
