'use strict';

const Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: process.env.PORT || 4000 });

//store a list of users and donations in a simple array
server.bind({
  // currentUser: {},   //will be using alternative mechanism to track the user
  users: [],
  donations: [],
});

//in this case users is an object instead of array

// server.bind({
//   currentUser: {},   //current user object
//   users: {},
//   donations: [],
// });


//registering plugins
server.register([require('inert'), require('vision'), require('hapi-auth-cookie')], err => {

  if (err) {
    throw err;
  }

  server.views({
    engines: {
      hbs: require('handlebars'),
    },
    relativeTo: __dirname,
    path: './app/views',
    layoutPath: './app/views/layout',
    partialsPath: './app/views/partials',
    layout: true,
    isCached: false,
  });

  //initialisation of cookie plugin
  server.auth.strategy('standard', 'cookie', {
    password: 'secretpasswordnotrevealedtoanyone',
    cookie: 'donation-cookie',
    isSecure: false,
    ttl: 24 * 60 * 60 * 1000,
  });

  //Cookie set as strategy for all routes.
  //App will be disabled as all routes are protected (looking for a cookie)
  server.auth.default({
    strategy: 'standard',
  });

  server.route(require('./routes'));

  server.start((err) => {
    if (err) {
      throw err;
    }

    console.log('Server listening at:', server.info.uri);
  });

});
