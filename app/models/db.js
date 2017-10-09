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
});

mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});
