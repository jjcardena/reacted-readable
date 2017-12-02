import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Card from 'react-toolbox/lib/card/Card';
import CardTitle from 'react-toolbox/lib/card/CardTitle';
import CardText from 'react-toolbox/lib/card/CardText';
import CardActions from 'react-toolbox/lib/card/CardActions';
import Button from 'react-toolbox/lib/button/Button';
import Chip from 'react-toolbox/lib/chip/Chip';
import CommentsList from './CommentsList';
import ControlToolbox from './ControlToolbox';
import {timestampToDate, EDIT_OPERATION } from '../utils/helpers';
import { votePost, fetchPosts, delPost, fetchPost } from '../utils/api';
import { updatePost, retrieveAllPosts, deletePost, notifyError } from '../actions';

class PostView extends Component {
  state = {
    postId: ""
  }

  componentDidMount = () => {
    //if in preView mode postid will be received in props
    if(this.props.postId){
        this.setState({ postId:this.props.postId });
    }
    else{
      //if in View mode postid will be received in url params
      const postId = this.props.match.params.post_id;
      this.setState({ postId:postId });
      if(!this.props.posts)
        fetchPost(postId).then((data) => {
                              if(!data.id)
                                this.props.raiseError("Post not found! Perhaps it was deleted?", true);
                              this.props.loadAllPosts([data]);
                                          } );
    }
  }

  getPostById = () => {
    try{
      const postResult = this.props.posts.filter((elem) => elem.id===this.state.postId);
      if(postResult.length===0)
        return null;
      return postResult[0];
    }
    catch(err){
      return null;
    }

  }

  handlePush = (path) =>{
    this.props.history.push(path);
  }

  handlePostToggle = () => {
    if(this.props.preView){
      const post = this.getPostById();
      this.props.history.push('/'+post.category+'/'+post.id);
    }
    else{
      const cat = this.props.selCategory ? this.props.selCategory  : '';
      this.handlePush('/'+cat);
    }
  }

  handleEditPost = () => {
    const post = this.getPostById();
    this.handlePush('/'+post.category+'/'+post.id+'/'+EDIT_OPERATION);
  }

  handleDeletePost = () => {
    const post = this.getPostById();
    delPost(post.id).then((data) => { this.props.removePost(data); } );
    this.handlePush('/');
  }

  handleDownVote = () => {
    const post = this.getPostById();
    votePost(post.id, "downVote").then((data) => { this.props.refreshPost(data) } )
  }

  handleUpVote = () => {
    const post = this.getPostById();
    votePost(post.id, "upVote").then((data) => { this.props.refreshPost(data) } )
  }

  render() {
    //check there is a postid to work with
    const post = this.getPostById();
    if(post===null){
      return "";
    }
    const postId = post.id;
    const commentCount = post.commentCount;
    const subtitle = "Published in " + post.category + " on " + timestampToDate(post.timestamp);
    return (
      <Card className="CardPost">
        <CardTitle
          avatar="https://material.io/icons/#ic_perm_identity"
          title={post.author}
          subtitle={subtitle} />
        <CardTitle title={post.title}/>
          <CardText>
            <div className="commentsCounter"><Chip>{commentCount} comments</Chip></div>
            { this.props.preView
              ? ""
              : <div>{post.body}<CommentsList postId={post.id}/></div>
            }
          </CardText>
        <CardActions className="CardActionsRightAlign">
          <Button label={this.props.preView ? "Open post" : "Close post"} onClick={this.handlePostToggle}/>
            <ControlToolbox
              parentName='post'
              voteScore={post.voteScore}
              editHandler={this.handleEditPost}
              deleteHandler={this.handleDeletePost}
              upVoteHandler={this.handleUpVote}
              downVoteHandler={this.handleDownVote}
              voteToolBoxClassName="voteToolboxStyle"/>
        </CardActions>
      </Card>
    );
  }
}
//"Published in " + post.category + " on " + timestampToDate(post.timestamp)
function mapStateToProps(state){
  return {
    posts: state.postsReducer.posts,
    comments : state.commentsReducer.comments,
    selCategory: state.categoriesReducer.selectedCategory
  }
}

function mapDispatchToProps (dispatch) {
   return {
     refreshPost: (post) => dispatch(updatePost(post)),
     loadAllPosts: (data) => dispatch(retrieveAllPosts(data)),
     removePost: (data) => dispatch(deletePost(data)),
     raiseError: (errorMessage, sendToRoot) => dispatch(notifyError(errorMessage, sendToRoot))
   }
 }

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PostView))
