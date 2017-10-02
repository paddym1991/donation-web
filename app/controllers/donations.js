'use strict';

const Donation = require('../models/donation');   //donation controller can now require the donation model

exports.home = {

  handler: (request, reply) => {
    reply.view('home', { title: 'Make a Donation' });
  },

};

//updated to use donation.js model
exports.report = {

  handler: function (request, reply) {
    Donation.find({}).exec().then(allDonations => {
      reply.view('report', {
        title: 'Donations to Date',
        donations: allDonations,
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },

};

//updated to use donation.js model
exports.donate = {

  handler: function (request, reply) {
    let data = request.payload;
    data.donor = request.auth.credentials.loggedInUser;   //When we create a donation, we will insert the currents users email as the donor
    const donation = new Donation(data);
    donation.save().then(newDonation => {
      reply.redirect('/report');
    }).catch(err => {
      reply.redirect('/');
    });
  },

};
