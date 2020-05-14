/** Libraries */
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

/** Redux utilities */
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import reducer from '../imports/reducers';

/** Components */
import App from '../imports/ui/components/App';

/** Styles */
import '../imports/styles/main.css';

/** Initial State */
import InitialState from '../imports/utils/initialState';

/** Create store */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  InitialState,
  composeEnhancers(),
);

Meteor.startup(() => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('react-target'),
  );
});
