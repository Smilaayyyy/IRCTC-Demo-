require('dotenv').config();
const { Sequelize } = require('sequelize');

// Create a new instance of Sequelize with MySQL configuration from .env file
const sequelize = new Sequelize({
    database: 'railway_management',
    username: 'root',
    password: 'new_password',
    host:     'localhost',
    dialect:  'mysql',
    logging: false, // Set to true if you want to see SQL queries
});

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

testConnection();

module.exports = sequelize;
