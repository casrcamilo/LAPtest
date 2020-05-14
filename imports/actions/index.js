export const loginRequest = (payload) => ({
  type: 'LOGIN_REQUEST',
  payload,
});

export const logoutRequest = (payload) => ({
  type: 'LOGOUT_REQUEST',
  payload,
});

export const addShopSelected = (payload) => ({
  type: 'ADD_SHOP_SELECTED',
  payload,
});

export const openShopDetails = (payload) => ({
  type: 'OPEN_SHOP_DETAILS',
  payload,
});

export const openAddShopForm = (payload) => ({
  type: 'OPEN_ADD_SHOP_FORM',
  payload,
});

export const setDefaultCenter = (payload) => ({
  type: 'SET_DEFAULT_CENTER',
  payload,
});

export const setNewShopCoordinates = (payload) => ({
  type: 'SET_NEW_SHOP_COORDINATES',
  payload,
});

export const setNewShopData = (payload) => ({
  type: 'SET_NEW_SHOP_DATA',
  payload,
});

export const clearShopData = (payload) => ({
  type: 'CLEAR_SHOP_DATA',
  payload,
});

export const setOpenNewRatingCard = (payload) => ({
  type: 'SET_OPEN_NEW_RATING_CARD',
  payload,
});

export const setActualRatings = (payload) => ({
  type: 'SET_ACTUAL_RATINGS',
  payload,
});

export const setCommentEditable = (payload) => ({
  type: 'SET_COMMENT_EDITABLE',
  payload,
});

export const setCommentToEdit = (payload) => ({
  type: 'SET_COMMENT_TO_EDIT',
  payload,
});
