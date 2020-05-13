import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

if (Meteor.IsServer){
    
    Meteor.publish('califications', function calificationPublication(){
        return Califications.find();
    });
}

export const Califications = new Mongo.Collection('califications');