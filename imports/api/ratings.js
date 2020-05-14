/* eslint-disable */
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

if (Meteor.IsServer) {
  Meteor.publish('ratings', function ratingsPublication() {
    return Ratings.find();
  });
}

export const Ratings = new Mongo.Collection('ratings');