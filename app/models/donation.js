const mongoose = require('mongoose');

const donationSchema = mongoose.Schema({
  amount: Number,
  method: String,
  //reference the donor of the donation
  donor: {          //To retrieve further information on the donor use an object reference directly to the User object
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  //reference the candidate the donation is intended for
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate',
  },
});

const Donation = mongoose.model('Donation', donationSchema);
module.exports = Donation;