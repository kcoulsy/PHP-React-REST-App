import React from 'react';
import {Router, Route, Switch, Link} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'


import Dashboard from './Dashboard';
import AddProfile from './AddProfile';
import EditProfile from './EditProfile';
import Profile from './Profile';

const history = createHistory();

class App extends React.Component {
  render() {
    return (
      <Router  history={history}>

        <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/profile/:id" component={Profile} />
        <Route path="/edit/:id" component={EditProfile} />
        <Route path="/add" component={AddProfile} />
        </Switch>
      </Router>
    )
  }
}

export default App;
