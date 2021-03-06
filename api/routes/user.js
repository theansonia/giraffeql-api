const express = require('express');
const jwt = require('jsonwebtoken');
const userService = require('../db/services/user');

let JWT_KEY;

if (process.env.NODE_ENV === 'development') {
    const variables = require('../../settings.js');
    JWT_KEY = variables.JWT_KEY;
} else {
    JWT_KEY = process.env.JWT_KEY;
}

const router = express()

router.use((req, res, next) => {
    console.log(req.cookies)
    const token = req.headers['authorization'] //;req.cookies.authorization;
    //= req.headers['authorization'];
    console.log(token)

    jwt.verify(token, JWT_KEY, function (err, data) {
        if (err) {
            res.status(401).send({ error: "NotAuthorized" })
        } else {
            req.user = data;
            next();
        }
    })
})

router.get('/', async (req, res) => {
    user = await userService.findById(req.user.id)
    res.send(user);
})

module.exports = router;