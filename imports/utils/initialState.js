const InitialState = {
  user: {
    _id: 'vdZFx35aV1grYyU2isFtszF8Zls2',
    providerId: 'google.com',
    displayName: 'Camilo Sosa',
    photoURL: 'https://lh3.googleusercontent.com/a-/AOh14GjQJKF5Tt0U59UbQaofm2ggvoxBpJZ5BTKCuCkR',
    email: 'casrcamilo@gmail.com',
  },
  shops: {},
  shopSelected: {},
  openShopDetails: false,
  openAddShopForm: false,
  defaultCenter: {
    lat: 4.666342,
    lng: -74.060677,
  },
  newShop: {
    shopName: '',
    shopType: '',
    lat: 4.666342,
    lng: -74.060677,
  },
  openNewRatingCard: false,
  commentEditable: false,
  commentToEdit: '',
};

export default InitialState;
