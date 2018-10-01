import axios from 'axios';
import {
  GET_ERRORS,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_USER,
} from './types';

function requestLogin({ username, password }) {
  return {
        type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds: { username, password },
  };
}

function receiveLogin({ user, token }) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user,
    token,
  };
}

function loginError(errorMessage) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    errorMessage,
  };
}

function doLogout() {
  return {
    type: LOGOUT_USER,
    isAuthenticated: false,
  };
}

export const registerUser = (user, history) => dispatch => {
  axios
    .post('http://127.0.0.1:4000/v1/auth/register', user)
    .then(() => history.push('/login'))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const loginUser = ({ username, password }, history) => dispatch => {
  dispatch(requestLogin({ username, password }));

  fetch('http://127.0.0.1:4000/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response =>
      response
        .json()
        .then(data => ({
          user: data.data,
          token: data.token,
          response,
        }))
        .then(({ user, token, response }) => {
          if (!response.ok) {
            return;
          }

          localStorage.setItem('token', token);
          dispatch(receiveLogin({ user, token }));
          history.push('/');
        })
    )
    .catch();
};

export const logoutUser = history => dispatch => {
  localStorage.removeItem('token');
  dispatch(doLogout());
  history.push('/');
};
