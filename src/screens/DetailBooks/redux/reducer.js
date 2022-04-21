const initialState = {
  bookdetail: '',
  refreshing: false,
};

const BookDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BOOK_DETAIL':
      return {
        ...state,
        bookdetail: action.payload,
      };

    default:
      return state;
  }
};

export default BookDetailReducer;
