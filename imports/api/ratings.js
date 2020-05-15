/* eslint-disable */ 
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Places } from './places';

if (Meteor.isServer) {

  Meteor.startup(() => {
    Meteor.methods({
      updateRate: (place)=>{
        try {
          const aggregateResult = Ratings.aggregate([
            { $match: { place_id: place } },
            { $group: { _id: '$place_id', avg: { $avg: '$rating' } } },
          ])
          console.log(aggregateResult)
          aggregateResult.map((avg) => {
            Places.update({ _id: avg._id }, { $set: { 'rate': avg.avg }})
          });
        } catch (error) {
          console.log(error);
        }
      }
    })
  })
}

Meteor.methods({
  'ratings.insert'(rating) {
    check(rating, Object);
    // Add rating to DB
    try {
      Ratings.insert(rating);
    } catch (error) {
      throw new Meteor.Error(Error, Error.details);
    }

    // Update rate of place
    Meteor.call('updateRate',rating.place_id, function(err, response) {
      return('updateRate')
		});
  },
  'ratings.update'(rateId, placeId, rating) {
    check(rateId, String);
    check(placeId, String);
    check(rating, Object);
    
    // Update rating to DB
    try {
      Ratings.update(
        { _id: rateId },
        { $set: rating },
      );
    } catch (error) {
      throw new Meteor.Error('error', 'reason for error');
    }

    // Update rate of place
    Meteor.call('updateRate', placeId, function(err, response) {
      return('updateRate')
		});
  }
  },
);

export const Ratings = new Mongo.Collection('ratings');