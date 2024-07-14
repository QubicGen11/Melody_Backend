const express=require('express')
const {createHouse,getAllHouses,updateHouse,getHouseById,getHousesNearLocation} = require('../controllers/houseController')

const router=express.Router()
router.post('/houses', createHouse);
router.get('/houses', getAllHouses);
router.get('/houses/near', getHousesNearLocation);  
router.get('/houses/:id', getHouseById);
router.put('/houses/:id', updateHouse);
module.exports=router