const jwt = require('jsonwebtoken');
require('dotenv').config(); // just in case

const generateToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

module.exports = { generateToken };
