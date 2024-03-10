const mongoose = require('mongoose')

const main_schema = {
    userId1: {
        type: String
    },
    userId2: {
        type: String
    }
}

const conversationSchema = new mongoose.Schema(main_schema,{timestamps: true})

const Conversations = mongoose.model('conversations', conversationSchema)
module.exports = Conversations;