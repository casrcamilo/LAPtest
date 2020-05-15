const reducer = (state, action) => {
  let data;
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT_REQUEST':
      return {
        ...state,
        user: action.payload,
      };
    case 'UPDATE_PLACE_SELECTED':
      return {
        ...state,
        placeSelected: action.payload,
        openNewRatingCard: false,
      };
    case 'LOAD_PLACE_DETAILS':
      return {
        ...state,
        openPlaceDetails: action.payload,
        openAddPlaceForm: false,
      };
    case 'UPDATE_SHOW_PLACE_FORM':
      return {
        ...state,
        openAddPlaceForm: action.payload,
        openPlaceDetails: false,
        placeSelected: {},
      };
    case 'UPDATE_DEFAULT_CENTER':
      return {
        ...state,
        defaultCenter: action.payload,
      };
    case 'UPDATE_NEW_PLACE_COORDINATES':
      data = { ...action.payload };
      return {
        ...state,
        newPlace: {
          ...state.newPlace,
          ...data,
        },
      };
    case 'UPDATE_NEW_PLACE_DATA':
      data = { ...action.payload };
      return {
        ...state,
        newPlace: {
          ...state.newPlace,
          ...data,
        },
      };
    case 'DELETE_PLACE_DATA':
      return {
        ...state,
        newPlace: { ...state.defaultCenter, ...action.payload },
      };
    case 'UPDATE_SHOW_NEW_RATING_CARD':
      return {
        ...state,
        openNewRatingCard: action.payload,
      };
    case 'UPDATE_COMMENT_EDITABLE':
      return {
        ...state,
        commentEditable: action.payload,
      };
    case 'UPDATE_COMMENT_TO_EDIT':
      return {
        ...state,
        commentToEdit: action.payload,
      };
    default:
      return state;
  }
};
export default reducer;
