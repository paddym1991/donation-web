'use strict';

const Donation = require('../models/donation');
const Boom = require('boom');
const utils = require('./utils.js');

exports.findAllDonations = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    Donation.find({}).populate('donor').populate('candidate').then(donations => {
      reply(donations);
    }).catch(err => {
      reply(Boom.badImplementation('error accessing db'));
    });
  },
};

exports.findDonations = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    Donation.find({ candidate: request.params.id }).then(donations => {
      reply(donations);
    }).catch(err => {
      reply(Boom.badImplementation('error accessing db'));
    });
  },

};

exports.makeDonation = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    const donation = new Donation(request.payload);
    donation.candidate = request.params.id;
    donation.donor = utils.getUserIdFromRequest(request);
    donation.save().then(newDonation => {
      return Donation.findOne(newDonation).populate('candidate').populate('donor');
    }).then(newDonation => {
      reply(newDonation).code(201);
    }).catch(err => {
      reply(Boom.badImplementation('error making donation'));
    });
  },

};

exports.deleteAllDonations = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    Donation.remove({}).then(err => {
      reply().code(204);
    }).catch(err => {
      reply(Boom.badImplementation('error removing Donations'));
    });
  },

};

exports.deleteDonations = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    Donation.remove({ candidate: request.params.id }).then(result => {
      reply().code(204);
    }).catch(err => {
      reply(Boom.badImplementation('error removing Donations'));
    });
  },
};


