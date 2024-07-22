const router = require('express').Router();
const userControllers = require('../controllers/userController');

router.post('/create', userControllers.createUser);
router.post('/auth', userControllers.authUser);

module.exports = router;