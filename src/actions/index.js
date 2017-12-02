export const RETRIEVE_CATEGORIES = 'RETRIEVE_CATEGORIES'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const RETRIEVE_ALLPOSTS = 'RETRIEVE_ALLPOSTS'
export const ORDER_POSTS = 'ORDER_POSTS'
export const RETRIEVE_COMMENTS = 'RETRIEVE_COMMENTS'
export const UPDATE_POST = 'UPDATE_POST'
export const INSERT_POST = 'INSERT_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const INSERT_COMMENT = 'INSERT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const NOTIFY_ERROR = 'NOTIFY_ERROR'

export function retrieveCategories(response){
  return{
    type: RETRIEVE_CATEGORIES, response
  }
}

export function selectCategory(category){
  return{
    type: SELECT_CATEGORY, category
  }
}

export function retrieveAllPosts(response){
  return{
    type: RETRIEVE_ALLPOSTS, response
  }
}

export function orderPosts(order){
  return{
    type: ORDER_POSTS, order
  }
}

export function updatePost(updatedPost){
  return{
    type: UPDATE_POST, updatedPost
  }
}

export function insertPost(newPost){
  return{
    type: INSERT_POST, newPost
  }
}

export function deletePost(deletedPost){
  return{
    type: DELETE_POST, deletedPost
  }
}

export function retrieveComments(postId, loadedComments){
  return{
    type: RETRIEVE_COMMENTS, postId, loadedComments
  }
}

export function updateComment(updatedComment){
  return{
    type: UPDATE_COMMENT, updatedComment
  }
}

export function insertComment(newComment){
  return{
    type: INSERT_COMMENT, newComment
  }
}

export function deleteComment(deletedComment){
  return{
    type: DELETE_COMMENT, deletedComment
  }
}

export function notifyError(error){
  return{
    type: NOTIFY_ERROR, error
  }
}
