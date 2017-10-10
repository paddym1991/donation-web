//Establish a connection to the database

'use strict';

const mongoose = require('mongoose');
//Turning on ES6 promises  in order to remove the following warning:
//node:50475) DeprecationWarning: Mongoose: mpromise (mongoose's default promise library)
//is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;

let dbURI = 'mongodb://donationuser:donationuser@ds113925.mlab.com:13925/donation';
if (process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGOLAB_URI;
}

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
  //preloading test data, using seeder utility
  if (process.env.NODE_ENV != 'production') {
    const seeder = require('mongoose-seeder');    //import the seeder library
    const data = require('../../data.json');      //import the initial data json
    const Donation = require('./donation');       //import the Donation schema
    const User = require('./user');               //import the User schema
    const Candidate = require('./candidate.js');  //import the Candidate Schema
    //call the seed component
    //pass 'data' loaded from json file
    //options: keep the database  + delete contents of all collections
    seeder.seed(data, { dropDatabase: false, dropCollections: true }).then(dbData => {
      console.log('preloading Test Data');
      console.log(dbData);
    }).catch(err => {
      console.log(error);
    });
  }
});

mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});
