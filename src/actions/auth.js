import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_USER,
} from './types';
const BASE_URL = 'http://127.0.0.1:4000/v1';

function requestLogin() {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
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

export const logoutUser = history => dispatch => {
  localStorage.removeItem('token');
  dispatch(doLogout());
  history.push('/');
};

export const loginFacebook = (
  { facebookID, name },
  history
) => async dispatch => {
  dispatch(requestLogin());

  try {
    const response = await fetch(`${BASE_URL}/auth/login/facebook`, {
      method: 'POST',
      body: JSON.stringify({ facebookID, name }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (!response.ok) {
      const error =
        data.error ||
        data.message ||
        'An error occured while trying to log you in.';

      console.error('error');
      dispatch(loginError(error));
      return;
    }

    localStorage.setItem('token', data.token);
    dispatch(receiveLogin({ user: data.data, token: data.token }));
    history.push('/');
  } catch (error) {
    console.error('error down');
    dispatch(loginError(error));
  }
};

export const getUserFromToken = history => async dispatch => {
  const token = localStorage.getItem('token');

  if (!token) {
    history.push('/login');
    return;
  }

  try {
    const userData = await fetch(`${BASE_URL}/users/@me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await userData.json();
    if (!userData.ok) {
      localStorage.removeItem('token');
      history.push('/login');
      return;
    }
    const user = data.data;
    dispatch(receiveLogin({ user, token: token }));
    return user;
  } catch (error) {
    console.error(error);
    localStorage.removeItem('token');
    history.push('/login');
  }
};
