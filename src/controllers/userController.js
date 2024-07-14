const User = require('../models/userModel');
const argon2 = require('argon2');
const { generateToken } = require('../config/jwtConfig'); // Ensure correct path

const registerUser = async (req, res) => {
    const { name, role, companyName, email, password, phone } = req.body;

    try {
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await argon2.hash(password);

        const newUser = new User({
            name,
            role,
            companyName,
            email,
            password: hashedPassword,
            phone
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json('internal error'+error.message);
    }
};
 
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await argon2.verify(user.password, password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('internal error' + error.message);
    }
};
const getUserByCreds = async (req, res) => {
    const { email } = req.params;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error('Error fetching user by email:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
module.exports = { registerUser, loginUser,getUserByCreds };
