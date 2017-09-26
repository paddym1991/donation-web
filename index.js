'use strict';

const Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: process.env.PORT || 4000 });

//store a list of users and donations in a simple array
server.bind({
  currentUser: {},   //current user object
  users: [],
  donations: [],
});

//in this case users is an object instead of array

// server.bind({
//   currentUser: {},   //current user object
//   users: {},
//   donations: [],
// });

server.register([require('inert'), require('vision')], err => {

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

  server.route(require('./routes'));

  server.start((err) => {
    if (err) {
      throw err;
    }

    console.log('Server listening at:', server.info.uri);
  });

});
