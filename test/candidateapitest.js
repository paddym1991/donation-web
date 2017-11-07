'use strict';

const assert = require('chai').assert;
const DonationService = require('./donation-service');
const fixtures = require('./fixtures.json');
//We need a comparison that will test to see if the returnedCandidate is a superset of the newCandidate object
const _ = require('lodash');

suite('Candidate API tests', function () {

  let candidates = fixtures.candidates;
  let newCandidate = fixtures.newCandidate;

  const donationService = new DonationService('http://localhost:4000');

  //simplified test with lodash
  test('create a candidate', function () {
    const returnedCandidate = donationService.createCandidate(newCandidate);
    assert(_.some([returnedCandidate], newCandidate),  'returnedCandidate must be a superset of newCandidate');
    assert.isDefined(returnedCandidate._id);
  });
});
