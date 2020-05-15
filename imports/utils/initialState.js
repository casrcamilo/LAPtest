const InitialState = {
  user: {
  },
  places: {},
  placeSelected: {},
  openPlaceDetails: false,
  openAddPlaceForm: false,
  defaultCenter: {
    lat: 4.666342,
    lng: -74.060677,
  },
  newPlace: {
    placeName: '',
    placeType: '',
    lat: 4.666342,
    lng: -74.060677,
  },
  openNewRatingCard: false,
  commentEditable: false,
  commentToEdit: '',
};

export default InitialState;
