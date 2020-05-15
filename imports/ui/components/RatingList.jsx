/** Libraries */
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';

/** Components */
import Comment from './Comment';

/** API & Utils */
import { Ratings } from '../../api/ratings';

const RatingList = ({ placeSelected, ratings }) => {
  return (
    ratings.map((rating) => (
      <Comment key={rating._id} ratingData={rating} />
    ))
  );
};

const mapStateToProps = (state) => ({
  placeSelected: state.placeSelected,
});

export default connect(mapStateToProps, null)(withTracker(({ placeSelected }) => {
  Meteor.subscribe('ratings');

  return {
    ratings: Ratings.find(
      { place_id: placeSelected._id },
      { sort: { calificatedAt: -1 } },
    ).fetch(),
  };
})(RatingList));
