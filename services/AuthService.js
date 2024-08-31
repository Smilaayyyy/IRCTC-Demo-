const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/UserRepository');
require('dotenv').config();  

const JWT_SECRET = process.env.JWT_SECRET;

class AuthService {
    async register(userDetails) {
        if (!userDetails.username || !userDetails.password || !userDetails.role) {
            throw new Error('Username, password, and role are required');
        }

        
        const existingUser = await UserRepository.findByUsername(userDetails.username);
        if (existingUser) {
            throw new Error('User already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(userDetails.password, 10);

        
        const user = {
            ...userDetails,
            password: hashedPassword
        };

        return await UserRepository.createUser(user);
    }

    async login(username, password) {
        const user = await UserRepository.findByUsername(username);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid credentials');
        }

        
        const token = this.generateToken(user);

        
        return { user, token };
    }

    
    generateToken(user) {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }

       
        console.log('JWT_SECRET:', process.env.JWT_SECRET);

        return jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '2h' } 
        );
    }
}
module.exports = new AuthService();
