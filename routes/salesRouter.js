'use strict';
const express = require('express');
const Sales = require('../models/salesModel')
const AuthSessionModel = require('../models/authSessionModel');
const router = express.Router();


//create products
router.post('/create', AuthSessionModel,async (req, res) => {
    try {
        const sales = new Sales(req.body);
        await sales.save();

        res.send({ sales: sales });
    } catch (e) {
        res.status(500).send(e)
    }
})

//change products
router.patch('/edit', AuthSessionModel, async (req, res) => {
    const _id = req.sales.id;
    try {
        if (req.body && !req.body._id)
            throw new Error('You can only edit your password')

        const sales = await Sales.findById({ _id });
        
        sales.name =req.sales.name ;

        await sales.save();

        res.send(sales);
    } catch (err) {
        res.status(500).send({
            status: 500,
            message: err.message
        })
    }
});

//detele products
router.patch('/delete', AuthSessionModel, async (req, res) => {
    const _id = req.products.id;
    try {
        if (req.body && !req.body._id)
            throw new Error('You can only edit your password')

        const { id } = _id;
        const sales = await Sales.findByIdAndDelete(id);
               
       res.send(sales);
    } catch (err) {
        res.status(500).send({
            status: 500,
            message: err.message
        })
    }
});


//get all data
router.get('/all-data', AuthSessionModel, async (req, res) => {
    try {
        const saleslist = await Sales.find({})
        res.send(saleslist);
    } catch (err) {
        res.status(500).send(err)
    }
});


module.exports = router;
