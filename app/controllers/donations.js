'use strict';

exports.home = {

  handler: (request, reply) => {
    reply.view('main', { title: 'Welcome to Donations' });
  },

};

exports.signup = {

  handler: (request, reply) => {
    reply.view('signup', { title: 'Sign up to Donations' });
  },

};

exports.login = {

  handler: (request, reply) => {
    reply.view('login', { title: 'Login to Donations' });
  },

};
