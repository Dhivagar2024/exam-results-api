const express = require('express');
const router = express.Router();
const {registerStudent} = require('../controllers/adminController');
const authenticate =  require('../middleware/authMiddleware');
const {isAdmin} = require('../middleware/roleMiddleware');
router.post('/registerStudent',authenticate,isAdmin,registerStudent);    

module.exports=router;