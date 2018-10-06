import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Login.css';
import { loginFacebook } from '../actions/auth';
import { Redirect } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';

class Login extends Component {
  responseFacebook = response => {
    this.props.loginFacebook(
      {
        facebookID: response.userID,
        name: response.name,
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
            {this.props.auth.errorMessage && (
              <div className="error-message">
                {this.props.auth.errorMessage}
              </div>
            )}
            <FacebookLogin
              appId="1088597931155576"
              autoLoad
              fields="name,email,picture"
              callback={this.responseFacebook}
            />
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
  { loginFacebook }
)(Login);
