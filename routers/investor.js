
const express = require('express')
const Investor = require('../models/investor')
const router = new express.Router()

const cors = require('cors')

router.use(cors({
    origin: ['http://localhost:3000']
}));

router.post('/createinvestor', async(req, res) => {

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


module.exports = router