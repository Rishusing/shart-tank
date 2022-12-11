
const express = require('express')
const Pitch = require('../models/pitches')
const router = new express.Router()
const cors = require('cors')

router.use(cors({
    origin: ['http://localhost:3000']
}));

router.post('/createpitch', async (req, res) => {

    const pitch = new Pitch({
        entrepreneurId: req.body.entrepreneurId,
        pitchTitle: req.body.pitchTitle,
        pitchIdea: req.body.pitchIdea,
        askAmount: req.body.askAmount,
        equity: req.body.equity,
    })

    try {
        await pitch.save()
        res.status(201).send(pitch)
    } catch (e) {
        res.status(400).send(e);
    }

})

router.post('/offer', async (req, res) => {

    const pitch = await Pitch.findOne({ _id: req.body.pitchId })
    
    const Offer = {
        investorId: req.body.investorId,
        amount: req.body.amount,
        equity: req.body.equity,
        comment: req.body.comment
    }

    pitch.offers.push(Offer)

    try {
        await pitch.save()
        res.status(201).send(pitch)
    }
    catch (e) {
        res.status(400).send(e);
    }

})

router.post('/pitches/like', async (req, res) => {

    const pitch = await Pitch.findOne({ _id: req.body.pitchId })
    
    const like = {
        likerId: req.body.likerId,
        likerName: req.body.likerName
    }

    pitch.likes.push(like)

    try {
        await pitch.save()
        res.status(201).send(pitch)
    }
    catch (e) {
        res.status(400).send(e);
    }

})

router.get('/pitches', async (req, res) => {
    
    const allPitches = await Pitch.find({});
    res.send(allPitches);

})

module.exports = router;