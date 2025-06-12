const express = require('express');
const router = express.Router();
const {
  createSubject,
  editSubject,
  deleteSubject,
  getSubjects,
  bulkCreateSubjects,    // import the new controller method
} = require('../controllers/subjectController');

const authenticate = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/roleMiddleware');

// Existing routes
router.post('/', authenticate, isAdmin, createSubject);
router.put('/:id', authenticate, isAdmin, editSubject);
router.delete('/:id', authenticate, isAdmin, deleteSubject);
router.get('/', authenticate, isAdmin, getSubjects);

// Admin-only subject routes
router.post('/', authenticate, isAdmin, createSubject);
router.post('/bulkCreate', authenticate, isAdmin, bulkCreateSubjects);
router.put('/:id', authenticate, isAdmin, editSubject);
router.delete('/:id', authenticate, isAdmin, deleteSubject);
router.get('/', authenticate, isAdmin, getSubjects);

module.exports = router;
