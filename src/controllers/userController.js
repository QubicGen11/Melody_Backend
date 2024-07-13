const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    const { name, role, companyName, email, password, phone } = req.body;

    try {
       
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

 
        const hashedPassword = await bcrypt.hash(password, 10);

 
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
        res.status(500).json({ message: 'Server Error' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
         
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

     
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { registerUser, loginUser };
