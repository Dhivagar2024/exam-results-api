const { User, Mark, Subject } = require('../models');

// ✅ Get student profile
const myProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId, {
      attributes: ['name', 'email', 'dob'],
    });

    if (!user) return res.status(404).json({ message: 'Student not found.' });

    res.status(200).json(user);
  } catch (err) {
    console.error('Profile Error:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// ✅ Get student's own marks
const getMyMarks = async (req, res) => {
  try {
    const userId = req.user.id;

    const marks = await Mark.findAll({
      where: { user_id: userId },
      include: [{ model: Subject, attributes: ['name'] }],
    });

    const result = marks.map((m) => ({
      subject_name: m.Subject.name,
      marks: m.mark,
    }));

    res.status(200).json(result);
  } catch (err) {
    console.error('Student Marks Error:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = {
  myProfile,
  getMyMarks,
};
