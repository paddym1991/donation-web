'use strict';

const Donation = require('../models/donation');   //donation controller can now require the donation model
const User = require('../models/user');   //To gain access to the object reference (user)
const Candidate = require('../models/candidate');  //To gain access to the object reference (candidate)
const Joi = require('joi');

exports.home = {

  //pass the list of candidates to the view to enable the user to select which candidate to make a donation to
  handler: function (request, reply) {
    Candidate.find({}).then(candidates => {
      reply.view('home', {
        title: 'Make a Donation',
        candidates: candidates,
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },

};

//updated to use donation.js model
exports.report = {

  handler: function (request, reply) {
    Donation.find({}).populate('donor').populate('candidate').then(allDonations => {   //populating the donor and candidate fields in the database
      let total = 0;                        //setting total to '0'
      allDonations.forEach(donation => {    //for each donation in Donation
        total += donation.amount;           //total equals previous total plus new donation amount
      });
      reply.view('report', {
        title: 'Donations to Date',
        donations: allDonations,
        total: total,
      });
      console.log('all donations');
      console.log(allDonations);
    }).catch(err => {
      reply.redirect('/');
    });
  },

};

//Reimplement the donation handler to establish the link to the donation
exports.donate = {

  validate: {

    //This defines a schema which defines rules that our fields must adhere to
    payload: {
      amount: Joi.number().required(),
      method: Joi.string().required(),
      candidate: Joi.string().required(),
    },

    //This is the handler to invoke if one or more of the fields fails the validation
    failAction: function (request, reply, source, error) {
      reply.view('home', {
        title: 'Donate error',
        errors: error.data.details,
      }).code(400);
    },

    options: {
      abortEarly: false,
    },

  },

  handler: function (request, reply) {
    const userEmail = request.auth.credentials.loggedInUser;
    let userId = null;
    let donation = null;
    User.findOne({ email: userEmail }).then(user => {   //locate user object
      let data = request.payload;
      userId = user._id;
      donation = new Donation(data);    //create new donation
      const rawCandidate = request.payload.candidate.split(',');
      return Candidate.findOne({ lastName: rawCandidate[0], firstName: rawCandidate[1] });  //locate candidate object
    }).then(candidate => {
      donation.donor = userId;
      donation.candidate = candidate._id;   //initialize new donation with user and candidate IDs
      return donation.save();   //save donation
    }).then(newDonation => {
      console.log('new donation');
      console.log(newDonation);   //logs the new donation made, to console
      reply.redirect('/report');
    }).catch(err => {
      reply.redirect('/');
    });
  },

};
