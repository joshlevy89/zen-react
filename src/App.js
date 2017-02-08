import React, { Component } from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import routes from './routes/index'

export default class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
          { routes }
      </Router>
    );
  }
}