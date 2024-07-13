const express=require('express')
const {createHouse,getAllHouses,updateHouse,getHouseById} = require('../controllers/houseController')

const router=express.Router()

router.post('/create',createHouse)
router.get('/houses',getAllHouses)
router.put('/update',updateHouse)
router.get('/houses/:id',getHouseById)
module.exports=router