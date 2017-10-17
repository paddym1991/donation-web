'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: process.env.PORT || 4000 });

//server.bind({
  // currentUser: {},   //will be using alternative mechanism to track the user
  //users: {},            //users stored as an object
  //donations: [],
//});


//deleted existing server objects above and replaced with an import of the db just created
require('./app/models/db');

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
    redirectTo: '/login',
  });

  //Cookie set as strategy for all routes.
  //Some routes have set auth to false to counter this and prevent app from crashing
  server.auth.default({
    strategy: 'standard',
  });

  server.route(require('./routes'));
  server.route(require('./routesapi'));

  server.start((err) => {
    if (err) {
      throw err;
    }

    console.log('Server listening at:', server.info.uri);
  });

});
