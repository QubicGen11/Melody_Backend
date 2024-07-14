const User = require('../models/userModel');
const argon2 = require('argon2');
const { generateToken } = require('../config/jwtConfig'); // Ensure correct path
const House = require('../models/houseModel');

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
const getAllHousesByUser = async (req, res) => {
    const { email } = req.params;
    try {
        // Find the user by their email
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).send('User data not found');
        }
        
        // Find all houses owned by the user
        const houses = await House.find({ owner: user._id });
        if (!houses || houses.length === 0) {
            return res.status(404).send('Houses not found for the user');
        }

        // Return the houses found
        return res.status(200).send(houses);
    } catch (error) {
        return res.status(500).send('Internal error: ' + error.message);
    }
};
const addBookmark = async (req, res) => {
    const { email, houseId } = req.params;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }

        const house = await House.findById(houseId);
        if (!house) {
            return res.status(404).send('House not found');
        }

        // Check if the house is already bookmarked
        if (user.bookmarks.includes(houseId)) {
            return res.status(400).send('House already bookmarked');
        }

        user.bookmarks.push(houseId);
        await user.save();

        return res.status(200).send('Bookmark added successfully');
    } catch (error) {
        return res.status(500).send('Internal error: ' + error.message);
    }
};


// Remove Bookmark
const removeBookmark = async (req, res) => {
    const { email, houseId } = req.params;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }

        const houseIndex = user.bookmarks.indexOf(houseId);
        if (houseIndex === -1) {
            return res.status(400).send('House not bookmarked');
        }

        user.bookmarks.splice(houseIndex, 1);
        await user.save();

        return res.status(200).send('Bookmark removed successfully');
    } catch (error) {
        return res.status(500).send('Internal error: ' + error.message);
    }
};

const getAllBookmarks = async (req, res) => {
    const { email } = req.params;

    try {
        const user = await User.findOne({ email }).populate('bookmarks');
        if (!user) {
            return res.status(404).send('User not found');
        }

        return res.status(200).send(user.bookmarks);
    } catch (error) {
        return res.status(500).send('Internal error: ' + error.message);
    }
};

module.exports = { registerUser, loginUser,getUserByCreds,getAllHousesByUser,addBookmark,removeBookmark,getAllBookmarks };
