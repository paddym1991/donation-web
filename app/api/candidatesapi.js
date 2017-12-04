'use strict';

const Candidate = require('../models/candidate');
const Boom = require('boom');

/**
 * Handler for retrieving all candidats
 * @type {{auth: boolean, handler: exports.find.handler}}
 */
exports.find = {

  auth: false,

  handler: function (request, reply) {
    Candidate.find({}).exec().then(candidates => {
      reply(candidates);
    }).catch(err => {
      reply(Boom.badImplementation('error accessing db'));
    });
  },

};

/**
 * Handler for retrieving a single candidate
 * @type {{auth: boolean, handler: exports.findOne.handler}}
 */
exports.findOne = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    //the findOne query will generate an exception if the key is an invalid length,
    // but will return a null object if it fails to find a matching object for a correctly formed key.
    Candidate.findOne({ _id: request.params.id }).then(candidate => {
      if (candidate != null) {
        reply(candidate);
      }

      reply(Boom.notFound('id not found'));
    }).catch(err => {
      reply(Boom.notFound('id not found'));
    });
  },

};

/**
 * Handler for creating a single candidate
 * @type {{auth: boolean, handler: exports.create.handler}}
 */
exports.create = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    const candidate = new Candidate(request.payload);
    candidate.save().then(newCandidate => {
      reply(newCandidate).code(201);
    }).catch(err => {
      reply(Boom.badImplementation('error creating candidate'));
    });
  },

};

/**
 * Handler for deleting all candidates
 * @type {{auth: boolean, handler: exports.deleteAll.handler}}
 */
exports.deleteAll = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    Candidate.remove({}).then(err => {
      reply().code(204);
    }).catch(err => {
      reply(Boom.badImplementation('error removing candidates'));
    });
  },

};

/**
 * Handler for deleting a single candidate
 * @type {{auth: boolean, handler: exports.deleteOne.handler}}
 */
exports.deleteOne = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    Candidate.remove({ _id: request.params.id }).then(candidate => {
      reply(candidate).code(204);
    }).catch(err => {
      reply(Boom.notFound('id not found'));
    });
  },

};
