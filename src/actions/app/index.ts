export const UPDATE_VIEWPORT_HEIGHT = 'UPDATE_VIEWPORT_HEIGHT';

export function updateViewportHeight(value) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_VIEWPORT_HEIGHT,
      value,
    });
  };
}
