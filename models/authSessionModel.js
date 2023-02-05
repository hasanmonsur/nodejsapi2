const jwt = require('jsonwebtoken');
const Auth = require('../models/authModel')

const authSession = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const data = jwt.verify(token, process.env.TOKEN_SECRET);
        const auth = await Auth.findOne({
            _id: data._id,
            "tokens.token": token
        })
        if (!auth)
            throw new Error('student not authrized');

        req.auth = auth;
        req.token = token;
        next();
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}

module.exports = authSession