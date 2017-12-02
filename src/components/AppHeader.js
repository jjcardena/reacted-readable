import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AppBar from 'react-toolbox/lib/app_bar/AppBar';
import IconMenu from 'react-toolbox/lib/menu/IconMenu';
import MenuItem from 'react-toolbox/lib/menu/MenuItem';
import Navigation from 'react-toolbox/lib/navigation/Navigation';
import Button from 'react-toolbox/lib/button/Button';
import ReactTooltip from 'react-tooltip';
import { orderPosts } from '../actions';
import { getUniqueId } from '../utils/helpers';

class AppHeader extends Component {
  render() {
    const category = this.props.selCategory
                    ? '(showing only '+this.props.selCategory +' posts)'
                    : "";
    const title = 'Readable Project ' + category;
    return (
        <AppBar title={title} leftIcon='menu' onLeftIconClick={this.props.onLeftIconClick}>
          <Navigation type="horizontal">
            <IconMenu icon='sort' position='topRight' menuRipple selectable
            onSelect={(data) => this.props.selectPostOrder(data)}
            selected={this.props.postsOrder ? this.props.postsOrder : "voteScore"}
            data-tip='Sort' className="sortMenu">
              <MenuItem value='voteScore' caption='Vote Score'/>
              <MenuItem value='timestamp' caption='Published Date' />
            </IconMenu>
            <Button icon='add' floating accent mini data-tip='Add post'
              onClick={() => this.props.history.push('/any/'+getUniqueId()+'/new')}/>
          </Navigation>
          <ReactTooltip />
        </AppBar>
    );
  }
}


function mapStateToProps(state){
  return {
    postsOrder : state.postsReducer.postsOrder,
    selCategory: state.categoriesReducer.selectedCategory
  }
}

function mapDispatchToProps (dispatch) {
   return {
     selectPostOrder: (data)  => dispatch(orderPosts(data))
   }
 }

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AppHeader))
