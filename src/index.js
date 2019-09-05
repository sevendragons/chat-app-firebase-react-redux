import React, { Component } from "react";
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import {
BrowserRouter as Router,
  Switch,
  Route,
  withRouter, HashRouter
} from "react-router-dom";

import './index.css';
import App from './components/App';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import registerServiceWorker from './registerServiceWorker';
import firebase from './components/Auth/firebase'

import 'semantic-ui-css/semantic.min.css';

import {setUser, clearUser} from './components/redux/actions'
import Spinner from './components/Spinner'

import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./components/redux/reducers";
const store = createStore(rootReducer, composeWithDevTools())


class Root extends Component {
  
  componentDidMount() {
    // console.log(this.props.isLoading)
      firebase.auth().onAuthStateChanged(user => {
        const {history} = this.props
        if (user) {
          // console.log(user);
          this.props.setUser(user);
          history.push("/");
          console.log('move to index')
          // window.location.reload(false)
        } else {
          history.push("/login");
          this.props.clearUser();
        }
      });
  }

  render() {
    return this.props.isLoading ? (<Spinner></Spinner>) :(
      <Switch>
        <Route path="/" exact component={App}></Route>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/register" exact component={Register}></Route>
      </Switch>

    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.user.isLoading
});

const RootWithAuth = withRouter( 
  connect(
    mapStateToProps,
    {setUser, clearUser},
  )(Root)
);


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
