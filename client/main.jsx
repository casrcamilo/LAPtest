/** Libraries */
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

/** Redux utilities */
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import reducer from '../imports/reducers'

/** Components */
import { App } from '/imports/ui/components/App';

/** Styles */
import '../imports/styles/main.css'

/** Initial State */
const InitialState = {
  "user": {
    "_id": "3wcRmI6KYwfuY55hA0I5CFLP8Kf1",
    "providerId": "facebook.com",
    "displayName": "Camilo Sosa",
    "photoURL": "https://graph.facebook.com/1357162091339692/picture",
    "email": null
  },
  "shops": {},
  "shopSelected": {},
  "openShopDetails": false,
  "openAddShopForm": false,
  "defaultCenter": { 
    "lat": 4.666342, 
    "lng": -74.060677 
  }
}

/** Create store */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  InitialState,
  composeEnhancers()
);

Meteor.startup(() => {
    render(
        <Provider store={ store }>
            <App/>
        </Provider>,
        document.getElementById('react-target'));
});
