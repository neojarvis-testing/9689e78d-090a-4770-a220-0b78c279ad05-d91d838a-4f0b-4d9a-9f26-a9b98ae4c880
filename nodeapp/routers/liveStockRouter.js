const express=require('express');
const router=express.Router();
const upload=require('../config/multerConfig');
const {getAllLivestock,getLivestockById,getLivestockByUserId,addLivestock,updateLivestock,deleteLivestock,getFileByLivestockId}=require('../controllers/liveStockController');
router.get('/getAllLivestock',getAllLivestock);
router.get('/getLivestockById/:id',getLivestockById);
router.get('/getLivestockByUserId/:id',getLivestockByUserId);
router.post('/addLivestock', upload.single('attachment'), addLivestock);
router.put('/updateLivestock/:id', upload.single('attachment'),updateLivestock);
router.post('/addLivestock', upload.single('attachment'), addLivestock);
router.put('/updateLivestock/:id', upload.single('attachment'),updateLivestock);
router.delete('/deleteLivestock/:id',deleteLivestock)
router.get('/getFileByLivestockId/:id/file',getFileByLivestockId);
module.exports=router;