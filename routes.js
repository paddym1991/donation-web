const Accounts = require('./app/controllers/accounts');
const Donations = require('./app/controllers/donations');
const Assets = require('./app/controllers/assets');

module.exports = [

  { method: 'GET', path: '/', config: Accounts.main },
  { method: 'GET', path: '/signup', config: Accounts.signup },
  { method: 'GET', path: '/login', config: Accounts.login },
  { method: 'POST', path: '/login', config: Accounts.authenticate },
  { method: 'GET', path: '/logout', config: Accounts.logout },

  { method: 'GET', path: '/home', config: Donations.home },
  { method: 'GET', path: '/report', config: Donations.report },
  { method: 'POST', path: '/donate', config: Donations.donate },    //POST route to accept donations

  {
    method: 'GET',
    path: '/{param*}',
    config: { auth: false },
    handler: Assets.servePublicDirectory,
  },

];