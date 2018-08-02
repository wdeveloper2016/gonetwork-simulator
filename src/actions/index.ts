import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export const UPDATE_ANIMATABLES = 'UPDATE_ANIMATABLES';
export const RESET_ANIMATABLES  = 'RESET_ANIMATABLES';

export function getNewStateWithAnimatable(state, data) {
  const animatables = {};
  Object.assign(animatables, state.animatables, data);
  Object.keys(animatables).forEach((componentName) => {
    animatables[componentName] = {
      ...state.animatables[componentName],
      ...data[componentName],
    };
  });
  return {
    ...state,
    animatables,
  };
}

export function updateAnimatables(screenName, data) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_ANIMATABLES,
      screenName,
      data,
    });
  };
}

export function resetAnimatables(screenName) {
  return (dispatch) => {
    dispatch({
      type: RESET_ANIMATABLES,
      screenName,
    });
  };
}

export function withApp(mapStateToProps, mapDispatchToProps) {
  const mapStateToPropsWithApp = state => ({
    ...(mapStateToProps ? mapStateToProps(state) : {}),
    viewportWidth: state.app.viewportWidth,
    viewportHeight: state.app.viewportHeight,
  });
  const mapDispatchToPropsWithApp = dispatch => bindActionCreators({
    ...(mapDispatchToProps || {}),
    updateAnimatables,
    resetAnimatables,
  }, dispatch);
  return connect(mapStateToPropsWithApp, mapDispatchToPropsWithApp);
}

export * from './app';
