'use strict';

const mongoose = require('mongoose');

//New schema to represenct a Candidate
const candidateSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  office: String,
});

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
