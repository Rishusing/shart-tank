const mongoose = require('mongoose')

const entrepreneurSchema = new mongoose.Schema({
    _id: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    name: {
        type:String
    },
    companyname: {
        type:String
    },
    industry: {
        type:String
    },
    avatar: {
        type: String,
        default : 'http://bit.ly/3Pd3qh0'
    },
    profile: {
      type: String,
      default: 'entrepreneur',
    },
    followers: [
        {
            followerId: {
                type : String
            },
            followerName: {
                type : String
            }
        }
    ]

},{
    timestamps:true
})

const Entrepreneur = mongoose.model('entrepreneurs', entrepreneurSchema)
module.exports = Entrepreneur;