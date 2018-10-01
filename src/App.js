import React, { Component } from 'react';
import './App.css';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import Random from './components/Random';
import { connect } from 'react-redux';
import Login from './components/Login';
import { logoutUser } from './actions/auth';

const Home = () => <div>Home</div>;

class App extends Component {
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
              <ul className="menu">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/entries/random">Random</Link>
                </li>
                {!this.props.auth.isAuthenticated && (
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                )}
                {this.props.auth.isAuthenticated && (
                  <li>
                    <a href="/logout" onClick={this.handleLogout}>
                      Logout
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </header>

        <Switch>
          <Route path="/entries/random" component={Random} />
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
    { logoutUser }
  )(App)
);
