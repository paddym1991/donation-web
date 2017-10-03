'use strict';

const Donation = require('../models/donation');   //donation controller can now require the donation model
const User = require('../models/user');   //To gain access to the object reference (user)

exports.home = {

  handler: (request, reply) => {
    reply.view('home', { title: 'Make a Donation' });
  },

};

//updated to use donation.js model
exports.report = {

  handler: function (request, reply) {
    Donation.find({}).populate('donor').then(allDonations => {   //minor update to the report handler - with a populate('donor') call inserted into the query
      reply.view('report', {
        title: 'Donations to Date',
        donations: allDonations,
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },

};

//Reimplement the donation handler to establish the link to the donation
exports.donate = {

  handler: function (request, reply) {
    var userEmail = request.auth.credentials.loggedInUser;
    User.findOne({ email: userEmail }).then(user => {
      let data = request.payload;
      const donation = new Donation(data);
      donation.donor = user._id;
      return donation.save();
    }).then(newDonation => {
      reply.redirect('/report');
    }).catch(err => {
      reply.redirect('/');
    });
  },

};
