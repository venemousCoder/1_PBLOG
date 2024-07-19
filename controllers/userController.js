const user = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const bcrypt = require('bcrypt');

function generateToken(user) {
    if (user) {
        let signedToken = jwt.sign(
            {
                data: user._id,
                exp: new Date().setDate(new Date().getDate() + 1)
            },
            SECRET_KEY
        );
        return signedToken;
    }
    return new Error('userException: user not found');
}

function createUser(req, res, next) {

            const newUser = {
                username: req.body.username,
                password: req.body.password
            }
            user.create(newUser)
                .then((createdUser) => {
                    req.login(createdUser, ()=>{
                        
                    })
                    return res.json({ msg: 'user created', token: generateToken(createdUser), userInfo: createdUser });
                }).catch((err) => {
                    return res.json({ msg: 'user not created', error: err });
                });
}

module.exports = { createUser }