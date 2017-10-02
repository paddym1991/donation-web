const mongoose = require('mongoose');

const donationSchema = mongoose.Schema({
  amount: Number,
  method: String,
  donor: String,    //store information about the donor in the donation Schema
});

const Donation = mongoose.model('Donation', donationSchema);
module.exports = Donation;