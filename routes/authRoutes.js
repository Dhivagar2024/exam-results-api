const express = require('express');
const router = express.Router();

const { registerUser, login } = require('../controllers/authController');

router.post('/registerUser', registerUser);  // Only for admin creation
router.post('/login', login);                // For both student and admin login

module.exports = router;
