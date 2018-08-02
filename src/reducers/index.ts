import { combineReducers } from 'redux';

import app            from './app';
import BaseNavigation from '../Router';
import config         from './config';

export default combineReducers({
  app,
  navigation: (state, action) => BaseNavigation.router.getStateForAction(action, state),
  config,
});
