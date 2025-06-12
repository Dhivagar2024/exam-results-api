const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Subject = require('./Subject');

const Mark = sequelize.define('Mark', {
  mark: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Relationships
User.hasMany(Mark, { foreignKey: 'user_id' });
Mark.belongsTo(User, { foreignKey: 'user_id' });

Subject.hasMany(Mark, { foreignKey: 'subject_id' });
Mark.belongsTo(Subject, { foreignKey: 'subject_id' });

module.exports = Mark;
