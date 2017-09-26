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
    let data = request.payload;
    const donorEmail = request.auth.credentials.loggedInUser;   //recover the donor email from the cookie
    data.donor = this.users[donorEmail];                        //recover user's details form database of users
    this.donations.push(data);
    reply.redirect('/report');
  },

};
