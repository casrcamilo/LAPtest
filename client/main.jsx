/** Libraries */
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

/** Components */
import { App } from '/imports/ui/components/App';

/** Styles */
import '../imports/styles/main.css'

Meteor.startup(() => {
  render(<App/>, document.getElementById('react-target'));
});
