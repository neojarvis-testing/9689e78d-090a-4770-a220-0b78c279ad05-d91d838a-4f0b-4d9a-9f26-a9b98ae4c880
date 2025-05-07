const express=require('express');
const router=express.Router();
const {getUserByEmailAndPassword,addUser}=require('../controllers/userController')
router.post('/signup',addUser);
router.post('/login',getUserByEmailAndPassword);
module.exports=router;