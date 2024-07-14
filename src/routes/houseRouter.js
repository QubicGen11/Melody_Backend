const express = require('express');
const {
    createHouse,
    getAllHouses,
    updateHouse,
    getHouseById,
    getHousesNearLocation,
    getHouseByUser
} = require('../controllers/houseController');

const router = express.Router();

router.post('/houses', createHouse);
router.get('/houses', getAllHouses);
router.get('/houses/near/:userEmail', getHousesNearLocation); // Include userEmail as a parameter
router.get('/houses/id/:id', getHouseById); // Change to avoid conflict
router.get('/houses/user/:email', getHouseByUser); // Change to avoid conflict
router.put('/houses/:id', updateHouse);

module.exports = router;
