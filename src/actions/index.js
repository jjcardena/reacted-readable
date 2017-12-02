import * as ActionTypes from './Constants.js'

export function retrieveCategories(response){
  return{
    type: ActionTypes.RETRIEVE_CATEGORIES, response
  }
}

export function selectCategory(category){
  return{
    type: ActionTypes.SELECT_CATEGORY, category
  }
}

export function retrieveAllPosts(response){
  return{
    type: ActionTypes.RETRIEVE_ALLPOSTS, response
  }
}

export function orderPosts(order){
  return{
    type: ActionTypes.ORDER_POSTS, order
  }
}

export function updatePost(updatedPost){
  return{
    type: ActionTypes.UPDATE_POST, updatedPost
  }
}

export function insertPost(newPost){
  return{
    type: ActionTypes.INSERT_POST, newPost
  }
}

export function deletePost(deletedPost){
  return{
    type: ActionTypes.DELETE_POST, deletedPost
  }
}

export function retrieveComments(postId, loadedComments){
  return{
    type: ActionTypes.RETRIEVE_COMMENTS, postId, loadedComments
  }
}

export function updateComment(updatedComment){
  return{
    type: ActionTypes.UPDATE_COMMENT, updatedComment
  }
}

export function insertComment(newComment){
  return{
    type: ActionTypes.INSERT_COMMENT, newComment
  }
}

export function deleteComment(deletedComment){
  return{
    type: ActionTypes.DELETE_COMMENT, deletedComment
  }
}

export function notifyError(error, sendToRoot){
  return{
    type: ActionTypes.NOTIFY_ERROR, error, sendToRoot
  }
}
