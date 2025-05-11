const express=require('express');
const router=express.Router();
const upload=require('../config/multerConfig');
const {getAllLivestock,getLivestockById,getLivestockByUserId,addLivestock,updateLivestock,deleteLivestock,getFileByLivestockId}=require('../controllers/liveStockController');
const {validateToken}=require('../authUtils')
router.get('/getAllLivestock',validateToken,getAllLivestock);
router.get('/getLivestockById/:id',validateToken,getLivestockById);
router.get('/getLivestockByUserId/:id',validateToken,getLivestockByUserId);
router.post('/addLivestock',validateToken, upload.single('attachment'), addLivestock);
router.put('/updateLivestock/:id',validateToken, upload.single('attachment'),updateLivestock);
router.post('/addLivestock',validateToken, upload.single('attachment'), addLivestock);
router.put('/updateLivestock/:id',validateToken, upload.single('attachment'),updateLivestock);
router.delete('/deleteLivestock/:id',validateToken,deleteLivestock)
router.get('/getFileByLivestockId/:id/file',validateToken,getFileByLivestockId);
module.exports=router;