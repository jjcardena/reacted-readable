import {
  RETRIEVE_CATEGORIES,
  RETRIEVE_ALLPOSTS,
  SELECT_CATEGORY,
  ORDER_POSTS,
  RETRIEVE_COMMENTS,
  UPDATE_POST,
  INSERT_POST,
  DELETE_POST,
  UPDATE_COMMENT,
  INSERT_COMMENT,
  DELETE_COMMENT,
  NOTIFY_ERROR
} from '../actions';

import { combineReducers } from 'redux';

function categoriesReducer (state = {}, action){
  switch (action.type) {
    case RETRIEVE_CATEGORIES :
      return {
        ...state,
        categories: action.response.categories,
        selectedCategory: ""
      }
    case SELECT_CATEGORY :
    return {
      ...state,
      selectedCategory: action.category
    }
    default :
      return state
  }
}

function postsReducer (state = {}, action){
  switch (action.type) {
    case RETRIEVE_ALLPOSTS :
      return {
        ...state,
        posts: action.response,
        postsOrder: ""
      }
    case ORDER_POSTS :
      return {
        ...state,
        postsOrder: action.order
      }
    case UPDATE_POST :
      const { updatedPost } = action;
      const updateposts = state.posts.filter((post) => post.id!==updatedPost.id);
      return {
        ...state,
        posts: [...updateposts, updatedPost]
      }
    case INSERT_POST :
      const { newPost } = action;
      const insertposts = state.posts;
      return {
        ...state,
        posts: [...insertposts, newPost]
      }
    case DELETE_POST :
    const { deletedPost } = action;
      const deleteposts = state.posts.filter((post) => post.id!==deletedPost.id);
      return {
        ...state,
        posts: deleteposts
      }
    default :
      return state
  }
}

function commentsReducer (state = {}, action){
  switch (action.type) {
    case RETRIEVE_COMMENTS :
      const { postId, loadedComments } = action
      return {
        ...state,
        comments : {
          ...state.comments,
          [postId] : loadedComments,
        }
      }
    case UPDATE_COMMENT :
      const { updatedComment } = action;
      const updateComments = state.comments[updatedComment.parentId].filter(
                              (comment) => comment.id!==updatedComment.id);
      return {
        ...state,
        comments : {
          ...state.comments,
          [updatedComment.parentId] : [...updateComments, updatedComment]
        }
      }
      case INSERT_COMMENT :
        const { newComment } = action;
        const insertcomments = state.comments[newComment.parentId];
        return {
          ...state,
          comments : {
            ...state.comments,
            [newComment.parentId] : [...insertcomments, newComment]
          }
        }
      case DELETE_COMMENT :
      const { deletedComment } = action;
        const deletecomments = state.comments[deletedComment.parentId].filter(
                          (comment) => comment.id!==deletedComment.id);
        return {
          ...state,
          comments : {
            ...state.comments,
            [deletedComment.parentId] : deletecomments
          }
        }
    default :
      return state
  }
}

function errorReducer (state = {}, action){
  switch (action.type) {
    case NOTIFY_ERROR :
      const { error } = action
      return {
        ...state,
        error : error
        }
    default :
      return state
  }
}

export default combineReducers({
  categoriesReducer,
  postsReducer,
  commentsReducer,
  errorReducer
});
