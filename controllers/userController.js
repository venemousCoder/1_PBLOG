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
            req.login(createdUser, () => {
                console.log('logged')
                return res.json({ msg: 'user created', token: generateToken(createdUser), userInfo: createdUser });
            })
            console.log('not logged')
        }).catch((err) => {
            return res.json({ msg: 'user not created', error: err });
        });
}

function authUser(req, res, next) {
    user.findOne({ username: req.body.username })
        .then((currentUser) => {
            if (!currentUser) {
                return res.status(404).json({ msg: 'could not authenticate user', error: 'userException: User doesn\'t exist in database' });
            }
            bcrypt.compare(req.body.password, currentUser.password, (err, result) => {
                if (!result) {
                    return res.status(500).json({ msg: 'incorrect password or username', error: 'incorrect entry' });
                }
                req.user = currentUser;
                return res.status(201).json({ msg: 'authenticated user', user: req.user });
            })
        }).catch((err) => {
            return res.status(500).json({ msg: 'could not authenticate user', error: err });
        });
}

module.exports = { createUser, authUser }