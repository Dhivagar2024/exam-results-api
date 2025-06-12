const express = require('express');
const router = express.Router();

const {
  createMarks,
  editMark,  // ✅ Use this instead of editMarks
  getMarks,
} = require('../controllers/markController');

const authenticate = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/roleMiddleware');

// Admin-only mark routes
router.post('/createMarks', authenticate, isAdmin, createMarks);
router.put('/editMark', authenticate, isAdmin, editMark);
router.get('/getMarks/:userId', authenticate, isAdmin, getMarks);

module.exports = router;
