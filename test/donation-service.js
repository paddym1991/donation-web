/**
 * This class encapsulates the client side of the donation api. It is layered on top of the
 * SyncHttpClient class, and delivers a simplified interface to the unit tests.
 */

'use strict';

const SyncHttpService = require('./sync-http-client');
const baseUrl = 'http://localhost:4000';

class DonationService {

  constructor(baseUrl) {
    this.httpService = new SyncHttpService(baseUrl);
  }

  getCandidates() {
    return this.httpService.get('/api/candidates');
  }

  getCandidate(id) {
    return this.httpService.get('/api/candidates/' + id);
  }

  createCandidate(newCandidate) {
    return this.httpService.post('/api/candidates', newCandidate);
  }

  getUsers() {
    return this.httpService.get('/api/users');
  }

  getUser(id) {
    return this.httpService.get('/api/users/' + id);
  }

  createUser(newUser) {
    return this.httpService.post('/api/users', newUser);
  }
}

module.exports = DonationService;
