// models/User.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Make sure this path is correct

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'user'),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'User',
  timestamps: true, // This will automatically add `createdAt` and `updatedAt`
});

module.exports = User;

