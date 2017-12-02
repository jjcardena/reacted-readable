import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Card from 'react-toolbox/lib/card/Card';
import CardTitle from 'react-toolbox/lib/card/CardTitle';
import CardText from 'react-toolbox/lib/card/CardText';
import CardActions from 'react-toolbox/lib/card/CardActions';
import Button from 'react-toolbox/lib/button/Button';
import Chip from 'react-toolbox/lib/chip/Chip';
import CommentsList from './CommentsList'
import ControlToolbox from './ControlToolbox'
import {timestampToDate} from '../utils/helpers';
import { votePost, fetchComments, fetchPosts, delPost } from '../utils/api';
import { updatePost, retrieveComments, retrieveAllPosts, deletePost } from '../actions';

class PostView extends Component {

  componentDidMount = () => {
    if(!this.props.posts)
      fetchPosts("").then((data) => { this.props.loadAllPosts(data) } );
    const postId = this.props.match.params.post_id;
    if(!(this.props.comments && typeof(this.props.comments[postId]) !== 'undefined'))
      fetchComments(postId).then((data) => { this.props.loadComments(postId, data); } );
  }

  handleClosePost = () => {
    const category = this.props.match.params.category;
    this.props.history.push('/'+category);
  }

  handleEditPost = () => {
    const category = this.props.match.params.category;
    const postId = this.props.match.params.post_id;
    this.props.history.push('/'+category+'/'+postId+'/edit');
  }

  handleDeletePost = () => {
    const postId = this.props.match.params.post_id;
    const category = this.props.match.params.category;
    delPost(postId).then((data) => { this.props.removePost(data); } );
    this.props.history.push('/'+category);
  }

  handleDownVote = () => {
    const postId = this.props.match.params.post_id;
    votePost(postId, "downVote").then((data) => { this.props.refreshPost(data) } )
  }

  handleUpVote = () => {
    const postId = this.props.match.params.post_id;
    votePost(postId, "upVote").then((data) => { this.props.refreshPost(data) } )
  }

  render() {
    const postId = this.props.match.params.post_id;
    const post =  this.props.posts
                  ? this.props.posts.filter((elem) =>
                                          elem.id===postId)[0]
                  : {};
    const commentsCount = this.props.comments && this.props.comments[postId]
                  ? this.props.comments[postId].length
                  : "";
    const subtitle = "Published in " + post.category + " on " + timestampToDate(post.timestamp);
    return (
      <Card className="CardPost">
        <CardTitle
          avatar="https://material.io/icons/#ic_perm_identity"
          title={post.author}
          subtitle={subtitle} />
        <CardTitle title={post.title}/>
          <CardText>
          <div className="commentsCounter"><Chip>{commentsCount} comments</Chip></div>
            {post.body}
            <CommentsList postId={post.id}/>
          </CardText>
        <CardActions className="CardActionsRightAlign">
          <Button label="Close post" onClick={this.handleClosePost}/>
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
    comments : state.commentsReducer.comments
  }
}

function mapDispatchToProps (dispatch) {
   return {
     refreshPost: (post) => dispatch(updatePost(post)),
     loadComments: (postId, data) => dispatch(retrieveComments(postId ,data)),
     loadAllPosts: (data) => dispatch(retrieveAllPosts(data)),
     removePost: (data) => dispatch(deletePost(data))
   }
 }

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PostView))
