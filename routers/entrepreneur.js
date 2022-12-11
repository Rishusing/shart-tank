const express = require('express')
const Entrepreneur = require('../models/entrepreneur')
const router = new express.Router()

const cors = require('cors')

router.use(cors({
    origin: ['http://localhost:3000']
}));

router.post('/createentrepreneur', async (req, res) => {

    const entrepreneur = new Entrepreneur({
        _id: req.body.id,
        email: req.body.email,
        phone: req.body.phone,
        name: req.body.name,
        companyname: req.body.companyname,
        industry: req.body.industry
    });

    try {

        await entrepreneur.save()
        res.status(201).send(entrepreneur)

    } catch (e) {

        res.status(400).send(e);
        
    }

})

router.get('/entrepreneur/:id', async (req, res) => {
    
    const ID = req.params.id
    
    try{
        const entrepreneur = await Entrepreneur.findOne({ _id: ID })
        
        if(!entrepreneur){
            return res.status(404).send({msg : "Entrepreneur Not Found"})
        }
        
        res.send(entrepreneur)

    }catch(e){
        res.status(500).send()
    }
})

router.post('/entrepreneur/update', async (req, res) => {
    try {
        const entrepreneur = await Entrepreneur.findOne({ _id: req.body.id })
        if (req.body.name) {
            entrepreneur.name = req.body.name;
        }
        if (req.body.phone) {
            entrepreneur.phone = req.body.phone;
        }
        if (req.body.industry) {
            entrepreneur.industry = req.body.industry;
        }
        if (req.body.companyname) {
            entrepreneur.companyname = req.body.companyname;
        }
        if (req.body.avatar) {
            entrepreneur.avatar = req.body.avatar;
        }

        await entrepreneur.save();
        res.status(200).send(entrepreneur)
    }
    catch (e) {
        res.status(404).send(e)
    }
})

router.post('/entrepreneur/follow', async (req, res) => {

    const entrepreneur = await Entrepreneur.findOne({ _id: req.body.entrepreneurId })
    
    const follow = {
        followerId: req.body.followerId,
        followerName: req.body.followerName
    }

    entrepreneur.followers.push(follow)

    try {
        await entrepreneur.save()
        res.status(201).send(entrepreneur)
    }
    catch (e) {
        res.status(400).send(e);
    }
})


module.exports = router