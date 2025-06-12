const express = require('express');
const router = express.Router();

const {
  myProfile,
  getMyMarks,
} = require('../controllers/studentController');

const authenticate = require('../middleware/authMiddleware');
const { isStudent } = require('../middleware/roleMiddleware');

// Student-only routes
router.get('/myProfile', authenticate, isStudent, myProfile);
router.get('/getMarks', authenticate, isStudent, getMyMarks);

module.exports = router;
