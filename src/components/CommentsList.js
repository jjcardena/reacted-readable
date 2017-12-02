import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-toolbox/lib/button/Button';
import ReactTooltip from 'react-tooltip';
import CommentDetail from './CommentDetail'
import { fetchComments } from '../utils/api'
import { retrieveComments } from '../actions'

class CommentsList extends Component {
  state = {
    newMode : false
  }

  handleNewComment = () => {
    this.setState({newMode: true});
  }

  handleRefreshComments = () => {
    this.setState({newMode: false});
    const postId = this.props.postId;
    fetchComments(postId).then((data) => { this.props.loadComments(postId, data) } )
  }

  render() {
    const postId = this.props.postId;
    const comments = this.props.comments ? this.props.comments[postId] : null;
    const sortedComments = comments
                           ?  [].concat(comments)
                              .sort((a, b) => (a.voteScore < b.voteScore))
                           : null;
    const newComment = { parentId: postId, voteScore: 0 };
    const newMode = this.state.newMode;
    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
        <Button icon='comment' floating accent mini data-tip='Add comment'
          className='commentButton' onClick={() => this.handleNewComment()}
          disabled={this.state.newMode} />
        {sortedComments
        ? sortedComments.map((comment) =>
          <CommentDetail comment={comment} key={comment.id} refreshComments={this.props.refreshComments}/>)
        : ""
        }
        { newMode
          ? <CommentDetail comment={newComment} newMode refreshComments={this.handleRefreshComments}/>
          : ""
        }
        <ReactTooltip />
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    comments : state.commentsReducer.comments
  }
}

function mapDispatchToProps (dispatch) {
   return {
     loadComments: (postId, data) => dispatch(retrieveComments(postId ,data))
   }
 }

export default connect(mapStateToProps,mapDispatchToProps)(CommentsList)
