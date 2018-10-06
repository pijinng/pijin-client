import React, { Component } from 'react';
import './App.css';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import EntryList from './components/EntryList';
import { connect } from 'react-redux';
import Login from './components/Login';
import { logoutUser, getUserFromToken } from './actions/auth';

const Home = () => <div>Home</div>;

class App extends Component {
  async componentWillMount() {
    await this.props.getUserFromToken(this.props.history);
  }

  handleLogout = evt => {
    evt.preventDefault();
    this.props.logoutUser(this.props.history);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="container">
            <div className="menubar">
              <h1 className="App-title">Pijin.ng</h1>
              <ul className="menu menu-left">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/entries/random">Random</Link>
                </li>
              </ul>
              {!this.props.auth.isAuthenticated && (
                <ul className="menu menu-right">
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                </ul>
              )}
              {this.props.auth.isAuthenticated && (
                <ul className="menu menu-right">
                  <li>
                    {this.props.auth.user && this.props.auth.user.username}
                  </li>
                  <li>
                    <a href="/logout" onClick={this.handleLogout}>
                      Logout
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </header>

        <Switch>
          <Route
            path="/entries/random"
            render={props => <EntryList {...props} listType="random" />}
          />
          <Route
            path="/entries/:entry"
            render={props => <EntryList {...props} listType="entry" />}
          />
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      auth: state.auth,
    }),
    { logoutUser, getUserFromToken }
  )(App)
);
