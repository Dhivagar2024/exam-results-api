require('dotenv').config(); // Load environment variables

const { Sequelize } = require('sequelize');

// Create Sequelize instance with environment config
const sequelize = new Sequelize(
  process.env.DB_NAME,     // Database name
  process.env.DB_USER,     // MySQL username
  process.env.DB_PASSWORD, // MySQL password
  {
    host: process.env.DB_HOST, // e.g., localhost
    dialect: 'mysql',
    logging: false,            // optional: disable SQL logging in console
  }
);

// Test the connection
sequelize.authenticate()
  .then(() => console.log('✅ MySQL DB connection established successfully.'))
  .catch(err => console.error('❌ Unable to connect to the database:', err));

module.exports = sequelize;
