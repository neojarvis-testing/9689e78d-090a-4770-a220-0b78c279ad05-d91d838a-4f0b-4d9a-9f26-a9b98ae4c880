const express=require('express');
const router=express.Router();
const {getUserByEmailAndPassword,addUser,verifyEmail,resetPassword}=require('../controllers/userController')
router.post('/signup',addUser);
router.post('/login',getUserByEmailAndPassword);
router.post('/verifyEmail',verifyEmail);
router.post('/resetPassword',resetPassword);
module.exports=router;