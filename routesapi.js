const CandidatesApi = require('./app/api/candidatesapi');

module.exports = [
  { method: 'GET', path: '/api/candidates', config: CandidatesApi.find },   //route for retrieving all candidates
  { method: 'GET', path: '/api/candidates/{id}', config: CandidatesApi.findOne },   //route for retrieving a single candidate
];