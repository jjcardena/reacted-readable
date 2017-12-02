import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from 'react-toolbox/lib/card/Card';
import CardTitle from 'react-toolbox/lib/card/CardTitle';
import CardText from 'react-toolbox/lib/card/CardText';
import Input from 'react-toolbox/lib/input/Input'
import { timestampToDate , getTimestamp, getUniqueId } from '../utils/helpers';
import { modifyComment, addComment, delComment, voteComment, fetchPost } from '../utils/api'
import { updateComment, insertComment, deleteComment, notifyError, updatePost } from '../actions'
import ControlToolbox from './ControlToolbox'
import ConfirmToolbox  from './ConfirmToolbox'

class CommentDetail extends Component {
  state = {
    editMode : false,
    newMode : false,
    bodyText : "",
    author : ""
  }

  componentDidMount = () => {
    this.setState({ newMode: this.props.newMode ,
                    editMode: this.props.newMode});
  }

  updateBodyText = (text) => {
    this.setState({ bodyText: text });
  };

  updateAuthorText = (text) => {
    this.setState({ author: text });
  };

  handleEditComment = () => {
    this.setState({editMode: !this.state.editMode, bodyText: this.props.comment.body});
  }

  handleEditUndo = () => {
    if(this.state.newMode)
      this.props.refreshComments();
    else
      this.setState({editMode: !this.state.editMode, bodyText: this.props.comment.body});
  }

  handleEditConfirm = () => {
    if(this.state.bodyText==="" || this.state.author===""){
      this.props.raiseError("Please complete all required fields!");
      return;
    }
    if(this.state.newMode){
      const commentData =  {
        ...this.props.comment,
        id: getUniqueId(),
        timestamp : getTimestamp(),
        body : this.state.bodyText,
        author : this.state.author
      };
      addComment(commentData).then((data) => { this.props.newComment(data) ;
                                               this.setState({ newMode: false});
                                               this.props.refreshComments();
                                               this.reloadPost(commentData.parentId);
                                             });
    }
    else if(this.state.editMode){
      const id = this.props.comment.id;
      const commentData =  {
      timestamp : getTimestamp(),
      body : this.state.bodyText
      };
      modifyComment(id,commentData).then((data) => {
                                              this.props.changeComment(data);
                                              this.setState({ editMode: false});
                                            });
    }
  }

  reloadPost = (id) => {
    fetchPost(id).then((data) => { this.props.refreshPost(data) });
  }

  handleDeleteComment = () => {
    const comment = this.props.comment;
    delComment(comment.id).then((data) => { this.props.removeComment(data)
                                            this.reloadPost(comment.parentId);});
  }

  handleDownVote = () => {
    const id = this.props.comment.id;
    voteComment(id, "downVote").then((data) => { this.props.changeComment(data) } )
  }
  handleUpVote = () => {
    const id = this.props.comment.id;
    voteComment(id, "upVote").then((data) => { this.props.changeComment(data) } )
  }

  render() {
    const comment = this.props.comment;
    const editMode = this.state.editMode;
    const newMode = this.state.newMode;
    return (
          <Card>
            { newMode === true
              ? ""
              : <CardTitle
                avatar="https://material.io/icons/#ic_perm_identity"
                title={comment.author}
                subtitle={"Commented on " + timestampToDate(comment.timestamp)} />
            }
            <CardText>
              { newMode === true
                ? <Input type='text' label='Author' name='commentAuthor' value={this.state.author}
                  onChange={(newValue) => this.updateAuthorText(newValue)} required />
                : ""
              }
              { editMode === true
                ? <Input type='text' label='Comment' name='commentBody' multiline value={this.state.bodyText}
                  onChange={(newValue) => this.updateBodyText(newValue)} required />
                : comment.body
              }

            </CardText>
            { editMode === true
              ? <ConfirmToolbox
                undoHandler={this.handleEditUndo}
                confirmHandler={this.handleEditConfirm} />
              : <ControlToolbox
                parentName='comment'
                voteScore={comment.voteScore}
                editHandler={this.handleEditComment}
                deleteHandler={this.handleDeleteComment}
                upVoteHandler={this.handleUpVote}
                downVoteHandler={this.handleDownVote} />
            }
          </Card>
    );
  }
}

function mapStateToProps(state){
  return {
  }
}

function mapDispatchToProps (dispatch) {
   return {
     changeComment: (comment) => dispatch(updateComment(comment)),
     newComment: (comment) => dispatch(insertComment(comment)),
     removeComment: (comment) => dispatch(deleteComment(comment)),
     raiseError: (data) => dispatch(notifyError(data)),
     refreshPost: (post) => dispatch(updatePost(post))
   }
 }

export default connect(mapStateToProps,mapDispatchToProps)(CommentDetail)
