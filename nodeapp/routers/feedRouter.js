const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feedController');

router.get('/getAllFeeds', feedController.getAllFeeds);
router.get('/getFeedById/:id', feedController.getFeedById);
router.post('/addFeed', feedController.addFeed);
router.put('/updateFeed/:id', feedController.updateFeed);
router.delete('/deleteFeed/:id', feedController.deleteFeed);

module.exports = router