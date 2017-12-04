'use strict';

const Hapi = require('hapi');

//make app accessible from an SPA. import 'hapi-cors'
const corsHeaders = require('hapi-cors-headers');

const server = new Hapi.Server();
server.connection({ port: process.env.PORT || 4000 });

//define a new strategy, which will be in addition to the strategy already in place
const utils = require('./app/api/utils.js');

//deleted existing server objects above and replaced with an import of the db just created
require('./app/models/db');

//in this case users is an object instead of array

// server.bind({
//   currentUser: {},   //current user object
//   users: {},
//   donations: [],
// });


//registering plugins
server.register([require('inert'), require('vision'), require('hapi-auth-cookie'), require('hapi-auth-jwt2')], err => {

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

  /**
   * define a new strategy, which will be in addition to the strategy already in place.
   * 'validateFunc' is specified here as part of the strategy
   */
  server.auth.strategy('jwt', 'jwt', {
    key: 'secretpasswordnotrevealedtoanyone',
    validateFunc: utils.validate,
    verifyOptions: { algorithms: ['HS256'] },
  });

  //Cookie set as strategy for all routes.
  //Some routes have set auth to false to counter this and prevent app from crashing
  server.auth.default({
    strategy: 'standard',
  });

  //enable hapi-cors
  server.ext('onPreResponse', corsHeaders);
  server.route(require('./routes'));
  //include routeapi route into the application server
  server.route(require('./routesapi'));

  server.start((err) => {
    if (err) {
      throw err;
    }

    console.log('Server listening at:', server.info.uri);
  });

});
