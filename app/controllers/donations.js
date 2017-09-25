'use strict';

exports.home = {

  handler: (request, reply) => {
    reply.view('home', { title: 'Make a Donation' });
  },

};

//retrieve donations array
exports.report = {

  handler: function (request, reply) {
    reply.view('report', {
      title: 'Donations to Date',
      donations: this.donations,
    });
  },

};

//store donation in donations array
exports.donate = {

  handler: function (request, reply) {
    const data = request.payload;
    data.donor = this.currentUser;
    this.donations.push(data);
    reply.redirect('/report');
  },

};
