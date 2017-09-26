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
    console.log('signup page');
    reply.view('signup', { title: 'Sign up for Donations' });
  },

};

exports.registerUser = {
  auth: false,
  handler: function (request, reply) {
    const user = request.payload;
    this.users[user.email] = user;
    console.log('this is registering');
    console.log(user);
    reply.redirect('/login');
  },

};

exports.authenticate = {
  auth: false,
  handler: function (request, reply) {
    const user = request.payload;
    if ((user.email in this.users) && (user.password === this.users[user.email].password)) {
      request.cookieAuth.set({      //setting a session cookie after user credentials are verified
        loggedIn: true,
        loggedInUser: user.email,
      });
      console.log('this is authenticating');
      console.log(this.users[user.email]);
      reply.redirect('/home');
    } else {
      reply.redirect('/signup');
    }
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
