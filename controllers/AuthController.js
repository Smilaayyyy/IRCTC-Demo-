const AuthService = require('../services/AuthService');

class AuthController {
    async register(req, res) {
        console.log('Request Body:', req.body);
        try {
            const user = await AuthService.register(req.body);
            res.status(201).json(user);
        } catch (error) {
            console.error('Registration Error:', error.message);
            res.status(400).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const { user, token } = await AuthService.login(username, password);
            res.json({ user, token });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new AuthController();
