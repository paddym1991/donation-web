'use strict';

exports.main = {
  auth: false,
  handler: function (request, reply) {
    reply.view('main', { title: 'Welcome to Donations' });
  },

};

exports.signup = {
  auth: false,
  handler: function (request, reply) {
    reply.view('signup', { title: 'Sign up for Donations' });
  },

};

exports.register = {
  auth: false,
  handler: function (request, reply) {
    const data = request.payload;
    this.users.push(data);
    this.currentUser = data;
    console.log('this is registering');
    console.log(this.currentUser);
    reply.redirect('/login');
  },

};

exports.login = {
  auth: false,
  handler: function (request, reply) {
    reply.view('login', { title: 'Login to Donations' });
  },

};

exports.authenticate = {
  auth: false,
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

//Another way of writing register & authenticate

// exports.register = {
//
//   handler: function (request, reply) {
//     const user = request.payload;
//     this.users[user.email] = user;
//     reply.redirect('/login');
//   },
//
// };
//
// exports.authenticate = {
//
//   handler: function (request, reply) {
//     const user = request.payload;
//     if ((user.email in this.users) && (user.password === this.users[user.email].password)) {
//       this.currentUser = this.users[user.email];
//       reply.redirect('/home');
//     } else {
//       reply.redirect('/signup');
//     }
//   },
//
// };

exports.logout = {
  auth: false,
  handler: function (request, reply) {
    reply.redirect('/');
  },

};
