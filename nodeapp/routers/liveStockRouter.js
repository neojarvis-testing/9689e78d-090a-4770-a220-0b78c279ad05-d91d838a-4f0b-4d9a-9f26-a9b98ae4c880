const express=require('express');
const router=express.Router();
const {getAllLivestock,getLivestockById,getLivestockByUserId,addLivestock,updateLivestock,deleteLivestock}=require('../controllers/liveStockController');
router.get('/getAllLivestock',getAllLivestock);
router.get('/getLivestockById/:id',getLivestockById);
router.get('/getLivestockByUserId/:id',getLivestockByUserId);
router.post('/addLivestock',addLivestock);
router.put('/updateLivestock/:id',updateLivestock);
router.delete('/deleteLivestock/:id',deleteLivestock)
module.exports=router;