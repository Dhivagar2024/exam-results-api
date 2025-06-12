const sequelize = require('../config/db');
const User = require('./User');
const Subject = require('./Subject');
const Mark = require('./mark');

// Run associations
require('./mark'); // loads associations

sequelize.sync({ alter: true })  // or { force: true } in dev
  .then(() => console.log('Database synced'))
  .catch((err) => console.error('Database sync error:', err));

module.exports = {
  sequelize,
  User,
  Subject,
  Mark,
};
