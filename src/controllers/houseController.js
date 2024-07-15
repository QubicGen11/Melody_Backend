const mongoose = require('mongoose');
const House = require('../models/houseModel');
const User = require('../models/userModel');

const createHouse = async (req, res) => {
    const {
      email,
      title, description, houseType, address, amenities,
      rentalType, price, availableFrom, leaseType, adType,
      ownerName, ownerPhone, ownerEmail, owner, postedBy, location, image
    } = req.body;
  
    try {
      const isUser = await User.findOne({ email: email });
      if (!isUser) {
        return res.status(400).send('User data not found');
      }
      const newHouse = new House({
        title, description, houseType, address, amenities,
        rentalType, price, availableFrom, leaseType, adType,
        ownerName, ownerPhone: isUser.phone, ownerEmail: email,
        owner: isUser._id, postedBy: isUser._id, location, image
      });
      await newHouse.save();
      return res.status(200).send(newHouse);
    } catch (error) {
      return res.status(500).send('Internal error: ' + error.message);
    }
  };
  
  const getAllHouses = async (req, res) => {
    try {
      const allHouses = await House.find({});
      if (allHouses.length > 0) {
        return res.status(200).send(allHouses);
      }
      return res.status(400).send('No house found');
    } catch (error) {
      return res.status(500).send('Internal error: ' + error.message);
    }
  };
  
const updateHouse = async (req, res) => {
    const { id } = req.params;
    const {
        title, description, houseType, address, amenities,
        rentalType, price, availableFrom, leaseType, adType,
        ownerName, ownerPhone, owner, postedBy, image
    } = req.body;

    try {
        const updatedHouse = await House.findByIdAndUpdate(id,
            {
                title, description, houseType, address, amenities,
                rentalType, price, availableFrom, leaseType, adType,
                ownerName, ownerPhone, owner, postedBy,
                image: Buffer.from(image, 'base64'), // Converting base64 to Buffer
            },
            { new: true });
        if (!updatedHouse) {
            return res.status(404).send('House not found');
        }
        return res.status(200).send(updatedHouse);
    } catch (error) {
        return res.status(500).send('Internal error: ' + error.message);
    }
};

const getHouseById = async (req, res) => {
    const { id } = req.params;
    try {
        const house = await House.findById(id);
        if (!house) {
            return res.status(404).send('House not found');
        }
        return res.status(200).send(house);
    } catch (error) {
        return res.status(500).send('Internal error: ' + error.message);
    }
};

const getHouseByUser = async (req, res) => {
    const { email } = req.params;
    try {
        const isUser = await User.findOne({ email: email });
        if (!isUser) {
            return res.status(400).json({ error: 'User data not found' });
        }
         
        const housesByUser = await House.find({ ownerEmail: email });
        if (!housesByUser.length) {
            return res.status(404).json({ error: 'Houses not found for the user' });
        }
        return res.status(200).json(housesByUser);
    } catch (error) {
        return res.status(500).json({ error: 'Internal error: ' + error.message });
    }
};

const getHousesNearLocation = async (req, res) => {
    const { userEmail } = req.params;

    try {
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).send('User not found');
        }

        const { coordinates } = user.location;

        const houses = await House.find({
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: coordinates
                    }
                }
            }
        });

        if (houses.length > 0) {
            return res.status(200).send(houses);
        }
        return res.status(404).send('No houses found near the specified location');
    } catch (error) {
        return res.status(500).send('Internal error: ' + error.message);
    }
};

module.exports = {
    createHouse,
    getAllHouses,
    updateHouse,
    getHouseById,
    getHousesNearLocation,
    getHouseByUser
};