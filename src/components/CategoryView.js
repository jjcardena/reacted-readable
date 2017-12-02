import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostPreview from './PostPreview';
import { fetchPosts } from '../utils/api'
import { retrieveAllPosts } from '../actions'
import { withRouter } from 'react-router-dom';

class CategoryView extends Component {
  componentDidMount = () => {
    const category = this.props.match.params.category
                      ? this.props.match.params.category
                      : "";
    fetchPosts(category).then((data) => { this.props.loadAllPosts(data) } );
  }

  componentWillReceiveProps(nextProps) {
     if (nextProps.match.params.category !== this.props.match.params.category) {
       const category = nextProps.match.params.category;
       fetchPosts(category).then((data) => { this.props.loadAllPosts(data) } );
     }
 }

  render() {
    const order = this.props.postsOrder ? this.props.postsOrder : "voteScore";
    const posts = [].concat(this.props.posts)
                  .sort((a, b) => (a[order] < b[order]));
    return (
      posts && typeof(posts[0]) !== 'undefined' ?
      posts.map((post) =>
          <PostPreview postInfo={post} key={post.id} />
      )
      : ""
    )
  };
}

function mapStateToProps(state){
  return {
    posts: state.postsReducer.posts,
    postsOrder : state.postsReducer.postsOrder
  }
}

function mapDispatchToProps (dispatch) {
   return {
    loadAllPosts: (data) => dispatch(retrieveAllPosts(data))
   }
 }

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(CategoryView));
