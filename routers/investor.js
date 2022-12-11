
const express = require('express')
const Investor = require('../models/investor')
const router = new express.Router()

const cors = require('cors')

router.use(cors({
    origin: ['http://localhost:3000']
}));

router.post('/createinvestor', async (req, res) => {
    
    const investor = new Investor({
        _id: req.body.id,
        email: req.body.email,
        phone: req.body.phone,
        name: req.body.name,
        companyname: req.body.companyname,
        
    });
    
    try {
        
        await investor.save()
        res.status(201).send(investor)

    } catch (e) {
        
        res.status(400).send(e);
    }
    
})

router.get('/investor/:id', async (req, res) => {
    
    const ID = req.params.id
    
    try{
        const investor = await Investor.findOne({ _id: ID })
        
        if(!investor){
            return res.status(404).send({msg : "Investor Not Found"})
        }
        
        res.send(investor)

    }catch(e){
        res.status(500).send()
    }
})

router.post('/investor/update', async (req, res) => {

    try {
        const investor = await Investor.findOne({ _id: req.body.id })
        if (req.body.name) {
            investor.name = req.body.name;
        }
        if (req.body.phone) {
            investor.phone = req.body.phone;
        }
        if (req.body.companyname) {
            investor.companyname = req.body.companyname;
        }
        if (req.body.avatar) {
            investor.avatar = req.body.avatar;
        }

        await investor.save();
        res.status(200).send(investor)
    }
    catch (e) {
        res.status(404).send(e)
    }
    
})


router.post('/investor/follow', async (req, res) => {

    const investor = await Investor.findOne({ _id: req.body.investorId })
    
    const follow = {
        followerId: req.body.followerId,
        followerName: req.body.followerName
    }

    investor.followers.push(follow)

    try {
        await investor.save()
        res.status(201).send(investor)
    }
    catch (e) {
        res.status(400).send(e);
    }
})

module.exports = router