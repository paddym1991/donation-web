'use strict';

exports.main = {

  handler: function (request, reply) {
    reply.view('main', { title: 'Welcome to Donations' });
  },

};

exports.signup = {

  handler: function (request, reply) {
    reply.view('signup', { title: 'Sign up for Donations' });
  },

};

exports.register = {

  handler: function (request, reply) {
    const data = request.payload;
    this.users.push(data);
    this.currentUser = data;
    console.log('this is registering');
    console.log(this.currentUser);
    reply.redirect('/home');
  },

};

exports.login = {

  handler: function (request, reply) {
    reply.view('login', { title: 'Login to Donations' });
  },

};

exports.authenticate = {
  handler: function (request, reply) {
    const data = request.payload;
    console.log('this is authenticating');
    console.log(this.users);
    for (let i = 0; i < this.users.length; i++) {
      if ((data.email === this.users[i].email) && (data.password === this.users[i].password)) {
        this.currentUser = this.users[i];
        reply.redirect('/home');
      } else {
        reply.redirect('/login');
      }
    }
  },
};

exports.logout = {

  handler: function (request, reply) {
    reply.redirect('/');
  },

};
