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

  deleteAllCandidates() {
    return this.httpService.delete('/api/candidates');
  }

  deleteOneCandidate(id) {
    return this.httpService.delete('/api/candidates/' + id);
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

  deleteAllUsers() {
    return this.httpService.delete('/api/users');
  }

  deleteOneUser(id) {
    return this.httpService.delete('/api/users/' + id);
  }

  makeDonation(id, donation) {
    return this.httpService.post('/api/candidates/' + id + '/donations', donation);
  }

  getDonations(id) {
    return this.httpService.get('/api/candidates/' + id + '/donations');
  }

  deleteAllDonations() {
    return this.httpService.delete('/api/donations');
  }

  deleteCandidateDonations(id) {
    return this.httpService.delete('/api/candidates/' + id + '/donations');
  }
}

module.exports = DonationService;
