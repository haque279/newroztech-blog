const commentsReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_COMMENTS':
      return action.payload;
    case 'ADD_COMMENT':
      return [action.payload, ...state];
    default:
      return state;
  }
};

export default commentsReducer;
