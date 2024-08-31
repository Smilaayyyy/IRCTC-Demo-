const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Train = require('./Train');

const Booking = sequelize.define('Booking', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull : true,
        references: {
            model: User,
            key: 'id'
        }
    },
    train_id: {
        type: DataTypes.INTEGER,
        allowNull : true,
        references: {
            model: Train,
            key: 'id'
        }
    },
    seats_booked: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    booking_time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'Bookings',
    timestamps: true
});
// Define associations
Booking.belongsTo(User, { foreignKey: 'user_id' });
Booking.belongsTo(Train, { foreignKey: 'train_id' });

User.hasMany(Booking, { foreignKey: 'user_id' });
Train.hasMany(Booking, { foreignKey: 'train_id' });


module.exports = Booking;
