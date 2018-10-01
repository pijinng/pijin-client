import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Login.css';
import { loginUser } from '../actions/auth';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  state = {
    username: '',
    password: '',
    errors: {},
  };

  onChangeInput = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  onSubmit = async evt => {
    evt.preventDefault();
    this.props.loginUser(
      {
        username: this.state.username,
        password: this.state.password,
      },
      this.props.history
    );
  };

  render() {
    if (this.props.auth.isAuthenticated) {
      return <Redirect to="/" />;
    }

    return (
      <div className="login-page">
        <div className="container">
          <div className="login-card">
            <h2 className="login-card-heading">Login</h2>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  onChange={this.onChangeInput}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={this.onChangeInput}
                />
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    auth: state.auth,
  }),
  { loginUser }
)(Login);
