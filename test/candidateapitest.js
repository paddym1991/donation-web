'use strict';

const assert = require('chai').assert;
const DonationService = require('./donation-service');
const fixtures = require('./fixtures.json');

suite('Candidate API tests', function () {

  let candidates = fixtures.candidates;
  let newCandidate = fixtures.newCandidate;

  const donationService = new DonationService('http://localhost:4000');

  //simplified test will fail. The returned object contains the fields as expected,
  // but also additional, legitimate, fields that cause the equals test to fail
  test('create a candidate', function () {
    const returnedCandidate = donationService.createCandidate(newCandidate);
    assert.equal(returnedCandidate, newCandidate);
    assert.isDefined(returnedCandidate._id);
  });
});
