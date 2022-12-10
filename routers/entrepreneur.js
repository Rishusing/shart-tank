const express = require('express')
const Entrepreneur = require('../models/entrepreneur')
const router = new express.Router()

const cors = require('cors')

router.use(cors({
    origin: ['http://localhost:3000']
}));

router.post('/createentrepreneur', async(req, res) => {

    const entrepreneur = new Entrepreneur({
        _id: req.body.id,
        email: req.body.email,
        phone: req.body.phone,
        name: req.body.name,
        companyname: req.body.companyname,
        industry: req.body.industry
    });

    // console.log(entrepreneur);

    try {

        await entrepreneur.save()
        res.status(201).send(entrepreneur)

    } catch (e) {

        res.status(400).send("Something wrong");
        
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


module.exports = router