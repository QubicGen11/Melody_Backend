const mongoose = require('mongoose');
const express = require('express');
const House = require('../models/houseModel');
const User = require('../models/userModel');

const createHouse = async (req, res) => {
    const { 
        email,
        title, description, houseType, address, amenities, 
        rentalType, price, availableFrom, leaseType, adType, 
        ownerName, ownerPhone, owner, postedBy, location 
    } = req.body;

    try {
        const isUser=await User.findOne({email:email})
        if(!isUser){
            return res.status(400).send('user data is not present')
        }
        const newHouse = new House({
            title, description, houseType, address, amenities, 
            rentalType, price, availableFrom, leaseType, adType, 
            ownerName:isUser.name, ownerPhone:isUser.phone, owner:isUser._id, postedBy:isUser._id, location
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
        ownerName, ownerPhone, owner, postedBy 
    } = req.body;

    try {
        const updatedHouse = await House.findByIdAndUpdate(id, 
            { 
                title, description, houseType, address, amenities, 
                rentalType, price, availableFrom, leaseType, adType, 
                ownerName, ownerPhone, owner, postedBy 
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
        return res.status(400).send('User data not found');
      }
      
      // Convert isUser._id to ObjectId
      const userId = mongoose.Types.ObjectId(isUser._id);
  
      const getHouseByUser = await House.findOne({ owner: userId });
      if (!getHouseByUser) {
        return res.status(404).send('House not found for the user');
      }
      
      return res.status(200).send(getHouseByUser);
    } catch (error) {
      return res.status(500).send('Internal error: ' + error.message);
    }
  };
const getHousesNearLocation = async (req, res) => {
    const { userEmail } = req.params;
  
    try {
      // Fetch user data to get latitude and longitude
      const user = await User.findOne({ email: userEmail });
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      // Destructure location coordinates from user
      const { coordinates } = user.location;
  
      // Query houses near the user's location
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

module.exports = { createHouse, getAllHouses, updateHouse, getHouseById, getHousesNearLocation,getHouseByUser };

 
