const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Register a user (only admin role allowed here)
const registerUser = async (req, res) => {
  try {
    const { name, email, password, dob, role } = req.body;

    // Allow only admin registration here
    if (role !== 'admin') {
      return res.status(400).json({ message: 'Only "admin" role can be registered via this endpoint.' });
    }

    const allowedRoles = ['admin', 'student'];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: 'Role must be either "admin" or "student".' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      dob,
      role: 'admin',
    });

    res.status(201).json({ message: 'Admin registered successfully.', userId: admin.id });
  } catch (err) {
    console.error('Register Error:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Login for both admin and student
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Create JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = {
  registerUser,
  login,
};
