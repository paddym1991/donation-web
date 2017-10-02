'use strict';

const User = require('../models/user');   //account controller can now require the user model

exports.main = {
  auth: false,
  handler: function (request, reply) {
    reply.view('main', { title: 'Welcome to Donations' });
  },

};

exports.signup = {
  auth: false,
  handler: function (request, reply) {
    console.log('signup page');
    reply.view('signup', { title: 'Sign up for Donations' });
  },

};

//Can save new users on in database as they are registered
exports.registerUser = {
  auth: false,
  handler: function (request, reply) {
    const user = new User(request.payload);
    user.save().then(newUser => {
      reply.redirect('/login');
    }).catch(err => {
      reply.redirect('/');
    });
    console.log('this is registering');
    console.log(user);
  },

};

exports.authenticate = {
  auth: false,
  handler: function (request, reply) {
    const user = request.payload;
    User.findOne({ email: user.email }).then(foundUser => {
      if (foundUser && foundUser.password === user.password) {
        request.cookieAuth.set({      //setting a session cookie after user credentials are verified
          loggedIn: true,
          loggedInUser: user.email,
        });
        console.log('this is authenticating');
        console.log(foundUser);
        reply.redirect('/home');
      } else {
        reply.redirect('/signup');
      }
    }).catch(err => {
      reply.redirect('/');
    });
  },
};

exports.login = {
  auth: false,
  handler: function (request, reply) {
    console.log('Login page');
    reply.view('login', { title: 'Login to Donations' });
  },

};

//Another way of writing register & authenticate

// exports.register = {
//   auth: false,
//   handler: function (request, reply) {
//     const data = request.payload;
//     this.users.push(data);
//     // this.currentUser = data;
//     console.log('this is registering');
//     console.log(this.currentUser);
//     reply.redirect('/login');
//   },
//
// };
//
// exports.authenticate = {
//   auth: false,
//   handler: function (request, reply) {
//     const user = request.payload;
//     console.log('this is authenticating');
//     console.log(this.users);
//     for (let i = 0; i < this.users.length; i++) {
//       if ((user.email === this.users[i].email) && (user.password === this.users[i].password)) {
//         request.cookieAuth.set({
//           loggedIn: true,
//           loggedInUser: user.email,
//         });
//         reply.redirect('/home');
//       } else {
//         reply.redirect('/login');
//       }
//     }
//   },
// };

exports.logout = {
  auth: false,
  handler: function (request, reply) {
    request.cookieAuth.clear();   //clear session(clear cookie) upon logout
    reply.redirect('/');
  },

};

exports.viewSettings = {

  handler: function (request, reply) {
    var userEmail = request.auth.credentials.loggedInUser;
    var currentUserDetails = this.users[userEmail];
    reply.view('settings', { title: 'Edit Account Settings', user: currentUserDetails });
  },

};

exports.updateSettings = {

  handler: function (request, reply) {
    const user = request.payload;
    this.users[user.email] = user;
    reply.redirect('/settings');
  },

};
