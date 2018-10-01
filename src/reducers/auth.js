import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_USER,
} from '../actions/types';

export default function auth(
  state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('token') ? true : false,
  },
  action
) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        creds: action.creds,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        creds: undefined,
        user: action.user,
        token: action.token,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        user: action.user,
        token: action.token,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        user: undefined,
        token: undefined,
      };
    default:
      return state;
  }
}
