import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import List from 'react-toolbox/lib/list/List';
import ListItem from 'react-toolbox/lib/list/ListItem';
import ListSubHeader from 'react-toolbox/lib/list/ListSubHeader';
import {selectCategory} from '../actions';

class CategoryList extends Component {
  handleClick = (category) =>{
    this.props.history.push('/'+category);
    this.props.pickCategory(category);
    this.props.handleToggle();
  }
  render() {
    return (
      <List selectable ripple>
        <ListSubHeader caption='Select a category' />
        <ListItem caption="All" legend="" key="All"
          onClick={() => this.handleClick("") }/>
        {this.props.categories.map((category) =>
            <ListItem caption={category.name} legend="" key={category.name}
              onClick={() => this.handleClick(category.name) }/>
        )}
      </List>
    );
  }
}

function mapStateToProps(state){
  return {
    categories: state.categoriesReducer.categories
  }
}

function mapDispatchToProps (dispatch) {
   return {
     pickCategory: (data) => dispatch(selectCategory(data))
   }
 }

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(CategoryList));
