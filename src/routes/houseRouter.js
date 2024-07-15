const express = require('express');
const {
    createHouse,
    getAllHouses,
    updateHouse,
    getHouseById,
    getHousesNearLocation,
    getHouseByUser,addBookmark,removeBookmark,getAllBookmarks
} = require('../controllers/houseController');

const router = express.Router();

router.post('/houses', createHouse);
router.get('/houses', getAllHouses);
router.get('/houses/near/:userEmail', getHousesNearLocation); // Include userEmail as a parameter
router.get('/houses/id/:id', getHouseById); // Change to avoid conflict
router.get('/houses/user/:email', getHouseByUser); // Change to avoid conflict
router.put('/houses/:id', updateHouse);
router.post('/user/bookmark', addBookmark);
router.post('/user/unbookmark', removeBookmark);
router.get('/user/bookmarks/:email', getAllBookmarks);
module.exports = router;
