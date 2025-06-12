const { User, Subject, Mark } = require('../models');

// ✅ Create Marks in Bulk
const createMarks = async (req, res) => {
  try {
    const { user_name, marks } = req.body;

    const user = await User.findOne({ where: { name: user_name } });
    if (!user) return res.status(404).json({ message: 'Student not found.' });

    if (user.role !== 'student') {
      return res.status(400).json({ message: 'Marks can only be assigned to students.' });
    }

    const subjectMap = {};
    const subjects = await Subject.findAll();
    subjects.forEach(subject => {
      subjectMap[subject.name] = subject.id;
    });

    const markData = marks.map((m) => {
      const subjectId = subjectMap[m.subject_name];
      if (!subjectId) {
        throw new Error(`Subject "${m.subject_name}" not found.`);
      }
      return {
        subject_id: subjectId,
        mark: m.mark,
        user_id: user.id,
      };
    });

    await Mark.bulkCreate(markData);
    res.status(201).json({ message: 'Marks created successfully.' });
  } catch (err) {
    console.error('Create Marks Error:', err);
    res.status(500).json({ message: err.message || 'Internal server error.' });
  }
};

// ✅ Edit a Single Mark using user_name and subject_name
const editMark = async (req, res) => {
  try {
    const { user_name, subject_name, mark } = req.body;

    const user = await User.findOne({ where: { name: user_name } });
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const subject = await Subject.findOne({ where: { name: subject_name } });
    if (!subject) return res.status(404).json({ message: 'Subject not found.' });

    const markRecord = await Mark.findOne({
      where: { user_id: user.id, subject_id: subject.id },
    });

    if (!markRecord) {
      return res.status(404).json({ message: 'Mark record not found for this subject and user.' });
    }

    markRecord.mark = mark;
    await markRecord.save();

    res.status(200).json({ message: 'Mark updated successfully.', markRecord });
  } catch (err) {
    console.error('Edit Mark Error:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// ✅ Get all marks for a student by ID
const getMarks = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const marks = await Mark.findAll({
      where: { user_id: userId },
      include: [{ model: Subject, attributes: ['name'] }],
    });

    const result = marks.map(m => ({
      subject_name: m.Subject.name,
      marks: m.mark,
    }));

    res.status(200).json(result);
  } catch (err) {
    console.error('Get Marks Error:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = {
  createMarks,
  editMark,   // ✅ Only this single mark edit
  getMarks,
};
