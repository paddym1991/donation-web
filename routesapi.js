const CandidatesApi = require('./app/api/candidatesapi');

module.exports = [
  { method: 'GET', path: '/api/candidates', config: CandidatesApi.find },   //route for retrieving all candidates
  { method: 'GET', path: '/api/candidates/{id}', config: CandidatesApi.findOne },   //route for retrieving a single candidate (id must be provided)

  { method: 'POST', path: '/api/candidates', config: CandidatesApi.create },    //route used to create a single candidate.
  { method: 'DELETE', path: '/api/candidates/{id}', config: CandidatesApi.deleteOne },    //route used to delete a single candidate (id must be provided)
  { method: 'DELETE', path: '/api/candidates', config: CandidatesApi.deleteAll },   //route used to delete all candidates
];
