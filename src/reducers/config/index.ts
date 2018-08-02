import {
  getNewStateWithAnimatable,
  UPDATE_ANIMATABLES,
  RESET_ANIMATABLES,
} from '../../actions';
import { originalData } from '../../animations/config';

const initialState = {
  animatables: originalData,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ANIMATABLES:
      if (action.screenName === 'Config') {
        return getNewStateWithAnimatable(state, action.data);
      }
      return state;

    case RESET_ANIMATABLES:
      if (action.screenName === 'Config') {
        return {
          ...state,
          animatables: originalData,
        };
      }
      return state;

    default:
      return state;
  }
};
