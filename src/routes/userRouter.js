const express = require('express');
const { loginUser, registerUser,getUserByCreds } = require('../controllers/userController');
const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/:email', getUserByCreds);

module.exports = router;
