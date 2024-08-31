const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Train = sequelize.define('Train', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    source: {
        type: DataTypes.STRING,
        allowNull: false
    },
    destination: {
        type: DataTypes.STRING,
        allowNull: false
    },
    total_seats: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    available_seats: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    version: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
},
     {
        tableName: 'Trains',
        timestamps: true // Ensure timestamps are enabled
    });



module.exports = Train;
