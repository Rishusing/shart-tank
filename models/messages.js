const mongoose = require('mongoose')

const main_schema = {
    conversationId: {
        type: String
    },
    senderId: {
        type: String
    },
    receiverId: {
        type: String
    },
    content: {
        type: String
    }
}

const messagesSchema = new mongoose.Schema(main_schema, { timestamps: true })

const Messages = mongoose.model('messages', messagesSchema)
module.exports = Messages;