const router = require('express').Router();
const article = require('./articleRoute.js');
const user = require('./userRoute.js');

router.use('/', article);
router.use('/user', user)
module.exports = router;