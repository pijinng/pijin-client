import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import auth from './auth';

export default combineReducers({ auth: auth, errors: errorReducer });
