import React, { useEffect, createContext, useReducer } from 'react';
import commentsReducer from '../reducers/commentsReducer';

export const CommentsContext = createContext();

const CommentsContextProvider = (props) => {
  const [comments, dispatch] = useReducer(commentsReducer, [], () => {
    const localData = localStorage.getItem('comments');
    return localData ? JSON.parse(localData) : [];
  });

  const fetchComments = (data) => {
    dispatch({
      type: 'FETCH_COMMENTS',
      payload: data,
    });
  };

  const addComment = (data) => {
    dispatch({
      type: 'ADD_COMMENT',
      payload: data,
    });
  };

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [fetchComments, addComment]);
  return (
    <CommentsContext.Provider value={{ fetchComments, comments, addComment }}>
      {props.children}
    </CommentsContext.Provider>
  );
};

export default CommentsContextProvider;
