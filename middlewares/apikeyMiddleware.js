// middleware/apiKeyMiddleware.js
const dotenv = require('dotenv');
dotenv.config();


const apikeyMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    const validApiKey = process.env.ADMIN_API_KEY;

    if (apiKey && apiKey === validApiKey) {
        next(); // Proceed to the next middleware or route handler
    } else {
        res.status(403).json({ error: 'Forbidden: Invalid API key' }); // Invalid API key
    }
};

module.exports = apikeyMiddleware;
