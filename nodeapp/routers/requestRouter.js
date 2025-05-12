const express = require('express');
const router = express.Router();
const { getAllRequests, getRequestById, getRequestsByUserId, addRequest, updateRequest, deleteRequest } = require('../controllers/requestController');
const {validateToken}=require('../authUtils')
router.get('/getAllRequests',validateToken, getAllRequests);
router.post('/addRequest',validateToken, addRequest)
router.put('/updateRequest/:id',validateToken, updateRequest)
router.delete('/deleteRequest/:id',validateToken, deleteRequest);
router.get('/getRequestById/:id',validateToken, getRequestById)
router.get('/getRequestsByUserId/:id',validateToken, getRequestsByUserId);
module.exports = router
