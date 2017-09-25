'use strict';

exports.home = {

  handler: (request, reply) => {
    reply.view('home', { title: 'Make a Donation' });
  },

};

exports.report = {

  handler: (request, reply) => {
    reply.view('report', { title: 'Donations to Date' });
  },

};

exports.donate = {

  handler: function(request, reply) {
    reply.redirect('report');
  },

};
