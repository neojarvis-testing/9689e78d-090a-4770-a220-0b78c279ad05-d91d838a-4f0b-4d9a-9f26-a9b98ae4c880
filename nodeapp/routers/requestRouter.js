const express = require('express');
const router = express.Router();
const { getAllRequests, getRequestById, getRequestsByUserId, addRequest, updateRequest, deleteRequest } = require('../controllers/requestController')
router.get('/getAllRequests', getAllRequests);
router.post('/addRequest', addRequest)
router.put('/updateRequest/:id', updateRequest)
router.delete('/deleteRequest/:id', deleteRequest);
router.get('/getRequestById/:id', getRequestById)
router.get('/getRequestsByUserId/:id', getRequestsByUserId);
module.exports = router