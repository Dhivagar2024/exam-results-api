const { Subject } = require('../models');

// Create a single subject
const createSubject = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || typeof name !== 'string') {
      return res.status(400).json({ message: 'Subject name is required' });
    }

    const subject = await Subject.create({ name });
    return res.status(201).json({ message: 'Subject created', data: subject });
  } catch (error) {
    console.error('createSubject error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Edit a subject
const editSubject = async (req, res) => {
  const subjectId = req.params.id;
  const { name } = req.body;

  try {
    const subject = await Subject.findByPk(subjectId);
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    subject.name = name;
    await subject.save();

    return res.status(200).json({ message: 'Subject updated', data: subject });
  } catch (error) {
    console.error('editSubject error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a subject
const deleteSubject = async (req, res) => {
  const subjectId = req.params.id;

  try {
    const subject = await Subject.findByPk(subjectId);
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    await subject.destroy();
    return res.status(200).json({ message: 'Subject deleted successfully' });
  } catch (error) {
    console.error('deleteSubject error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all subjects
const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.findAll();
    return res.status(200).json(subjects);
  } catch (error) {
    console.error('getSubjects error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Bulk create subjects
const bulkCreateSubjects = async (req, res) => {
  try {
    const { subjects } = req.body; // expecting array of objects: [{ name: 'Maths' }, ...]

    if (!Array.isArray(subjects) || subjects.length === 0) {
      return res.status(400).json({ message: 'Subjects array is required and cannot be empty' });
    }

    for (const subject of subjects) {
      if (!subject.name || typeof subject.name !== 'string') {
        return res.status(400).json({ message: 'Each subject must have a valid name' });
      }
    }

    const createdSubjects = await Subject.bulkCreate(subjects);

    return res.status(201).json({
      message: 'Subjects created successfully',
      data: createdSubjects,
    });
  } catch (error) {
    console.error('bulkCreateSubjects error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createSubject,
  editSubject,
  deleteSubject,
  getSubjects,
  bulkCreateSubjects,
};
