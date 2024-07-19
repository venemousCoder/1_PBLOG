const express = require('express')
const router = express.Router();
const articleControllers = require('../controllers/articleControllers');

router.post('/createArticle', articleControllers.createArticle);
router.get('/deleteArticle', articleControllers.deleteArticle);
router.post('/updateArticle', articleControllers.updateArticle);
router.post('/findArticle', articleControllers.findArticle);
module.exports = router;