const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dob: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'student'),
    allowNull: false,
    validate: {
      isIn: [['admin', 'student']],
    },
  },
  profileImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  profileImageEtag: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = User;
