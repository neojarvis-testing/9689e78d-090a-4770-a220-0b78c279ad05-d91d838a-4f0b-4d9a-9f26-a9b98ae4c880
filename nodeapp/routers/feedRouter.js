const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feedController');
const {validateToken}=require('../authUtils')
router.get('/getAllFeeds',validateToken,feedController.getAllFeeds);
router.get('/getFeedById/:id',validateToken,feedController.getFeedById);
router.post('/addFeed',validateToken, feedController.addFeed);
router.put('/updateFeed/:id',validateToken, feedController.updateFeed);
router.delete('/deleteFeed/:id',validateToken, feedController.deleteFeed);

module.exports = router