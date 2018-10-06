import { combineReducers } from 'redux';
import errors from './errors';
import auth from './auth';
// import entries from './entries';

export default combineReducers({ auth, errors });
