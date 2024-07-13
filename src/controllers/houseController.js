const mongoose=require('mongoose')
const express=require('express')
const House = require('../models/houseModel')

const createHouse=async(req,res)=>{
    const{houseType,address,amenities,
    ownerName,ownerPhone}=req.body
    try {
        const newHouse=new House(req.body)
        await newHouse.save()
        return res.status(200).send(newHouse)
    } catch (error) {
        return res.status(500).send('internal error'+error.message)
    }
}
const getAllHouses=async(req,res)=>{
    try {
        const allHouses=await House.find({})
        if(allHouses.length>0){
            return res.status(200).send(allHouses)
        }
        return res.status(400).send('no house found')
    } catch (error) {
        return res.status(500).send('internal error'+error.message)
    }
}
const updateHouse = async (req, res) => {
    const { id } = req.params;
    const { houseType, address, amenities, ownerName, ownerPhone } = req.body;
    try {
        const updatedHouse = await House.findByIdAndUpdate(id, 
            { houseType, address, amenities, ownerName, ownerPhone }, 
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

module.exports={createHouse,getAllHouses,updateHouse,getHouseById}