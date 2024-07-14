const express=require('express')
const {createHouse,getAllHouses,updateHouse,getHouseById,getHousesNearLocation,getHouseByUser} = require('../controllers/houseController');
const { get } = require('mongoose');

const router=express.Router()
router.post('/houses', createHouse);
router.get('/houses', getAllHouses);
router.get('/houses/near', getHousesNearLocation);  
router.get('/houses/:id', getHouseById);
router.get('/houses/:email', getHouseByUser);
router.put('/houses/:id', updateHouse);
module.exports=router