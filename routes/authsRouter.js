'use strict';
const express = require('express');
const AuthModel = require('../models/authModel')
const AuthSessionModel = require('../models/authSessionModel');

const router = express.Router();


router.post('/login', async function (req, res) {
    try {
        const { email, password } = req.body;
        const auth =await AuthModel.funcUserLogin(email, password);
        const token = await auth.funcGenerateAuthToken();

        res.send({ auth: auth, token })
    } catch (e) {
        res.status(500).send({
            status: 500,
            message: e.message
        })
    }
});

router.post('/logout', AuthSessionModel, async (req, res) => {
    const authData = req.auth; // come from middle ware

    try {
        authData.tokens = authData.tokens.filter((tokenDoc) => tokenDoc.token !== req.token);
        
        await authData.save();

        res.send(authData)
    } catch (e) {
        res.status(500).send({
            status: 500,
            message: 'something went wrong'
        })
    }
});


router.post('/create', async function (req, res) {

    try {
        const auth = new AuthModel(req.body);
        //console.log("auth "+auth);
        const token = await auth.funcGenerateAuthToken();
        //console.log("token "+token);
        await auth.save();

        res.send({ user: auth, token });

    } catch (e) {
        res.status(500).send(e)
        
    }

});


module.exports = router;
