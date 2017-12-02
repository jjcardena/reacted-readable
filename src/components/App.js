import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App.css';
import '../assets/react-toolbox/theme.css';
import theme from '../assets/react-toolbox/theme.js';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import Layout from 'react-toolbox/lib/layout/Layout';
import NavDrawer from 'react-toolbox/lib/layout/NavDrawer';
import Panel from 'react-toolbox/lib/layout/Panel';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import AppHeader from './AppHeader';
import CategoryList from './CategoryList'
import CategoryView from './CategoryView'
import PostDetail from './PostDetail';
import PostView from './PostView';
import { fetchCategories } from '../utils/api'
import { retrieveCategories, notifyError } from '../actions'

class App extends Component {
  state = {
    active: false
  }

  componentDidMount = () => {
    fetchCategories().then((data) => { this.props.loadCategories(data) } )
  }

  handleToggle = () => {
    this.setState({active: !this.state.active});
  }

  handleSnackbarClose = () => {
    if(this.props.error.sendToRoot)
          this.props.history.push('/');
    this.props.raiseError("", false);
  }

  actions = [
    { label: "Ok", onClick: this.handleSnackbarClose }
  ];

  render() {
    return (
      <ThemeProvider theme={theme}>
          <div>
            <Layout>
              <NavDrawer active={this.state.active} onOverlayClick={this.handleToggle}>
                  <CategoryList handleToggle={this.handleToggle}/>
              </NavDrawer>
              <Panel>
                <AppHeader onLeftIconClick={this.handleToggle} />
                <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
                  <Switch>
                    <Route exact path="/" render={() => (
                        <CategoryView />
                    )}/>
                    <Route exact path="/:category" render={() => (
                        <CategoryView />
                    )}/>
                    <Route exact path="/:category/:post_id" render={() => (
                        <PostView />
                    )}/>
                    <Route exact path="/:category/:post_id/:operation" render={() => (
                        <PostDetail />
                    )}/>
                  </Switch>

                </div>
              </Panel>
            </Layout>
            <Dialog
              actions={this.actions}
              active={this.props.error && this.props.error.errorMessage!=="" ? true : false}
              onEscKeyDown={this.handleSnackbarClose}
              onOverlayClick={this.handleSnackbarClose}
              title='Error message'>
              <p>{this.props.error ? this.props.error.errorMessage : ""}</p>
            </Dialog>
          </div>
      </ThemeProvider>
    );
  }
}

function mapStateToProps(state){
  return {
    selectedCategory : state.categoriesReducer.selectedCategory,
    error : state.errorReducer.error
  }
}

function mapDispatchToProps (dispatch) {
   return {
     loadCategories: (data) => dispatch(retrieveCategories(data)),
     raiseError: (data) => dispatch(notifyError(data))
   }
 }

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App))
