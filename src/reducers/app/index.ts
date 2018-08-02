import { UPDATE_VIEWPORT_HEIGHT } from '../../actions';
import { Metrics } from '../../global/constants';

const initialState = {
  activeScreenId: null,
  isTransitioning: false,
  viewportWidth: Metrics.screenWidth,
  viewportHeight: Metrics.screenHeight,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_VIEWPORT_HEIGHT:
      return {
        ...state,
        viewportHeight: action.value,
      };

    default:
      return state;
  }
};
