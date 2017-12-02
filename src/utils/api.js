const url = "http://localhost:3001";
const authHeader = "testuser";

export function fetchCategories() {

  return fetch(url+"/categories",
    {
        headers: { 'Authorization': authHeader }
    })
    .then((res) => res.json())
}

export function fetchPosts(category) {

  if(typeof(category) === "undefined" || category === "")
    return fetch(url+"/posts",
      {
          headers: { 'Authorization': authHeader }
      })
      .then((res) => res.json());
  else
    return fetch(url+"/"+category+"/posts",
      {
          headers: { 'Authorization': authHeader }
      })
      .then((res) => res.json());

}

export function votePost(id, option) {
    return fetch(url+"/posts/"+id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify({option : option})
    }).then(res => res.json());
}

export function addPost(post) {
    return fetch(url+"/posts/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify(post)
    }).then(res => res.json());
}

export function modifyPost(id, postData) {

    return fetch(url+"/posts/"+id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify(postData)
    }).then(res => res.json());
}

export function delPost(id) {

    return fetch(url+"/posts/"+id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: ""
    }).then(res => res.json());
}

export function fetchComments(postId) {

    return fetch(url+"/posts/"+postId+"/comments",
      {
          headers: { 'Authorization': authHeader }
      })
      .then((res) => res.json());
}

export function modifyComment(id, commentData) {

    return fetch(url+"/comments/"+id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify(commentData)
    }).then(res => res.json());
}

export function delComment(id) {

    return fetch(url+"/comments/"+id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: ""
    }).then(res => res.json());
}

export function addComment(commentData) {
    return fetch(url+"/comments/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify(commentData)
    }).then(res => res.json());
}

export function voteComment(id, option) {
    return fetch(url+"/comments/"+id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify({option : option})
    }).then(res => res.json());
}
