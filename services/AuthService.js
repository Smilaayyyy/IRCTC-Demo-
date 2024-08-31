const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/UserRepository');
require('dotenv').config();  // Load environment variables

const JWT_SECRET = process.env.JWT_SECRET;

class AuthService {
    async register(userDetails) {
        if (!userDetails.username || !userDetails.password || !userDetails.role) {
            throw new Error('Username, password, and role are required');
        }

        // Check if the user already exists
        const existingUser = await UserRepository.findByUsername(userDetails.username);
        if (existingUser) {
            throw new Error('User already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(userDetails.password, 10);

        // Create user object
        const user = {
            ...userDetails,
            password: hashedPassword
        };

        // Save user to the database
        return await UserRepository.createUser(user);
    }

    async login(username, password) {
        const user = await UserRepository.findByUsername(username);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid credentials');
        }

        // Generate JWT token
        const token = this.generateToken(user);

        // Return user details and token
        return { user, token };
    }

    // Function to generate JWT token
    generateToken(user) {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }

        // Log the JWT secret to ensure it's loaded (use carefully in production)
        console.log('JWT_SECRET:', process.env.JWT_SECRET);

        return jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );
    }
}
module.exports = new AuthService();
