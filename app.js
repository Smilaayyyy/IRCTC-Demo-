const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const sequelize = require('./config/database');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const trainRoutes = require('./routes/trainRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const bookingRoutes = require('./routes/bookingRoutes');


app.use(express.json());

app.use('/auth', authRoutes);
app.use('/trains', trainRoutes);
app.use('/bookings', bookingRoutes);

sequelize.sync()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    });
    
   