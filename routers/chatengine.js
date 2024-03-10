const express = require('express')
const Conversations = require('../models/conversations');
const Messages = require('../models/messages')

const router = new express.Router()

const cors = require('cors')

router.use(
    cors({
        origin: '*',
    }),
)

router.post('/newconversation', async (req, res) => {
    try {
        const conversation = new Conversations(req.body)
        await conversation.save();
        res.status(201).send(conversation)
    } catch (e) {
        res.status(400).send(e);
    }
})

router.post('/newmessage', async (req, res) => {
    try {
        const message = new Messages(req.body)
        await message.save();
        res.status(201).send(message)
    } catch (e) {
        res.status(400).send(e);
    }
})

router.get('/conversation/:conversationId', async (req, res) => {

    try {
        const messages = await Messages.find({ conversationId: req.params.conversationId })
        res.status(200).send(messages)
    }
    catch (e) {
        res.status(404).send(e);
    }

})

router.get('/chat_list/:userId', async (req, res) => {

    try {

        const searchCriteria = {
            $or: [
                { userId1: req.params.userId },
                { userId2: req.params.userId }
            ]
        };

        const messages = await Conversations.find(searchCriteria);
        res.status(200).send(messages)
    }
    catch (e) {
        res.status(404).send(e);
    }

})

module.exports = router;