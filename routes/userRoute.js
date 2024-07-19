const router = require('express').Router();
const userControllers = require('../controllers/userController');

router.post('/create', userControllers.createUser);

module.exports = router;