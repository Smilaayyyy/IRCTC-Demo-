const User = require('../model/User');
class UserRepository {
    async findByUsername(username) {
        // Ensure proper handling and debugging
        try {
            const user = await User.findOne({ where: { username } });
            if (!user) {
                console.log(`User with username ${username} not found`);
            }
            return user;
        } catch (error) {
            console.error('Error finding user by username:', error);
            throw error;
        }
    }

    async createUser(user) {
        try {
            // Additional validations can be added here
            return await User.create(user);
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }
}

module.exports = new UserRepository();

