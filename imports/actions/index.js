export const loginRequest = (payload) => ({
  type: 'LOGIN_REQUEST',
  payload,
});

export const logoutRequest = (payload) => ({
  type: 'LOGOUT_REQUEST',
  payload,
});

export const updatePlaceSelected = (payload) => ({
  type: 'UPDATE_PLACE_SELECTED',
  payload,
});

export const loadPlaceDetails = (payload) => ({
  type: 'LOAD_PLACE_DETAILS',
  payload,
});

export const updateShowPlaceForm = (payload) => ({
  type: 'UPDATE_SHOW_PLACE_FORM',
  payload,
});

export const updateDefaultCenter = (payload) => ({
  type: 'UPDATE_DEFAULT_CENTER',
  payload,
});

export const updateNewPlaceCoordinates = (payload) => ({
  type: 'UPDATE_NEW_PLACE_COORDINATES',
  payload,
});

export const updateNewPlaceData = (payload) => ({
  type: 'UPDATE_NEW_PLACE_DATA',
  payload,
});

export const deletePlaceData = (payload) => ({
  type: 'DELETE_PLACE_DATA',
  payload,
});

export const updateShowNewRatingCard = (payload) => ({
  type: 'UPDATE_SHOW_NEW_RATING_CARD',
  payload,
});

/*
export const updateActualRatings = (payload) => ({
  type: 'UPDATE_ACTUAL_RATINGS',
  payload,
});
*/
export const updateCommentEditable = (payload) => ({
  type: 'UPDATE_COMMENT_EDITABLE',
  payload,
});

export const updateCommentToEdit = (payload) => ({
  type: 'UPDATE_COMMENT_TO_EDIT',
  payload,
});
