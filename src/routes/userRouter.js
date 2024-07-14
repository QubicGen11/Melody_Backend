const express = require('express');
const { loginUser, registerUser,getUserByCreds,getAllHousesByUser } = require('../controllers/userController');
const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/:email', getUserByCreds);
router.get('/houses/:email', getAllHousesByUser);

module.exports = router;
