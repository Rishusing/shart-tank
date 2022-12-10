const mongoose = require('mongoose')

const investorSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    name: {
      type: String,
    },
    companyname: {
      type: String,
    },
    avatar: {
      type: String,
      default: 'http://bit.ly/3Pd3qh0',
    },
  },
  {
    timestamps: true,
  },
)

const Investor = mongoose.model('investors', investorSchema)
module.exports = Investor
