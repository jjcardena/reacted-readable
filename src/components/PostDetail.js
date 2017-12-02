import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Card from 'react-toolbox/lib/card/Card';
import CardText from 'react-toolbox/lib/card/CardText';
import Input from 'react-toolbox/lib/input/Input';
import { getTimestamp} from '../utils/helpers';
import { addPost, modifyPost, fetchPosts } from '../utils/api'
import { updatePost, insertPost, deletePost, retrieveAllPosts, notifyError } from '../actions'
import MenuItem from 'react-toolbox/lib/menu/MenuItem';
import CustomDropDown from './CustomDropDown'
import ConfirmToolbox  from './ConfirmToolbox'

class PostDetail extends Component {
  state = {
    title : "",
    body : "",
    author : "",
    category : ""
  }

  componentDidMount = () => {
    if(!this.props.posts)
        fetchPosts("").then((data) => { this.props.loadAllPosts(data) });
    else if(this.props.match.params.operation && this.props.match.params.operation==='edit')
    {
      const post = this.props.posts.filter((elem) =>
                                        elem.id===this.props.match.params.post_id)[0];
      this.setState({ title: post.title ,
                      body: post.body,
                      category: post.category,
                      author: post.author});
    }
  }

  updateTitleText = (text) => {
    this.setState({ title: text });
  };

  updateBodyText = (text) => {
    this.setState({ body: text });
  };

  updateAuthorText = (text) => {
    this.setState({ author: text });
  };

  updateCategory = (value) => {
    this.setState({ category: value });
  };

  handleUndo = (() => {
    if(this.props.match.params.operation==='edit')
    {
      const post = this.props.posts.filter((elem) =>
                                        elem.id===this.props.match.params.post_id)[0];
      this.props.history.push('/'+post.category+'/'+post.id);
    }
    else {
      this.props.history.push('/');
    }
  });

  handleConfirm = (() => {
    const postId = this.props.match.params.post_id;
    const editMode = this.props.match.params.operation === 'edit';
    if(this.state.title==="" || this.state.body==="" ||
        this.state.category==="" || this.state.author===""){
      this.props.raiseError("Please complete all required fields!");
      return;
    }
    if(editMode){
      const postData = {
        title: this.state.title,
        body: this.state.body
      }
      modifyPost(postId, postData).then((data) => { this.props.changePost(data);
                              this.props.history.push('/'+data.category+'/'+data.id);});
    }
    else{
      const postData = {
        ...this.state,
        id: postId,
        timestamp: getTimestamp(),
      }
      addPost(postData).then((data) => { this.props.newPost(data);
                              this.props.history.push('/'+data.category+'/'+data.id);});
    }
  });

  render() {
    const categories =  this.props.categories;
    const editMode = this.props.match.params.operation === 'edit';
    return (
      <div>
      <Card>
        <CardText>
          <Input type='text' label='Title' name='title' value={this.state.title}
          onChange={(newValue) => this.updateTitleText(newValue)} required/>
          <Input type='text' label='Body' name='body' multiline value={this.state.body}
          onChange={(newValue) => this.updateBodyText(newValue)} required/>
          <Input type='text' label='Author' name='author' value={this.state.author}
          onChange={(newValue) => this.updateAuthorText(newValue)} required
          disabled={editMode}/>
          <CustomDropDown label="Category" value={this.state.category}
            onChange={(value) => this.updateCategory(value) } required
            disabled={editMode}>
            {categories
            ? categories.map((cat) => <MenuItem key={cat.name}
                                        value={cat.name} caption={cat.name}  />)
            : ""
            }
          </CustomDropDown>
          <ConfirmToolbox
              undoHandler={this.handleUndo}
              confirmHandler={this.handleConfirm} />
        </CardText>

      </Card>

      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    categories: state.categoriesReducer.categories,
    posts: state.postsReducer.posts
  }
}

function mapDispatchToProps (dispatch) {
   return {
    changePost: (post) => dispatch(updatePost(post)),
    newPost: (post) => dispatch(insertPost(post)),
    removePost: (post) => dispatch(deletePost(post)),
    loadAllPosts: (data) => dispatch(retrieveAllPosts(data)),
    raiseError: (data) => dispatch(notifyError(data))
   }
 }

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PostDetail))
