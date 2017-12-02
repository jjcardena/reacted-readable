import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from 'react-toolbox/lib/card/Card';
import CardTitle from 'react-toolbox/lib/card/CardTitle';
import CardActions from 'react-toolbox/lib/card/CardActions';
import Button from 'react-toolbox/lib/button/Button';
import VoteToolbox from './VoteToolbox';
import {timestampToDate} from '../utils/helpers';
import { votePost } from '../utils/api'
import { updatePost } from '../actions'

class PostPreview extends Component {

  handleViewPost = () => {
    const post = this.props.postInfo;
    this.props.history.push('/'+post.category+'/'+post.id);
  }

  handleDownVote = () => {
    const post = this.props.postInfo;
    votePost(post.id, "downVote").then((data) => { this.props.refreshPost(data) } )
  }

  handleUpVote = () => {
    const post = this.props.postInfo;
    votePost(post.id, "upVote").then((data) => { this.props.refreshPost(data) } )
  }

  render() {
    const post = this.props.postInfo;
    return (
      <Card className="CardPost">
        <CardTitle
          avatar="https://material.io/icons/#ic_perm_identity"
          title={post.author}
          subtitle={"Published in " + post.category + " on " + timestampToDate(post.timestamp)} />
        <CardTitle title={post.title}/>
        <CardActions className="CardActionsRightAlign">
          <Button label="View post" onClick={this.handleViewPost}/>
          <VoteToolbox
            parentName="Post"
            voteScore={post.voteScore}
            upVoteHandler={this.handleUpVote}
            downVoteHandler={this.handleDownVote}
            className="voteToolboxStyle"/>
        </CardActions>
      </Card>
    );
  }
}

PostPreview.propTypes = {
  postInfo: PropTypes.object.isRequired
}

function mapStateToProps(state){
  return {
  }
}

function mapDispatchToProps (dispatch) {
   return {
     refreshPost: (post) => dispatch(updatePost(post))
   }
 }

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PostPreview))
